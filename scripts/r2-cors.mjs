/**
 * R2 bucket CORS management for kanika-media.
 *
 * Run with prod env vars:
 *   $(railway variables --kv | grep ^R2_ | xargs -d '\n' -I {} echo {}) node scripts/r2-cors.mjs <check|apply>
 *
 * Default targets the kanika-media bucket. PUT/GET/HEAD are allowed from
 * kanikarose.com + localhost:3000 + the Railway preview URL so admin
 * video uploads and dev-server uploads both work.
 */
import {
  S3Client,
  GetBucketCorsCommand,
  PutBucketCorsCommand,
} from "@aws-sdk/client-s3";

const REQUIRED = ["R2_ACCOUNT_ID", "R2_ACCESS_KEY_ID", "R2_SECRET_ACCESS_KEY", "R2_BUCKET"];
for (const k of REQUIRED) {
  if (!process.env[k]) {
    console.error(`Missing env var: ${k}`);
    process.exit(1);
  }
}

const client = new S3Client({
  region: "auto",
  endpoint: `https://${process.env.R2_ACCOUNT_ID}.r2.cloudflarestorage.com`,
  credentials: {
    accessKeyId: process.env.R2_ACCESS_KEY_ID,
    secretAccessKey: process.env.R2_SECRET_ACCESS_KEY,
  },
});

const POLICY = {
  Bucket: process.env.R2_BUCKET,
  CORSConfiguration: {
    CORSRules: [
      {
        AllowedOrigins: [
          "https://kanikarose.com",
          "https://www.kanikarose.com",
          "http://localhost:3000",
        ],
        AllowedMethods: ["GET", "HEAD", "PUT"],
        AllowedHeaders: ["*"],
        ExposeHeaders: ["ETag"],
        MaxAgeSeconds: 3600,
      },
    ],
  },
};

const action = process.argv[2] ?? "check";

async function main() {
  if (action === "check") {
    try {
      const res = await client.send(
        new GetBucketCorsCommand({ Bucket: process.env.R2_BUCKET }),
      );
      console.log("Current CORS rules:");
      console.log(JSON.stringify(res.CORSRules, null, 2));
    } catch (err) {
      console.log(`No CORS configured (or error): ${err.name} ${err.message}`);
    }
  } else if (action === "apply") {
    await client.send(new PutBucketCorsCommand(POLICY));
    console.log("CORS applied. New rules:");
    console.log(JSON.stringify(POLICY.CORSConfiguration.CORSRules, null, 2));
  } else {
    console.error(`Unknown action: ${action}. Use 'check' or 'apply'.`);
    process.exit(1);
  }
}

main().catch((err) => {
  console.error("Failed:", err);
  process.exit(1);
});
