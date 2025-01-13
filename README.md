# Encrypted JSON Decryption Script

This Node.js script decrypts an encrypted JSON file using a provided encryption key. If the key is correct, the script will display the decrypted JSON contents in the console. If the key is incorrect, the script exits with an error message.

## Features
- Accepts the encryption key directly as a command-line argument.
- Decrypts a `.json` file encrypted using the AES-256-CBC algorithm.
- Prints the decrypted JSON content to the console.
- Exits with an error if decryption fails.

## Prerequisites
- **Node.js**: Ensure that Node.js is installed on your system.
- **Encrypted JSON File**: Prepare a `.json` file encrypted with AES-256-CBC.

## Usage

### 1. Clone or Download the Repository
Download the script to your local machine.

### 2. Setup
Ensure the following files are in the same directory:

- **`encrypted.json`**: The encrypted JSON file you want to decrypt.

### 3. Run the Script
Run the script with the encryption key as a command-line argument:

```bash
node app.js "your-32-character-encryption-key"
```

### Example
If your encryption key is `abcdefghijklmnopqrstuvwxy1234567` and you have an `encrypted.json` file, run:

```bash
node app.js "abcdefghijklmnopqrstuvwxy1234567"
```

#### Output (if the key is correct):
```plaintext
Decrypting JSON...
Decrypted JSON contents: {
  "key1": "value1",
  "key2": "value2"
}
```

#### Output (if the key is incorrect):
```plaintext
Error decrypting JSON: Incorrect key or invalid encrypted file.
```

## Script Overview

### Constants
- **`ENCRYPTED_JSON_PATH`**: Path to the encrypted `.json` file.
- **`ALGORITHM`**: Encryption algorithm used (`aes-256-cbc`).
- **`IV_LENGTH`**: Length of the initialization vector (16 bytes).

### Functions

#### `loadEncryptedJson(key)`
- **Input**: A 32-character encryption key.
- **Process**:
  1. Reads the `encrypted.json` file.
  2. Extracts the IV and encrypted content.
  3. Decrypts the content using the key and IV.
  4. Parses and returns the JSON object.
- **Error Handling**: Exits if the key is invalid or the decryption fails.

#### `main()`
- Fetches the encryption key from the command-line arguments.
- Calls `loadEncryptedJson` to decrypt and print the JSON contents.

## Notes
- Ensure the encryption key is exactly 32 characters long.
- The key is passed as a command-line argument. Avoid exposing it to logs or other processes for security reasons.
- To encrypt a JSON file, use a script that implements AES-256-CBC encryption and matches the decryption setup.

## Security Considerations
- Passing encryption keys via command-line arguments can expose them in process lists (e.g., `ps` command on Unix-like systems). Consider using secure key-passing mechanisms for production systems.

## License
This script is provided "as is" without warranty. Use it at your own risk.
