import crypto from "crypto";

type ObjectValues<T> = T[keyof T];

export const ALGORITHM = {
  sha1: "SHA-1",
  sha256: "SHA-256",
  sha384: "SHA-384",
  sha512: "SHA-512",
} as const;

export type HashAlgorithm = ObjectValues<typeof ALGORITHM>;

/**
 * This TypeScript function hashes a given password using a specified algorithm and returns the hashed
 * value as a hexadecimal string.
 * @param {string} password - The `hash` function you provided is an asynchronous function that takes
 * in a password string and an optional object with an algorithm property. The function then hashes the
 * password using the specified algorithm and returns the hashed value as a hexadecimal string.
 * @param  - The `hash` function takes in a `password` string and an optional object with a
 * `HashAlgorithm` property. The `HashAlgorithm` type is defined elsewhere in your code as an enum or a
 * set of constants named `ALGORITHM`.
 * @returns The `hash` function returns a hashed representation of the input `password` using the
 * specified hashing `algorithm`. The hashed password is returned as a hexadecimal string.
 */
export async function hash(
  password: string,
  { algorithm = "SHA-256" }: { algorithm?: HashAlgorithm } = {}
) {
  if (!Object.values(ALGORITHM).includes(algorithm)) {
    throw new Error("Unsupported hashing algorithm.");
  }
  const encoder = new TextEncoder();
  const data = encoder.encode(password);
  const hash = await crypto.subtle.digest(algorithm, data);
  return Array.from(new Uint8Array(hash))
    .map((b) => b.toString(16).padStart(2, "0"))
    .join("");
}


/**
 * The function `verify` compares a password with a hashed password using a specified hashing algorithm
 * in TypeScript.
 * @param {string} password - A string representing the password that needs to be verified.
 * @param {string} hashedPassword - The `hashedPassword` parameter is a string representing the hashed
 * version of the original password. In the `verify` function, this parameter is compared with the
 * hashed version of the password passed to the function to determine if they match, indicating whether
 * the password is correct.
 * @param  - The `verify` function takes in three parameters:
 * @returns a boolean value indicating whether the hashed password matches the hashed value of the
 * input password.
 */
export async function verify(
  password: string,
  hashedPassword: string,
  { algorithm = "SHA-256" }: { algorithm?: HashAlgorithm } = {}
) {
  const hashed = await hash(password, { algorithm });
  return hashed === hashedPassword;
}

/**
 * The function generates a random password of a specified length, which must be a multiple of 3.
 * @param  - The `generatePassword` function takes an optional object parameter with a `length`
 * property that specifies the length of the password to generate. If the `length` is not provided, it
 * defaults to 18. The function ensures that the length of the password is a multiple of 3 by throwing
 * an
 * @returns The function `generatePassword` returns a randomly generated password of the specified
 * length, which is a multiple of 3.
 */

export function generatePassword({
  length = 18,
}: { length?: number } = {}): string {
  if (length % 3 !== 0) {
    throw new Error("Length of password should be a multiple of 3.");
  }
  const password = crypto.randomBytes(length).toString("hex").slice(0, length);;
  return password;
}
