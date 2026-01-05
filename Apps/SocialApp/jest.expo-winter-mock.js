// Mock for Expo SDK 54 "winter" runtime modules
// These modules cause issues with Jest due to dynamic imports

module.exports = {
  // runtime.native.ts exports
  __esModule: true,
  default: {},

  // installGlobal.ts exports
  installGlobal: () => {},
  getValue: () => ({}),
};
