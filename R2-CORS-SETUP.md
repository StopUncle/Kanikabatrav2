# R2 Bucket CORS — required for direct-to-R2 video uploads

## Why

Railway's edge proxy rejects large request bodies (observed 502 at
169 MB) before they reach the Next.js handler. The admin video upload
now bypasses Railway entirely: the browser PUTs the file straight to
Cloudflare R2 via a presigned URL.

For that to work, the `kanika-media` bucket must allow `PUT` from the
site origin. Without CORS, the browser blocks the PUT before it leaves
the user's machine.

## Apply once (Cloudflare Dashboard)

1. Cloudflare Dashboard → R2 → `kanika-media` → Settings → **CORS
   Policy** → Edit.
2. Paste this JSON and save:

```json
[
  {
    "AllowedOrigins": [
      "https://kanikarose.com",
      "https://www.kanikarose.com",
      "http://localhost:3000"
    ],
    "AllowedMethods": ["GET", "HEAD", "PUT"],
    "AllowedHeaders": ["*"],
    "ExposeHeaders": ["ETag"],
    "MaxAgeSeconds": 3600
  }
]
```

Propagation is near-instant. Test by uploading a small video in the
admin panel; the browser's Network tab should show a `PUT` to a
`*.r2.cloudflarestorage.com` URL returning `200`.

## Apply programmatically (optional)

`scripts/r2-cors.mjs` can `check` or `apply` the same policy via the
S3 API. This needs an **Admin Read & Write** R2 API token — the
standard "Object Read & Write" token used by the app does not have
permission to modify bucket CORS. Create a one-off admin token, run
the script, then revoke the token.

```bash
# Check current CORS (works with the existing app token)
R2_ACCOUNT_ID=... R2_ACCESS_KEY_ID=... R2_SECRET_ACCESS_KEY=... R2_BUCKET=kanika-media \
  node scripts/r2-cors.mjs check

# Apply (needs Admin R&W token, not the object-only app token)
node scripts/r2-cors.mjs apply
```

## What breaks if CORS is not set

- Presigned-PUT uploads from the admin panel return a CORS error in
  the browser console. The XHR will not complete. The video post is
  never created.
- GET requests to the public R2 URL still work (they go through the
  `pub-*.r2.dev` host, which is a separate read-only CDN and has its
  own permissive defaults for public buckets).
