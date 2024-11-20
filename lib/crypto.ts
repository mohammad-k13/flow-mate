// "use server"

// import {createCipher} from 'crypto';

// const encryptToken = (token: string) => {
//   const cipher = crypto.createCipher('aes-256-cbc', process.env.ENCRYPTION_KEY);
//   let encrypted = cipher.update(token, 'utf8', 'hex');
//   encrypted += cipher.final('hex');
//   return encrypted;
// }

// const decryptToken = (encryptedToken: string) => {
//   const decipher = crypto.createDecipher('aes-256-cbc', process.env.ENCRYPTION_KEY);
//   let decrypted = decipher.update(encryptedToken, 'hex', 'utf8');
//   decrypted += decipher.final('utf8');
//   return decrypted;
// }
