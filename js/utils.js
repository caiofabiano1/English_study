function shuffle(array) {

  for(let i = array.length - 1; i > 0; i--) {

    const j =
      Math.floor(Math.random() * (i + 1))

    ;[array[i], array[j]] =
      [array[j], array[i]]
  }
}

function shuffleArray(array) {

  const newArray = [...array]

  for(let i = newArray.length - 1; i > 0; i--) {

    const j =
      Math.floor(Math.random() * (i + 1))

    ;[newArray[i], newArray[j]] =
      [newArray[j], newArray[i]]
  }

  return newArray
}