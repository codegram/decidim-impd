(() => {
  const $encryptKey = $("#encrypt-key")
  const Elections = window.Decidim.Elections;

  $("#key-generation").on("click", async (event) => {
    event.preventDefault()
    $("textarea").toArray().forEach((element) => $(element).val(""))
    let quorum = parseInt($("input#quorum").val())

    [expportedDecryptKey, exportedEncryptKey] = await Elections.generateKeys(quorum)

    let numParts = $(".tally-key-part").length
    let parts = Elections.generateParts(exportedDecryptKey, numParts, quorum)
    $encryptKey.val(exportedEncryptKey)

    parts.forEach((item, index) => {
      $(`#tally-key-part-${index + 1}`).val(item)
    })
  })

  $("button.download-key").on("click", async (event) => {
    event.preventDefault()
    let $button = $(event.target)
    let digest = await Elections.generateDigest($encryptKey.val())
    let fileName = `${$button.data("download-as")}-${digest}.txt`
    let target = $(`#${$button.data("download-for")}`)
    let content = target.val()

    saveTextAs(content, fileName)
    target.val("")
  })

  $("#encrypt-decrypt button#encrypt").on("click", async (event) => {
    event.preventDefault()

    let content = $("#decrypted-content").val()
    let key = await Elections.importCryptoKey($encryptKey.val())
    let encryptedContent = await Elections.encryptContent(key, content)

    $("#encrypted-content").val(encryptedContent)
    $("#decrypted-content").val("")
  })

  $("#encrypt-decrypt button#decrypt").on("click", async (event) => {
    event.preventDefault()

    let parts = $(".tally-key-part")
      .map((_index, element) => $(element).val())
      .filter((_index, part) => part !== undefined && part.length > 0)

    let encryptedContent = $("#encrypted-content").val()

    let key = await Elections.buildKey(parts)
    let decryptedContent = await Elections.decryptContent(key, encryptedContent)

    $("#decrypted-content").val(decryptedContent)
    $("#encrypted-content").val("")
  })
})();
