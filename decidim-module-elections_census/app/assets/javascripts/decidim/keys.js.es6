((exports) => {
  const $ = exports.$; // eslint-disable-line

  const Crypto = window.crypto || window.msCrypto;
  const Unibabel = window.Unibabel;
  const SecretSharing = window.secrets;
  const $encryptKey = $("#encrypt-key")

  $("#key-generation").on("click", async (event) => {
    event.preventDefault()
    $("textarea").toArray().forEach((element) => $(element).val(""))
    await generateKeys()
  })

  async function digestMessage(message) {
    const msgUint8 = new TextEncoder().encode(message);                           // encode as (utf-8) Uint8Array
    const hashBuffer = await crypto.subtle.digest('SHA-256', msgUint8);           // hash the message
    const hashArray = Array.from(new Uint8Array(hashBuffer));                     // convert buffer to byte array
    const hashHex = hashArray.map(b => b.toString(16).padStart(2, '0')).join(''); // convert bytes to hex string
    return hashHex;
  }

  $("button.download-key").on("click", async (event) => {
    event.preventDefault()
    let $button = $(event.target)
    let digest = await digestMessage($encryptKey.val());
    let fileName = `${$button.data("download-as")}-${digest}.txt`
    let target = $(`#${$button.data("download-for")}`)
    let content = target.val()

    saveTextAs(content, fileName)
    target.val("")
  })

  $("#encrypt-decrypt button#encrypt").on("click", async (event) => {
    event.preventDefault()

    let content = $("#encrypt-content").val()
    const jwk = JSON.parse($encryptKey.val())
    let key = await Crypto.subtle.importKey("jwk", jwk, {name: "RSA-OAEP", hash: {name: "SHA-256"}}, false, ["encrypt"])
    let encryptedContent = await encryptContent(key, content)

    $("#decrypt-content").val(encryptedContent)
    $("#encrypt-content").val("")
  })

  $("#encrypt-decrypt button#decrypt").on("click", async (event) => {
    event.preventDefault()

    let parts = $(".tally-key-part")
      .map((_index, element) => $(element).val())
      .filter((_index, part) => part !== undefined && part.length > 0)

    let encryptedContent = $("#decrypt-content").val()

    let key = await buildKey(parts)
    let decryptedContent = await decryptContent(key, encryptedContent)

    $("#encrypt-content").val(decryptedContent)
    $("#decrypt-content").val("")
  })

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

    let quorum = parseInt($("input#quorum").val())

    const exportedDecryptKey = await exportCryptoKey(key.privateKey)
    const exportedEncryptKey = await exportCryptoKey(key.publicKey)

    generateParts(exportedDecryptKey, quorum)
    $encryptKey.val(exportedEncryptKey)
  }

  const generateParts = (key, quorum) => {
    let hexKey = SecretSharing.str2hex(key)
    let parts = $(".tally-key-part").length
    let shares = SecretSharing.share(hexKey, parts, quorum)

    shares.forEach((item, index) => {
      $(`#tally-key-part-${index + 1}`).val(item)
    })
  }

  async function exportCryptoKey(key) {
    return JSON.stringify(await Crypto.subtle.exportKey("jwk", key));
  }

  const encryptVote = async (jwk, vote) => {
    let key = await Crypto.subtle.importKey("jwk", jwk, {name: "RSA-OAEP", hash: {name: "SHA-256"}}, false, ["encrypt"])
    let encryptedContent = await encryptContent(key, vote)
    return encryptedContent;
  }

  exports.Decidim = exports.Decidim || {};
  exports.Decidim.encryptContent = encryptContent;
  exports.Decidim.encryptVote = encryptVote;
  exports.Decidim.decryptContent = decryptContent;
  exports.Decidim.buildKey = buildKey;
})(window);
