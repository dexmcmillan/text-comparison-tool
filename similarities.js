const fs = require('fs')
const func = require('./index.js')
const functions = require('./functions.js')

// const rawdata = JSON.parse(fs.readFileSync('./data.json'));
//
// const allData = []
//
// for (object of rawdata) {
//
//   const text = []
//
//   const reviews = object.reviews
//
//   for (obj of reviews) {
//     text.push(obj.review)
//   }
//
//   const results = func.analyze(2, text)
//   allData.push(results)
// }

const results = func.analyze(["This is a test. It is a very long string which is fine because hopefully my program can handle strings that are longer than 10 words", "This is a test. It is a very long string which is fine because hopefully my program can handle strings that are longer than 10 words", "here is a test string.", "this a test string. It is cool"])
functions.saveData(results, 'output', true, false)
