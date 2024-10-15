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
const hashedPassword = await hash(password, { algorithm: "SHA-256" });
console.log(`Hashed Password: ${hashedPassword}`);

const isValid = await verify(password, hashedPassword, { algorithm: "SHA-256" });
console.log(`Password is valid: ${isValid}`);

const newPassword = generatePassword({ length: 18 }); // Length should be a multiple of 3
console.log(`Generated Password: ${newPassword}`);

```