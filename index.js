const fs = require('fs')

// This function takes the comparison object and finds matches between the two strings listed.
function getMatches(stringObject) {

// For each word in a string...
  for (r = 0; r < stringObject.firstStringWords.length; r++) {
    // Compare it to each word in the next string in the array.
    for (j = 0; j <= stringObject.secondStringWords.length; j++) {
      if (stringObject.firstStringWords[r] === stringObject.secondStringWords[j]) {
        stringObject.matchedPhrases.push(stringObject.firstStringWords[r])
      }
    }
  }

  // Removes smaller matches and just keeps the largest match found.
  stringObject.matchedPhrases = reduceMatches(stringObject.matchedPhrases)



  // Count matches.
  stringObject.count = stringObject.matchedPhrases.length

  // Calculate a percentage that each string is similar to one another.
  let matchedWordCount = 0
  if (stringObject.matchedPhrases.length !== 0) {
    console.log(stringObject.matchedPhrases.length)
    matchedWordCount = stringObject.matchedPhrases.join(" ").split(" ").length
  }
  const allWordCount = stringObject.firstString.split(" ").length

  console.log(`"${stringObject.firstString}" compared with "${stringObject.secondString}" All words: ${allWordCount}, matched words: ${matchedWordCount}. Words: [${stringObject.matchedPhrases}]`)
  stringObject.percentMatch = (Math.round((matchedWordCount/allWordCount) * 100) / 100)

  // Remove properties from the comparison that we don't want to output.
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




// This is the main function that will call other non-exported functions in this file.
function analyze(text) {

  let results = []

  // For each stringInfo object...
  for (y = 0; y < text.length; y++) {
    console.log(text[y])
    for (k = 1 + y; k < text.length; k++) {

      // This object holds all of the information about each match and will be pushed to our results array and ouputted once processed.
      const comparisonObject = {
        firstString: "",
        secondString: "",
        firstStringWords: [],
        secondStringWords: [],
        matchedPhrases: [],
        count: 0,
        percentMatch: 0,
      }
      comparisonObject.firstString = text[y]
      comparisonObject.secondString = text[k]
      comparisonObject.firstStringWords = processWords(comparisonObject.firstString)
      comparisonObject.secondStringWords = processWords(comparisonObject.secondString)

      let matchResult = getMatches(comparisonObject)
      console.log(comparisonObject)
      results.push(matchResult)
    }

  }

  return results
}

function similarityIndex(text) {
  const results = analyze(text)

  const toLog = results.reduce(function (accumulator, currentValue) {
    const num = (currentValue.percentMatch + accumulator)
    return num
  }, 0)

  console.log(toLog/results.length)
}

exports.analyze = analyze
exports.similarityIndex = similarityIndex
