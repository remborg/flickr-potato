function feedDate($filter) {

    var suffixes = ["th", "st", "nd", "rd"];

    function getSuffix(day) {
        var relevantDigits = (day < 30) ? day % 20 : day % 30;
        var suffix = (relevantDigits <= 3) ? suffixes[relevantDigits] : suffixes[0];
        return day + suffix;
    }

    return function(input) {
        if (input === null) {
            return "";
        }

        var day = getSuffix($filter('date')(new Date(input), 'dd'));
        var date = $filter('date')(new Date(input), 'MMM yyyy');
        var time = $filter('date')(new Date(input), 'H:mm');

        return day + ' ' + date + ' at ' + time;
    };
}

function getAuthor() {
    return function(input) {
        if (input === null) {
            return "";
        }
        if (!angular.isString(input)) return;
        var inputArray = input.slice(0, - 1).split('/');
        var inputArrayReturn = inputArray.splice(0, inputArray.length - 1);

        return inputArrayReturn.join('/');
    };
}


angular.module('potatoFeed')
    .filter('feedDate', ['$filter', feedDate])
    .filter('getAuthor', [getAuthor]);
