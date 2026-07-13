function csvToArray(csv) {

  const lines =
    csv.trim().split(/\r?\n/)

  const headers =
    lines[0].split(';')

  const result = []

  const isTranslation =
    headers.includes('mode')

  for(let i = 1; i < lines.length; i++) {

    const cols = lines[i]
      .match(/(".*?"|[^";]+)(?=\s*;|\s*$)/g)

    if(!cols) continue

    const clean = cols.map(col =>
      col.replaceAll('"', '').trim()
    )

    if(isTranslation) {

  if(clean.length >= 11) {

    result.push({

      mode: clean[0] || 'translation',

      topic: clean[1] || '',

      rule1: clean[2] || '',
      rule2: clean[3] || '',

      exampleA: clean[4] || '',
      exampleI: clean[5] || '',
      exampleN: clean[6] || '',

      type: clean[7] || 'TRANSLATION',

      wordBank: clean[8] || '',

      question: clean[9] || '',

      answer: clean[10] || ''
    })

  } else {

    result.push({

      mode: clean[0] || 'translation',

      topic: clean[1] || '',

      wordBank: clean[2] || '',

      question: clean[3] || '',

      answer: clean[4] || '',

      rule1: '',
      rule2: '',

      exampleA: '',
      exampleI: '',
      exampleN: '',

      type: 'TRANSLATION'
    })
  }

} else {

      result.push({

        mode: 'multiple',

        question: clean[0] || '',

        hint: clean[1] || '',

        options: [
          clean[2],
          clean[3],
          clean[4]
        ].filter(option => option),

        answer: clean[5] || ''
      })
    }
  }

  return result
}