angular.module('rocketstudiowebApp')
    .factory('Config', function ($http) {
        return {
            get: function (next, error) {
                $http({
                    method: 'POST',
                    url: url_server + 'getConfig',
                    headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
                }).then(function (data) {
                    if (next) { next(data); }
                }, function (data) {
                    if (error) { error(data); }
                });
            },
            set: function (config,next, error) {
                $http({
                    method: 'POST',
                    url: url_server + 'setConfig',
                    data: $.param({ config: config }),
                    headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
                }).then(function (data) {
                    if (next) { next(data); }
                }, function (data) {
                    if (error) { error(data); }
                });
            }
        }
    });