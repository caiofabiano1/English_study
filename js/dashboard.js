function showDashboard() {

  const history =
    JSON.parse(
      localStorage.getItem('studyHistory')
    ) || {}

  let html = `

    <div class="dashboard">

      <h2>📊 Study Dashboard</h2>
  `

  const topics =
    Object.keys(history)

  if(topics.length === 0) {

    html += `

      <p>
        No study sessions yet.
      </p>
    `
  }

  topics.forEach(topic => {

    const sessions =
      history[topic]

    const totalSessions =
      sessions.length

    const accuracies =
      sessions.map(s => s.accuracy)

    const bestScore =
      Math.max(...accuracies)

    const lastScore =
      accuracies[accuracies.length - 1]

    const average =
      Math.round(

        accuracies.reduce(
          (a, b) => a + b,
          0
        ) / accuracies.length
      )

    html += `

      <div class="dashboard-card">

        <h3>
          ${topic
            .replace('questions/', '')
            .replace('.csv', '')
          }
        </h3>

        <p>
          Sessions:
          <strong>${totalSessions}</strong>
        </p>

        <p>
          Best Score:
          <strong>${bestScore}%</strong>
        </p>

        <p>
          Last Score:
          <strong>${lastScore}%</strong>
        </p>

        <p>
          Average:
          <strong>${average}%</strong>
        </p>

      </div>
    `
  })

  html += `

      <button onclick="location.reload()">
        Back
      </button>

    </div>
  `

  document.getElementById('quiz')
    .innerHTML = html

  document.getElementById('quiz')
    .classList.remove('hidden')

  document.getElementById('topic-selector')
    .style.display = 'none'
}