const _ = require('lodash');
const trainingSet = require("./trainingSet"); // TRAINING ARRAY
const testSet = require("./testSet"); // TESTING ARRAY

// Function that runs the KNN function, checks for accuracy, and logs to the console
function runAnalysis() {

    // number of arrays we will call on from the trainingSet (104 = MAXIMUM)
    const testSetSize = 104;

    // if the inputted length is different than the actual length...
    if (testSetSize < (testSet.len - 1) && testSetSize > 0 && testSetSize < 105) {

        // shuffle the trainingSet to prepare for trimming
        const shuffledTrainingSet = function shuffleTrainingSet(trainingSet) {
            return _.shuffle(trainingSet);
        };
        // shuffle the testSet to prepare for trimming
        const shuffledTestSet = function shuffleTestSet(testSet) {
            return _.shuffle(testSet);
        };

        // Remove elements from both shuffled arrays for the length of the testSetSize
        for (let i = 0; i < (104 - testSetSize); i++) {
            shuffledTrainingSet.pop();
            shuffledTestSet.pop();
        };

        console.log(trainingSet.length);

        // run for 40 values of K
        _.range(1, 40).forEach(k => {
            // Pass in an array and a function
            // testPoint is the value we care about, and this is testSet[0], as it has the label
            // _.tail(shuffledTestPoint) is shuffledTestSet minus the label in the array
            const accuracy = _.chain(shuffledTestSet)
                .filter(shuffledTestPoint => knn(shuffledTrainingSet, _.tail(shuffledTestPoint), k) === shuffledTestPoint[0])
                .size()
                .divide(testSetSize) // only pass in the number we are dividing by
                .value()

            // Now we return an array that only has the accuracy metric
            console.log('For a K value of ', k, ', the KNN funtion is ', accuracy * 100, ' percent accurate.');
        })

    } else if (testSetSize === 104) {
        // Check for values of K between 1 - 20
        // data is the trainingSet passed into KNN alg
        // testPoint is one of the arrays in testSet, omitting the first point which is the label
        // This will see how good it predicts the label, which is testPoint[0]
        _.range(1, 40).forEach(k => {
            // Pass in an array and a function
            // testPoint is the value we care about, and this is testSet[0], as it has the label
            // trainingSet has the label and all (as we need it)
            // pass in the testArray minus the label as we do not need to see it to do analysis
            // see how it compares to the label
            // when the guess is the same, increment the value accuracy!!! this is all done here
            const accuracy = _.chain(testSet)
                .filter(testPoint => knn(trainingSet, _.tail(testPoint), k) === testPoint[0])
                .size()
                .divide(testSetSize) // only pass in the number we are dividing by
                .value()

            // Now we return an array that only has the accuracy metric
            console.log('For a K value of ', k, ', the KNN funtion is ', accuracy * 100, ' percent accurate.');
        })
    } else {
        console.error("Please enter a value between 0 and 105, not including 105");
        
    }

}

// Function determines the distance between two features, and returns them
// Distance determined by the pythagorean theorem
// (arr1, arr2) => float
// pointA and pointB are both arrays
function distance(pointA, pointB) {
    return _.chain(pointA)
        .zip(pointB) // array of arrays, matching the indicies and making an array of 2-element arrays [ [1, 2], [x, y], ... ]
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
    // _.tail(row) is all but the first array element
    // data is the entire trainingSet array with the label and all
    return _.chain(data)
        .map(row => {
            // distance from the
            return [distance(_.tail(row), point),
                _.head(row)
            ];
        })
        .sortBy(row => row[0]) // sort by least to greatest differences
        .slice(0, k) // cut the array down by the top "k" records!! GOOD  
        .countBy(row => row[0]) // sort by the most common label, located in row[0] GOOD
        .toPairs() // convert the above to arrays, and not objects
        .sortBy(row => row[1]) // sort by least->greatest, and most common label will be at the bottom
        .last() // return the last element in the big array [56, -1] for example
        .first() // get the first element out of the array, so most common label is now here (-1 or 1)
        .parseInt() // remove the quotes, convert from string to integer
        .value() // returns the value itself
}

// Event listener for all of the HTML buttons
document.querySelector('button#analyze').addEventListener('click', runAnalysis);
document.querySelector('button#reload').addEventListener('click', function reload() {
    location.reload();
});
document.querySelector('button#consoleClear').addEventListener('click', function clear() {
    console.clear();
})

// browserify AnalysisFiles\scripts\analysis.js -o AnalysisFiles\dist\bundle.js