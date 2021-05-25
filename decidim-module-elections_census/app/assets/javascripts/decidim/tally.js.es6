(() => {
  const Elections = window.Decidim.Elections;

  $("#download-votes").on("click", async (event) => {
    event.preventDefault()
    let $button = $(event.target)
    let target = $(`#${$button.data("download-for")}`)

    let content = target.val()
    let digest = await Elections.generateDigest(content)
    let fileName = `${$button.data("download-as")}-${digest}.txt`

    saveTextAs(content, fileName)
    target.val("")
  })

  $("#decrypt-votes").on("click", async (event) => {
    event.preventDefault()

    let votes = JSON.parse($("#encrypted-votes").val())
    let key = await buildKey()

    let decryptedVotes = await Promise.all(votes.map(async (vote) => {
      let rawVotes = await Elections.decryptContent(key, vote.ballot)
      vote["rawVotes"] = rawVotes
      return vote
    }))

    $("#decrypted-votes").val(JSON.stringify(decryptedVotes))
    $("#encrypted-votes").val("")
  })

  const buildKey = async () => {
    let parts = $(".tally-key-part")
      .map((_index, element) => $(element).val())
      .filter((_index, part) => part !== undefined && part.length > 0)

    let key = await Elections.buildKey(parts)
    return key;
  }
})();
