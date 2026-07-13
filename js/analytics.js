function saveStudySession(topic, correct, total) {

  const accuracy =
    Math.round((correct / total) * 100)

  const today =
    new Date().toISOString().split('T')[0]

  let history =
    JSON.parse(
      localStorage.getItem('studyHistory')
    ) || {}

  if (!history[topic]) {

    history[topic] = []
  }

  history[topic].push({

    date: today,
    correct: correct,
    total: total,
    accuracy: accuracy
  })

  localStorage.setItem(
    'studyHistory',
    JSON.stringify(history)
  )
}

function getTopicAnalytics(topic) {

  const history =
    JSON.parse(
      localStorage.getItem('studyHistory')
    ) || {}

  const sessions =
    history[topic] || []

  if (sessions.length === 0) {

    return null
  }

  const lastSession =
    sessions[sessions.length - 1]

  const previousSession =
    sessions[sessions.length - 2]

  let improvement = 0

  if (previousSession) {

    improvement =
      lastSession.accuracy -
      previousSession.accuracy
  }

  return {

    totalSessions:
      sessions.length,

    lastAccuracy:
      lastSession.accuracy,

    previousAccuracy:
      previousSession
        ? previousSession.accuracy
        : null,

    improvement:
      improvement
  }
}