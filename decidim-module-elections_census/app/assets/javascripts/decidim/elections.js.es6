((exports) => {
  const $ = exports.$; // eslint-disable-line

  const Crypto = window.crypto || window.msCrypto;
  const Unibabel = window.Unibabel;
  const SecretSharing = window.secrets;

  const generateDigest = async (message) => {
    const msgUint8 = new TextEncoder().encode(message);                           // encode as (utf-8) Uint8Array
    const hashBuffer = await crypto.subtle.digest('SHA-256', msgUint8);           // hash the message
    const hashArray = Array.from(new Uint8Array(hashBuffer));                     // convert buffer to byte array
    const hashHex = hashArray.map(b => b.toString(16).padStart(2, '0')).join(''); // convert bytes to hex string
    return hashHex;
  }

  const buildKey = async (parts) => {
    try {
      let hex = SecretSharing.combine(parts)
      let json = SecretSharing.hex2str(hex)
      let jwk = JSON.parse(json)
      let key = await Crypto.subtle.importKey("jwk", jwk, {name: "RSA-OAEP", hash: {name: "SHA-256"}}, false, ["decrypt"])

      return key
    } catch(error) {
      alert(`S'ha produït un error al regenerar la clau: ${error}`)
      return ""
    }
  }
  const decryptContent = async (key, encryptedContent) => {
    try {
      let ciphertext = Unibabel.base64ToBuffer(encryptedContent)
      let encoded = await Crypto.subtle.decrypt( { name: "RSA-OAEP" }, key, ciphertext);
      let decrypted = new TextDecoder().decode(encoded)

      return decrypted
    } catch(error) {
      alert(`S'ha produït un error al desencriptar les dades: ${error}`)
      return ""
    }
  }

  const encryptContent = async (key, data) => {
    try {
      let dataBuffer = Unibabel.binaryStringToBuffer(data)
      let ciphertext = await Crypto.subtle.encrypt( { name: "RSA-OAEP" }, key, dataBuffer);
      let buffer = new Uint8Array(ciphertext);
      let encoded = Unibabel.bufferToBase64(buffer)

      return encoded
    } catch(error) {
      alert(`No s'ha pogut encriptar el contingut: ${data}`)
      console.log(error)
      return ""
    }
  }

  const generateKeys = async (quorum) => {
    let key = await Crypto.subtle.generateKey(
      {
        name: "RSA-OAEP",
        modulusLength: 2048,
        publicExponent: new Uint8Array([0x01, 0x00, 0x01]),
        hash: {name: "SHA-256"}
      },
      true,
      ["encrypt", "decrypt"]
    )

    const exportedDecryptKey = await exportCryptoKey(key.privateKey)
    const exportedEncryptKey = await exportCryptoKey(key.publicKey)

    return [exportedDecryptKey, exportedEncryptKey]
  }

  const generateParts = (key, numParts, quorum) => {
    let hexKey = SecretSharing.str2hex(key)
    let shares = SecretSharing.share(hexKey, numParts, quorum)

    return shares;
  }

  const exportCryptoKey = async (key) => {
    return JSON.stringify(await Crypto.subtle.exportKey("jwk", key));
  }

  const importCryptoKey = async (string) => {
    const jwk = JSON.parse(string)
    let key = await Crypto.subtle.importKey("jwk", jwk, {name: "RSA-OAEP", hash: {name: "SHA-256"}}, false, ["encrypt"])
    return key;
  }

  exports.Decidim = exports.Decidim || {};
  exports.Decidim.Elections = exports.Decidim.Elections || {};
  exports.Decidim.Elections.encryptContent = encryptContent;
  exports.Decidim.Elections.decryptContent = decryptContent;
  exports.Decidim.Elections.buildKey = buildKey;
  exports.Decidim.Elections.generateParts = generateParts;
  exports.Decidim.Elections.generateDigest = generateDigest;
})(window);
