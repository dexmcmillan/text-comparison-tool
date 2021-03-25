const fs = require('fs')

const sample = [
  "This is a piece of some sample text",
  "This is also sample text, this is.",
  "Text",
  "Here's some sample text.",
  "More text"
]

function prepData(data) {
  data.forEach(obj => {
    delete obj.twoWords
    delete obj.threeWords
    delete obj.words
  })
  return data
}

function analyze(text) {
  const stringsArray = []

  for (string in text) {
    const stringInfo = {
      string: sample[string],
      words: [],
      twoWords: [],
      threeWords: [],
      matches: [],
      get count() {
        return this.matches.length;
      }
    }
    stringInfo.words = sample[string].toLowerCase().replace(".", "").split(" ")

    for (word in stringInfo.words) {

      const next = parseInt(word) + 1
      const next_next = parseInt(word) + 2

      if (word < stringInfo.words.length-1) {
        const wordCombo2 = stringInfo.words[word] + " " + stringInfo.words[next]
        stringInfo.twoWords.push(wordCombo2)
      }

      if (word < stringInfo.words.length-2) {
        const wordCombo3 = stringInfo.words[word] + " " + stringInfo.words[next] + " " + stringInfo.words[next_next]
        stringInfo.threeWords.push(wordCombo3)
      }


    }

    getMatches(1, stringsArray)
    getMatches(2, stringsArray)
    stringsArray.push(stringInfo)
  }

  return prepData(stringsArray)
}

function getMatches(inputWordArray, arrayofStrings) {
  // For each stringInfo object...
  for (i = 0;i <= arrayofStrings.length; i++) {

    for (k = 1; k < arrayofStrings.length; k++) {
      const next = parseInt(i) + k
      switch (inputWordArray) {
        case 1:
          thisWordArray = arrayofStrings[i].words
          nextWordArray = arrayofStrings[next].words
          break
        case 2:
          thisWordArray = arrayofStrings[i].twoWords
          nextWordArray = arrayofStrings[next].twoWords
          break
        case 3:
          thisWordArray = arrayofStrings[i].threeWords
          nextWordArray = arrayofStrings[next].threeWords
          break
      }



      // For each word in a string...
      for (r = 0; r < thisWordArray.length; r++) {
        // Compare it to each word in the next string in the array.
        for (j = 0;j < nextWordArray.length; j++) {
          if (thisWordArray[r] === nextWordArray[j]) {
            const array = [thisWordArray[r], nextWordArray[j]]
            arrayofStrings[i].matches.push(array)
            arrayofStrings[next].matches.push(array)
            console.log(`Matching word "${thisWordArray[r]}" with word "${nextWordArray[j]}". Result: Hit!`)
          }
          else {
            console.log(`Matching word "${thisWordArray[r]}" with word "${nextWordArray[j]}". Result: Not a match.`)
          }

        }
      }
    }
  }
}



fs.writeFileSync('output.json', JSON.stringify(analyze(sample)))
