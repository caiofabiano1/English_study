async function loadTopicsMenu() {

    const response =
        await fetch("data/topics.json")

    const categories =
        await response.json()

    const container =
        document.getElementById("topics-container")

    container.innerHTML = ""

    categories.forEach(category => {

        let totalProgress = 0
        let studiedTopics = 0

        category.topics.forEach(topic => {

            const analytics =
                getTopicAnalytics(topic.file)

            if (analytics) {

                totalProgress += analytics.lastAccuracy
                studiedTopics++

            }

        })

        const average =
            studiedTopics === 0
                ? 0
                : Math.round(totalProgress / studiedTopics)

        const details =
            document.createElement("details")

        details.className = "topic-category"

        details.open = true

        details.innerHTML = `

<summary>

<div class="category-header">

<div>

<h3>${category.category}</h3>

<span>

${category.topics.length} topics

</span>

</div>

<div>

<strong>${average}%</strong>

</div>

</div>

<div class="category-progress">

<div
class="category-progress-fill"
style="width:${average}%">

</div>

</div>

</summary>

`

        category.topics.forEach(topic => {

            const analytics =
                getTopicAnalytics(topic.file)

            let score = "--"

            let color = "gray"

            if (analytics) {

                score =
                    analytics.lastAccuracy + "%"

                if (analytics.lastAccuracy >= 85)
                    color = "green"

                else if (analytics.lastAccuracy >= 60)
                    color = "orange"

                else
                    color = "red"

            }

            const button =
                document.createElement("button")

            button.className = "topic-button"

            button.innerHTML = `

<span>

${topic.title}

</span>

<span class="${color}">

${score}

</span>

`

            button.onclick = () =>
                loadTopic(topic.file)

            details.appendChild(button)

        })

        container.appendChild(details)

    })

}