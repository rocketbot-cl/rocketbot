'use strict';

/**
 * @ngdoc service
 * @name rocketstudiowebApp.Command
 * @description
 * # Command
 * Factory in the rocketstudiowebApp.
 */
angular.module('rocketstudiowebApp')
  .factory('Command', function ($http, $rootScope) {
    return {
        new: function (father, command, option, var_, index, group, execute, description, children, mode_live, getvar, extra_data) {
            var r = {
                father: father,
                command: command,
                option: option,
                var: var_,
                index: index,
                group: group,
                execute: execute,
                if: '',
                description: description,
                children: children,
                id: guid(),
                mode_live: mode_live || true,
                getvar: getvar || '',
                extra_data: extra_data || '',
                screenshot:""
            }
            return r;
        },
        execute: function (command, vars, ifs, next, error) {
            var data = {
                project: {
                    profile: { name: $rootScope.robot_name },
                    vars: vars,
                    commands: [command],
                    ifs: ifs
                }
            };
            $http({
                method: 'POST',
                url: url_server + 'execute',
                data: $.param({ info: JSON.stringify(data) }),
                headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
            }).then(function (data) {
                if (next) { next(data); }
            }, function (data) {
                if (error) { error(data); }
            });
        }, 
        getFatherData : function (parent) {
            var father = parent.father,
                group = parent.group;

            var gi = function (params) {
                if(!params){
                    return []
                }
                var img = false;
                for (var t = 0; t < params.length; t++) {
                    if (params[t].children && params[t].children.length > 0) {
                        img = gi(params[t].children);
                        if (img) {
                            return img;
                        }
                    }
                    if (params[t].else && params[t].children.length > 0) {
                        img = gi(params[t].else);
                        if (img) {
                            return img;
                        }
                    }
                }

                for (var t = 0; t < params.length; t++) {
                    if (params[t].father == father && params[t].group == group) {
                        return params[t];
                    }
                }
            }
            var gi_modu = function (params, module_name, module_) {
                var img = false;
                for (var t = 0; t < params.length; t++) {
                    if (params[t].children && params[t].children.length > 0) {
                        img = gi_modu(params[t].children, module_name, module_);
                        if (img) {
                            return img;
                        }
                    }
                }

                for (var t = 0; t < params.length; t++) {
                    if (params[t]['module_name'] == module_name && params[t]['module'] == module_) {
                        return params[t];
                    }
                }
            }
            if (father == 'module' && group == 'scripts') {
                var data = JSON.parse(parent.command);

                var ret = gi_modu($rootScope.modules, data['module_name'], data['module'])
                //console.log("ret", ret)
                return ret;
            } else {
                var ret = gi($rootScope.tree);
                //console.log(ret);
                return ret
            }
        }
    }
  });
