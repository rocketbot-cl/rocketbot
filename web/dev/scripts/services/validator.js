angular.module('rocketstudiowebApp')
    .factory('Validators', function ($rootScope) {
        return {
            validName: function (name) {
                var format = /^[-a-zA-Z0-9@\.+_]+$/;

                if (format.test(name)) {
                    return true;
                } else {
                    return false;
                }
            },
            diferentMd5: function (bot1, bot2) {
                if (!bot1) return true;
                return bot1 != md5(bot2);
            },
            changeBotName: function (name) {
                if (name != $rootScope.robot_name) {
                    return confirm("Robot name will change to: " + name)
                }
                return false;
            },
            installedModules: function (modules) {
                uninstallModules = modules.filter(module => !($rootScope.modules[0].children.map(mod => mod.name).includes(module.name))).map(mod => mod.name)
                return uninstallModules.length > 0
            }
        }
    });