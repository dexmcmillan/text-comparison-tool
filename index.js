const fs = require('fs')

const sample = [
  "This is a piece of some sample text",
  "This is also sample text, this is.",
  "Text is here.",
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
  console.log(text.length)
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
    stringInfo.words = sample[string].toLowerCase().replace(/,|\.|'/gi, "").split(" ")


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
    stringsArray.push(stringInfo)
  }
  console.log(stringsArray)
  const matches = getMatches(3, stringsArray)

  return prepData(matches)
}

function getMatches(inputWordArray, arrayofStrings) {
  const matches = []

  // For each stringInfo object...
  for (i = 0;i < arrayofStrings.length; i++) {

    for (k = 1+i; k < arrayofStrings.length; k++) {

      switch (inputWordArray) {
        case 1:
          thisWordArray = arrayofStrings[i].words
          nextWordArray = arrayofStrings[k].words
          break
        case 2:
          thisWordArray = arrayofStrings[i].twoWords
          nextWordArray = arrayofStrings[k].twoWords
          break
        case 3:
          thisWordArray = arrayofStrings[i].threeWords
          nextWordArray = arrayofStrings[k].threeWords
          break
      }

      const match = {
        firststring: arrayofStrings[i].string,
        secondstring: arrayofStrings[k].string,
        matchedWords: [],
        get count() {
          return this.matchedWords.length;
        }
      }

      // For each word in a string...
      for (r = 0; r < thisWordArray.length; r++) {
        // Compare it to each word in the next string in the array.
        for (j = 0;j < nextWordArray.length; j++) {
          if (thisWordArray[r] === nextWordArray[j]) {

            const array = [thisWordArray[r], nextWordArray[j]]
            match.matchedWords.push(thisWordArray[r])

            console.log(`Matching word "${thisWordArray[r]}" with word "${nextWordArray[j]}". Result: Hit!`)
          }
          else {
            console.log(`Matching word "${thisWordArray[r]}" with word "${nextWordArray[j]}". Result: Not a match.`)

          }

        }
      }
      matches.push(match)
    }

  }
  return matches
}



fs.writeFileSync('output.json', JSON.stringify(analyze(sample)))
