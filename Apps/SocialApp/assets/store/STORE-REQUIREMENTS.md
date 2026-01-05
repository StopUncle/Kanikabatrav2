# App Store Assets Requirements

## iOS App Store

### Required Screenshots

**6.5-inch (iPhone 14 Plus, 15 Plus)** - `ios-screenshots/6.5-inch/`
- Resolution: 1290 x 2796 pixels
- Quantity: 5-10 screenshots
- File format: PNG or JPEG

**5.5-inch (iPhone 8 Plus)** - `ios-screenshots/5.5-inch/`
- Resolution: 1242 x 2208 pixels
- Quantity: 5-10 screenshots
- File format: PNG or JPEG

### Recommended Screens to Capture

1. Welcome/onboarding screen
2. Main dashboard with courses
3. Simulator chat interface
4. Academy/gamification progress
5. AI Advisor (Pocket Kanika) chat
6. Quiz/assessment screen
7. Coaching booking interface
8. Profile/subscription screen

### Other Requirements

- **Privacy Policy URL**: Public webpage (not in-app)
- **Support URL**: Public contact page
- **App Preview Video**: Optional but recommended (15-30 seconds)
- **Age Rating**: Complete questionnaire (likely 17+ for psychological content)
- **App Description**: 170 characters for subtitle, 4000 characters for full description

---

## Google Play Store

### Required Screenshots

**Phone Screenshots** - `android-screenshots/`
- Minimum resolution: 320 x 320 pixels
- Maximum resolution: 3840 x 3840 pixels
- Recommended: 1080 x 1920 (9:16 aspect ratio)
- Quantity: 2-8 screenshots
- File format: PNG or JPEG

### Feature Graphic

- **Filename**: `feature-graphic.png`
- **Resolution**: 1024 x 500 pixels exactly
- Used in Google Play store header

### Other Requirements

- **Privacy Policy URL**: Public webpage
- **Content Rating**: Complete IARC questionnaire
- **Target API Level**: API 34 (Android 14)

---

## How to Generate Screenshots

### Option 1: Expo Go + Device Screenshots
```bash
npx expo start
```
Then take screenshots on your device/simulator.

### Option 2: EAS Build Preview
```bash
eas build --profile preview --platform ios
eas build --profile preview --platform android
```
Install on device and capture screenshots.

### Tips for Better Screenshots

1. Use realistic sample data in the app
2. Capture during "demo mode" to show full features
3. Consider adding device frames around screenshots
4. Ensure consistent visual style across all screenshots
5. Highlight key features with callout text overlays

---

## Checklist

### iOS
- [ ] 5+ screenshots at 6.5-inch resolution
- [ ] 5+ screenshots at 5.5-inch resolution
- [ ] Privacy policy URL
- [ ] Support URL
- [ ] App subtitle (170 chars)
- [ ] Full description (4000 chars)
- [ ] Keywords
- [ ] App icon (1024x1024)
- [ ] Age rating questionnaire completed

### Android
- [ ] 2-8 phone screenshots
- [ ] Feature graphic (1024x500)
- [ ] Privacy policy URL
- [ ] Content rating questionnaire
- [ ] Short description (80 chars)
- [ ] Full description (4000 chars)
- [ ] App icon (512x512)
