const fs = require('fs')
const func = require('./index.js')
const functions = require('./functions.js')

const testArray = [
  "This is a test. It is a very long string which is fine because hopefully my program can handle strings that are longer than 10 words",
  "This is a test. It is a very long string which is fine because hopefully my program can handle strings that are longer than 10 words",
  "this is a test string. It is cool",
  "dogs are a great animal."
]

const results = func.analyze(testArray)
console.log(results)
