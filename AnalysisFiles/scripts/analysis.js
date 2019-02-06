const _ = require('lodash');
const trainingSet = require("./trainingSet");
const testSet = require("./testSet");

// number of arrays we will call on from the trainingSet (104 = MAXIMUM)
const testSetSize = 104;

// console.log(trainingSet);
// console.log(testSet);

// Function that runs the KNN function, checks for accuracy, and logs to the console
function runAnalysis() {

    // Check for values of K between 1 - 20
    // data is the trainingSet passed into KNN alg
    // testPoint is one of the arrays in testSet, omitting the first point which is the label
    // This will see how good it predicts the label, which is testPoint[0]
    _.range(1, 20).forEach(k => {
        // Pass in an array and a function
        // testPoint is the value we care about, and this is testSet[0], as it has the label
        const accuracy = _.chain(testSet)
            .filter(testPoint => knn(trainingSet, _.tail(testPoint), k) === testPoint[0])
            .size()
            .divide(testSetSize) // only pass in the number we are dividing by
            .value()

        // Now we return an array that only has the accuracy metric
        console.log('For a K value of ', k, ', the accuracy is ', accuracy * 100, ' percent.');
    })
}

// Function determines the distance between two features, and returns them
// Distance determined by the pythagorean theorem
// (arr1, arr2) => float
function distance(pointA, pointB) {
    return _.chain(pointA)
        // zip will merge pointA[i] and pointB[i] into one array
        .zip(pointB)
        .map(([a, b]) => (a - b) ** 2)
        .sum()
        .value() ** 0.5;
};

//// MAP EXPLAINED /////
// map says that over this collection (array), run this function

// KNN function that does the calculation of best K
// Revised for some arbitrary number of features
function knn(data, point, k) {
    // "point" is the remainder of the features, and compared to the first 
    return _.chain(data)
        .map(row => {
            return [distance(_.initial(row), point),
                _.first(row)
            ];
        })
        .sortBy(row => row[0])
        .slice(0, k)
        .countBy(row => row[1])
        .toPairs()
        .sortBy(row => row[1])
        .last()
        .first()
        .parseInt()
        .value() // returns the value itself
}

// Event listener for the button on the HTML side
document.querySelector('button#analyze').addEventListener('click', runAnalysis);
document.querySelector('button#reload').addEventListener('click', function reload() {
    location.reload();
});

// browserify AnalysisFiles\scripts\analysis.js -o AnalysisFiles\dist\bundle.js