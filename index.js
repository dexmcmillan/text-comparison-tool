const fs = require('fs')

function analyze(searchDepth, text) {

  const results = {
    stringObjects: [],
    get stringsCompared() {
      return this.stringObjects.length
    },
    similarityScore: 0,
  }

  for (string in text) {
    const stringInfo = {
      string: text[string],
      words: [],
      matches: [],
      get count() {
        let matchCount = 0
        this.matches.forEach(item => {
          matchCount += item.count;
        })
        return matchCount
      },

    }

    const words = text[string].toLowerCase().replace(/,|\.|'|!|;|:|\(|\)/gi, "").split(" ")

    for (pos in words) {
      const slice = words.slice(pos, parseInt(searchDepth) + parseInt(pos))
      if (slice.length === searchDepth) {
        let phrase = ""
        slice.forEach(item => {
          phrase += " " + item
        })
        console.log(`Phrase: ${phrase}`)
        stringInfo.words.push(phrase.trim())
      }
    }


    results.stringObjects.push(stringInfo)
  }

  // For each stringInfo object...
  for (i = 0; i < results.stringObjects.length; i++) {
    for (k = 1 + i; k < results.stringObjects.length; k++) {

      if (results.stringObjects[i].string !== "" && results.stringObjects[k].string !== "") {
        results.stringObjects[i].matches.push(getMatches(results.stringObjects[i], results.stringObjects[k]))
      }

    }
  }

  // Calculate the similarity score.
  let total = 0
  results.stringObjects.forEach(obj => {
    total += obj.count

  })

  let score = total / results.stringObjects.length
  if (!isNaN(score)) {
    results.similarityScore = parseFloat(score.toFixed(2))
  } else {
    results.similarityScore = 0.00
  }

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
