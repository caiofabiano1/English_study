function showQuestion() {

  if (
  currentQuestion >= questions.length ||
  answeredQuestions >= sessionLimit
  ) {

    showScore()

    return
  }

  const q = questions[currentQuestion]

  const progress =
    (currentQuestion / questions.length) * 100

  document.getElementById('progress-fill')
    .style.width = `${progress}%`

  const optionsDiv =
    document.getElementById('options')

  const translationArea =
    document.getElementById('translation-area')

  const feedback =
    document.getElementById('feedback')

  optionsDiv.innerHTML = ''

  feedback.innerHTML = ''

  if (q.mode === 'translation') {

  optionsDiv.classList.add('hidden')

  translationArea.classList.remove('hidden')

  let badgeClass = 'type-translation'

  if (
    q.type &&
    q.type.toLowerCase().includes('preposition')
  ) {

    badgeClass = 'type-preposition'
  }

  if (
    q.type &&
    q.type.toLowerCase().includes('builder')
  ) {

    badgeClass = 'type-builder'
  }

  document.getElementById('hint').innerHTML = `

    ${
      q.topic
        ? `
          <div class="rules-box">

            <strong>${q.topic}</strong><br><br>

            ${
              q.rule1
                ? `• ${q.rule1}<br>`
                : ''
            }

            ${
              q.rule2
                ? `• ${q.rule2}<br>`
                : ''
            }

            ${
              q.exampleA ||
              q.exampleI ||
              q.exampleN
                ? `
                  <br>

                  ${
                    q.exampleA
                      ? `A: ${q.exampleA}<br>`
                      : ''
                  }

                  ${
                    q.exampleI
                      ? `I: ${q.exampleI}<br>`
                      : ''
                  }

                  ${
                    q.exampleN
                      ? `N: ${q.exampleN}`
                      : ''
                  }
                `
                : ''
            }

            ${
              q.wordBank
                ? `
                  <br><br>

                  <div class="word-bank">
                    ${q.wordBank}
                  </div>
                `
                : ''
            }

          </div>
        `
        : ''
    }

    <div class="grammar-type ${badgeClass}">
      ${q.type || 'TRANSLATION'}
    </div>
  `

  const formattedQuestion =
    q.question.replace(
      '____________',
      '<span class="inline-input-placeholder">______</span>'
    )

  document.getElementById('question')
    .innerHTML = formattedQuestion

  const input =
    document.getElementById('translation-input')

  input.value = ''

  document.getElementById('submit-translation')
    .onclick = () => {

      checkTranslationAnswer(
        input.value,
        q.answer
      )
    }


  } else {

    translationArea.classList.add('hidden')

    optionsDiv.classList.remove('hidden')

    document.getElementById('hint')
      .innerText = q.hint

    document.getElementById('question')
      .innerText = q.question

    const shuffledOptions =
      shuffleArray(q.options)

    shuffledOptions.forEach(option => {

      const btn =
        document.createElement('button')

      btn.innerText = option

      btn.classList.add('option')

      btn.onclick = () =>
        checkAnswer(btn, option)

      optionsDiv.appendChild(btn)
    })
  }
}

function checkAnswer(button, selected) {

  const q = questions[currentQuestion]

  answeredQuestions++

  const buttons =
    document.querySelectorAll('.option')

  buttons.forEach(btn =>
    btn.disabled = true
  )

  if (selected === q.answer) {

    button.classList.add('correct')

    correctAnswers++

    document.getElementById('feedback')
      .innerText = '✅ Correct!'

  } else {

    button.classList.add('wrong')

    buttons.forEach(btn => {

      if (btn.innerText === q.answer) {

        btn.classList.add('correct')
      }
    })

    document.getElementById('feedback')
      .innerText =
      `❌ Correct answer: ${q.answer}`

    reviewQueue.push(q)
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

  }, 1500)
}

function showScore() {

  const average =
    Math.round(
      (correctAnswers / answeredQuestions) * 100
    )

  saveStudySession(
    currentTopic,
    correctAnswers,
    answeredQuestions
  )

  const analytics =
    getTopicAnalytics(currentTopic)

  let progressMessage = ''

  if (analytics && analytics.totalSessions > 1) {

    if (analytics.improvement > 0) {

      progressMessage = `

        <p class="improvement positive">
          🚀 +${analytics.improvement}% better than last session
        </p>
      `
    }

    else if (analytics.improvement < 0) {

      progressMessage = `

        <p class="improvement negative">
          📉 ${analytics.improvement}% lower than last session
        </p>
      `
    }

    else {

      progressMessage = `

        <p class="improvement neutral">
          ➖ Same result as last session
        </p>
      `
    }
  }

  document.getElementById('quiz').innerHTML = `

    <div class="score-screen">

      <h2>Quiz Finished</h2>

      <p>
    <div class="score-details">

      <p>
        Total questions:
        <strong>${answeredQuestions}</strong>
      </p>

      <p>
        Correct answers:
        <strong>${correctAnswers}</strong>
      </p>

      <p>
        Wrong answers:
        <strong>${answeredQuestions - correctAnswers}</strong>
      </p>

    </div>
      </p>

      <h1>
        Accuracy: ${average}%
      </h1>

      ${progressMessage}

      <p>
        Sessions completed:
        ${analytics?.totalSessions || 1}
      </p>

      <button onclick="location.reload()">
        Back to Topics
      </button>

    </div>
  `
}