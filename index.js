const fs = require('fs')








function analyze(searchDepth, text) {

  const results = {
    stringObjects: [],
    stringsCompared: 0,
    similarityScore: 0,
  }

  for (string in text) {
    const stringInfo = {
      string: text[string],
      words: [],
      matches: [],

    }

    const words = text[string].toLowerCase().replace(/,|\.|'|!|;|:|\(|\)/gi, "").split(" ")

    for (pos in words) {
      const slice = words.slice(pos, parseInt(searchDepth) + parseInt(pos))
      if (slice.length === searchDepth) {
        let phrase = ""
        slice.forEach(item => {
          phrase += " " + item
        })
        stringInfo.words.push(phrase.trim())
      }
    }


    results.stringObjects.push(stringInfo)
  }

  // For each stringInfo object...
  for (i = 0; i < results.stringObjects.length; i++) {
    for (k = 1 + i; k < results.stringObjects.length; k++) {

      if (results.stringObjects[i].string !== "" && results.stringObjects[k].string !== "") {
        const matchResult = getMatches(results.stringObjects[i], results.stringObjects[k])
        results.stringObjects[i].matches.push(matchResult)
        results.stringObjects[k].matches.push(matchResult)
      }

    }
  }

  // Calculate the similarity score.
  let numMatches = 0
  let numTotal = 0
  results.stringObjects.forEach(obj => {
    obj.matches.forEach(object => {
      numMatches += object.count
    })
    numTotal += obj.matches.length
  })

  let score = numMatches / numTotal
  if (!isNaN(score)) {
    results.similarityScore = parseFloat(score.toFixed(2))
  } else {
    results.similarityScore = 0.00
  }

  // Filter to return only those comparisons that have matched.
  for (stringObj of results.stringObjects) {
    delete stringObj.words
    stringObj.matches = stringObj.matches.filter(function(value, index, arr){
        return (value.matchedPhrases.length !== 0);
    });
  }
  results.stringObjects = results.stringObjects.filter(function(value, index, arr){
      return value.matches.length !== 0;
  });
  results.stringsCompared =  results.stringObjects.length
  return results
}









function getMatches(stringObject1, stringObject2) {

  console.log(`Comparing "${stringObject1.string}" with "${stringObject2.string}"...`)

  const match = {
    comparedWith: stringObject2.string,
    matchedPhrases: [],
    get count() {
      return this.matchedPhrases.length;
    }
  }

  // For each word in a string...
  for (r = 0; r < stringObject1.words.length; r++) {
    // Compare it to each word in the next string in the array.
    for (j = 0; j < stringObject2.words.length; j++) {
      if (stringObject1.words[r] === stringObject2.words[j]) {
        match.matchedPhrases.push(stringObject1.words[r])
      }

    }
  }
  return match
}

function similarityScore(depth, text) {

  const analyzedObjArray = analyze(depth, text)

  let total = 0

  const similarity = {
    name: "",
    score: 0,
    analyzed: 0,
  }




  return similarity
}

exports.analyze = analyze
exports.similarityScore = similarityScore
