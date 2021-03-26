const fs = require('fs')
const func = require('./analyzer.js')

const rawdata = JSON.parse(fs.readFileSync('./data-reviews.json'));
const sample = []

const reviews = rawdata[1].reviews

for (obj of reviews) {
  console.log(obj.review)
  sample.push(obj.review)
}

const results = func.analyze(2, sample)

const score = func.similarityScore(sample)
console.log(score)


fs.writeFileSync('output.json', JSON.stringify(results))
