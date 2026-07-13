function goHome() {

  const topicSelector =
    document.getElementById('topic-selector')

  const quiz =
    document.getElementById('quiz')

  quiz.classList.add('hidden')

  topicSelector.style.display = 'flex'

  document.getElementById('home-button')
    .classList.add('hidden')
}