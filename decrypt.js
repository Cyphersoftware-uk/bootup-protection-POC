const fs = require('fs');
const crypto = require('crypto');

// Define constants
const ENCRYPTED_JSON_PATH = './encrypted.json';
const ALGORITHM = 'aes-256-cbc'; 
const IV_LENGTH = 16;

function loadEncryptedJson(key) {
    try {
        if (key.length !== 32) {
            throw new Error('Invalid key length. Key must be 32 characters.');
        }

        const encryptedData = fs.readFileSync(ENCRYPTED_JSON_PATH);

        const iv = encryptedData.slice(0, IV_LENGTH);
        const encryptedContent = encryptedData.slice(IV_LENGTH);

        const decipher = crypto.createDecipheriv(ALGORITHM, Buffer.from(key), iv);

        let decrypted = decipher.update(encryptedContent);
        decrypted = Buffer.concat([decrypted, decipher.final()]);

        return JSON.parse(decrypted.toString());
    } catch (error) {
        console.error('Error decrypting JSON:', error.message);
        process.exit(1);
    }
}

function main() {
    const key = process.argv[2];

    if (!key) {
        console.error('Usage: node app.js <encryption-key>');
        process.exit(1);
    }

    console.log('Decrypting JSON...');
    const jsonData = loadEncryptedJson(key);
    console.log('Decrypted JSON contents:', JSON.stringify(jsonData, null, 2));
}

main();
