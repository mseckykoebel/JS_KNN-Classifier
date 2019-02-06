const _ = require('lodash');
const trainingSet = require("./trainingSet");
const testSet = require("./testSet"); 

// Takes CSV file
// Specify the columns that are labels, and the columns of features
// enter the arguments here and you will get the actual data for everything
// let data = loadCSV();

// here is the array of trainngData

// for the sake of testing, this is the one validation point
// in the future, this will be a lot larger

console.log(trainingSet);
console.log("hello mason");

function runAnalysis() {
    // number of arrays we will call on from the trainingSet (104 = MAXIMUM)
    const testSetSize = 104;
    if (testSetSize > 104 || testSetSize < 0) {
        return console.error("Please make sure the number of testSets are between 0 and 104, inc 104");
        
    };
}

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