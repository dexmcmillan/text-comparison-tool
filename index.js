const fs = require('fs')






// This function takes two strings and returns two match objects, one which describes the match to the first word and one that describes
// the match to the other.
function getMatches(stringObject) {
  // This next line can optionally be uncommented to help with debugging.
  // console.log(`Comparing "${stringObject1.string}" with "${stringObject2.string}"...`)


  // For each word in a string...
  for (r = 0; r < stringObject.firstStringWords.length; r++) {
    // Compare it to each word in the next string in the array.
    for (j = 0; j < stringObject.secondStringWords.length; j++) {
      if (stringObject.firstStringWords[r] === stringObject.secondStringWords[j]) {
        stringObject.matchedPhrases.push(stringObject.firstStringWords[r])
      }

    }
  }

  stringObject.matchedPhrases = reduceMatches(stringObject.matchedPhrases)

  const allWordCount = stringObject.secondString.split(" ").length
  const matchedWordCount = stringObject.matchedPhrases.join(" ").split(" ").length
  stringObject.percentMatch = (Math.round((matchedWordCount/allWordCount) * 100) / 100)

  delete stringObject.firstStringWords
  delete stringObject.secondStringWords

  return stringObject
}



// This function breaks up the string into various chunks, beggining with 3 word chunks and going all the way up to the length of the string.
function processWords(input) {
  const words = input.toLowerCase().replace(/,|\.|'|!|;|:|\(|\)/gi, "").split(" ")
  const stringWordLength = input.split(" ").length
  const processed = []

  for (i = 3; i <= stringWordLength; i++) {
    for (pos in words) {
      const slice = words.slice(pos, parseInt(i) + parseInt(pos))
      if (slice.length === i) {
        let phrase = ""
        slice.forEach(item => {
          phrase += " " + item
        })
        processed.push(phrase.trim())
      }
    }

  }

  return processed
}


// This is the main function that will call other non-exported functions in this file.
function analyze(text) {

  let allResults = []

  const results = []

  for (string in text) {
    const stringInfo = {
      string: text[string],
      words: [],
      matches: [],
    }

    results.push(stringInfo)
  }

  // For each stringInfo object...
  for (y = 0; y < results.length; y++) {
    for (k = 1 + y; k < results.length-y; k++) {

      const match = {
        firstString: results[y].string,
        secondString: results[k].string,
        firstStringWords: [],
        secondStringWords: [],
        matchedPhrases: [],
        get count() {
          return this.matchedPhrases.length;
        },
        percentMatch: 0,
      }

      match.firstStringWords = processWords(match.firstString)
      match.secondStringWords = processWords(match.secondString)
      let matchResult = getMatches(match)
      allResults.push(matchResult)
    }

  }

  return allResults
}






function reduceMatches(input) {
  let toRemove = []
  for (word = 0; word < input.length; word++) {



    for (m = 1; m < input.length-word; m++) {
      const nextWordPos = parseInt(word) + m
      const nextWord = input[nextWordPos]
      if (input[word].split(" ").length > nextWord.split(" ").length) {
        if (input[word].includes(nextWord)) {
          toRemove.push(nextWordPos)
        }
      }
      else if (input[word].split(" ").length < nextWord.split(" ").length) {
        if (nextWord.includes(input[word])) {
          toRemove.push(word)
        }
      }
    }
  }
  toRemove =  [...new Set(toRemove.reverse())]
  toRemove.forEach(target => {
    input.splice(target, 1)
  })
  return input
}








exports.analyze = analyze
