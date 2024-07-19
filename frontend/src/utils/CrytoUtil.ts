import forge from "node-forge";
import sjcl from "sjcl";

const encryptTextMessage = (message: string, key: string): string => {
  const aes = new sjcl.cipher.aes(sjcl.codec.base64.toBits(key));
  const iv = sjcl.random.randomWords(4, 0); // 128-bit IV
  const encrypted = sjcl.mode.gcm.encrypt(
    aes,
    sjcl.codec.utf8String.toBits(message),
    iv
  );
  return sjcl.codec.base64.fromBits(iv) + sjcl.codec.base64.fromBits(encrypted);
};

const decryptTextMessage = (encryptedMessage: string, key: string): string => {
  const aes = new sjcl.cipher.aes(sjcl.codec.base64.toBits(key));
  const iv = sjcl.codec.base64.toBits(encryptedMessage.slice(0, 24));
  const encrypted = sjcl.codec.base64.toBits(encryptedMessage.slice(24));
  const decrypted = sjcl.mode.gcm.decrypt(aes, encrypted, iv);
  return sjcl.codec.utf8String.fromBits(decrypted);
};

const decryptSharedKey = (
  privateKey: string,
  encryptedMessage: string
): string => {
  const rsa = forge.pki.privateKeyFromPem(privateKey);
  const decoded = forge.util.decode64(encryptedMessage);
  console.log("*******", decoded);
  const decrypted = rsa.decrypt(decoded, "RSA-OAEP");
  return decrypted;
};

function parseJwt(token: string) {
  if (token) {
    const base64Url = token.split(".")[1];
    const base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
    const jsonPayload = decodeURIComponent(
      window
        .atob(base64)
        .split("")
        .map(function (c) {
          return "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2);
        })
        .join("")
    );
    return JSON.parse(jsonPayload);
  }
  return;
}

export { encryptTextMessage, decryptTextMessage, parseJwt, decryptSharedKey };
