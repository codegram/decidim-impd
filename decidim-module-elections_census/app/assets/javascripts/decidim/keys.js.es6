$(() => {
  const Crypto = window.crypto || window.msCrypto;
  const Unibabel = window.Unibabel;
  const $decryptKey = $("#key-generation #decrypt-key")
  const $encryptKey = $("#key-generation #encrypt-key")


  $("#key-generation button").on("click", async (event) => {
    event.preventDefault()
    await generateKeys()
  })

  $("#encrypt-decrypt button#encrypt").on("click", async (event) => {
    event.preventDefault()
    await encryptContent()
  })

  $("#encrypt-decrypt button#decrypt").on("click", async (event) => {
    event.preventDefault()
    await decryptContent()
  })

  const decryptContent = async () => {
    const jwk = JSON.parse($decryptKey.val())

    try {
      let key = await Crypto.subtle.importKey("jwk", jwk, {name: "RSA-OAEP", hash: {name: "SHA-256"}}, false, ["decrypt"])
      let encoded = $("#decrypt-content").val()
      let ciphertext = Unibabel.base64ToBuffer(encoded)
      let data = await Crypto.subtle.decrypt( { name: "RSA-OAEP" }, key, ciphertext);
      let decrypted = new TextDecoder().decode(data)

      alert(`Decrypted data is: ${decrypted}`)
    } catch(error) {
      console.log(error)
    }
  }
  const encryptContent = async () => {
    const jwk = JSON.parse($encryptKey.val())

    try {
      let key = await Crypto.subtle.importKey("jwk", jwk, {name: "RSA-OAEP", hash: {name: "SHA-256"}}, false, ["encrypt"])
      let data = Unibabel.binaryStringToBuffer($("#encrypt-content").val())
      let ciphertext = await Crypto.subtle.encrypt( { name: "RSA-OAEP" }, key, data);
      let buffer = new Uint8Array(ciphertext);
      let encoded = Unibabel.bufferToBase64(buffer)
      $("#decrypt-content").val(encoded)

    } catch(error) {
      console.log(error)
    }
  }

  const generateKeys = async () => {
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
    $decryptKey.val(exportedDecryptKey)
    $encryptKey.val(exportedEncryptKey)

    // window.crypto.subtle.generateKey(
    //   {
    //     name: "AES-GCM",
    //     length: 256, //can be  128, 192, or 256
    //   },
    //   true, //whether the key is extractable (i.e. can be used in exportKey)
    //   ["encrypt", "decrypt"] //can "encrypt", "decrypt", "wrapKey", or "unwrapKey"
    // ).then((key) => {
    //   generatedKey = key
    //   console.log(key)
    // }).catch((error) => {
    //   alert(`Error while generating key: ${error}`)
    //   console.error(error)
    // })
  }

  async function exportCryptoKey(key) {
    return JSON.stringify(await Crypto.subtle.exportKey("jwk", key));
 }
});
