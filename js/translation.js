function normalizeText(text) {

  return text
    .toLowerCase()
    .replace(/[.,?!]/g, '')
    .replace(/\s+/g, ' ')
    .trim()
}

function compareSentences(user, correct) {

  const userWords = user.trim().split(/\s+/)
  const correctWords = correct.trim().split(/\s+/)

  let userHTML = ''
  let correctHTML = ''

  const max =
    Math.max(
      userWords.length,
      correctWords.length
    )

  for(let i = 0; i < max; i++) {

    const u = userWords[i] || ''
    const c = correctWords[i] || ''

    if(
      normalizeText(u) === normalizeText(c)
    ) {

      userHTML += `${u} `
      correctHTML += `${c} `

    } else {

      if(u){

        userHTML +=
          `<span class="wrong-word">${u}</span> `
      }

      if(c){

        correctHTML +=
          `<span class="correct-word">${c}</span> `
      }
    }
  }

  return `
    <div class="comparison">

      <h4>Your answer</h4>

      <div class="sentence">
        ${userHTML}
      </div>

      <br>

      <h4>Correct answer</h4>

      <div class="sentence">
        ${correctHTML}
      </div>

    </div>
  `
}

function checkTranslationAnswer(
  userAnswer,
  correctAnswer
) {

  answeredQuestions++

  const normalizedUser =
    normalizeText(userAnswer)

  const acceptedAnswers =
    correctAnswer
      .split('|')
      .map(answer =>
        normalizeText(answer)
      )

  if (acceptedAnswers.includes(normalizedUser)) {

    correctAnswers++

    document.getElementById('feedback')
      .innerHTML = '✅ Correct!'

  } else {

    reviewQueue.push(
      questions[currentQuestion]
    )


    document.getElementById('feedback')
      .innerHTML = `

        <h3>❌ WRONG</h3>

      ${compareSentences(
      userAnswer,
      correctAnswer
      )}
      `

      
  }

  setTimeout(() => {

    if (
      reviewQueue.length > 0 &&
      Math.random() < 0.35
    ) {

      questions.splice(
        currentQuestion + 3,
        0,
        reviewQueue.shift()
      )
    }

    currentQuestion++

    showQuestion()

  }, 2500)
}