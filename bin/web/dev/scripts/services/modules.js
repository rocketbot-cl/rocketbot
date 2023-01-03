'use strict';

/**
 * @ngdoc service
 * @name rocketstudiowebApp.Command
 * @description
 * # Command
 * Factory in the rocketstudiowebApp.
 */
angular.module('rocketstudiowebApp')
  .factory('Modules', function ($http, $rootScope) {
    return {
       
        get: function ( next, error) {
            
            $http.get("getmodules").then(function (data) {
                if (next) { next(data); }
            }, function (data) {
                if (error) { error(data); }
            });
        },
        getAddons: function (next) {
            $http.get("getAddons").then(function (data) {
                if (next) { next(data); }
            }, function (data) {
                if (error) { error(data); }
            });
        },
        installModule: function (name, branch, next) {
            
            $http.post("market/installMod/",$.param({ name: name, branch: branch }) ).then(function (data) {
                if (next) { next(data); }
            });
        },
    }
  });
