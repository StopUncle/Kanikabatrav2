/**
 * One-shot bootstrap of the classroom: uploads the
 * "Dating with Detatchment" video to R2, then creates the Course →
 * Module → Lesson rows in prod that point at it.
 *
 * Run with:
 *   DB_URL=<prod-url> R2_ACCOUNT_ID=... R2_ACCESS_KEY_ID=... \
 *   R2_SECRET_ACCESS_KEY=... R2_BUCKET=... R2_PUBLIC_URL=... \
 *   npx tsx scripts/seed-classroom-detachment.ts
 *
 * Idempotent on re-run: re-uploads a fresh R2 object every time (cheap,
 * avoids stale-cache surprises) but re-uses the existing course/module/
 * lesson rows by slug instead of duplicating.
 */
import { readFileSync, statSync } from "fs";
import path from "path";
import crypto from "crypto";
import { PrismaClient } from "@prisma/client";
import {
  S3Client,
  PutObjectCommand,
  HeadObjectCommand,
} from "@aws-sdk/client-s3";

const VIDEO_PATH = "C:/Users/SDMat/Downloads/Timeline 1.mp4";

const COURSE = {
  slug: "the-consilium-course",
  title: "The Consilium Course",
  description: "The flagship course for Consilium members.",
  price: 0,
  tier: "standard",
};

const MODULE = {
  slug: "module-1",
  title: "Module 1",
  description: null as string | null,
};

const LESSON = {
  slug: "dating-with-detatchment",
  title: "Dating with Detatchment",
  description: null as string | null,
  durationSeconds: 229,
  isFree: false,
};

function requireEnv(name: string): string {
  const v = process.env[name];
  if (!v) {
    console.error(`Missing env var: ${name}`);
    process.exit(1);
  }
  return v;
}

async function main() {
  const dbUrl = requireEnv("DB_URL");
  const r2AccountId = requireEnv("R2_ACCOUNT_ID");
  const r2AccessKeyId = requireEnv("R2_ACCESS_KEY_ID");
  const r2SecretAccessKey = requireEnv("R2_SECRET_ACCESS_KEY");
  const r2Bucket = requireEnv("R2_BUCKET");
  const r2PublicUrl = requireEnv("R2_PUBLIC_URL");

  const stat = statSync(VIDEO_PATH);
  console.log(
    `Source: ${VIDEO_PATH}  (${(stat.size / (1024 * 1024)).toFixed(1)} MB)`,
  );

  const r2 = new S3Client({
    region: "auto",
    endpoint: `https://${r2AccountId}.r2.cloudflarestorage.com`,
    credentials: {
      accessKeyId: r2AccessKeyId,
      secretAccessKey: r2SecretAccessKey,
    },
  });

  const ext = path.extname(VIDEO_PATH).slice(1).toLowerCase() || "mp4";
  const key = `course-videos/cv-${Date.now()}-${crypto.randomBytes(6).toString("hex")}.${ext}`;
  const contentType = ext === "mp4" ? "video/mp4" : `video/${ext}`;

  console.log(`Uploading → r2://${r2Bucket}/${key}`);
  const body = readFileSync(VIDEO_PATH);
  await r2.send(
    new PutObjectCommand({
      Bucket: r2Bucket,
      Key: key,
      Body: body,
      ContentType: contentType,
      CacheControl: "public, max-age=31536000, immutable",
    }),
  );

  const head = await r2.send(
    new HeadObjectCommand({ Bucket: r2Bucket, Key: key }),
  );
  if (!head.ContentLength || head.ContentLength !== stat.size) {
    throw new Error(
      `R2 verify mismatch: expected ${stat.size}, got ${head.ContentLength}`,
    );
  }
  const publicUrl = `${r2PublicUrl.replace(/\/$/, "")}/${key}`;
  console.log(`Uploaded ${head.ContentLength} bytes → ${publicUrl}`);

  const prisma = new PrismaClient({ datasourceUrl: dbUrl });

  const course = await prisma.course.upsert({
    where: { slug: COURSE.slug },
    update: {},
    create: {
      slug: COURSE.slug,
      title: COURSE.title,
      description: COURSE.description,
      price: COURSE.price,
      tier: COURSE.tier,
      isActive: true,
      sortOrder: 0,
    },
  });
  console.log(`Course: ${course.title} (${course.id})`);

  const mod = await prisma.courseModule.upsert({
    where: {
      courseId_slug: { courseId: course.id, slug: MODULE.slug },
    },
    update: {},
    create: {
      courseId: course.id,
      slug: MODULE.slug,
      title: MODULE.title,
      description: MODULE.description,
      sortOrder: 0,
    },
  });
  console.log(`Module: ${mod.title} (${mod.id})`);

  const lesson = await prisma.courseLesson.upsert({
    where: {
      moduleId_slug: { moduleId: mod.id, slug: LESSON.slug },
    },
    update: {
      videoUrl: publicUrl,
      duration: LESSON.durationSeconds,
    },
    create: {
      moduleId: mod.id,
      slug: LESSON.slug,
      title: LESSON.title,
      description: LESSON.description,
      videoUrl: publicUrl,
      duration: LESSON.durationSeconds,
      isFree: LESSON.isFree,
      sortOrder: 0,
    },
  });
  console.log(`Lesson: ${lesson.title} (${lesson.id})`);
  console.log(`  videoUrl: ${lesson.videoUrl}`);

  await prisma.$disconnect();
  console.log("\nDone.");
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
