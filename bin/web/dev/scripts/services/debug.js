angular.module('rocketstudiowebApp')
    .factory('Debug', function ($http) {
        return {
            start: function (next, error) {
                $.get('/debug/start'
                    
                ).then(function (data) {
                    if (next) { next(data); }
                }, function (data) {
                    if (error) { error(data); }
                });
            },
            stop: function (config,next, error) {
                $http({
                    method: 'GET',
                    url:  '/debug/stop'
                    
                }).then(function (data) {
                    if (next) { next(data); }
                }, function (data) {
                    if (error) { error(data); }
                });
            }
        }
    });