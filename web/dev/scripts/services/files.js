angular.module('rocketstudiowebApp')
    .factory('Files', function ($http) {
        return {
            get: function (next, error) {
                $http({
                    method: 'POST',
                    url: url_server + 'getlastfiles',
                    headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
                }).then(function (data) {
                    if (next) { next(data); }
                }, function (data) {
                    if (error) { error(data); }
                });
            },
            delete: function (id,next, error) {
                $http({
                    method: 'POST',
                    url: url_server + 'removeLastFile',
                    data: $.param({ id: id }),
                    headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
                }).then(function (data) {
                    if (next) { next(data); }
                }, function (data) {
                    if (error) { error(data); }
                });
            }, 
            searchFile: function(next, extensions){ 
                // $http.get(url_server + "getfile")
                $http({
                    method: 'POST',
                    url: url_server + 'getfile',
                    data: $.param({ extensions: JSON.stringify(extensions)}),
                    headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
                }).then(function (data) {
                    if (next) { next(data); }
                })
            },
            getFolder: function(next){ 
                $http.get(url_server + "getfolder").then(function(data){
                    if (next) { next(data); }
                });
            },
            searchFileSave: function(next, extensions, default_extension){ 
                $http({
                    method: 'POST',
                    url: url_server + 'getfilesave',
                    data: $.param({ extensions: JSON.stringify(extensions), default_extension: default_extension}),
                    headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
                }).then(function(data){
                    if (next) { next(data); }
                });
            }
        }
    });