const fs = require('fs');
const crypto = require('crypto');

const ALGORITHM = 'aes-256-cbc';
const IV_LENGTH = 16;
const ENCRYPTED_JSON_PATH = './encrypted.json';



function encryptJson(jsonFilePath, keyFilePath) {
    try {
        const jsonData = fs.readFileSync(jsonFilePath, 'utf-8');
        const key = fs.readFileSync(keyFilePath, 'utf-8').trim();

        if (key.length !== 32) {
            throw new Error('Invalid key length. Key must be 32 characters.');
        }

        const iv = crypto.randomBytes(IV_LENGTH);
        const cipher = crypto.createCipheriv(ALGORITHM, Buffer.from(key), iv);

        let encrypted = cipher.update(jsonData);
        encrypted = Buffer.concat([encrypted, cipher.final()]);

        const encryptedData = Buffer.concat([iv, encrypted]);
        fs.writeFileSync(ENCRYPTED_JSON_PATH, encryptedData);

        console.log('JSON encrypted successfully:', ENCRYPTED_JSON_PATH);
    } catch (error) {
        console.error('Error encrypting JSON:', error.message);
    }
}

encryptJson('./data.json', './key.txt');
