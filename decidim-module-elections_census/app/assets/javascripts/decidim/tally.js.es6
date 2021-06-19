$(() => {
  let $performTallyButton = $("#tally-votes")

  $performTallyButton.on('click', (event) => {
    event.preventDefault()
    tally()
  })

  const tally = () => {
    const $totalBallots = $("#total-ballots")
    const $totalValidVotes = $("#total-valid-votes")
    const $totalSpoiledVotes = $("#total-spoiled-votes")
    const $totalNullVotes = $("#total-null-votes")
    const $totalBlankVotes = $("#total-blank-votes")
    const $totalVotes = $("#total-votes")
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

    let results = calculatePercentages(countVotes(validVotes))
    let nullVotes = results.find(result => result.candidate_id.toString() === "nul").votes
    let blankVotes = results.filter(result => result.candidate_id.toString().endsWith("blank")).map(result => result.votes).reduce((total, votes) => total + votes)
    let totalVotes = results.map(result => result.votes).reduce((total, votes) => total + votes) - nullVotes - blankVotes

    updateCounter($totalBallots, votes.length)
    updateCounter($totalVotes, totalVotes)
    updateCounter($totalValidVotes, validVotes.length)
    updateCounter($totalSpoiledVotes, spoiledVotes.length)
    updateCounter($totalNullVotes, nullVotes)
    updateCounter($totalBlankVotes, blankVotes)

    $(".evote__preview-result").toArray().forEach((element) => {
      let $element = $(element)
      let candidateId = $element.data("candidate-id")
      let result = results.find(result => result.candidate_id.toString() === candidateId.toString())

      let $progressBar = $element.find(".progress__bar__bar")
      let $progressBarComplete = $element.find(".progress__bar__bar--complete")
      let $progressBarIncomplete = $element.find(".progress__bar__bar--incomplete")
      let $percentage = $element.find(".evote__preview-perc")
      let $label = $element.find(".evote__preview-label")
      let offlineVotes = parseInt($element.find(".evote__preview-label span.offline_votes").html())

      let votes = parseInt(result.votes) || "0"

      $progressBar.attr("aria-valuenow", result.percentage)
      $progressBar.attr("aria-valuetext", `${result.percentage} percent`)
      $progressBarComplete.attr("style", `width: ${result.percentage}%`)
      $progressBarIncomplete.attr("style", `width: ${100 - result.percentage}%`)
      $percentage.html(`${result.percentage.toLocaleString('es', {minimumFractionDigits: 2, maximumFractionDigits: 2})}%`)
      $label.find("span.online_votes").html(votes)
      $label.find("span.total_votes").html(votes + offlineVotes)
    })
  }

  const offlineVotesForCandidate = (candidate) => {
    return parseInt($(`[data-candidate-id='${candidate}']`).data("offline-votes"))
  }

  const calculatePercentages = (results) => {
    let questions = {}

    return Object.keys(results.candidates).map((candidate) => {
      let result = results.candidates[candidate]
      let totalVotesInQuestion = results.questions[result.question]
      let votes = result.votes + offlineVotesForCandidate(candidate)
      result.percentage = votes * 100.0 / totalVotesInQuestion
      return result
    })
  }

  const countVotes = (votes) => {
    let results = {questions: {}, candidates: {}}

    votes.forEach((vote) => {
      let votedCandidates = vote.rawVotes.split("#").map((id) => candidatesMapping[id])

      votedCandidates.forEach((candidate) => {
        if (candidate === undefined) {
          candidate = "nul"
        }

        let question = $(`[data-candidate-id='${candidate}']`).data("question-id")
        let offlineVotes = parseInt($(`li.accordion-item [data-question-id='${question}']`).data("offline-votes"))

        if (results.questions[question] === undefined) {
          results.questions[question] = offlineVotes || 0
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
