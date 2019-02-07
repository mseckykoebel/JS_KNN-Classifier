// THIS IS THE NEW FILE FOR THE CSV CONVERTER
var $ = require('jquery-browserify')

$("img[attr$='png']").hide()

browserify({
    require: {
        jquery: 'jquery-browserify'
    }
});
var something = require('jquery')
//^^^ Those are just there for reference in this code I believe, that will go elsewhere. 

$(document).ready(function () {
    $.ajax({
        type: "GET",
        url: "Training_Dataset.csv",
        dataType: "csv",
        success: function (data) {
            processData(data);
        }
    });
});

function processData(allText) {
    var allTextLines = allText.split(/\r\n|\n/);
    var headers = allTextLines[0].split(',');
    var lines = [];

    for (var i = 1; i < allTextLines.length; i++) {
        var data = allTextLines[i].split(',');
        if (data.length == headers.length) {

            var tarr = [];

            for (var j = 0; j < headers.length; j++) {
                tarr.push(headers[j] + ":" + data[j]);
            }

            lines.push(tarr);
        }
    }
    // alert(lines);
}

// I'm 90% sure at this point, lines is an array of all the text.