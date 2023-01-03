angular.module('rocketstudiowebApp')
    .factory('Languages', function ($http) {
        return {
            get: function (next, error) {
                $http({
                    method: 'GET',
                    url: url_server + 'languages',
                    headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
                }).then(function (data) {
                    if (next) { next(data); }
                }, function (data) {
                    if (error) { error(data); }
                });
            }
        }
    });