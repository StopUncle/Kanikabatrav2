import { PrismaClient } from "@prisma/client";

const url = process.env.DB_URL;
if (!url) {
  console.error("Set DB_URL env var (we use DB_URL not DATABASE_URL to bypass .env override).");
  process.exit(1);
}
const prisma = new PrismaClient({ datasourceUrl: url });

async function main() {
  const courses = await prisma.course.findMany({
    orderBy: { sortOrder: "asc" },
    include: {
      modules: {
        orderBy: { sortOrder: "asc" },
        include: { _count: { select: { lessons: true } } },
      },
      _count: { select: { enrollments: true } },
    },
  });

  console.log(`Found ${courses.length} course(s) in prod:\n`);
  for (const c of courses) {
    console.log(
      `[${c.tier.toUpperCase()}] ${c.title}  (slug=${c.slug}, active=${c.isActive}, enrollments=${c._count.enrollments})`,
    );
    if (c.modules.length === 0) {
      console.log("    (no modules)");
    } else {
      for (const m of c.modules) {
        console.log(`  - ${m.title}  (slug=${m.slug}, lessons=${m._count.lessons})`);
      }
    }
    console.log();
  }
}

main()
  .then(() => prisma.$disconnect())
  .catch((e) => {
    console.error(e);
    return prisma.$disconnect().then(() => process.exit(1));
  });
