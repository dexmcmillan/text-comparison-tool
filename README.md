# Text Comparison Tool
### March 25, 2021

Originally created as part of a CBC project to analyze Google reviews to be able to tell which were similar enough to warrant further investigation.

This package exposes two functions:

## 1. analyze(depth, text)
This is the main function, which takes two arguments: depth and text.

Text is an array of strings that you want to run comparisons on. The function will break each string into parts and compare them all against each other string in the array. It will count the number of exact matches between each phrase.

Depth specifies how fine you want to be able to detect similarities and can be a number between 1 and 3 inclusive. An input of 1 will break each string in the text array into individual words and look for matches between other strings in the array. An input of 2 will break each string into two word chunks.

```javascript
analyze(1, ["This is a test", "A test phrase.", "Testing."])
```

This function will return an array of objects that looks like this:

```javascript
[{
  "firststring": "This is a test",
  "secondstring": "A test phrase.",
  "matchedWords": ["a", "test"],
  "count": 2
}, {
  "firststring": "This is a test",
  "secondstring": "Testing.",
  "matchedWords": [],
  "count": 0
}, {
  "firststring": "A test phrase.",
  "secondstring": "Testing.",
  "matchedWords": [],
  "count": 0
}]
```

This function...

```javascript
analyze(2, ["This is a test", "A test phrase.", "Testing."])
```

will return...

```javascript
[{
  "firststring": "This is a test",
  "secondstring": "A test phrase.",
  "matchedWords": ["a test"],
  "count": 1
}, {
  "firststring": "This is a test",
  "secondstring": "Testing.",
  "matchedWords": [],
  "count": 0
}, {
  "firststring": "A test phrase.",
  "secondstring": "Testing.",
  "matchedWords": [],
  "count": 0
}]
```

## 2. similarityScore(text)
The similarityScore function takes the same arguments as analyze(). It will run analyze() but will instead return an average of all the match counts, creating an overall similarity index for the group of strings that is useful when compared to other arrays of strings run through this function.
