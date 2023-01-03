'use strict';

angular.module('rocketstudiowebApp')

/**
  * @ngdoc filter
  * @name rocketstudiowebApp.filter:range
  * @function
  *
  * @description
  * Put range int to input
  *
  * @param {type} total max int .
  *
  * @returns {type} intput
  *
  * 
*/
.filter('range', function () {
    return function (input, total) {
        total = parseInt(total);
        for (var i = 0; i < total; i++) {
            input.push(i);
        }
        return input;
    };
})

/**
  * @ngdoc filter
  * @name rocketstudiowebApp.filter:repeatString
  * @function
  *
  * @description
  * Repeat input
  *
  * @param {type} total max int .
  *
  
*/
.filter('repeatString', function () {
    return function (input, total) {
        total = parseInt(total);
        var tmp = input;
        for (var i = 0; i < total; i++) {
            tmp += input;
        }
        return tmp;
    };
})

.filter('Math_abs', function () {
    return function (input) {
        if(input){
            return Math.abs(input);
        }
        return input;
    };
})