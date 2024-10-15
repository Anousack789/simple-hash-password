import { hash, verify, generatePassword, HashAlgorithm } from "../index";
describe("simple hash password function", () => {
  it("should be success", async () => {
    const testPassword = "12345678";
    const hashedPassword = await hash(testPassword);
    const verifyResult = await verify(testPassword, hashedPassword);
    expect(verifyResult).toBe(true);
  });
  it("should be failed", async () => {
    const testPassword = "12345678";
    const hashedPassword = await hash(testPassword);
    const verifyResult = await verify("123456789", hashedPassword);
    expect(verifyResult).toBe(false);
  });

  it("should be error", async () => {
    const testPassword = "12345678";
    try {
      await hash(testPassword, { algorithm: "MD5" as HashAlgorithm });
    } catch (e: any) {
      expect(e).toBeInstanceOf(Error);
      expect(e.message).toBe("Unsupported hashing algorithm.");
    }
  });
});

describe("generate password", () => {
  it("should be success", async () => {
    const password18 = generatePassword();
    const password21 = generatePassword({ length: 21 });
    expect(password18).toHaveLength(18);
    expect(password21).toHaveLength(21);
  });
  it("should be failed", async () => {
    try {
      generatePassword({ length: 16 });
    } catch (e: any) {
      expect(e).toBeInstanceOf(Error);
      expect(e.message).toBe("Length of password should be a multiple of 3.");
    }
  });
});
