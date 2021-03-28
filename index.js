const fs = require('fs')






// This function takes two strings and returns two match objects, one which describes the match to the first word and one that describes
// the match to the other.
function getMatches(stringObject1, stringObject2) {
  // This next line can optionally be uncommented to help with debugging.
  // console.log(`Comparing "${stringObject1.string}" with "${stringObject2.string}"...`)

  // The only difference between these matches is the comparedWith property.
  const match = {
    firstString: stringObject1.string,
    secondString: stringObject2.string,
    matchedPhrases: [],
    get count() {
      return this.matchedPhrases.length;
    },
    percentMatch: 0,
  }
  // Now we compare the two words to find out if they match or not. If they do, push them to match.matchedPhrases and match2.matchedPhrases
  // For each word in a string...
  for (r = 0; r < stringObject1.words.length; r++) {
    // Compare it to each word in the next string in the array.
    for (j = 0; j < stringObject2.words.length; j++) {
      if (stringObject1.words[r] === stringObject2.words[j]) {
        match.matchedPhrases.push(stringObject1.words[r])
      }

    }
  }

  match.matchedPhrases = reduceMatches(match.matchedPhrases)

  const allWordCount = match.secondString.split(" ").length
  const matchedWordCount = match.matchedPhrases.join(" ").split(" ").length
  match.percentMatch = (Math.round((matchedWordCount/allWordCount) * 100) / 100)

  return match
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

  const results = {
    stringObjects: [],
    stringsCompared: 0,
  }

  for (string in text) {
    const stringInfo = {
      string: text[string],
      words: [],
      matches: [],
    }

    stringInfo.words = processWords(stringInfo.string)

    results.stringObjects.push(stringInfo)
  }

  // For each stringInfo object...

  for (i = 0; i < results.stringObjects.length; i++) {

    for (k = 1 + i; k < results.stringObjects.length; k++) {

      if (results.stringObjects[i].string !== "" && results.stringObjects[k].string !== "") {
        let matchResult = getMatches(results.stringObjects[i], results.stringObjects[k])
        allResults.push(matchResult)
      }

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
  console.log(toRemove)
  toRemove.forEach(target => {
    input.splice(target, 1)
  })
  return input
}








exports.analyze = analyze
