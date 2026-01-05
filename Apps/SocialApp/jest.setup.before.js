// Jest setup that runs BEFORE module transformation
// Polyfills for Expo SDK 54+ compatibility

// structuredClone polyfill (required by expo's winter runtime)
if (typeof global.structuredClone === 'undefined') {
  global.structuredClone = (obj) => JSON.parse(JSON.stringify(obj));
}

// Mock import.meta for ESM compatibility
if (typeof global.import === 'undefined') {
  global.import = { meta: { url: 'file:///test/' } };
}
