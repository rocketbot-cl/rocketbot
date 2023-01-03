'use strict';

/**
 * @ngdoc service
 * @name rocketstudiowebApp.Orchestator
 * @description
 * # Orchestator
 * Factory in the rocketstudiowebApp.
 */
angular.module('rocketstudiowebApp')
  .factory('Orchestator',  function (Command) {
    return {
        test: function (user, password, url, next, error) {
            var data_ = Command.new('testconnection', { user: user, pswd: password, url: url }, null, null, -1, "orchestator", false, "test", [], true, null, null);
            Command.execute(data_, null, null, function (data) {
                if (next) { next(data); }
            }, function (data) {
                if (error) { error(data); }
            });
        },
        save: function(data, next, error){
            var data_ = Command.new('save', { user: data.user, pswd: data.password, url: data.url }, null, null, -1, "orchestator", false, "test", [], true, null, null);
            Command.execute(data_, null, null, function (data) {
                if (next) { next(data); }
            }, function (data) {
                if (error) { error(data); }
            });
        },
        get: function(next, error){
            var data_ = Command.new('get', "", null, null, -1, "orchestator", false, "test", [], true, null, null);
            Command.execute(data_, null, null, function (data) {
                if (next) { next(data); }
            }, function (data) {
                if (error) { error(data); }
            });
        }
    };
  })
  .directive("fileread", [function () {
    return {
        scope: {
            fileread: "="
        },
        link: function (scope, element, attributes) {
            element.bind("change", function (changeEvent) {
                var reader = new FileReader();
                reader.onload = function (loadEvent) {
                    console.log(loadEvent.target);
                    scope.$apply(function () {
                        scope.fileread = loadEvent.target.result;
                    });
                }
                console.log(changeEvent.target.files[0]);
                reader.readAsDataURL(changeEvent.target.files[0]);
            });
        }
    }
}]);
