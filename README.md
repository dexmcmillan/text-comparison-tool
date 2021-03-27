# Text Comparison Tool
### March 25, 2021

An npm package originally created as part of a CBC project to analyze Google reviews to be able to tell which were similar enough to warrant further investigation.

## Install

`npm install text-analysis`

## The function

This package exposes just one function:
```javascript
analyze(text)
```

This function takes an array of strings as an argument. It will break each string down into 2-10 word chunks and compare to all other strings in the array that is passed.

```javascript
const ta = require('text-analysis')

ta.analyze(["This is a test.", "here is a test string.", "this a test string. It is cool"])
```

This function will return an array of objects that looks like this:

```javascript
{
  "stringObjects": [{
    "string": "This is a test.",
    "matches": [{
      "comparedWith": "here is a test string.",
      "matchedPhrases": ["is a test"],
      "count": 1,
      "percentMatch": 0.6
    }],
    "averageSimilarity": 0.3
  }, {
    "string": "here is a test string.",
    "matches": [{
      "comparedWith": "This is a test.",
      "matchedPhrases": ["is a test"],
      "count": 1,
      "percentMatch": 0.75
    }, {
      "comparedWith": "this a test string. It is cool",
      "matchedPhrases": ["a test string"],
      "count": 1,
      "percentMatch": 0.43
    }],
    "averageSimilarity": 0.59
  }, {
    "string": "this a test string. It is cool",
    "matches": [{
      "comparedWith": "here is a test string.",
      "matchedPhrases": ["a test string"],
      "count": 1,
      "percentMatch": 0.6
    }],
    "averageSimilarity": 0.3
  }],
  "stringsCompared": 3,
  "averageSimilarityAll": 0.4
}
```
