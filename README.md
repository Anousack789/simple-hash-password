# simple-hash-password

[![npm version](https://img.shields.io/npm/v/simple-hash-password.svg)](https://www.npmjs.com/package/simple-hash-password)
[![license](https://img.shields.io/npm/l/simple-hash-password.svg)](https://www.npmjs.com/package/simple-hash-password)

A simple TypeScript library for hashing passwords, verifying hashed passwords, and generating random passwords. This package leverages the Web Crypto API to provide secure password hashing.

## Features

- Hash passwords using various algorithms (SHA-1, SHA-256, SHA-384, SHA-512).
- Verify hashed passwords.
- Generate secure random passwords.

## Installation

You can install the package via npm:

```bash
npm install simple-hash-password
```

## Usage

```bash
import { hash, verify, generatePassword } from "simple-hash-password";

const password = "yourSecurePassword123";
const hashedPassword = await hash(password, 
    { algorithm: "SHA-256" } // (optional)
);
console.log(`Hashed Password: ${hashedPassword}`);

const isValid = await verify(password, hashedPassword,
    { algorithm: "SHA-256" } // (optional)
);
console.log(`Password is valid: ${isValid}`);

const newPassword = generatePassword({ length: 18 }); // Length is optional but if you need to set it should be a multiple of 3
console.log(`Generated Password: ${newPassword}`);

```

## Browsers that support the Web Crypto API (crypto.subtle):

# Desktop Browsers:

	•	Google Chrome: Supported from version 37.
	•	Mozilla Firefox: Supported from version 34.
	•	Microsoft Edge: Supported from version 12.
	•	Safari: Supported from version 7.1.
	•	Opera: Supported from version 24.

# Mobile Browsers:

	•	Chrome for Android: Supported from version 37.
	•	Firefox for Android: Supported from version 34.
	•	Safari on iOS: Supported from version 8.
	•	Samsung Internet: Supported from version 4.0.
	•	Opera for Android: Supported from version 24.

# Not Supported (or with Partial Support):

	•	Internet Explorer: Only partial support in version 11 (supports crypto but not crypto.subtle).
