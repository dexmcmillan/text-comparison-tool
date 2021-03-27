const fs = require('fs')







function getMatches(stringObject1, stringObject2) {

  // console.log(`Comparing "${stringObject1.string}" with "${stringObject2.string}"...`)

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

    let max = 9

    for (i = searchDepth; i <= max; i++) {
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
    for (phrases of stringObj.matches) {
      phrases.matchedPhrases = reduceMatches(phrases.matchedPhrases)
    }

  }
  results.stringObjects = results.stringObjects.filter(function(value, index, arr){
      return value.matches.length !== 0;
  });
  results.stringsCompared =  results.stringObjects.length
  return results
}






function reduceMatches(input) {
  console.log(input)
    for (word = 0; word < input.length-1; word++) {

      for (m = 1; m < input.length-word; m++) {
        console.log(`Word Num: ${word}. Nextword Num(m): ${m}`)
        const nextWordPos = parseInt(input.indexOf(input[word])) + m
        const nextWord = input[nextWordPos]
        console.log(`word: ${input[word]}, next: ${nextWord}`)
        if (input[word].split(" ").length > nextWord.split(" ").length) {
          if (input[word].includes(nextWord)) {
            input.splice(nextWordPos, 1)
          }
        }
        else if (input[word].split(" ").length < nextWord.split(" ").length) {
          if (nextWord.includes(input[word])) {
            input.splice(input[word], 1)
          }
        }
      }
    }
  return input
}








exports.analyze = analyze
