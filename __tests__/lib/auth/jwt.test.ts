import jwt from "jsonwebtoken";
import {
  generateAccessToken,
  generateRefreshToken,
  generateTokenPair,
  verifyAccessToken,
  verifyRefreshToken,
} from "@/lib/auth/jwt";

describe("JWT Utilities", () => {
  const testPayload = { userId: "user-123", email: "test@example.com" };

  describe("generateAccessToken", () => {
    it("generates a valid JWT", () => {
      const token = generateAccessToken(testPayload);

      expect(token).toBeTruthy();
      expect(token.split(".")).toHaveLength(3);
    });

    it("includes payload in token", () => {
      const token = generateAccessToken(testPayload);
      const payload = verifyAccessToken(token);

      expect(payload.userId).toBe(testPayload.userId);
      expect(payload.email).toBe(testPayload.email);
    });
  });

  describe("generateRefreshToken", () => {
    it("generates a valid JWT", () => {
      const token = generateRefreshToken(testPayload);

      expect(token).toBeTruthy();
      expect(token.split(".")).toHaveLength(3);
    });

    it("is different from access token", () => {
      const accessToken = generateAccessToken(testPayload);
      const refreshToken = generateRefreshToken(testPayload);

      expect(accessToken).not.toBe(refreshToken);
    });
  });

  describe("generateTokenPair", () => {
    it("returns both access and refresh tokens", () => {
      const tokens = generateTokenPair(testPayload);

      expect(tokens.accessToken).toBeTruthy();
      expect(tokens.refreshToken).toBeTruthy();
      expect(tokens.accessToken).not.toBe(tokens.refreshToken);
    });
  });

  describe("verifyAccessToken", () => {
    it("verifies a valid access token", () => {
      const token = generateAccessToken(testPayload);
      const payload = verifyAccessToken(token);

      expect(payload.userId).toBe(testPayload.userId);
      expect(payload.email).toBe(testPayload.email);
    });

    it("throws for invalid token", () => {
      expect(() => verifyAccessToken("invalid-token")).toThrow(
        "Invalid access token",
      );
    });

    it("throws for refresh token used as access token", () => {
      const refreshToken = generateRefreshToken(testPayload);

      expect(() => verifyAccessToken(refreshToken)).toThrow(
        "Invalid access token",
      );
    });

    it("throws for empty token", () => {
      expect(() => verifyAccessToken("")).toThrow("Invalid access token");
    });
  });

  describe("verifyRefreshToken", () => {
    it("verifies a valid refresh token", () => {
      const token = generateRefreshToken(testPayload);
      const payload = verifyRefreshToken(token);

      expect(payload.userId).toBe(testPayload.userId);
      expect(payload.email).toBe(testPayload.email);
    });

    it("throws for invalid token", () => {
      expect(() => verifyRefreshToken("invalid-token")).toThrow(
        "Invalid refresh token",
      );
    });

    it("throws for access token used as refresh token", () => {
      const accessToken = generateAccessToken(testPayload);

      expect(() => verifyRefreshToken(accessToken)).toThrow(
        "Invalid refresh token",
      );
    });
  });

  describe("token claims", () => {
    it("includes exp and iat claims", () => {
      const token = generateAccessToken(testPayload);
      const payload = verifyAccessToken(token);

      expect(payload.exp).toBeDefined();
      expect(payload.iat).toBeDefined();
    });
  });

  /**
   * The password-reset token is signed with the same JWT_SECRET as an
   * access token (app/api/auth/forgot-password/route.ts). Before the
   * verifiers refused a `type` claim, pasting the token out of a reset
   * email into an accessToken cookie authenticated you as that user for
   * the token's full hour. These tests exist so nobody removes the check.
   */
  describe("non-session tokens are refused", () => {
    const secret =
      process.env.JWT_SECRET || "dev-only-secret-do-not-use-in-production";
    const refreshSecret =
      process.env.JWT_REFRESH_SECRET ||
      "dev-only-refresh-secret-do-not-use-in-production";

    it("rejects a password-reset token as an access token", () => {
      const resetToken = jwt.sign(
        { userId: "user-123", type: "password-reset", v: 0 },
        secret,
        { expiresIn: "1h" },
      );

      expect(() => verifyAccessToken(resetToken)).toThrow();
    });

    it("rejects any token carrying a type claim as a refresh token", () => {
      const typed = jwt.sign(
        { userId: "user-123", type: "password-reset", v: 0 },
        refreshSecret,
        { expiresIn: "1h" },
      );

      expect(() => verifyRefreshToken(typed)).toThrow();
    });

    it("still accepts a real session token", () => {
      const payload = verifyAccessToken(generateAccessToken(testPayload));

      expect(payload.userId).toBe("user-123");
    });

    it("still accepts a legacy token signed before tokenVersion existed", () => {
      // No `v`, no `type`. These were live when the check landed and must
      // not be invalidated by it: the fix logs nobody out.
      const legacy = jwt.sign(
        { userId: "legacy-user", email: "legacy@example.com" },
        secret,
        { expiresIn: "15m" },
      );

      expect(verifyAccessToken(legacy).userId).toBe("legacy-user");
    });
  });
});
