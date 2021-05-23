$(() => {
  let $performTallyButton = $("#tally-votes button")
  console.log($performTallyButton)

  $performTallyButton.on('click', (event) => {
    event.preventDefault()
    tally()
  })

  const tally = () => {
    const $totalVotes = $("#tally-results #total-votes")
    const $totalValidVotes = $("#tally-results #total-valid-votes")
    const $totalSpoiledVotes = $("#tally-results #total-spoiled-votes")
    let votes;

    try {
      votes = JSON.parse($("#unencrypted-votes").val())
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
      vote.ballot_style.forEach((disability) => {
        if (results[disability] === undefined) {
          results[disability] = {}
        }

        vote.ballot[disability].forEach((candidate) => {
          if (results[disability][candidate] === undefined) {
            results[disability][candidate] = 0
          }

          results[disability][candidate] = results[disability][candidate] + 1
        })
      })
    })

    Object.keys(results).forEach((disability) => {
      let total = 0

      Object.keys(results[disability]).forEach((candidate) => {
        let id = `${disability}-${candidate}`
        let $counter = $(`li#${id}`)
        let votes = results[disability][candidate]
        total = total + votes
        updateCounter($counter, votes)
      })

      let $counter = $(`li#${disability}-total`)
      updateCounter($counter, total)
    })
  }

  const updateCounter = (element, value) => {
    element.find("strong").html(value)
  }
});
