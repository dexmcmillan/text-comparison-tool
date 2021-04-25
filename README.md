# Text Comparison Tool
### March 28, 2021

An npm package originally created to compare arrays of strings to look for similarities.

## Install

`npm install text-analysis`

The analyze() function takes an array of strings as an argument. It will break each string down into word chunks, beginning with the full text and moving down to 3-word strings, and compare to all other strings in the array that is passed.

```javascript
const ta = require('text-analysis')

const text = [
  "This is a test. It is a very long string which is fine because hopefully my program can handle strings that are longer than 10 words",
  "This is a test. It is a very long string which is fine because hopefully my program can handle strings that are longer than 10 words",
  "this is a test string. It is cool",
  "dogs are a great animal."
]

ta.analyze(text)
```

This function will return an object that looks like this:

```javascript
[[{
  "firstString": "This is a test. It is a very long string which is fine because hopefully my program can handle strings that are longer than 10 words",
  "secondString": "This is a test. It is a very long string which is fine because hopefully my program can handle strings that are longer than 10 words",
  "matchedPhrases": ["this is a test it is a very long string which is fine because hopefully my program can handle strings that are longer than 10 words"],
  "count": 1,
  "percentMatch": 1
}, {
  "firstString": "This is a test. It is a very long string which is fine because hopefully my program can handle strings that are longer than 10 words",
  "secondString": "this is a test string. It is cool",
  "matchedPhrases": ["this is a test"],
  "count": 1,
  "percentMatch": 0.15
}, {
  "firstString": "This is a test. It is a very long string which is fine because hopefully my program can handle strings that are longer than 10 words",
  "secondString": "dogs are a great animal.",
  "matchedPhrases": [],
  "count": 0,
  "percentMatch": 0
}, {
  "firstString": "This is a test. It is a very long string which is fine because hopefully my program can handle strings that are longer than 10 words",
  "secondString": "this is a test string. It is cool",
  "matchedPhrases": ["this is a test"],
  "count": 1,
  "percentMatch": 0.15
}, {
  "firstString": "This is a test. It is a very long string which is fine because hopefully my program can handle strings that are longer than 10 words",
  "secondString": "dogs are a great animal.",
  "matchedPhrases": [],
  "count": 0,
  "percentMatch": 0
}, {
  "firstString": "this is a test string. It is cool",
  "secondString": "dogs are a great animal.",
  "matchedPhrases": [],
  "count": 0,
  "percentMatch": 0
}]

```

There is a second function, similarityIndex(text), that receives the same input but will instead return a % similarity between all the strings. It is an average value calculated from each match above.
