const fs = require('fs')







function getMatches(stringObject1, stringObject2) {

  // console.log(`Comparing "${stringObject1.string}" with "${stringObject2.string}"...`)

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

    let max = 9

    for (i = 3; i <= max; i++) {
      const words = processWords(stringInfo.string, i)
      words.forEach(word => {
        stringInfo.words.push(word)
      })

    }


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
  for (word = 0; word < input.length; word++) {

    for (m = 1; m < input.length-word; m++) {
      const nextWordPos = parseInt(word) + m
      const nextWord = input[nextWordPos]
      if (input[word].split(" ").length > nextWord.split(" ").length) {
        if (input[word].includes(nextWord)) {
          input.splice(nextWordPos, 1)
        }
      }
      else if (input[word].split(" ").length < nextWord.split(" ").length) {
        if (nextWord.includes(input[word])) {
          input.splice(word, 1)
        }
      }
    }
  }
  return input
}








exports.analyze = analyze
