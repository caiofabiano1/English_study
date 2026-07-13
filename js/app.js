let questions = []
let currentQuestion = 0
let correctAnswers = 0
let answeredQuestions = 0
let currentTopic = ''
let sessionLimit = 30

let reviewQueue = []

async function loadTopic(file) {

  currentTopic = file

  try {

    const response =
      await fetch(file)

    if(!response.ok) {

      throw new Error(
        `Could not load ${file}`
      )
    }

    const text =
      await response.text()

    questions =
      csvToArray(text)

    shuffle(questions)

    currentQuestion = 0
    correctAnswers = 0
    answeredQuestions = 0
    reviewQueue = []

    document.getElementById('topic-selector')
      .style.display = 'none'

    document.getElementById('quiz')
      .classList.remove('hidden')

    document.getElementById('home-button')
      .classList.remove('hidden')

    showQuestion()

  } catch(error) {

    console.error(error)

    alert(`Error loading quiz`)
  }
}
window.onload = () => {

    loadTopicsMenu()

}