const fs = require('fs')
const func = require('./analyzer.js')

const rawdata = JSON.parse(fs.readFileSync('./data-reviews.json'));




const allData = []

for (object of rawdata) {

  const text = []

  const reviews = object.reviews

  for (obj of reviews) {
    console.log(obj.review)
    text.push(obj.review)
  }

  const score = func.similarityScore(2, text)
  object.similarityScore = score;
  allData.push(JSON.stringify(object))
}

fs.writeFileSync('output.json', allData)
