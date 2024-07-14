import CryptoJS from 'crypto-js';
import JSEncrypt from 'jsencrypt';
import forge from 'node-forge';



export const encryptTextMessage = (publicKey: string, message: string): string => {
    const rsa = forge.pki.publicKeyFromPem(publicKey);
    const encrypted = rsa.encrypt(message, 'RSA-OAEP');
    return forge.util.encode64(encrypted);
  };
  
  export const decryptSharedKey = (privateKey: string, encryptedMessage: string): string => {
    const rsa = forge.pki.privateKeyFromPem(privateKey);
    const decoded = forge.util.decode64(encryptedMessage);
    console.log("*******", decoded);
    
    const decrypted = rsa.decrypt(decoded, 'RSA-OAEP');
    return decrypted;
  };
// export const decryptSharedKey = (sharedKey: string, encryptedMessage: string): string => {
//     const key = CryptoJS.enc.Base64.parse(sharedKey);
//     const ivBase64 = encryptedMessage.slice(0, 24);
//     const encryptedMessageBase64 = encryptedMessage.slice(24);
//     const iv = CryptoJS.enc.Base64.parse(ivBase64);
//     const decrypted = CryptoJS.AES.decrypt(encryptedMessageBase64, key, { iv: iv });
//     return decrypted.toString(CryptoJS.enc.Utf8);
// };

// import JSEncrypt from 'jsencrypt';

// export const encryptTextMessage = (publicKey: string, message: string): string => {
//   const jsEncrypt = new JSEncrypt();
//   jsEncrypt.setPublicKey(publicKey);
//   const encryptedMessage = jsEncrypt.encrypt(message);
//   if (!encryptedMessage) {
//     throw new Error('Encryption failed.');
//   }
//   return encryptedMessage;
// };



export const decryptTextMessage = (privateKey: string, encryptedMessage: string): string => {
    const jsDecrypt = new JSEncrypt();
    jsDecrypt.setPrivateKey(privateKey);
  
    console.log('PrivateKey:', privateKey);
    console.log('EncryptedMessage:', encryptedMessage);
  
    const decryptedMessage = jsDecrypt.decrypt(encryptedMessage);
    if (!decryptedMessage) {
      console.error('Decryption failed. Possible causes:');
      console.error('1. The private key is incorrect or not properly formatted.');
      console.error('2. The encrypted message is corrupted or not properly formatted.');
      console.error('3. The encryption algorithm or padding scheme used does not match.');
  
      throw new Error('Decryption failed.');
    }
    return decryptedMessage;
  };


export function parseJwt (token: any) {
    if(token){
    const base64Url = token.split('.')[1];
    const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    const jsonPayload = decodeURIComponent(window.atob(base64).split('').map(function(c) {
        return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
    }).join(''));
    return JSON.parse(jsonPayload)
    }
    return 
}

