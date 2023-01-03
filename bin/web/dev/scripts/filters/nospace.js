'use strict';

/**
 * @ngdoc filter
 * @name rocketstudiowebApp.filter:nospace
 * @function
 * @description
 * # nospace
 * Filter in the rocketstudiowebApp.
 */
angular.module('rocketstudiowebApp')
  .filter('nospace', function () {
    return function (value) {
      try {
        return (!value) ? '' : value.replace(/ /g, '');
      } catch (error) {
        return '';
      }
      
  };
  });
