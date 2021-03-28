const fs = require('fs')






// This function takes two strings and returns two match objects, one which describes the match to the first word and one that describes
// the match to the other.
function getMatches(stringObject1, stringObject2) {
  // This next line can optionally be uncommented to help with debugging.
  // console.log(`Comparing "${stringObject1.string}" with "${stringObject2.string}"...`)

  // The only difference between these matches is the comparedWith property.
  const match = {
    comparedWith: stringObject2.string,
    matchedPhrases: [],
    get count() {
      return this.matchedPhrases.length;
    },
    percentMatch: 0,
  }

  const match2 = {
    comparedWith: stringObject1.string,
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
        match2.matchedPhrases.push(stringObject1.words[r])
      }

    }
  }

  return [match, match2]
}



// This function breaks up the string into various chunks, beggining with 3 word chunks and going all the way up to the length of the string.
function processWords(input, searchDepth) {
  const words = input.toLowerCase().replace(/,|\.|'|!|;|:|\(|\)/gi, "").split(" ")
  const processed = []

  for (pos in words) {
    const slice = words.slice(pos, parseInt(searchDepth) + parseInt(pos))
    if (slice.length === searchDepth) {
      let phrase = ""
      slice.forEach(item => {
        phrase += " " + item
      })
      processed.push(phrase.trim())
    }
  }
  return processed
}


// This is the main function that will call other non-exported functions in this file.
function analyze(text) {

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

    const stringWordLength = stringInfo.string.split(" ").length

    for (i = 3; i <= stringWordLength; i++) {
      const words = processWords(stringInfo.string, i)
      words.forEach(word => {
        stringInfo.words.push(word)
      })

    }

    console.log(stringInfo)
    results.stringObjects.push(stringInfo)
  }

  // For each stringInfo object...

  for (i = 0; i < results.stringObjects.length; i++) {

    for (k = 1 + i; k < results.stringObjects.length; k++) {

      if (results.stringObjects[i].string !== "" && results.stringObjects[k].string !== "") {
        let matchResult = getMatches(results.stringObjects[i], results.stringObjects[k])
        results.stringObjects[i].matches.push(matchResult[0])
        results.stringObjects[k].matches.push(matchResult[1])
      }

    }
  }


  // Filter to return only those comparisons that have matched.

  results.averageSimilarityAll = 0
  let sumSimilarityScores = 0

  for (stringObj of results.stringObjects) {

    let sumOfSimilar = 0
    const allMatchesIncZero = stringObj.matches.length
    delete stringObj.words

    stringObj.matches = stringObj.matches.filter(function(value, index, arr){
        return (value.matchedPhrases.length !== 0);
    });
    for (phrases of stringObj.matches) {
      phrases.matchedPhrases = reduceMatches(phrases.matchedPhrases)
    }

    // Calculate percentage of words matching.


    stringObj.matches.forEach(match => {
      const allWordCount = match.comparedWith.split(" ").length
      const matchedWordCount = match.matchedPhrases.join(" ").split(" ").length
      match.percentMatch = (Math.round((matchedWordCount/allWordCount) * 100) / 100)
      sumOfSimilar += match.percentMatch
    })
    stringObj.averageSimilarity = (Math.round((sumOfSimilar/allMatchesIncZero) * 100) / 100)
    sumSimilarityScores+=stringObj.averageSimilarity
  }
  results.averageSimilarityAll = (Math.round((sumSimilarityScores/results.stringObjects.length) * 100) / 100)
  results.stringObjects = results.stringObjects.filter(function(value, index, arr){
      return value.matches.length !== 0;
  });
  results.stringsCompared = results.stringObjects.length
  return results
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
