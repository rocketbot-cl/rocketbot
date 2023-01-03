'use strict';

/**
 * @ngdoc service
 * @name rocketstudiowebApp.Orchestator
 * @description
 * # Orchestator
 * Factory in the rocketstudiowebApp.
 */
angular.module('rocketstudiowebApp')
    .factory('Bots', function ($http) {
        return {
            add: function (name,bot,description,db, version, father, next, error) {
                $http({
                    method: 'POST',
                    url: url_server + 'addbot',
                    data: $.param({ name: name, code: JSON.stringify(bot) , description:description, db:db, version: version, father:father}),
                    headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
                }).then(function (data) {
                    if (next) { next(data); }
                }, function (data) {
                    if (error) { error(data); }
                });
            },
            getall: function (db,next, error) {
                $http({
                    method: 'POST',
                    url: url_server + 'getbots',
                    data: $.param({db:db}),
                    headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
                }).then(function (data) {
                    if (next) { next(data); }
                }, function (data) {
                    if (error) { error(data); }
                });
            },
            get: function (name,db, next, error) {
                $http({
                    method: 'POST',
                    url: url_server + 'getbot',
                    data: $.param({ name: name, db:db}),
                    headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
                }).then(function (data) {
                    if (next) { next(data); }
                }, function (data) {
                    if (error) { error(data); }
                });
            },
            getFile: function (path, next, error) {
                $http({
                    method: 'POST',
                    url: url_server + 'getbot_file',
                    data: $.param({path:path}),
                    headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
                }).then(function (data) {
                    if (next) { next(data); }
                }, function (data) {
                    if (error) { error(data); }
                });
            },
            getFileDB: function ( can_new,next, error) {
                $http({
                    method: 'POST',
                    data: $.param({'new':can_new}),
                    url: url_server + 'getdb_file',
                    headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
                }).then(function (data) {
                    if (next) { next(data); }
                }, function (data) {
                    if (error) { error(data); }
                });
            },
            project: function (name,path, next, data) {
                
                $http({
                    method: 'POST',
                    url: url_server + 'project',
                    data: $.param({path:path, name:name, data:JSON.stringify(data)}),
                    headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
                }).then(function (data) {
                    if (next) { next(data); }
                }, function (data) {
                    if (error) { error(data); }
                });
            },
            saveFile: function (data, next, error) {
                $http({
                    method: 'POST',
                    url: url_server + 'savebot_file',
                    data: data,
                    headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
                }).then(function (data) {
                    if (next) { next(data); }
                }, function (data) {
                    if (error) { error(data); }
                });
            },
            remove: function (bot,db, next) {
                $http({
                    method: 'POST',
                    url: url_server + 'removebot',
                    data: $.param({ name: bot.name, type: bot.type, id: bot.id, db: db}),
                    headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
                }).then(function (data) {
                    if (next) { next(data); }
                }, function (data) {
                    if (error) { error(data); }
                });
            },
            exportDb: function(bot, db, next, includeModules){ 

                $http.get(url_server+'projectto/0/' + bot+ "/" +db+"?include_modules="+includeModules).then(function(data){
                    if (next) { next(data); }
                });
            },
            exportDbProd: function(bot, db, next, includeModules){ 

                $http.get(url_server+'projectto/1/' + bot+ "/" +db+"?include_modules="+includeModules).then(function(data){
                    if (next) { next(data); }
                });
            }
        };
    });
