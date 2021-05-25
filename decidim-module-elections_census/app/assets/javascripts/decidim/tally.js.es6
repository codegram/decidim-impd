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

    let results = calculatePercentages(countVotes(validVotes))

    $(".evote__preview-result").toArray().forEach((element) => {
      let $element = $(element)
      let candidateId = $element.data("candidate-id")
      let result = results.find(result => result.candidate_id.toString() === candidateId.toString())

      if (result === undefined) {
        result = {votes: 0, percentage: 0}
      }

      let $progressBar = $element.find(".progress__bar__bar")
      let $progressBarComplete = $element.find(".progress__bar__bar--complete")
      let $progressBarIncomplete = $element.find(".progress__bar__bar--incomplete")
      let $percentage = $element.find(".evote__preview-perc")
      let $label = $element.find(".evote__preview-label")

      let votes = parseInt(result.votes) || "0"

      $progressBarComplete.attr("style", `width: ${result.percentage}%`)
      $progressBarIncomplete.attr("style", `width: ${100 - result.percentage}%`)
      $percentage.html(`${result.percentage.toLocaleString('es', {minimumFractionDigits: 2})}%`)
      $label.find("span").html(votes)
    })
  }

  const calculatePercentages = (results) => {
    let questions = {}

    return Object.keys(results.candidates).map((candidate) => {
      let result = results.candidates[candidate]
      let totalVotesInQuestion = results.questions[result.question]
      result.percentage = result.votes * 100.0 / totalVotesInQuestion
      return result
    })
  }

  const countVotes = (votes) => {
    let results = {questions: {}, candidates: {}}

    votes.forEach((vote) => {
      let votedCandidates = vote.rawVotes.split("#").map((id) => candidatesMapping[id])

      votedCandidates.forEach((candidate) => {
        let question = $(`[data-candidate-id='${candidate}']`).data("question-id")

        if (results.questions[question] === undefined) {
          results.questions[question] = 0
        }

        if (results.candidates[candidate] === undefined) {
          results.candidates[candidate] = {candidate_id: candidate, votes: 0, question: question}
        }

        results.questions[question] += 1
        results.candidates[candidate].votes += 1
      })
    })

    return results
  }

  const updateCounter = (element, value) => {
    element.find("strong").html(value)
  }
});
