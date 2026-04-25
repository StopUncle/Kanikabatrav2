/**
 * @jest-environment node
 */
describe("getAnthropic", () => {
  const originalEnv = process.env.ANTHROPIC_API_KEY;
  beforeEach(() => {
    delete process.env.ANTHROPIC_API_KEY;
    jest.resetModules();
  });
  afterAll(() => {
    process.env.ANTHROPIC_API_KEY = originalEnv;
  });

  it("throws when ANTHROPIC_API_KEY is missing", () => {
    const { getAnthropic } = require("@/lib/anthropic");
    expect(() => getAnthropic()).toThrow(/ANTHROPIC_API_KEY/);
  });

  it("returns the same instance on subsequent calls", () => {
    process.env.ANTHROPIC_API_KEY = "sk-test";
    const { getAnthropic } = require("@/lib/anthropic");
    const a = getAnthropic();
    const b = getAnthropic();
    expect(a).toBe(b);
  });
});
