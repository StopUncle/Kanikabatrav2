import { S3Client, PutObjectCommand, DeleteObjectCommand } from "@aws-sdk/client-s3";

/**
 * Cloudflare R2 storage client.
 *
 * R2 is S3-compatible, so we use the AWS S3 SDK pointed at Cloudflare's
 * endpoint. R2 has no egress fees, which matters a lot for voice notes
 * (members stream them repeatedly). If you ever want to swap to S3, R2,
 * B2, or MinIO, nothing here needs to change except the endpoint.
 *
 * Previously voice notes were written to `public/uploads/voice-notes/` on
 * the Railway container's disk — which gets wiped on every redeploy. Every
 * upload was lost the next time anything deployed.
 *
 * ENV VARS REQUIRED (set on Railway service variables):
 *   R2_ACCOUNT_ID        — Cloudflare account id (Dashboard → R2 → Overview)
 *   R2_ACCESS_KEY_ID     — R2 API token's access key
 *   R2_SECRET_ACCESS_KEY — R2 API token's secret key
 *   R2_BUCKET            — bucket name (e.g. "kanika-media")
 *   R2_PUBLIC_URL        — public dev.r2 URL or custom CDN domain
 *                          (e.g. https://pub-xxx.r2.dev or https://media.kanikarose.com)
 *
 * SETUP CHECKLIST:
 *   1. Cloudflare Dashboard → R2 → Create bucket → "kanika-media"
 *   2. R2 → Manage R2 API tokens → Create API token:
 *        - Permissions: Object Read & Write
 *        - Specify bucket: kanika-media
 *      Save the Access Key ID + Secret Access Key immediately (shown once).
 *   3. R2 → your bucket → Settings → Public Access → Allow Access → copy the
 *      `pub-*.r2.dev` URL into R2_PUBLIC_URL. Or attach a custom domain.
 *   4. Set the 5 env vars above on Railway.
 */

let cachedClient: S3Client | null = null;

function getR2Config() {
  const accountId = process.env.R2_ACCOUNT_ID;
  const accessKeyId = process.env.R2_ACCESS_KEY_ID;
  const secretAccessKey = process.env.R2_SECRET_ACCESS_KEY;
  const bucket = process.env.R2_BUCKET;
  const publicUrl = process.env.R2_PUBLIC_URL;

  if (!accountId || !accessKeyId || !secretAccessKey || !bucket || !publicUrl) {
    return null;
  }

  return { accountId, accessKeyId, secretAccessKey, bucket, publicUrl };
}

export function isR2Configured(): boolean {
  return getR2Config() !== null;
}

function getClient(): S3Client {
  if (cachedClient) return cachedClient;

  const config = getR2Config();
  if (!config) {
    throw new Error(
      "R2 is not configured. Set R2_ACCOUNT_ID, R2_ACCESS_KEY_ID, " +
        "R2_SECRET_ACCESS_KEY, R2_BUCKET, and R2_PUBLIC_URL.",
    );
  }

  cachedClient = new S3Client({
    region: "auto",
    endpoint: `https://${config.accountId}.r2.cloudflarestorage.com`,
    credentials: {
      accessKeyId: config.accessKeyId,
      secretAccessKey: config.secretAccessKey,
    },
  });

  return cachedClient;
}

export interface UploadResult {
  /** Public URL where the object can be fetched */
  url: string;
  /** Storage key inside the bucket (use this to delete later) */
  key: string;
}

/**
 * Upload a buffer to R2 and return the public URL + storage key.
 * The caller is responsible for validating file type/size — this function
 * trusts what it's given.
 */
export async function uploadToR2(
  key: string,
  body: Buffer,
  contentType: string,
): Promise<UploadResult> {
  const config = getR2Config();
  if (!config) {
    throw new Error("R2 is not configured");
  }

  const client = getClient();

  await client.send(
    new PutObjectCommand({
      Bucket: config.bucket,
      Key: key,
      Body: body,
      ContentType: contentType,
      // Cloudflare R2 respects these headers for public-bucket delivery.
      CacheControl: "public, max-age=31536000, immutable",
    }),
  );

  // Build the public URL. Strip trailing slash from R2_PUBLIC_URL to avoid
  // accidental double-slashes.
  const base = config.publicUrl.replace(/\/$/, "");
  return {
    url: `${base}/${key}`,
    key,
  };
}

/**
 * Delete an object from R2. Used for cleanup when a voice note is removed
 * from the feed.
 */
export async function deleteFromR2(key: string): Promise<void> {
  const config = getR2Config();
  if (!config) {
    throw new Error("R2 is not configured");
  }

  const client = getClient();
  await client.send(
    new DeleteObjectCommand({
      Bucket: config.bucket,
      Key: key,
    }),
  );
}
