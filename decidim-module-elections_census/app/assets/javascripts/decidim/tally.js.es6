$(() => {
  let $performTallyButton = $("#tally-votes")

  $performTallyButton.on('click', (event) => {
    event.preventDefault()
    tally()
  })

  const tally = () => {
    const $totalVotes = $("#total-votes")
    const $totalValidVotes = $("#total-valid-votes")
    const $totalSpoiledVotes = $("#total-spoiled-votes")
    let votes;

    try {
      votes = JSON.parse($("#decrypted-votes").val())
    }
    catch (error) {
      if (error instanceof SyntaxError) {
        alert("Hi ha un error en el text dels vots" + error.message);
      }
      else {
        throw error;
      }
    }

    const validVotes = votes.filter((vote) => {
      return vote.spoiled_at === undefined || vote.spoiled_at !== undefined && vote.spoiled_at === null
    })

    const spoiledVotes = votes.filter((vote) => {
      return vote.spoiled_at === undefined || vote.spoiled_at !== undefined && vote.spoiled_at !== null
    })

    updateCounter($totalVotes, votes.length)
    updateCounter($totalValidVotes, validVotes.length)
    updateCounter($totalSpoiledVotes, spoiledVotes.length)

    let results = {}
    validVotes.forEach((vote) => {
      let votedCandidates = vote.rawVotes.split("#").map((id) => candidatesMapping[id])

      votedCandidates.forEach((candidate) => {
        if (results[candidate] === undefined) {
          results[candidate] = 0
        }

        results[candidate] = results[candidate] + 1
      })
    })

    $(".evote__preview-result").toArray().forEach((element) => {
      let $element = $(element)
      let candidateId = $element.data("candidate-id")
      let $progressBar = $element.find(".progress__bar__bar")
      let $progressBarComplete = $element.find(".progress__bar__bar--complete")
      let $progressBarIncomplete = $element.find(".progress__bar__bar--incomplete")
      let $percentage = $element.find(".evote__preview-perc")
      let $label = $element.find(".evote__preview-label")
      let votes = parseInt(results[candidateId]) || "0"

      $label.find("span").html(votes)
    })

    console.log(results)

    // Object.keys(results).forEach((disability) => {
    //   let total = 0
    //
    //   Object.keys(results[disability]).forEach((candidate) => {
    //     let id = `${disability}-${candidate}`
    //     let $counter = $(`li#${id}`)
    //     let votes = results[disability][candidate]
    //     total = total + votes
    //     updateCounter($counter, votes)
    //   })
    //
    //   let $counter = $(`li#${disability}-total`)
    //   updateCounter($counter, total)
    // })
  }

  const updateCounter = (element, value) => {
    element.find("strong").html(value)
  }
});
