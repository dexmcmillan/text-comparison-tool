const converter = require('json-2-csv'); // Handles conversion from returned JSON to CSV so it can be saved.
const fs = require('fs'); //Saves csv file to local drive.

module.exports.saveData = async function(data, name, clearFiles, csvCopy) {
  const fileName = await './' + name
  // Clear files first, according to settings.
  if (clearFiles && fileName+'.json') {
    await fs.truncate(fileName+'.json', 0, function(){console.log('Cleared json file.')})
  }

  if (clearFiles && fileName+'.csv' && csvCopy) {
    await fs.truncate(fileName+'.csv', 0, function(){console.log('Cleared csv file.')})
  }

  // Save in JSON file.
  const json = await JSON.stringify(data)
  await fs.appendFile(fileName+'.json', json, 'utf8', function(err) {
    if (err) throw err;
    console.log(`Data saved to file named ${fileName}.json`);
  });

  // Save as CSV as well if setting allows.
  if (csvCopy) {
    await converter.json2csv(data, function(err, csv) {
      if (err) console.log(err);
      fs.appendFile(fileName+'.csv', csv, 'utf8', function(err) {
        if (err) throw err;
        console.log(`JSON converted to CSV.`);
      });
    }, {
      unwindArrays: true,
      expandArrayObjects: true
    });
  }
}

module.exports.retryNavigation = async function(func, times) {
  tries = 1
  while (tries < times) {

    try {
      await Promise.all([
        func,
        await page.waitForNavigation({timeout:10000})
      ]);
    } catch {
      console.log(`Navigation failed. Retrying... (Attempts: ${tries})`)
      tries++
    }
  }
}
