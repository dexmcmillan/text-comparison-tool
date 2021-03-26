const fs = require('fs')
const func = require('./index.js')
const functions = require('./functions.js')

const rawdata = JSON.parse(fs.readFileSync('./data.json'));

const allData = []

for (object of rawdata) {

  const text = []

  const reviews = object.reviews

  for (obj of reviews) {
    text.push(obj.review)
  }

  const results = func.analyze(3, text)
  allData.push(results)
}

functions.saveData(allData, 'output', true, false)
