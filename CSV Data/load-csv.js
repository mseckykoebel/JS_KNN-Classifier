// Access to the lodash library, filesystem library
const _ = require('lodash');
const fs = require('fs');
const shuffleSeed = require('shuffle-seed');

// Function that extracts the columns of the CSV file
function extractColumns(data, columnNames) {

  // "headers" is the first element of the array (for example, [1, 2, 3], headers = 1)
  // TLDR gets the data
  const headers = _.first(data);

  // _.map is the first lodash library utilization
  // map is naturally iterative over the entire array
  // gets the INDEX at the value of headers
  const indexes = _.map(columnNames, column => headers.indexOf(column));

  // _.pullAt removes the data from the row array at the index "headers"
  // this makes a new array, which is all the way down the table
  // this is helpful as we need to match the features up with each other 
  const extracted = _.map(data, row => _.pullAt(row, indexes));

  return extracted;
}

// This exports the function so it can be used elsewhere in the directory
module.exports = function loadCSV(
  filename, {
    dataColumns = [],
    labelColumns = [],
    converters = {},
    // shuffle is for if we need to mix up the data (I still like that idea lmaoF)
    shuffle = false
  }
) {

  // returns the contents of the file, given the path
  // change the default encoding to 'utf-8,' which is the default for other functions
  let data = fs.readFileSync(filename, {
    encoding: 'utf-8'
  });

  // reset data...
  // first this splits the data at the spaces (/n)
  // then, it inserts commas where the spaces are, as it is, again, just a string
  data = _.map(data.split('\n'), d => d.split(','));

  // over the data array, invoke a function that if falsy, dropped
  // pretty much drop blanks
  data = _.dropRightWhile(data, val => _.isEqual(val, ['']));

  // get the first element of the array and name it headers
  const headers = _.first(data);

  // Map a function over data, and this function does different things based on
  // the condition:
  data = _.map(data, (row, index) => {


    if (index === 0) {
      return row;
    }


    return _.map(row, (element, index) => {
      if (converters[headers[index]]) {
        const converted = converters[headers[index]](element);
        return _.isNaN(converted) ? element : converted;
      }

      const result = parseFloat(element.replace('"', ''));
      return _.isNaN(result) ? element : result;
    });
  });

  // this separates the data and the labels
  let labels = extractColumns(data, labelColumns);
  data = extractColumns(data, dataColumns);

  // the shift method removes the first element from the array and and returns the removed element
  data.shift();
  labels.shift();

  // this shuffle is truthy, shuffle the data using shuffleSeed
  if (shuffle) {
    data = shuffleSeed.shuffle(data, 'phrase');
    labels = shuffleSeed.shuffle(labels, 'phrase');
  }
};