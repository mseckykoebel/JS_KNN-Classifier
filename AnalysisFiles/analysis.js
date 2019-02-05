const outputs = [];
const _ = require('lodash');
const loadCSV = require('../CSV Data/load-csv');

// Takes CSV file
// Specify the columns that are labels, and the columns of features
let data = loadCSV('Training_Dataset.csv', {
    shuffle: false,
    dataColumns: ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12', '13', '14', '15', '16', '17', '18', '19', '20',
        '21', '22', '23', '24', '25', '26', '27', '28', '29', '30', '31', '32', '33', '34', '35', '36', '37', '38', '39', '40', '41', '42', '43', '44', '45',
        '46', '47', '48', '49', '50', '51', '52', '53', '54', '55', '56', '57', '58', '59', '60'
    ],
    labelColumns: ['Label'],
    converters: {}
});

console.log(data);

// Function determines the distance between two features, and returns them
// Distance determined by the pythagorean theorem
// (arr1, arr2) => float
function distance(pointA, pointB) {
    return _.chain(pointA)
        .zip(pointA)
        .map(([a, b]) => (a - b) ** 2)
        .sum()
        .value() ** 0.5;
};