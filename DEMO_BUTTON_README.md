# Demo Button - Testing Payment Flow

This demo button allows you to test the complete payment → success page → download flow without going through PayPal.

## How to Enable

1. **Create the dev-mode file** (if it doesn't exist):
   ```bash
   # Create lib/dev-mode.ts
   echo "export const DEV_MODE = true" > lib/dev-mode.ts
   ```

   This file is **gitignored** so it will never be committed.

2. **Copy the demo button code** from `DEMO_BUTTON_ARCHIVE.txt`

3. **Paste it into** `components/BookShowcase.tsx` after the "Buy Now" button (around line 269)

4. **Restart your dev server** - You'll see a green button "🎬 DEMO: Test Success Page"

## What It Does

- Creates a **real purchase record** in the database
- Generates a **valid 30-day download token**
- Redirects to success page with working download button
- Actually downloads the book when clicked

## How to Disable

Simply remove the button code from `BookShowcase.tsx`. It will never appear in production because:
- The `DEV_MODE` check prevents it from rendering when `lib/dev-mode.ts` doesn't exist
- `lib/dev-mode.ts` is gitignored and won't deploy to Railway

## Notes

- Demo purchases will show in your database with email "demo@test.com"
- You can use the Admin Command Center to view/manage these test purchases
- The download link generated is fully functional and will actually download the book
