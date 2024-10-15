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
 * The hash function in TypeScript asynchronously generates a hash value for a given password using a
 * specified algorithm and salt.
 * @param {string} password - The `hash` function you provided is used to hash a password using a
 * specified algorithm and salt. The parameters for the function are as follows:
 * @param  - The `hash` function takes in a password as a string and an optional configuration object
 * with two properties: `algorithm` and `salt`. The `algorithm` property specifies the hashing
 * algorithm to be used, defaulting to "SHA-256" if not provided. The `salt` property is a
 * @returns The `hash` function returns a hashed password string in the format `:`,
 * where:
 * - `salt` is a randomly generated string used for salting the password before hashing
 * - `hashValue` is the result of hashing the concatenated password and salt using the specified
 * algorithm
 */
export async function hash(
  password: string,
  {
    algorithm = "SHA-256",
    salt = generatePassword(),
  }: { algorithm?: HashAlgorithm; salt?: string } = {}
) {
  if (!Object.values(ALGORITHM).includes(algorithm)) {
    throw new Error("Unsupported hashing algorithm.");
  }
  const encoder = new TextEncoder();
  const data = encoder.encode(password + salt);
  const hash = await crypto.subtle.digest(algorithm, data);
  return `${salt}:${Array.from(new Uint8Array(hash))
    .map((b) => b.toString(16).padStart(2, "0"))
    .join("")}`;
}


/**
 * The function `verify` compares a password with a hashed password using a specified algorithm to
 * check for a match.
 * @param {string} password - The `password` parameter is a string representing the user's input
 * password that needs to be verified against the hashed password.
 * @param {string} hashedPassword - The `hashedPassword` parameter is a string that contains both the
 * salt and the hashed password separated by a colon (':').
 * @param  - The `verify` function takes in three parameters:
 * @returns The `verify` function is returning a boolean value indicating whether the hashed password
 * generated from the input password matches the stored hashed password.
 */
export async function verify(
  password: string,
  hashedPassword: string,
  { algorithm = "SHA-256" }: { algorithm?: HashAlgorithm } = {}
) {
  const [salt, hashStr] = hashedPassword.split(":");
  const hashed = await hash(password, { algorithm, salt });
  return hashed === `${salt}:${hashStr}`;
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
  const password = crypto.randomBytes(length).toString("hex").slice(0, length);
  return password;
}
