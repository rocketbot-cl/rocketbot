'use strict';

/**
*
* @ngdoc function
* @name rocketstudiowebApp.controller:MainCtrl
* @description
* MainCtrl
* Controller of the rocketstudiowebApp
*/
/**
* Module base for webapp
* @param  {angular} 'rocketstudiowebApp'
*/
angular.module('rocketstudiowebApp')
    .config(
        function ($indexedDBProvider) {

            $indexedDBProvider
                .connection(dbstore)
                .upgradeDatabase(dbversion, function (event, db, tx) {
                    var objStore = db.createObjectStore(dbname, {
                        keyPath: 'id',
                        autoIncrement: true
                    });
                    objStore.createIndex('count_idx', 'count', {
                        unique: false
                    });
                    objStore.createIndex('data_idx', 'data', {
                        unique: false
                    });
                })
        }
    )
    .controller('MainCtrl', function ($routeParams) {
        var url = '/edit.html/#/edit/';
        if ($routeParams.robo_name) {
            url += $routeParams.robo_name + '/'
        }
        if ($routeParams.type) {
            url += $routeParams.type + '/'
        }
        if ($routeParams.path) {
            url += $routeParams.path
        }
        window.location.href = url
    } )
    .controller('MainCtrlBkp', function (
        $window, $scope, $rootScope, $http, $indexedDB, Cropper, $timeout,
        Bots, $routeParams, $filter, ContextMenuEvents, Debug, Command, Modules, Files, Validators) {

        $scope.extensions = {
            'image': [['Jpg', '*.jpg'], ['Png', '*.png'], ['Gif', '*.gif'], ['Bmp', '*.bmp']],
            'video': [['Mp4', '*.mp4'], ['Avi', '*.avi'], ['Mkv', '*.mkv'], ['Webm', '*.webm']],
            'audio': [['Mp3', '*.mp3'], ['Wav', '*.wav'], ['Ogg', '*.ogg'], ['Flac', '*.flac'], ['Aac', '*.aac']],
            'pdf': [['Pdf', '*.pdf']],
            'xlsx': [['Xlsx', '*.xlsx'], ['Xls', '*.xls'], ['Csv', '*.csv'], ['Xlsm', '*.xlsm']],
            'docx': [['Doc', '*.docx']],
            'exe': [['Exe', '*.exe']],
        }

        try {
            gtag('event', 'init', {
                'event_category': 'studio',
                'event_label': 'Developer'
            });
        } catch (error) {
            console.log(error)
        }

        $scope.parse_command = function (command) {
            try {
                return JSON.parse(command);

            }
            catch (e) {
                return command
            }
        }
        $scope.$on(ContextMenuEvents.ContextMenuOpened, function (event, data) {

            try {
                $("#" + data.params.$scope.command.id).find(".can-click")[0].click()
            } catch (e) { console.log(e) }
            if (data.params.$scope.command && data.params.$scope.command.help_link) {
                $rootScope.help_command_link = data.params.$scope.command.help_link;
            } else {
                if (data.params.$scope.command && data.params.$scope.command.father) {
                    $rootScope.help_command_link = "https://docs.rocketbot.com/?tag=" + data.params.$scope.command.father + "-" + data.params.$scope.command.group;
                }
            }
        });
        /**
        * Key Events / Shortcuts
        */

        $(window).bind('keydown', function (event) {
            if (event.ctrlKey || event.metaKey) {
                switch (String.fromCharCode(event.which).toLowerCase()) {
                    case 's':
                        $scope.save_bot();
                        event.preventDefault();
                        return;
                        break;
                }
            }
        });
        $indexedDB.openStore(dbname, function (store) {
            store.clear();
        });
        $scope.bots = [{
            bots: []
        }];
        $scope.addons = [];
        $scope.zoom_command = 1;
        /**
        * Get addons
        */

        Modules.getAddons(function (data) {
            $scope.addons = data.data;
        })
        var executing_code;
        $rootScope.modules = [];
        $scope.savingbot = false;
        $scope.robot_children = [];
        $scope.pagesizes = pagesizes;
        var count_modifications = 0;
        $rootScope.stop_debug = null;
        $scope.var_exist = false;
        $scope.validName = true;
        $scope.validBotName = true;


        $scope.setStopDebug = function (id) {
            if ($rootScope.stop_debug == id) {
                $rootScope.stop_debug = null;
            } else {
                $rootScope.stop_debug = id;
            }
        }
        /**
        * Buscador de comandos
        */
        var index_results = 0;
        $scope.searchView = function (index) {
            $scope.search_result = [];
            var search = function (id, list) {
                for (var t = 0; t < list.length; t++) {
                    var it = angular.copy(list[t]);
                    it['children'] = null;
                    it['else'] = null;
                    //it.father_data = $scope.getFatherData(list[t]);
                    it.father_data = Command.getFatherData(list[t]);
                    if (JSON.stringify(it).indexOf($scope.search_command_list) > -1) {
                        $scope.search_result.push(list[t]);
                    }
                    if (list[t].children) {
                        search(id, list[t].children);
                    }
                    if (list[t].else) {
                        search(id, list[t].else);
                    }
                }
            };
            search($scope.search_command_list, $scope.commands);
            $rootScope.search_results = $scope.search_result.length;
            index_results = index_results + index;
            if (index === 0 || index_results >= $scope.search_result.length) {
                index_results = 0;
            }
            if (index_results < 0) {
                index_results = $scope.search_result.length;
            }

            if ($scope.search_result[index_results]) {
                document.getElementById($scope.search_result[index_results].id).scrollIntoView({
                    block: 'center',
                    behavior: 'smooth'
                });
            }
        };
        $scope.apply_ = function () {

            if (!$scope.$$phase) {
                $scope.$apply()
            }
        }
        $scope.scale_command = function (inout) {
            if (inout == 1) {
                $scope.zoom_command = $scope.zoom_command - 0.1
            }
            if (inout == -1) {
                $scope.zoom_command = $scope.zoom_command + 0.1
            }
            if (inout == 0) {
                $scope.zoom_command = 1
            }
            document.getElementById("commands_bots_list").style.transformOrigin = "0 0";
            document.getElementById("commands_bots_list").style.transform = ("scale(" + $scope.zoom_command + ")");
        }
        $scope.getSelectedItemsIncluding = function (list, item) {
            item.selected = true;
            return list.filter(function (item) { return item.selected; });
        };
        $scope.createBot = function () {
            var url_opened = false
            Bots.add($scope.new_bot_name, "", $scope.new_bot_description, $scope.path_encode, "", "", function (data) {
                $("#newRobotModal").on('hidden.bs.modal', function (e) {
                    if (!url_opened) {
                        window.open('#!/edit/' + $scope.new_bot_name + '/db/' + $scope.path_encode);
                        url_opened = true
                    }
                });
                $("#newRobotModal").modal('hide');
            })
        }
        $("#newRobotModal").on('shown.bs.modal', function (e) {
            $scope.new_bot_name = ""
            $scope.new_bot_description = ""
            $scope.$apply();
        });
        $scope.$watch('$root.robot_name', function (e, r) {
            document.title = $rootScope.robot_name + " - Rocketbot Studio - " + version;
            $scope.name_no_valid = false;
            if (!e) {
                $scope.name_no_valid = true;
            }
        }, true)
        if (!isElectron) {

            window.addEventListener("beforeunload", function (e) {
                console.log("beforeunload")

                if ($scope.commands.length === 0) {
                    delete $scope.last_saved;
                }
                if ($scope.commands.length > 0 && $scope.last_saved) {
                    var b = angular.copy($scope.setToPause(angular.copy($scope.commands), true));
                    if ($scope.last_saved != md5(JSON.stringify(b))) {
                        e.returnValue = "No se han guardados algunos cambios";
                        return "No se han guardados algunos cambios";
                    }
                }
            });

        }

        /**
        * Escuchar eventos de ventanas abiertas por rocket
        */
        var eventMethod = window.addEventListener ? "addEventListener" : "attachEvent";
        var eventer = window[eventMethod];
        var messageEvent = eventMethod == "attachEvent" ? "onmessage" : "message";

        // Listen to message from child window
        eventer(messageEvent, function (e) {
            try {
                var data = e.data
                if (data.type && data.type == 'iframe') {
                    $scope.command_content['iframe'] = data.commands;
                }
                if (data.type && data.type == 'scrollTo') {
                    document.getElementById(data.id).scrollIntoView({ block: 'center', behavior: 'smooth' });
                }
                if (data.type && data.type == 'reloadModules') {
                    Modules.get(function (data) {
                        $rootScope.modules = data.data;
                        $rootScope.accept_var();
                    });
                }
                if (data.type && data.type == 'viewMarkdown') {
                    console.log("markdown")
                    $scope.markdown = data.data;
                    if (!$scope.$$phase) {
                        $scope.$apply();
                    }
                    $("#modal_markdown").modal()
                }
                if (data.type && data.type == 'viewModal') {
                    $scope.dataHtml = data;
                    if (!$scope.$$phase) {
                        $scope.$apply();
                    }
                    $("#modal_generic").modal()
                }
                if (data.type && data.type == 'getVar') {
                    var ret = []
                    for (var t = 0; t < $scope.vars.length; t++) {
                        if ($scope.vars[t].name == data.var) {
                            ret = angular.copy($scope.vars[t]);
                            break;
                        }
                    }
                    e.source.postMessage({ 'data': ret }, e.origin);
                }

                if (data.type && data.type == 'addCommand') {
                    var ret = []
                    $scope.edit_command = false;

                    $scope.command_father = data.father
                    $scope.command_content = data.command;
                    $scope.command_father_op = data.option;
                    $scope.command_father_op_var = { name: data.var }
                    $scope.addCommand()
                }

                if (data.type && data.type == 'addRobot') {
                    $scope.addRobot(data.data)
                }

                if (data.type && data.type == 'modifyInput') {
                    $scope.command_content[data.data.id] = JSON.stringify(data.data.value);
                    $scope.$$phase || $scope.$apply();
                }

            } catch (e) {
                console.log(e)
            }
        }, false);

        $scope.getParentCommand = function (commandToFind, commandsWhereSearch = undefined, parent_ = null) {
            if (commandsWhereSearch == undefined) { var commandsWhereSearch = $scope.commands }
            let findit = null
            for (let i in commandsWhereSearch) {
                let command = commandsWhereSearch[i]
                if (command.id == commandToFind.id) {

                    return [commandsWhereSearch, parent_, i]
                }
                if (command.group == "logic" && JSON.stringify(command.children).includes(commandToFind.id)) {
                    console.log("children", command.children)
                    findit = $scope.getParentCommand(commandToFind, command.children, command)
                }
                if (command.group == "logic" && JSON.stringify(command.else).includes(commandToFind.id)) {
                    console.log("else", command.else)
                    findit = $scope.getParentCommand(commandToFind, command.else, command)
                }

                if (findit) return findit
            }
        }

        $scope.addRobot = function (robot) {
            const new_commands = angular.copy(robot.project.commands);
            const new_vars = angular.copy(robot.project.vars);
            let commands = null
            let parent = null
            let position = $scope.commands.length

            if ($scope.item_to_update && JSON.stringify($scope.commands).includes($scope.item_to_update.id)) {
                var result_comand_and_parent = $scope.getParentCommand($scope.item_to_update)
                commands = result_comand_and_parent[0]
                parent = result_comand_and_parent[1]
                position = parseInt(result_comand_and_parent[2]) + 1
            }

            if ($scope.item_to_update && $scope.item_to_update.group == "logic" && $scope.item_to_update.father != "break") {
                commands = $scope.item_to_update.children
                parent = $scope.item_to_update
                position = commands.length
            }

            if (!commands || commands.length === 0) commands = $scope.commands

            let last_commands = [...angular.copy(commands.splice(0, position)), ...angular.copy(new_commands), ...angular.copy(commands)]

            for (let variable of new_vars) {
                if (!$scope.vars.find(v => v.name == variable.name)) {
                    $scope.vars.push(angular.copy(variable))
                }
            }
            if (parent && parent.children == commands) {
                parent.children = last_commands
            }
            if (parent && parent.else == commands) {
                parent.else = last_commands
            }
            if (!parent) {
                $scope.commands = last_commands
            }
            $scope.$$phase || $scope.$apply();
        }


        $scope.viewHelp = function (video, t) {
            BigPicture({
                el: t,
                ytSrc: video
            })
        };

        $scope.exportAllToDB = function (includeModules) {
            $scope.loading = true;
            Bots.exportDb($rootScope.robot_name, $scope.path_encode, function (data) {
                $scope.loading = false;
                $('#modal_export_bots').modal('hide');
            }, includeModules)
        };
        $scope.exportAllToProd = function (includeModules) {
            $scope.loading = true;
            Bots.exportDbProd($rootScope.robot_name, $scope.path_encode, function (data) {
                $scope.loading = false;
                $('#modal_export_bots').modal('hide');
            }, includeModules)
        };
        $scope.exportBot = function () {
            $scope.save_bot(function () {
                let includeModules = document.getElementById("includeModules").checked;
                let exportAsProduction = document.getElementById("exportAsProduction").checked;
                if (exportAsProduction) {
                    return $scope.exportAllToProd(includeModules)
                }
                return $scope.exportAllToDB(includeModules)
            })
        }
        $scope.back = function () {
            $indexedDB.openStore(dbname, function (store) {
                var find = store.query();
                count_modifications--;
                if (count_modifications < 0) {
                    count_modifications = 0;
                }
                find = find.$eq(count_modifications);
                find = find.$index("count_idx");
                store.eachWhere(find).then(function (e) {

                    $scope.commands = JSON.parse(e[e.length - 1]['data'])
                });
            });
        }

        /**
        * Add bot to the list to generate exportable list of robots to database.
        * @function addRobotChildren
        * @param  {String} name Robot name to add to list
        */
        $scope.addRobotChildren = function (name) {
            if (!$scope.robot_children.includes(name)) {
                $scope.robot_children.push(name);
            }
        }

        /**
        * Remove bot from listo to generate exportable list of robots to database.
        * @function removeChildren
        * @param  {String} name
        */
        $scope.removeChildren = function (name) {
            $scope.robot_children.splice(name, 1)
        }



        /**
        * Redirect to clear RocketbotStudio
        * @function newbot
        *
        */
        $rootScope.newbot = function () {
            console.log("New bot")
            if (isElectron) {
                var b = angular.copy($scope.setToPause(angular.copy($scope.commands), true));
                if ($scope.commands.length === 0) {
                    delete $scope.last_saved;
                }
                if ($scope.commands.length > 0 && $scope.last_saved && $scope.last_saved != md5(JSON.stringify(b))) {
                    if (window.confirm("Do you want to leave this site? \nYou have unsaved work")) {
                        $window.location.href = "/";
                    }

                } else {
                    console.log("Go to main")
                    location.href = "/";
                }
            } else {
                console.log("Go to main")
                location.href = "/";
            }
        }


        /**
        * Open and load a robot to edit by name
        * @method loadBotUrl
        * @param  {String} name Robot name
        */
        $rootScope.loadBotUrl = function (bot) {
            var b = angular.copy($scope.setToPause(angular.copy($scope.commands), true));
            let diferentMd5 = Validators.diferentMd5($scope.last_saved, JSON.stringify(b))
            if (diferentMd5 && !confirm("Hay cambios que no se guardaron, desea continuar?")) {
                return
            }
            $window.location.href = "#!/edit/" + bot.name + "/db/" + $scope.bot_db_path;

            // if ($scope.last_saved && $scope.last_saved != md5(JSON.stringify(b))) {
            //     if (confirm("Hay cambios que no se guardaron, desea continuar?")) {
            //         $window.location.href = "#!/edit/" + bot.name + "/db/" + $scope.bot_db_path;
            //     }
            // } else {
            //     $window.location.href = "#!/edit/" + bot.name + "/db/" + $scope.bot_db_path;
            // }
        }


        /**
        * Generates the modal to autocomplete variables
        * @function accept_var
        */
        $rootScope.accept_var = function () {

            $(".accept_vars").textcomplete([{
                match: /(^|\s){(\w*)$/,
                search: function (term, callback) {

                    var words = [];
                    for (var t = 0; t < $scope.vars.length; t++) {
                        words.push($scope.vars[t].name);
                    }
                    callback($.map(words, function (word) {
                        return word.indexOf(term) === 0 ? word : null;
                    }));
                },
                replace: function (word) {
                    return '{' + word + '}';
                },
                template: function (hit) {
                    return hit;
                },
            }]);
            $(".accept_vars").textcomplete([{
                match: /(^|\s)%(\w*)$/,
                search: function (term, callback) {

                    var words = [
                        'rocketbot_last_status',
                        'rocketbot_children_vars',
                        'date',
                        'day',
                        'month',
                        'year',
                        'hour',
                        'minute',
                        'second',
                        'milisecond',
                        'machine',
                        'tab',
                        'newline',
                        'enter',
                        'osname',
                    ];

                    callback($.map(words, function (word) {
                        return word.indexOf(term) === 0 ? word : null;
                    }));
                },
                replace: function (word) {
                    return '%' + word + '%';
                },
                template: function (hit) {
                    return hit;
                },
            }]);
        }



        window.setTimeout(function () {
            $('#files').change(function (e) {
                $scope.loadFile(e);
                $('#files').hide();
            });
            $("input").attr("autocomplete", "off")
        }, 500);
        $timeout(function () {

            if (document.getElementById('code_edit')) {
                editableCodeMirror = CodeMirror.fromTextArea(document.getElementById('code_edit'), {
                    mode: "javascript",
                    theme: "material",
                    lineNumbers: true
                });
            }
            $('[data-toggle="tooltip"]').tooltip();
            $rootScope.accept_var();
            var demo = document.querySelector('#command-list');
            //ps = new PerfectScrollbar(demo);

        }, 1000)
        $scope.loading = false;

        Modules.get(function (data) {
            $rootScope.modules = data.data;
            $rootScope.accept_var();
        });
        $scope.searchFile = function (d, extensions) {
            $scope.loading = true;
            Files.searchFile(function (data) {
                var input = $("#" + d);
                input.val(data.data);
                input.trigger('input');
                input.trigger('change');
                $scope.loading = false;
                if (!$scope.$$phase) {
                    $scope.$apply();
                }
            }, extensions);
        };

        $scope.searchFolder = function (d) {
            $scope.loading = true;
            Files.getFolder(function (data) {
                var input = $("#" + d);
                input.val(data.data);
                input.trigger('input');
                input.trigger('change');
                $scope.loading = false;
                if (!$scope.$$phase) {
                    $scope.$apply();
                }
            });
        }
        $scope.searchFileSave = function (d, extensions, default_extension) {
            $scope.loading = true;
            Files.searchFileSave(function (data) {
                var input = $("#" + d);
                $scope.loading = false;
                input.val(data.data);
                input.trigger('input');
                input.trigger('change');
                if (!$scope.$$phase) {
                    $scope.$apply();
                }
            }, extensions, default_extension);
        };


        /**
        * Open modal and edit item
        * @function edit_command_modal
        * @param  {object} item Data on item
        * @param  {object} fa Item's father
        */
        $scope.edit_command_modal = function (item, fa) {
            $rootScope.accept_var();
            $scope.command_father = "";
            this.command_father_op = "";
            $scope.command_father_op = "";

            this.command_father_op_var = '';
            $scope.command_father_op_var = "";

            this.command_father_op_getvar = "";
            $scope.command_father_op_getvar = "";
            $scope.command_content = "";
            this.command_content = "";
            $scope.option_view = "";
            if (item.group == "logic" && item.father != "break") {
                $scope.addIfChildren = true;
                $scope.addIfItem = item;
            } else {
                $scope.addIfChildren = false;
            }
            if (!fa) {
                $scope.edit_command = false;
                $scope.edit_vars = false;
                return;
            }
            $scope.command_father = fa;

            if (fa.options) {
                $scope.command_father_op = item.option;
            }
            $scope.command_content = item.command;
            if (item.screenshot) {
                $scope.img_event = item.screenshot;
            }
            if (item.var) {
                $scope.vars.forEach(function (it) {
                    if (it.name == item.var) {
                        $scope.command_father_op_var = it;
                        return;
                    }
                })
                if ($scope.command_father_op_var == "") {
                    console.log("is empty");
                    $scope.command_father_op_var = {
                        "data": "",
                        "name": item.var,
                        "type": "string"
                    }
                }
            }
            if (item.getvar) {
                //$scope.command_father_op_getvar = item.getvar;
                $scope.vars.forEach(function (it) {
                    if (it.name == item.getvar) {
                        $scope.command_father_op_getvar = it;
                    }
                })
                if ($scope.command_father_op_getvar == "") {
                    console.log("is empty");
                    $scope.command_father_op_getvar = {
                        "data": "",
                        "name": item.getvar,
                        "type": "string"
                    }
                }

            }
            delete $scope.item_to_update;
            $timeout(function () {
                $scope.option_view = $scope.getOptions($scope.command_father);

            })
            $scope.item_to_update = item;
            $scope.edit_command = true
            $scope.edit_vars = false;
            $scope.setData(fa, item);
        }
        $scope.save_bot = function (fc) {
            $scope.savingbot = true;
            var b = angular.copy($scope.setToPause(angular.copy($scope.commands), true));
            $scope.master = {
                project: {
                    profile: {
                        ide_version: $rootScope.version,
                        name: $rootScope.robot_name,
                        description: $rootScope.robot_description || "",
                        version: $rootScope.robot_version || "",
                        father: $rootScope.robot_type || ""
                    },
                    commands: b,
                    vars: $scope.vars,
                    ifs: $scope.ifs,
                    modules: $scope.modules_in_bot
                }
            }
            $scope.last_saved = md5(JSON.stringify(b));
            var db = '';
            if ($rootScope.bot_type == 'db') {
                db = $rootScope.path_encode
            }
            Bots.add(
                $rootScope.robot_name,
                $scope.master,
                $rootScope.robot_description,
                db,
                $rootScope.robot_version || "",
                $rootScope.robot_type || "",
                function (data) {
                    $scope.bots = [data.data];
                    $scope.savingbot = false;
                    Notification.savedSuccessfully();
                    $scope.getBots_in_bot($rootScope.robot_name);
                    if (fc) fc();
                }, function (data) {
                    try {
                        console.error(data);
                    } catch (err) {
                        console.log(data);
                    }
                    Notification.savedError();
                    $scope.savingbot = false;
                });
        };
        $scope.loadfolder = function (bot) {
            $scope.folder = bot;
            $("#modal_load_folder").modal('show');
        };
        $scope.getBots_in_bot = function (name, bot) {
            Bots.project(name, $rootScope.path_encode, function (data) {
                $rootScope.bots_in_bot = data.data;
                $scope.modules_in_bot = data.data.filter(bot => bot.name == name)[0].modules;
                if (Validators.installedModules($scope.modules_in_bot)) {
                    Notification.uninstalledModules()
                }
            }, bot);
        };
        $scope.save_bot_as = function () {
            //$rootScope.path_encode = '';
            $scope.save_bot_file(false);
        };
        $scope.save_bot_file = function (n) {
            /**
            * Save bot on file
            * @type {boolean}
            */
            $scope.savingbot = true;
            var b = angular.copy($scope.setToPause(angular.copy($scope.commands), true));
            $scope.master = {
                project: {
                    profile: {
                        ide_version: $rootScope.version,
                        name: $rootScope.robot_name,
                        description: $rootScope.robot_description || "",
                        version: $rootScope.robot_version || "",
                        father: $rootScope.robot_type || ""
                    },
                    commands: b,
                    vars: $scope.vars,
                    ifs: $scope.ifs,
                    modules: $scope.modules_in_bot
                }
            };
            $scope.last_saved = md5(JSON.stringify(b));
            var data = $.param({
                "file": n ? $rootScope.path_encode : '',
                "content": JSON.stringify($scope.master),
                "type": $rootScope.bot_type
            });
            Bots.saveFile(data, function (data) {
                if (data.data.saved) {
                    //$scope.bots = [{'bots': JSON.parse(data.data.bots)['bots']}];
                    $scope.savingbot = false;
                    $rootScope.file_path = data.data.file;
                    //$rootScope.path_encode = data.data.encode;
                    Notification.savedSuccessfully();

                    $scope.getBots_in_bot($rootScope.robot_name);
                } else {
                    Notification.savedError();
                }
            }, function (data) {
                try {
                    console.error(data);
                } catch (err) {
                    console.log(data);
                }
                Notification.savedError();
                $scope.savingbot = false;
            });
        };
        $scope.getbotFile = function (path) {
            $("body.page-loaded .loader-wrap ").show();

            $scope.loading = true;
            delete $scope.commands;
            delete $scope.vars;
            delete $scope.ifs;
            delete $scope.last_saved;
            $rootScope.robot_name = name;
            $rootScope.robot_description = "";
            Bots.getFile(path, function (data) {
                try {
                    if (path == '') {
                        window.location.href = "#!/edit/_/file/" + data.data.encode;
                        return;
                    }
                    $rootScope.file_path = data.data.filename;
                    var d = JSON.parse(data.data.content);
                    $rootScope.robot_name = angular.copy(d.project.profile.name);
                    $rootScope.robot_description = angular.copy(d.project.profile.description);
                    $rootScope.path_encode = data.data.encode;
                    $rootScope.bot_type = 'file';
                    $scope.commands = angular.copy(d.project.commands);
                    var b = angular.copy($scope.setToPause(angular.copy(d.project.commands), true));
                    $scope.last_saved = md5(JSON.stringify(b));
                    $scope.vars = angular.copy(d.project.vars);
                    $scope.ifs = d.project.ifs;
                    if (!$scope.$$phase) {
                        $scope.$apply(

                        );
                    }
                    $("#nav-home-tab").tab("show");

                    $scope.loading = false;
                } catch (error) {
                    console.log(error);
                }
                $rootScope.loadMenus();
                $timeout(
                    function () {
                        $("body.page-loaded .loader-wrap ").fadeOut(1000);
                        // ps_commands = new PerfectScrollbar( document.querySelector('#list_commands'))
                        $('input').attr('autocomplete', 'off');
                        $rootScope.accept_var()
                    }
                );

            });
        };
        $scope.getbot = function (name, db, type_) {
            $("body.page-loaded .loader-wrap ").show();

            $scope.loading = true;
            delete $scope.commands;
            delete $scope.vars;
            delete $scope.ifs;
            delete $scope.last_saved;
            $rootScope.robot_name = name;
            $rootScope.robot_description = "";
            if (!type_ || type_ == 'db' || type_ == '') {
                Bots.get(name, db, function (data) {
                    try {
                        $rootScope.robot_name = angular.copy(name);
                        $rootScope.robot_description = angular.copy(data.data[0].description);
                    } catch (e) {

                    }
                    try {
                        $rootScope.robot_type = angular.copy(data.data[0].father);
                        $rootScope.robot_version = angular.copy(data.data[0].version);
                    } catch (e) {

                    }
                    try {
                        $rootScope.bot_type = 'db';
                        var d = JSON.parse(data.data[0].data);
                        $scope.commands = [];
                        $scope.ifs = [];
                        if (d.project && d.project.commands && d.project.commands.length > 0) {
                            setTimeout(function () {
                                $scope.commands = angular.copy(d.project.commands);
                                if (!$scope.$$phase) {
                                    $scope.$apply();
                                }
                                $rootScope.accept_var()

                            }, 2000)
                            var b = angular.copy($scope.setToPause(angular.copy(d.project.commands), true));
                            $scope.last_saved = md5(JSON.stringify(b));
                            $scope.vars = angular.copy(d.project.vars);
                            if (d.project.ifs) {
                                $scope.ifs = d.project.ifs;
                            }
                        }


                    } catch (error) {
                        console.log(error);
                    }
                    $("#nav-home-tab").tab("show");

                    $scope.loading = false;
                    $rootScope.loadMenus(function () {

                    });
                    $timeout(
                        function () {
                            $("body.page-loaded .loader-wrap ").fadeOut(2000);
                            // ps_commands = new PerfectScrollbar( document.querySelector('#list_commands'))
                            $('input').attr('autocomplete', 'off');
                            if (!$scope.$$phase) {
                                $scope.$apply();
                            }
                        }
                    );

                });
            } else {
                $scope.getbotFile(db);
            }
        };

        /**
        * Drag and Drop de archivos del robot JSON
        */
        $scope.dzMethods = {};
        $scope.dzCallbacks = {
            'addedfile': function (file) {
                $rootScope.file_path = '';
                $scope.parseFile(file);
                console.log("callback")
            }
        };
        $scope.dzOptions = {
            url: '/',
            autoProcessQueue: false,
            dictDefaultMessage: 'Arrastre aquí un archivo de Rocketbot Studio (json) para editar<br>Drag here a Rocketbot Studio (json) file to edit',
        };
        $scope.setContextualMenu = function () {
            // Contextual menu
            $rootScope.menuOptions = function (item) {
                return [

                    {
                        html: '<a class="dropdown-item" tabindex="-1" href="" style="text-align: left; padding-right: 8px;"><img loading="lazy" src="images/header/variables.svg" style="width: 20px;"> ' + ($rootScope.language[$rootScope.language_default].add_variable_text || "Add variable") + '</a>',
                        click: function (item) {
                            $scope.editVar(null); $scope.addVarModal(null, false)
                        }
                    },
                    {
                        text: '<i class="fa fa-copy"></i> ' + ($rootScope.language[$rootScope.language_default].copy || "Copy"),
                        click: function ($itemScope, $event, modelValue, text, $li) {
                            console.log($itemScope.command)
                            var data_ = JSON.stringify($itemScope.command);
                            $.post(
                                url_server + "copy", {
                                'data': data_
                            }
                            ).then(function (data) {

                            });
                        }
                    },

                    {
                        text: '<i class="fa fa-paste"></i> ' + ($rootScope.language[$rootScope.language_default].paste || "Paste"),
                        click: function ($itemScope, $event, modelValue, text, $li) {
                            $.post(
                                url_server + "paste"
                            ).then(function (data) {
                                var d = JSON.parse(data);
                                delete d['$$hashKey']
                                if (d.command.group == 'logic') {
                                    $rootScope.copyCommand($itemScope.command.children, d);
                                } else {
                                    $rootScope.copyCommand($rootScope.commands, d);
                                }
                            });
                        }
                    },
                    {
                        text: '<i class="fa fa-pencil-alt"></i> ' + ($rootScope.language[$rootScope.language_default].change_description || "Change description"),
                        click: function ($itemScope, $event, modelValue, text, $li) {
                            $rootScope.editing_command_original = $itemScope.command;
                            $rootScope.editing_command = angular.copy($itemScope.command);
                            $("#modal_change_description").modal('show');

                        }
                    },
                    null
                    ,
                    {
                        text: '<i class="fa fa-trash text-danger"></i> ' + ($rootScope.language[$rootScope.language_default].delete || "Delete"),
                        click: function ($itemScope, $event, modelValue, text, $li) {
                            $scope.removeCommand($scope.commands, $itemScope.command.id);
                        }
                    },
                    null,
                    {
                        text: '<i class="fa fa-circle"></i> ' + ($rootScope.language[$rootScope.language_default].toggle_breakpoint || "Toggle breakpoint"),
                        click: function ($itemScope, $event, modelValue, text, $li) {
                            $scope.setStopDebug($itemScope.command.id)
                        }


                    },
                    {
                        text: '<i class="far fa-eye-slash"></i> ' + ($rootScope.language[$rootScope.language_default].disable_help || "Disable"),
                        click: function ($itemScope, $event, modelValue, text, $li) {
                            $itemScope.command["disabled"] = true;
                        },
                        displayed: function () {
                            console.log(item)
                            return !item.command["disabled"] || item.command["disabled"] == false
                        }


                    },
                    {
                        text: '<i class="far fa-eye"></i> ' + ($rootScope.language[$rootScope.language_default].enable_command || "Disable"),
                        click: function ($itemScope, $event, modelValue, text, $li) {
                            $itemScope.command["disabled"] = false;
                        },
                        displayed: function () {

                            return item.command["disabled"]
                        }


                    },
                    {
                        text: '<i class="fas fa-play-circle"></i> ' + ($rootScope.language[$rootScope.language_default].run_command || "Run command"),
                        click: function ($itemScope, $event, modelValue, text, $li) {
                            $scope.play($itemScope.command)
                        }


                    },
                    {
                        text: '<i class="fas fa-flag-checkered"></i> ' + ($rootScope.language[$rootScope.language_default].run_robot || "Run Robot"),
                        click: function ($itemScope, $event, modelValue, text, $li) {
                            $scope.execCommandsInit()
                        }


                    },
                    {
                        html: '<a target="_blank" href_="" id="help_command_menu" class="dropdown-item" tabindex="-1" href="#" style="text-align: left; padding-right: 8px;">' +
                            '<i class="fa fa-question-circle"></i> ' + ($rootScope.language[$rootScope.language_default].command_help || "Command Help") +
                            '</a>',
                        click: function ($itemScope, $event, modelValue, text, $li) {
                            console.log($rootScope.help_command_link)
                            window.open($rootScope.help_command_link)

                        }
                    },

                ];
            }
        }
        /**
        * Fin drag and drop
        */
        $timeout(function () {
            $rootScope.loadMenus($scope.setContextualMenu());
        }, 1000);

        if ($routeParams && $routeParams.robo_name) {
            var db = window.sessionStorage.db, type_ = window.sessionStorage.type;

            if ($routeParams.type) {
                type_ = $routeParams.type;
                db = $routeParams.path;
            }
            $rootScope.path_encode = db;
            $rootScope.bot_type = type_;

            $scope.getbot($routeParams.robo_name, db, type_);
            $scope.getBots_in_bot($routeParams.robo_name)
        }

        $scope.loadAllBots = function () {
            var p = $rootScope.path_encode;
            if ($rootScope.bot_type != 'db') {
                p = '';
            }
            Bots.getall(p, function (data) {
                $scope.bots = [data.data];
                $scope.bot_db_path = data.data.db_path;
            });
        };
        $scope.loadAllBots();
        $scope.removebot = function (bot) {
            $scope.bot_to_delete = bot;
            $("#modal_delete_bot").modal('show');

        };
        $scope.removebotok = function () {
            Bots.remove($scope.bot_to_delete, $rootScope.path_encode, function (data) {
                $scope.bots = [data.data];
                $("#modal_delete_bot").modal('hide');

            });
        };
        $scope.dmove = function (srcList, index) {
            //srcList.splice(index, 1);

        };

        $scope.onDrop = function (srcList, srcIndex, targetList, targetIndex) {

            var tr = angular.copy(srcList[srcIndex]);

            var id;

            if (tr) {
                if (tr.id) {
                    id = angular.copy(tr.id);
                    tr.id = guid();
                }
                $scope.apply_();
                targetList.splice(targetIndex, 0, tr);
                $scope.removeCommand(srcList, id);
            }
            $scope.apply_();
            return true;
        };
        $scope.dragoverCallback = function (index, external, type, callback) {
            $scope.logListevent('dragged over', index, external, type);
            // Invoke callback to origin for container types.
            if (type == 'container' && !external) {
            }
            return index < 10; // Disallow dropping in the third row.
        };

        $scope.dropCallback = function (index, item, external, type, commands) {

            if (item && !external && $rootScope.ini_add_command == 0) {
                $scope.setMainDefault();
                $scope.position_to_put = index;
                $scope.command_list_to_add = commands;
                $scope.setData(item, null);

            }
            $rootScope.ini_add_command++;
            return !!item;
        };

        $scope.logEvent = function (message) {
            console.log(message);
        };

        $scope.logListevent = function (action, index, external, type) {
            var message = external ? 'External ' : '';
            message += type + ' element was ' + action + ' position ' + index;
            console.log(message);
        };

        $scope.openFileCrop = function () {
            $("#crop_file").removeClass("d-none").click().addClass("d-none");

        };
        $scope.dataUrl = "images/bkg.jpg";
        $rootScope.onLive = function () {
            $rootScope.mode_live = this.mode_live;
        };
        $scope.getCommandView = function (parent) {
            var ret = 'views/command_default.html';
            if (parent && parent.father == 'setVar') {
                ret = 'views/command_vars.html'; //?_='+new Date();
            }
            if (parent && parent.group == 'virtual') {
                ret = 'views/command_crop.html' //?_='+new Date();
                parent.data_ = JSON.parse(parent.command);
            }
            if (parent && parent.father == 'use') {
                ret = 'views/command_use_navigator.html'; //?_='+new Date();
                parent.data_ = JSON.parse(parent.command);
            }
            if (parent && parent.father == "module" && parent.group == "scripts") {
                ret = 'views/command_module.html';
            }

            //this.command_parent = $scope.getFatherData(parent);
            this.command_parent = Command.getFatherData(parent);
            if (!$scope.$$phase) {
                $scope.$apply();
            }
            return ret;
        };
        $scope.messageTestOrchestator = "...";
        $scope.orch = 0;

        /**
        * Cropper para imagenes virtualizadas
        */
        var fileCrop, dataCropper;
        $scope.onFile = function (blob) {
            hideCropper();
            Cropper.encode((file = blob)).then(function (dataUrl) {
                $scope.dataUrl = dataUrl;
                fileCrop = blob;
                $timeout(showCropper); // wait for $digest to set image's src
            });
        };
        $scope.controls = [];
        $scope.hideCropper = function () {
            hideCropper();
        };
        $scope.cropper = {};
        $scope.cropperProxy = 'cropper.first';
        $rootScope.ref_data = null;
        $rootScope.point_data = null;
        $scope.command_img_point = null;
        $scope.start_script = false;
        $scope.preview = function (t) {
            if (!fileCrop || !dataCropper) {
                return;
            }
            Cropper.crop(fileCrop, dataCropper).then(Cropper.encode).then(function (dataUrl) {
                if (t == 0) {
                    $rootScope.ref_data = dataCropper;
                    $scope.command_img = dataUrl;
                } else {
                    $rootScope.point_data = dataCropper;
                    $scope.command_img_point = dataUrl;
                }
                ($scope.preview || ($scope.preview = {})).dataUrl = dataUrl;
            });
        };

        $scope.clear = function (degrees) {
            if (!$scope.cropper.first) return;
            $rootScope.ref_data = null
            $rootScope.point_data = null
            $scope.cropper.first('clear');
        };

        $scope.scale = function (width) {
            Cropper.crop(fileCrop, dataCropper)
                .then(function (blob) {

                    return Cropper.scale(blob, {
                        width: width

                    });
                })
                .then(Cropper.encode).then(function (dataUrl) {
                    $scope.command_img = dataUrl;
                    ($scope.preview || ($scope.preview = {})).dataUrl = dataUrl;
                });
        }

        $scope.options = {
            maximize: true,
            crop: function (dataNew) {
                dataCropper = dataNew;
            }
        };

        $scope.showEvent = 'show';
        $scope.hideEvent = 'hide';

        function showCropper() {
            $scope.$broadcast($scope.showEvent);
        }

        function hideCropper() {
            $rootScope.ref_data = null;
            $rootScope.point_data = null;
            $scope.command_img_point = null;
            $scope.$broadcast($scope.hideEvent);
        }
        /**
        * End cropper
        * */
        $scope.img_event = default_img;
        $scope.edit_command = false;
        $scope.edit_vars = false;
        $rootScope.mode_live = false;
        $rootScope.command_father = [];
        $scope.vars = [];
        $scope.ifs = [];
        $scope.onPos = false;
        $scope.pos = -1;
        $scope.extra_padding = 0;
        $scope.accuracy = 1.0;
        $scope.index_pos = -1;
        $scope.delta = {
            down: 0,
            up: 0,
            left: 0,
            right: 0
        }
        $scope.SMTP = "smtp.gmail.com";
        $scope.SMTP_PORT = 465;
        $scope.IMAP = "imap.gmail.com";
        $scope.IMAP_PORT = 993;
        $scope.apps = [];


        $scope.master = {
            project: {
                profile: {
                    name: "",
                    description: "",
                    version: ""
                },
                commands: [],
                vars: [],
                ifs: []
            }
        };
        $scope.commands_father = [];
        $scope.commands = [];
        $scope.new_command = "";
        $scope.if_ids = [];

        $scope.editVar = function (v) {
            $scope.edit_command = false;
            $scope.edit_vars = true;
            $scope.var_data = "";
            $scope.var_name = "";
            $scope.var_type = "string";
            $scope.var_to_update = null;
            if (v) {
                $scope.var_data = v.data;
                $scope.var_name = v.name;
                $scope.var_type = v.type || "string";
                $scope.var_to_update = v;
            }
        };
        $scope.eraseVar = function (v) {
            $scope.var_to_update = v
            $scope.var_to_update.data = "";
            $scope.edit_command = false;
            $scope.edit_vars = true;
            $rootScope.accept_var()
        }
        $scope.updateVar = function () {

            $scope.var_to_update.data = angular.copy($scope.var_data);
            $scope.var_to_update.name = angular.copy($scope.var_name);
            $scope.var_to_update.type = angular.copy($scope.var_type || "string");
            $scope.edit_vars = false;
            $rootScope.accept_var()
        };
        $scope.getIf = function (from, myindex) {
            var tmp = ""

            for (var t = from; t < myindex; t++) {
                if ($scope.commands[t].father == "evaluateIf") {
                    tmp = $scope.commands[t].id
                }
                if ($scope.commands[t].father == "endIf") {
                    tmp = ""
                }
            }
            if (tmp == $scope.commands[myindex].if) {
                tmp = "";
            }
            return tmp;
        };
        $scope.setMainDefault = function () {
            $scope.addIfChildren = false;
            $scope.item_to_update = null;
            $scope.actual_if = null;
        };
        $scope.getOptions = function (fa) {

            var ret = 'views/edit_command_default.html';
            /*if (fa.father == 'use') {
                ret = 'views/edit_command_navigator.html';
                $scope.navigator_conf = JSON.parse(angular.copy($scope.item_to_update.command));
                $scope.navigator_conf_url = $scope.navigator_conf.url ? angular.copy($scope.navigator_conf.url) : "";
                $scope.navigator_conf_tipo = $scope.navigator_conf.tipo;
                if (!$scope.$$phase) {
                    $scope.$apply();
                }
            }*/
            return ret;
        }
        $scope.viewDataItem = function (item, fa) {
            $scope.option_view = "";


            if (item.group == "logic" && item.father != "break") {
                $scope.addIfChildren = true;
                $scope.addIfItem = item;
            } else {
                $scope.addIfChildren = false;
            }
            if (!fa) {
                $scope.edit_command = false;
                $scope.edit_vars = false;
                return
            }
            $scope.command_father = fa;
            if (fa.options) {
                $scope.command_father_op = item.option;
            }
            $scope.command_content = item.command;
            if (item.screenshot) {
                $scope.img_event = item.screenshot;
            }
            if (item.var) {
                $scope.vars.forEach(function (it) {
                    if (it.name == item.var) {
                        $scope.command_father_op_var = it;
                    }
                })
            }
            delete $scope.item_to_update;
            $timeout(function () {
                $scope.option_view = $scope.getOptions($scope.command_father);

            });
            $scope.item_to_update = item;
            $scope.edit_command = true;
            $scope.edit_vars = false;

        };
        $scope.viewViewer = function (addon) {
            if (addon.inside) {
                $("#nav-profile-tab3-2").click()
            }
        }
        $scope.updateData = function (conf) {
            var con = null;
            if (conf) {
                con = JSON.stringify(conf);
            } else {
                con = angular.copy(this.command_content || $scope.command_content);
            }
            var ov = this.command_father_op_var || $scope.command_father_op_var;
            var op = this.command_father_op || $scope.command_father_op;

            $scope.item_to_update.command = angular.copy(con);
            $scope.item_to_update.option = angular.copy(op);
            $scope.item_to_update.var = !angular.isUndefined(ov) ? angular.copy(ov) : "";
            $scope.item_to_update.getvar = !angular.isUndefined($scope.command_father_op_getvar) ? angular.copy($scope.command_father_op_getvar) : "";
            $scope.item_to_update.stop_onerror = $scope.stop_onerror;
            try { $scope.item_to_update.run_onerror = $scope.run_onerror; } catch (e) { }
            try { $scope.item_to_update.run_onerror_robot = $scope.run_onerror_robot; } catch (e) { }
            for (var t = 0; t < $scope.commands.length; t++) {
                if ($scope.commands[t].id == $scope.item_to_update.id) {
                    $scope.commands[t] = angular.copy($scope.item_to_update);
                }
            }
            $scope.edit_command = false;
            $scope.apply_();
        };

        $scope.trycatchs = []
        $scope.setDataResult = function (data, id, res, parent_) {
            for (var t = 0; t < data.length; t++) {
                if (data[t].id == id) {
                    data[t].execute = (res.status === true || String(res.status).toLowerCase() == 'true') ? 1 : 3;
                    data[t].message = res.message;
                    data[t].extra = res.extra;
                    data[t].result = res.status;
                    data[t].time = res.time ? res.time : 0;
                    data[t].screenshot = "" //res.img ? 'data:image/jpeg;base64,' + res.img : default_img;
                    if (parent_ && parent_.father == 'trycatch' && data[t].execute == 3) {
                        parent_.extra.res = false;
                    }
                    if (Number(data[t].execute) == 3 || (data.extra && data.extra.res && (data.extra.res === false || String(data.extra.res).toLowerCase() == 'false'))) {
                        if ($scope.trycatch && $scope.trycatch.length > 0) {
                            var tmp = angular.copy($scope.trycatch);
                            delete $scope.trycatch;
                            return tmp;
                        }
                    }

                    return data;
                }
                if (data[t].children) {
                    data[t].children = angular.copy($scope.setDataResult(data[t].children, id, res, data[t]))
                }
                if (data[t].else) {
                    data[t].else = angular.copy($scope.setDataResult(data[t].else, id, res, data[t]))
                }
            }
            return data;
        };
        $scope.stop_script = function () {
            $scope.start_script = false;
        };
        $scope.play = function (item) {
            if (item.group == "scripts") {
                Debug.start();
            }


            $scope.setToPause([item]);
            if (item.extra && item.extra.res) {
                item.extra.res = false;
            }

            if (item.father == "for") {
                item.extra = {
                    count: 0,
                    res: false
                };
                var c = JSON.parse(item.command);
                item.command = JSON.stringify({
                    'iterable': c['iterable'],
                    'count': 0
                })
            }
            item.execute = 0;
            item.execute_debbug = 0;
            item.img = "";
            item.screenshot = "";
            executing_code = [angular.copy(item)]
            executing_code['message'] = ""
            var data = {
                project: {
                    profile: {
                        name: $rootScope.robot_name,
                        description: $rootScope.robot_description || "",
                        version: $rootScope.version
                    },
                    vars: $scope.vars,
                    commands: executing_code,
                    ifs: $scope.ifs
                }
            };
            $scope.apply_();
            executeCommand(data);
        };
        $scope.trycatchs = []
        var executeCommand = function (data) {
            if (data.project.commands[0].father == "trycatch") {
                $scope.trycatchs.push(angular.copy(data.project.commands[0].else))
            }
            $.post(url_server + 'execute', {
                info: JSON.stringify(data),
                db: $rootScope.path_encode,
                screenshot: $scope.screenshot
            }, function (res) {

                if (res.vars.length > 0) {
                    $scope.vars = angular.copy(res.vars);
                }
                if (res.ifs.length > 0) {
                    $scope.ifs = angular.copy(res.ifs);
                }
                if (data.project.commands[0].father == 'stop') {
                    $scope.start_script = false;
                }
                if (
                    data.project.commands[0].father == 'evaluatewhile' ||
                    data.project.commands[0].father == "evaluateIf" ||
                    data.project.commands[0].father == "for" ||
                    data.project.commands[0].father == "trycatch"
                ) {
                    //data.project.commands[0] = angular.copy($scope.setToPause(data.project.commands[0].children));
                    $scope.start_script = true;
                }
                if (res.status == 'False') {
                    data.project.commands[0].execute = 3
                    $scope.trycatch = $scope.trycatchs[$scope.trycatchs.length - 1]
                    $scope.trycatchs.pop()
                }
                executing_code = angular.copy($scope.setDataResult(executing_code, data.project.commands[0].id, res, data.project.commands[0]))
                var tmp = angular.copy($scope.setDataResult($scope.commands, data.project.commands[0].id, res, data.project.commands[0]));
                delete $scope.commands;
                $scope.commands = angular.copy(tmp);

                if ($rootScope.stop_debug && data.project.commands[0].id == $rootScope.stop_debug) {
                    $scope.start_script = false;

                }

                if (res.stop_all || res.stop) {
                    $scope.start_script = false;

                    $.confirm({
                        title: 'Robot stopped',
                        content: 'Robot stopped by command Stop_all',
                        icon: 'far fa-stop-circle',
                        theme: 'bootstrap',
                        type: 'red',
                        typeAnimated: true,
                        buttons: {
                            ok: {
                                text: 'OK',
                                btnClass: 'btn-danger',
                                action: function () {

                                }
                            }
                        }
                    });
                }

                $scope.apply_();
                $scope.execCommands();
            }, "json");
        };

        $scope.setData = function (params, da) {
            if (params.children && params.children.length > 0) {
                return;
            }
            // if (!da) {
            //     $scope.edit_command = false;
            // }
            delete $scope.module_father;
            $scope.edit_command = !!da;
            $scope.stop_onerror = false;
            $scope.run_onerror = false;
            $scope.run_onerror_robot = false;
            if (!da) {
                $scope.command_father = "";
                this.command_father_op = "";
                $scope.command_father_op = "";

                this.command_father_op_var = '';
                $scope.command_father_op_var = "";

                this.command_father_op_getvar = "";
                $scope.command_father_op_getvar = "";

                $scope.command_father = params;
                this.command_father = params;

                $scope.command_content = "";
                this.command_content = "";
            } else {
                if (da) {
                    try { $scope.stop_onerror = da.stop_onerror; } catch (e) { }
                    try { $scope.run_onerror = da.run_onerror; } catch (e) { }
                    try { $scope.run_onerror_robot = da.run_onerror_robot; } catch (e) { }
                }
            }
            if (params.logic) {

                if (da) {
                    if (da.father == 'for') {
                        var r = JSON.parse(da.command)
                        $scope.command_content = r.iterable;
                    }

                }
                $("#modal_add_logical").modal('show');
            } else if (params.form && params.father != 'module') {
                $scope.command_content = {};
                if (da) {
                    var r;
                    try {
                        r = JSON.parse(da.command);
                    } catch (e) {
                        r = {};
                    }
                    $scope.command_content = r;
                }
                $("#modal_module").modal('show');
                $timeout(function () {
                    $rootScope.accept_var()
                    var obj = document.getElementById("modal_iframe");
                    if (obj) {
                        obj.src = obj.getAttribute('data-iframe');
                        obj.onload = function () {
                            obj.contentWindow.postMessage($scope.command_content['iframe'], "*")
                            obj.style.height = obj.contentWindow.document.documentElement.scrollHeight + 'px';

                        }
                    }

                })
            } else if (params.father == "sendemail") {
                $scope.command_content = {
                    "to": "",
                    subject: "",
                    msg: "",
                    file: ""
                }
                if (da) {
                    var r = JSON.parse(da.command);
                    $scope.command_content = r;
                }
                $("#modal_email_send").modal('show')
            } else if (params.father == "module" && params.group == "scripts") {
                /**
                * Modulos Externos
                */

                for (var t = 0; t < $rootScope.modules[0].children.length; t++) {
                    if ($rootScope.modules[0].children[t].name == params.module_name) {
                        $scope.module_father = $rootScope.modules[0].children[t];
                        var array = [];
                        for (var key in $scope.module_father.dependencies) {
                            var test = {};
                            test = $scope.module_father.dependencies[key];
                            array.push({
                                name: key,
                                version: test
                            });
                        }
                        $scope.module_father.dependencies_ = array;
                        break;
                    }
                }

                $scope.command_content = {
                    module_name: params.module_name,
                    module: params.module
                }
                if (da) {
                    var r = JSON.parse(da.command);
                    $scope.command_content = r;
                }
                $("#modal_module").modal('show');
                $timeout(function () {
                    $rootScope.accept_var()
                    var obj = document.getElementById("modal_iframe");
                    if (obj) {
                        obj.src = obj.getAttribute('data-iframe');
                        obj.onload = function () {
                            obj.contentWindow.postMessage($scope.command_content['iframe'], "*")
                            obj.style.height = obj.contentWindow.document.documentElement.scrollHeight + 'px';

                        }
                    }
                    $('#modal_module').on('shown.bs.modal', function () {

                        $('#nav-module-tab').click()
                    })
                })
            } else if (params.father == "reademail") {
                $scope.command_content = {
                    "id": "",
                    file: ""
                }
                if (da) {
                    var r = JSON.parse(da.command);
                    $scope.command_content = r;
                }
                $("#modal_email_read").modal('show')
            } else if (params.father == "setcell") {
                $scope.cell_ = "";
                $scope.data_ = "";
                if (da) {

                    var t = da.command;
                    $scope.cell_ = t.substr(0, t.indexOf("=")).trim();
                    $scope.data_ = t.substr(t.indexOf("=") + 1, t.length);
                }
                $("#modal_set_excel_cell").modal('show')
            } else if (params.father == "use") {
                $scope.command_content = {
                    "tipo": "0"
                };
                if (da) {
                    $scope.command_content = da.data_;
                    $scope.command_father_op_getvar = $scope.command_father_op_getvar.name;

                }
                $("#modal_navigator").modal('show');

            } else if (params.father == "readxlsx") {
                $scope.command_content = {
                    "file_path": ""
                };
                if (da) {
                    var content;
                    try {
                        content = JSON.parse(da.command)
                    } catch (err) {
                        content = {
                            "file_path": da.command
                        }
                    }

                    $scope.command_content = content;
                    $scope.command_father_op_getvar = $scope.command_father_op_getvar.name;

                }
                $("#modal_archivos_xlsx").modal('show');

            } else if (params.father == "execJs") {
                if (editableCodeMirror) {
                    editableCodeMirror.toTextArea();
                }
                editableCodeMirror = CodeMirror.fromTextArea(document.getElementById('code_edit'), {
                    mode: "javascript",
                    theme: "material",
                    lineNumbers: true,
                    smartIndent: true,
                    autocorrect: true,
                    hint: CodeMirror.hint.javascript
                });

                if (da) {

                    editableCodeMirror.doc.setValue(da.command);
                } else {
                    editableCodeMirror.doc.setValue("");
                }
                //editableCodeMirror.setCursor(0)
                //editableCodeMirror.refresh();
                $("#modal_select_getvar_code").modal('show');

                editableCodeMirror.on('change', function (e) {
                    $scope.command_content = editableCodeMirror.doc.getValue()
                })
                editableCodeMirror.setCursor(0)
                editableCodeMirror.refresh();
            } else if (params.father == "execScriptPython") {
                if (editableCodeMirror) {
                    editableCodeMirror.toTextArea();
                }
                editableCodeMirror = CodeMirror.fromTextArea(document.getElementById('code_edit'), {
                    mode: "python",
                    theme: "material",
                    lineNumbers: true,
                    smartIndent: true,
                    autocorrect: true,
                    hint: CodeMirror.hint.python
                });

                if (da) {

                    editableCodeMirror.doc.setValue(da.command);
                } else {
                    editableCodeMirror.doc.setValue("");
                }
                //editableCodeMirror.setCursor(0)
                //editableCodeMirror.refresh();
                $("#modal_select_getvar_code").modal('show');

                editableCodeMirror.on('change', function (e) {
                    $scope.command_content = editableCodeMirror.doc.getValue()
                })
                editableCodeMirror.setCursor(0)
                editableCodeMirror.refresh();
            } else if (params.father == "savedatafile") {
                $scope.command_content = {
                    file_name: "",
                    type: "",
                    new_line: "",
                    file_data: ""
                }
                if (da) {
                    var r = JSON.parse(da.command)
                    $scope.command_content = r;
                }
                $("#modal_archivos").modal('show');
            } else if (params.father == "waitforobject") {
                $scope.command_content = {
                    object: "",
                    wait_for: "present",
                    wait_time: 0,
                    before: 0,
                    after: 0,

                }
                if (da) {
                    var r = JSON.parse(da.command)
                    $scope.command_content = r;
                }
                $scope.command_father_op_getvar = $scope.command_father_op_getvar.name;

                $("#modal_waitobject_web").modal('show');
            } else if (params.father == "getinputweb") {
                $scope.command_content = {
                    pathfile: "",
                    height: "",
                    width: ""
                };
                if (da) {
                    var r = JSON.parse(da.command);
                    $scope.command_content = {
                        pathfile: r.pathfile,
                        height: r.height,
                        width: r.width
                    };
                }
                $("#modal_select_popup_info").modal('show');
            } else if (params.father == "getimage") {
                $scope.command_content = {
                    pathfile: "",
                    search: ""
                };
                if (da) {
                    var r = JSON.parse(da.command);
                    $scope.command_content = {
                        pathfile: r.pathfile,
                        search: r.search
                    };
                }
                $("#modal_download_image").modal('show');
            } else if (params.father == "request") {
                $scope.command_content = {
                    method: "get",
                    header: "",
                    url: "",
                    json: "",
                    params: "",
                    form: "",
                    proxy: "",
                    file: ""
                };
                if (da) {
                    var r = JSON.parse(da.command);
                    $scope.command_content = {
                        method: r.method,
                        url: r.url,
                        raw: r.raw,
                        json: r.json,
                        params: r.params,
                        form: r.form,
                        proxy: r.proxy,
                        file: r.file,
                        header: r.header,
                        ssl: r.ssl,
                    };
                    $scope.command_father_op_getvar = $scope.command_father_op_getvar.name;
                }
                $("#modal_connect_url").modal('show');
            } else if (params.father == 'execRocketBotDB') {
                $("#modal_select_robot").modal("show")
            } else if (params.group == "scripts") {
                $("#modal_select_file").modal('show');
            } else if (params.father == "startapp") {
                $scope.synchronous = "1";
                if (da) {
                    var r = JSON.parse(da.command);
                    $scope.synchronous = r.tipo;
                    $scope.path = r.path;
                }
                $("#modal_select_application").modal('show');
            } else if (params.father == "login") {
                $scope.command_content = {
                    url: "",
                    user: "",
                    password: ""
                }
                if (da) {
                    $scope.command_content = JSON.parse(da.command);
                }
                $scope.command_father_op_getvar = $scope.command_father_op_getvar.name;

                $("#modal_dashboard_login").modal('show');
            } else if (params.father == "postdata") {
                $scope.command_content = {
                    url: "",
                    params: ""
                }
                if (da) {
                    $scope.command_content = JSON.parse(da.command);
                }
                $scope.command_father_op_getvar = $scope.command_father_op_getvar.name;
                $("#modal_dashboard_getdata").modal('show');
            } else if (params.father == "movefile" || params.father == "copyfile" ||
                params.father == "deletefile" || params.father == "trashfile" ||
                params.father == "zipfile" || params.father == "unzipfile"
            ) {
                $scope.view_dest = true;
                if (params.father == "deletefile" || params.father == "trashfile") {
                    $scope.view_dest = false
                }
                $scope.command_content = {
                    from: "",
                    to: ""
                }
                if (da) {
                    var r = JSON.parse(da.command);
                    $scope.command_content = r;
                }
                $scope.command_father_op_getvar = $scope.command_father_op_getvar.name;
                $("#modal_archivos_action").modal('show');
            } else if (params.father == "pdftext") {
                $scope.view_dest = true;
                $scope.command_content = {
                    file: "",
                    page: ""
                }
                if (da) {
                    var r = JSON.parse(da.command);
                    $scope.command_content = r;
                }
                $scope.command_father_op_getvar = $scope.command_father_op_getvar.name;
                $("#modal_pdf").modal('show');
            } else if (params.father == "pdfimage" || params.father == "pdfaddimage") {
                $scope.view_dest = true;
                $scope.command_content = {
                    file: "",
                    image: "",
                    x: 0,
                    y: 0,
                    pagesize: $scope.pagesizes[33]
                }

                if (da) {
                    var r = JSON.parse(da.command);
                    $scope.command_content = r;

                    if (!$scope.command_content.pagesizes) {
                        $scope.command_content.pagesizes = $scope.pagesizes[33]
                    }
                }
                $scope.command_father_op_getvar = $scope.command_father_op_getvar.name;
                $("#modal_pdf_image").modal('show');
            } else if (params.father == "configemail") {
                $scope.command_content = {
                    "smtp": $scope.SMTP,
                    "imap": $scope.IMAP,
                    "user": "",
                    "pass": "",
                    "smtp_port": $scope.SMTP_PORT,
                    "imap_port": $scope.IMAP_PORT,
                    "ssl": true,
                    "imap_ssl": true
                }
                if (da) {
                    var r = JSON.parse(da.command);
                    $scope.command_content = r;
                }
                $scope.command_father_op_getvar = $scope.command_father_op_getvar.name;

                $("#modal_email_config").modal('show');
            } else if (params.group == "db" && params.father == "connect") {
                $scope.command_content = {
                    "host": "",
                    "port": 3306,
                    "user": "",
                    "password": "",
                    "database": ""
                }
                if (da) {
                    var r = JSON.parse(da.command);
                    $scope.command_content = r;
                }
                $scope.command_father_op_getvar = $scope.command_father_op_getvar.name;
                $("#modal_db_config").modal('show');
            } else if (params.group == "db" && params.father == "query") {
                $scope.command_content = {
                    query: ""
                }
                if (da) {
                    var r = JSON.parse(da.command);
                    $scope.command_content = r;
                }
                $scope.command_father_op_getvar = $scope.command_father_op_getvar.name;
                $("#modal_db_query").modal('show');

            } else if (params.father == "setVar") {
                try {
                    $scope.command_father_op_var = $scope.command_father_op_var.name;
                } catch (e) {

                }
                $("#modal_vars_set").modal('show');
            } else if (params.father == "connect_app") {
                $scope.command_content = {
                    title: "",
                    handle: "",
                    process: "",
                    path: ""
                }
                if (da) {
                    var r = JSON.parse(da.command);
                    $scope.command_content = r;
                }
                $("#modal_connect_app").modal('show');
            } else if (params.group == "windows" && (
                params.father == "click" ||
                params.father == "gettext" ||
                params.father == "typekeys" ||
                params.father == "settext"
            )) {
                $scope.command_content = {
                    handle: "",
                    class_name: "",
                    class_name_re: "",
                    title: "",
                    title_re: "",
                    best_match: "",
                    ctrl_index: "",
                    control_id: "",
                    control_type: "",
                    auto_id: "",
                    text: ""
                }
                if (da) {
                    var r = JSON.parse(da.command);
                    $scope.command_content = r;
                }
                $scope.command_father_op_getvar = $scope.command_father_op_getvar.name;

                $("#modal_app_command").modal('show');
            } else if (params.father == "geturl") {
                $("#modal_url").modal('show');
            }
            /*else if (params.file_save) {
                $scope.command_content = ""
                if (da) {
                    //var r = JSON.parse(da.command);
                    $scope.command_content = da.command;
                }
                $scope.command_father_op_getvar = $scope.command_father_op_getvar;
                
                $("#modal_save_file").modal('show');
            }*/
            else if (params.setVar) {
                $("#modal_select_var").modal('show');
            } else if (params.getResult && !params.crop) {
                $scope.command_father_op_getvar = $scope.command_father_op_getvar.name;

                if (da) {
                    $scope.command_content = da.command
                }
                $("#modal_select_getvar").modal('show');
            } else if (params.crop) {
                $scope.command_content = {
                    ref: "",
                    point: "",
                    accuracy: "0.7",
                    seconds: 0,
                    clicks: "simple",
                    click: "simple",
                    gray_scale: '1'
                };
                /*$scope.command_content = JSON.stringify({
                    ref: $scope.ref_data,
                    point: $scope.point_data,
                    accuracy: $scope.accuracy,
                    seconds: $scope.command_content || 0,
                    click: click
                });*/
                if (da) {
                    var r = JSON.parse(da.command);
                    $scope.command_content = r
                    $scope.command_img = da.extra_data
                    $scope.command_content['clicks'] = $scope.command_content['click'];
                    $scope.url_image_screenshot = r.background;
                    $rootScope.ref_data = $scope.command_content['ref'];
                    $rootScope.point_data = $scope.command_content['point'];
                    $http.post('getscreenshot', $.param({ robot: $rootScope.robot_name, image: r.background })).then(function (image64) {
                        $scope.dataUrl = image64.data
                        fileCrop = dataURItoBlob(image64.data)
                        dataCropper = $rootScope.point_data;

                        $timeout(function () {
                            $scope.$broadcast($scope.hideEvent);

                            $scope.preview(1);
                            $scope.$broadcast($scope.showEvent);
                            $timeout(function () {
                                try {
                                    $("#image_cropper").cropper("setData", $scope.command_content['point'])
                                } catch (e) {

                                }
                            }, 1000)
                        })

                    })

                }
                $("#modal_crop").modal('show');

            } else {
                $("#modal_select").modal('show');
                this.command_content = $scope.command_content;
                if (!$scope.$$phase) {
                    $scope.$apply();
                }
            }
        }


        $scope.getFatherData = function (parent) {
            var father = parent.father,
                group = parent.group;

            var gi = function (params) {
                if (!params) {
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
                return ret;
            } else {
                var ret = gi($rootScope.tree);
                return ret
            }
        }
        //Change description
        $scope.changeDescription = function (item, description) {
            item['description'] = description;
            $(".modal").modal('hide');
        }
        $rootScope.loadCommands = function () {
            $("#files").show();
            $("#files").click();
        };
        $scope.loadFile = function handleFileSelect(evt) {
            //ps_commands = new PerfectScrollbar( document.querySelector('#list_commands'))

            var files = evt.target.files[0]; // FileList object
            $scope.parseFile(files);
        };
        $scope.parseFile = function (files) {
            //ps_commands = new PerfectScrollbar( document.querySelector('#list_commands'))

            var reader = new FileReader();
            reader.onload = (function (theFile) {
                delete $scope.commands;
                delete $scope.vars;
                delete $scope.ifs;
                var data = JSON.parse(theFile.target.result);
                $scope.commands = data['project']['commands'];
                $scope.vars = data['project']['vars'] || [];
                $scope.ifs = data['project']['ifs'] || [];
                $scope.modules_in_bot = data['project']['modules'] || [];
                $scope.master = data;
                $rootScope.robot_description = data['project']['profile']['description'] || "";

                if (Validators.changeBotName(data['project']['profile']['name'])) {
                    $rootScope.robot_name = data['project']['profile']['name'];
                }

                //$rootScope.$apply();

                $scope.getBots_in_bot(data['project']['profile']['name'], data)
                $scope.commands.forEach(function (item) {
                    if (item) {
                        item.execute = 2;
                    }
                });
                try {
                    if (!$scope.$$phase) { console.log("apply"); $scope.$apply() }
                } catch (e) {

                }
            });
            reader.readAsText(files);
            reader.onloadend = () => {
                if (Validators.installedModules($scope.modules_in_bot)) {
                    Notification.uninstalledModules()

                }
            }
        }

        $scope.addVarModal = function (modal_return, edit) {
            $scope.modal_return = modal_return;
            $scope.edit_vars = false;
            if (edit) {
                $scope.edit_vars = edit;
            }
            if (modal_return) {
                $("#" + modal_return).modal('hide');
            }
            $("#modal_add_var").modal('show');
        }
        $scope.isValidVarname = function (name) {
            if (name) {
                $scope.validName = Validators.validName(name);
            }
            return $scope.getIfVarExist(name) && $scope.validName
        }
        $scope.getIfVarExist = function (name) {
            for (var t = 0; t < $scope.vars.length; t++) {
                if ($scope.vars[t].name == name) {
                    $scope.var_exist = true;
                    return true;
                }
            }
            $scope.var_exist = false;
            return false;
        }
        $scope.addVar = function () {

            if ($scope.edit_vars) {
                $scope.updateVar();
                $("#modal_add_var").modal('hide');
                return;
            }
            for (var t = 0; t < $scope.vars.length; t++) {
                if ($scope.vars[t].name == $scope.var_name) {
                    return;
                }
            }
            $scope.vars.push({
                "name": $scope.var_name,
                "data": $scope.var_data,
                "type": $scope.var_type || "string"
            });
            $("#modal_add_var").modal('hide');
            if ($scope.modal_return) {
                $("#" + $scope.modal_return).modal('show');
            }
            $rootScope.accept_var();

        };
        $scope.addCommandFile = function () {
            $(".modal").modal('hide');
            if ($scope.command_father_op_getvar) {
                try {
                    $scope.command_father_op_getvar = $scope.command_father_op_getvar.replace("{", "").replace("}", "");
                    $scope.command_father_op_getvar_temp = {
                        "name": $scope.command_father_op_getvar
                    };
                } catch (e) {
                    console.error(e);
                }
            }
            $scope.command_content = JSON.stringify($scope.command_content);
            $scope.addCommand();
        }
        $scope.addCommand_popupinfo = function () {
            $("#modal_select_popup_info").modal('hide');
            $scope.command_content = JSON.stringify($scope.command_content);
            $scope.addCommand();
        }
        $scope.addGeneralCommandW = function (modal_id) {
            $("#" + modal_id).modal('hide');
            if ($scope.command_father_op_var) {
                try {
                    $scope.command_father_op_var = $scope.command_father_op_var.replace("{", "").replace("}", "").trim();
                    $scope.command_father_op_var = {
                        "name": $scope.command_father_op_var
                    };
                } catch (e) {
                    console.error(e);
                }
            }
            if ($scope.command_father_op_getvar) {
                try {
                    $scope.command_father_op_getvar = $scope.command_father_op_getvar.replace("{", "").replace("}", "");
                    $scope.command_father_op_getvar_temp = {
                        "name": $scope.command_father_op_getvar
                    };
                } catch (e) {
                    console.error(e);
                }
            }
            $scope.addCommand();
        }
        $scope.addGeneralCommand = function (modal_id) {
            $("#" + modal_id).modal('hide');

            try {
                if ($scope.command_father.form) {
                    for (var r = 0; r < Object.keys($scope.command_content).length; r++) {
                        for (var c = 0; c < $scope.command_father.form.inputs.length; c++) {
                            if (Object.keys($scope.command_content)[r] == $scope.command_father.form.inputs[c].id) {
                                if ($scope.command_father.form.inputs[c].remove_vars) {
                                    $scope.command_content[Object.keys($scope.command_content)[r]] = $scope.command_content[Object.keys($scope.command_content)[r]].replace("{", "").replace("}", "").trim();
                                }
                            }
                        }
                    }
                }
            } catch (err) {
                console.error(err)
            }
            $scope.command_content = JSON.stringify($scope.command_content);
            if ($scope.command_father_op_var) {
                try {
                    $scope.command_father_op_var = $scope.command_father_op_var.replace("{", "").replace("}", "").trim();
                    $scope.command_father_op_var = {
                        "name": $scope.command_father_op_var
                    };
                } catch (e) {
                    console.error(e);
                }
            }
            if ($scope.command_father_op_getvar) {
                try {
                    $scope.command_father_op_getvar = $scope.command_father_op_getvar.replace("{", "").replace("}", "");
                    $scope.command_father_op_getvar_temp = {
                        "name": $scope.command_father_op_getvar
                    };
                } catch (e) {
                    console.error(e);
                }
            }
            $scope.addCommand();
        }
        $scope.addCommand_getimage = function () {
            $("#modal_download_image").modal('hide');
            $scope.command_father_op = this.command_father_op;
            $scope.command_content = JSON.stringify($scope.command_content);
            $scope.addCommand();
        }
        $scope.addIf = function () {
            $("#modal_add_logical").modal('hide');
            $scope.actual_if_tmp = guid();
            $scope.if_ids.push(angular.copy($scope.actual_if_tmp))
            $scope.ifs.push({
                id: angular.copy($scope.actual_if_tmp),
                status: null
            });
            $scope.command_content = this.command_content;
            if ($scope.command_father.father == "for") {
                $scope.command_content = JSON.stringify({
                    count: 0,
                    iterable: this.command_content
                });
            }
            $scope.addCommand();

        };
        $scope.addVirtual = function () {
            var click = null;
            if ($scope.command_father.father == 'clickimage') {
                $scope.command_content['click'] = $scope.command_content['clicks']
            }


            $scope.command_content['ref'] = $rootScope.ref_data;
            $scope.command_content['point'] = $rootScope.point_data;
            $scope.command_content['background'] = $scope.url_image_screenshot;
            $scope.command_content = JSON.stringify($scope.command_content);
            //$scope.command_img = this.command_img;
            /*$scope.command_content = JSON.stringify({
                ref: $scope.ref_data,
                point: $scope.point_data,
                accuracy: $scope.accuracy,
                seconds: $scope.command_content || 0,
                click: click
            });*/
            //$scope.command_father_op = this.command_father_op;
            //$scope.command_father_op_getvar_temp = this.command_father_op_getvar;
            $scope.addCommand();
        };
        $scope.addCommandEmail = function () {
            $scope.command_content = JSON.stringify($scope.command_content);
            $scope.addCommand();
        };
        $scope.addNavigator = function () {
            $scope.command_content = JSON.stringify($scope.command_content);
            $scope.command_father_op = this.command_father_op;

            $scope.addCommand();
        };
        $scope.addConnectRequest = function () {

            if ($scope.command_father_op_getvar) {
                try {
                    $scope.command_father_op_getvar = $scope.command_father_op_getvar.replace("{", "").replace("}", "");
                    $scope.command_father_op_getvar_temp = {
                        "name": $scope.command_father_op_getvar
                    };
                } catch (e) {
                    console.error(e);
                }
            }
            $scope.command_content = JSON.stringify($scope.command_content);
            $scope.addCommand();
        }
        $scope.addApplication = function () {
            $scope.command_content = JSON.stringify({
                tipo: this.synchronous,
                path: this.path
            });
            $scope.command_father_op = this.command_father_op;
            $scope.command_father_op_getvar_temp = this.command_father_op_getvar;

            $scope.addCommand();
        };
        $scope.addCommandEmailConfiguracion = function () {
            $scope.command_content = JSON.stringify($scope.command_content);
            $scope.addCommand();
        };
        $scope.getScreenShot = function () {
            var w = 200;
            var h = 50;

            w = 250; h = 130;

            var left = screen.width - w - 20;
            var top = screen.height - h - 150;
            window.addEventListener('message', function (e) {
                hideCropper();
                console.log(e)
                var image64 = "";
                $scope.url_image_screenshot = "";
                for (var t = 0; t < e.data.length; t++) {
                    if (e.data[t].name == "resultado_screenshot_internal") {
                        image64 = 'data:image/png;base64,' + e.data[t].data;
                    }
                    if (e.data[t].name == "url_image") {
                        $scope.url_image_screenshot = e.data[t].data;
                    }
                }
                $scope.dataUrl = image64
                dataCropper = image64
                fileCrop = dataURItoBlob(image64)
                $timeout(showCropper)
            }, false);
            __CHILD_WINDOW_HANDLE_SCREENSHOT = window.open('assets/screenshot.html?_=' + $rootScope.version + Date.now() + '&robotname=' + $rootScope.robot_name + '#' + $rootScope.path_encode, '_blank', 'toolbar=no, location=no, directories=no, status=no, menubar=no, scrollbars=no, resizable=no, copyhistory=no,width=' + w + ',height=' + h + ',left=' + left + ',top=' + top + '');

        }
        /**
        * Add command generic
        */
        $scope.addCommand = function () {
            $indexedDB.openStore(dbname, function (store) {
                store.insert({
                    "count": count_modifications,
                    "data": JSON.stringify($scope.commands)
                }).then(function (e) { });
            });
            count_modifications++;
            $(".modal").modal('hide');
            if ($scope.command_father.setVar) {
                $scope.command_content = angular.copy($scope.command_father_op_var.name);
            };
            if ($scope.command_father_op_getvar_temp) {
                this.command_father_op_getvar = angular.copy($scope.command_father_op_getvar_temp);
                $scope.command_father_op_getvar_temp = null;
            }
            var var_ = '';
            if (this.command_father_op_getvar) {
                var_ = this.command_father_op_getvar.name;
            }
            if ($scope.command_father_op_getvar_temp) {
                var_ = $scope.command_father_op_getvar_temp.name;
            }
            if ($scope.edit_command) {
                $scope.command_content = $scope.command_content || this.command_content || '';
                $scope.command_father_op = $scope.command_father_op || this.command_father_op || '';
                $scope.command_father_op_var = this.command_father_op_var ? this.command_father_op_var.name : '';
                $scope.command_father_op_getvar = var_;
                if ($scope.command_img) {
                    $scope.item_to_update.extra_data = angular.copy($scope.command_img);
                }

                $scope.updateData();
                $scope.edit_command = false;
                $scope.command_img = null;
                if (!$scope.$$phase) {
                    $scope.$apply();
                }
                return;
            }

            var command = {
                father: $scope.command_father.father,
                command: this.command_content || $scope.command_content || '',
                option: this.command_father_op || $scope.command_father_op || '',
                var: this.command_father_op_var ? this.command_father_op_var.name : '',
                index: $scope.commands.length,
                group: $scope.command_father.group,
                execute: $rootScope.mode_live ? false : 2,
                if: '',
                description: this.description,
                children: [],
                else: [],
                id: guid(),
                mode_live: true,
                message: '',
                getvar: var_,
                extra_data: angular.copy($scope.command_img),
                screenshot: "",
                stop_onerror: $scope.stop_onerror ? $scope.stop_onerror : false,
                run_onerror: $scope.run_onerror ? $scope.run_onerror : false,
                run_onerror_robot: $scope.run_onerror_robot ? $scope.run_onerror_robot : ''
            };


            $scope.command_img = null;
            $scope.img_event = null;
            this.command_img = null;

            var data = {
                project: {
                    profile: {
                        name: $rootScope.robot_name,
                        description: $rootScope.robot_description || ""
                    },
                    commands: [command],
                    vars: $scope.vars,
                    ifs: $scope.ifs
                }
            };
            if ($scope.addIfChildren) {
                console.log("Add command to Children")
                var tmp = angular.copy($scope.addIfItem.children)
                if (!tmp) {
                    tmp = []
                }
                delete $scope.addIfItem.children;
                tmp.push(command)
                $scope.addIfItem.children = angular.copy(tmp);

            } else if ($scope.command_list_to_add) {
                console.log("Add command to list")
                $scope.command_list_to_add.splice($scope.position_to_put, 0, command)
                delete $scope.command_list_to_add
                //$scope.command_list_to_add.push(command)
            } else if ($scope.item_to_update) {
                $scope.addRobot(data)
            }

            else {
                console.log("Add command to Main")
                var commands_temp = angular.copy($scope.commands);
                commands_temp.push(command);
                delete $scope.commmands
                $scope.commands = angular.copy(commands_temp);

            }


            setTimeout(function () {
                if (!$scope.$$phase) {
                    $scope.$apply(function () {
                        delete $scope.item_to_update;
                        $scope.item_to_update = command;
                        //ps.element.scrollTop = getPos(document.getElementById(command.id)).y

                        if (document.getElementById(command.id)) {
                            document.getElementById(command.id).scrollIntoView({
                                block: 'center',
                                behavior: 'smooth'
                            });
                        }

                        //delete $scope.item_to_update;
                    });
                }
            }, 500);
            if ($rootScope.mode_live) {
                executeCommand(data);
            }

            $scope.onPos = false;

            $scope.img_event = null;
            this.command_content = "";
            this.command_father_op = ''
        };
        $scope.removeCommand = function (list, id) {
            /**
            * Remuevo un comando de la lista JSON
            */
            var search = function (id, list) {
                for (var t = 0; t < list.length; t++) {
                    if (list[t].id == id) {
                        if (["evaluateIf", "trycatch", "evaluatewhile", "for"].includes(list[t].father)) {
                            $scope.addIfChildren = false;
                        }
                        list.splice(t, 1);
                        return;
                    }
                    if (list[t].children) {
                        search(id, list[t].children)
                    }
                    if (list[t].else) {
                        search(id, list[t].else)
                    }
                };

            }
            search(id, list)
            $scope.apply_();
        };
        $scope.getById = function (list, id) {

            /**
            * Busco por Id
            */
            var searchD = function (id, list) {

                for (var t = 0; t < list.length; t++) {


                    if (list[t].id == id) {
                        return { "list": list, "pos": t };
                    }
                    if (list[t].children) {
                        var d = searchD(id, list[t].children)

                        if (d) { return d }
                    }
                    if (list[t].else) {
                        var d = searchD(id, list[t].else)
                        if (d) { return d }
                    }
                };

            }
            var b = searchD(id, list)
            console.log("search res:", b)
            return b

        };
        $scope.removeVar = function (index) {
            $.confirm({
                title: 'Delete variable?',
                content: '',
                icon: 'fas fa-trash-alt',
                theme: 'bootstrap',
                type: 'red',
                typeAnimated: true,
                buttons: {
                    ok: {
                        text: 'Delete',
                        btnClass: 'btn-danger',
                        action: function () {
                            $scope.vars.splice(index, 1);
                            if (!$scope.$$phase) {
                                $scope.$apply();
                            }
                        }
                    },
                    close: function () {
                    }
                }
            });
        };
        $scope.removeVarAll = function () {
            $.confirm({
                title: 'Delete all variables?',
                content: '',
                icon: 'fas fa-trash-alt',
                theme: 'bootstrap',
                type: 'red',
                typeAnimated: true,
                buttons: {
                    ok: {
                        text: 'Delete',
                        btnClass: 'btn-danger',
                        action: function () {
                            if (!$scope.deleteVarList || $scope.deleteVarList.length == 0) {
                                $scope.vars = [];
                                if (!$scope.$$phase) {
                                    $scope.$apply();
                                }
                            }
                        }
                    },
                    close: function () {
                    }
                }
            });
        };
        $scope.eraseVarAll = function () {
            $.confirm({
                title: 'Clear all variables?',
                content: '',
                icon: 'fas fa-eraser',
                theme: 'bootstrap',
                type: 'red',
                typeAnimated: true,
                buttons: {
                    ok: {
                        text: 'Clear',
                        btnClass: 'btn-danger',
                        action: function () {

                            $scope.vars.forEach(function (item, index, object) {
                                console.log(item, index, object)
                                item.data = ""
                            });

                            if (!$scope.$$phase) {
                                $scope.$apply();
                            }

                        }
                    },
                    close: function () {
                    }
                }
            });
        };
        var setNewIdChildrens = function (commands) {
            /**
            * Le doy un nuevo identificador a los hijos de un comando
            */
            for (var t = 0; t < commands.length; t++) {
                commands[t].id = guid();
                if (commands[t].children) {
                    commands[t].children = angular.copy(setNewIdChildrens(commands[t].children))
                }

                if (commands[t].else) {
                    commands[t].else = angular.copy(setNewIdChildrens(commands[t].else))
                }

            }
            return commands
        }
        $rootScope.copyCommand = function (i, command_, item_to_update) {
            /**
            * Copio un comando
            */

            /*
            if(this.els){
                i = this.els;
            }*/
            if (item_to_update) {
                $scope.item_to_update = item_to_update;
            }
            if (!i) {
                i = $scope.commands;
            }

            $indexedDB.openStore(dbname, function (store) {
                store.insert({
                    "count": count_modifications,
                    "data": JSON.stringify($scope.commands)
                }).then(function (e) { });
            });
            count_modifications++;
            var pos = 0;

            /**
            * Change to search by id
            */
            /*
            for (var v = 0; v < i.length; v++) {
                if (command_.id == i[v].id) {
                    pos = v;
                    break;
                }
            }*/

            var tt = $scope.getById(i, $scope.item_to_update.id);
            if (tt) {
                i = tt['list'];
                pos = tt['pos'];
            }

            var command = angular.copy(command_);
            command.id = guid();
            $scope.onPos = true;
            //$scope.pos = i;
            if (command.children) {
                command.children = angular.copy(setNewIdChildrens(command.children));
            }
            if (command.else) {
                command.else = angular.copy(setNewIdChildrens(command.else));
            }

            i.splice(pos + 1, 0, command)

            if (!$scope.$$phase) {
                $scope.$apply();
            }
            window.setTimeout(function () {
                delete $scope.item_to_update;
                $scope.item_to_update = command;

                document.getElementById(command.id).scrollIntoView({
                    block: 'center',
                    behavior: 'smooth'
                });

                if (!$scope.$$phase) {
                    $scope.$apply();
                }


            }, 500);

        }

        $scope.importVars = function () {

            $scope.loading = true;
            var data = angular.copy($scope.vars);
            var alldata = document.getElementById("alldataImp").checked;
            var replaceAll_data = document.getElementById("replaceImp").checked;

            $http.post('/importVars').then(function (e) {

                if (e.data.status) {
                    var data = JSON.parse(e.data.vars);
                    var exist = false;
                    for (var y = 0; y < data.length; y++) {
                        exist = false;
                        for (var t = 0; t < $scope.vars.length; t++) {
                            if ($scope.vars[t].name == data[y].name) {
                                if (alldata && replaceAll_data) {
                                    $scope.vars[t].data = data[y].data;
                                }
                                exist = true;
                                break;
                            }
                        }
                        if (!exist) {
                            if (!alldata) {
                                data[y].data = '';
                            }
                            $scope.vars.push(data[y])
                        }
                    }
                }
                $("#modal_import_vars").modal('hide')
            })

        }
        $scope.exportVars = function () {
            $scope.loading = true;
            var data = angular.copy($scope.vars);
            var alldata = document.getElementById("alldata").checked;
            if (!alldata) {
                for (var v = 0; v < data.length; v++) {
                    data[v].data = '';
                }
            }
            $http.post('/exportVars', $.param({ 'vars': JSON.stringify(data) })).then(function (e) {
                $scope.loading = false;
                $("#modal_export_vars").modal('hide')
            })
        }
        $scope.saveCommands = function () {
            /**
            * Funcion para descarga en JSON los comandos.
            */

            var b = angular.copy($scope.setToPause(angular.copy($scope.commands), true));
            $scope.master = {
                project: {
                    profile: {
                        name: $rootScope.robot_name,
                        description: $rootScope.robot_description || ""
                    },
                    commands: b,
                    vars: $scope.vars,
                    ifs: $scope.ifs,
                    modules: $scope.modules_in_bot
                }
            }
            saveDataCommand(JSON.stringify($scope.master), $rootScope.robot_name + ".json", "application/json")
        };
        $scope.setToPause = function (data, init, execute, execute_debbug) {
            /**
            * Pongo los comandos en pausa forzada
            */
            if (!execute) {
                execute = 2;
            }
            for (var i = 0; i < data.length; i++) {
                if (data[i] || data[i] != null) {
                    data[i].execute = execute;
                    data[i].index = i;
                    data[i].execute_debbug = execute_debbug ? execute_debbug : 0;
                    data[i].img = "";
                    if (data[i].father == 'evaluateIf' || data[i].father == 'trycatch') {
                        if (!data[i]["else"]) {
                            data[i]["else"] = [];
                        }
                    }
                    data[i]['screenshot'] = "";
                    if (data[i].father == "for" && init) {
                        var c = JSON.parse(data[i].command)
                        data[i].command = JSON.stringify({
                            'iterable': c['iterable'],
                            'count': 0
                        })
                    }
                    if (!data[i].id) {
                        data[i].id = guid();
                    }
                    if (data[i].children) {
                        data[i].children = angular.copy($scope.setToPause(data[i].children, init));
                    }
                    if (data[i].else) {
                        data[i].else = angular.copy($scope.setToPause(data[i].else, init));
                    }
                } else {
                    /**
                    * El comando por alguna razon es null
                    */
                    data.splice(i, 1)
                    i = i - 1;
                }
            };
            if (!$scope.$$phase) {
                $scope.$apply();
            }
            return data;
        }
        $scope.execCommandsInit = function () {
            try {
                gtag('event', $rootScope.robot_name, {
                    'event_category': 'startbot',
                    'event_label': 'Developer'
                });
            } catch (error) {
                console.log(error)
            }

            Debug.start();
            $scope.index_pos = 0;
            $scope.start_script = true;
            $scope.commands = angular.copy($scope.setToPause($scope.commands, true));
            executing_code = angular.copy($scope.commands);
            $scope.execCommands();
        };

        var getChildren = function (data_, parent_) {

            var data_commands = null
            var data = null;

            for (var t__ = 0; t__ < data_.length; t__++) {
                data = data_[t__];


                if (data.father == 'break') {
                    $scope.last_parent_logic.execute = 1;
                    $scope.last_parent_logic.children = angular.copy($scope.setToPause($scope.last_parent_logic.children, true, 1));
                    if ($scope.last_parent_logic.else) {
                        $scope.last_parent_logic.else = angular.copy($scope.setToPause($scope.last_parent_logic.else, true, 1));
                    }
                    $scope.last_parent_logic.extra.res = false;
                    return parent_;
                }

                if (Number(data.execute) == 1 &&
                    (data.disabled == null || data.disabled == undefined || !data.disabled)
                ) {
                    if (data.group == 'logic') {
                        if (data.extra.res === true || String(data.extra.res).toLowerCase() == 'true') {


                            if (data.father == 'for' || data.father == 'evaluatewhile') {
                                $scope.last_parent_logic = data;
                            }
                            data_commands = getChildren(data.children, data);
                            if (data_commands) {

                                return data_commands;
                            } else {

                                if (data.father == 'for' || data.father == 'evaluatewhile') {
                                    if (data.father == 'for') {
                                        var c = JSON.parse(data.command)
                                        data.command = JSON.stringify({
                                            'iterable': c['iterable'],
                                            'count': data.extra.count
                                        })
                                    }
                                    if (data.father == 'evaluateIf' || data.father == 'trycatch') {
                                        if (data.else) {
                                            data.else = angular.copy($scope.setToPause(data.else, true));
                                        } else {
                                            data.else = [];
                                        }
                                    }
                                    data.children = angular.copy($scope.setToPause(data.children, true));
                                    data_commands = data;
                                    return data_commands;
                                }
                            }
                        } else {
                            if (data.father == 'evaluateIf' || data.father == 'trycatch') {
                                if (data.else) {
                                    data_commands = getChildren(data.else, data);
                                } else {
                                    data.else = [];
                                }
                                if (data_commands) {
                                    return data_commands;
                                }
                            }
                        }
                    }
                } else {


                }

                if (Number(data.execute) === 2 && (data.disabled == null || data.disabled == undefined || !data.disabled)) {
                    data.execute = 0;
                    data_commands = data;
                    if (!$scope.$$phase) {
                        //$scope.$apply();
                    }
                    return data_commands
                }
            }
            return data_commands
        }
        $scope.execCommands = function () {
            if ($scope.start_script == false) {
                Debug.stop();
                return;
            }
            var data_commands = getChildren(executing_code);

            var data = {
                project: {
                    profile: {
                        name: $rootScope.robot_name,
                        description: $rootScope.robot_description || "",
                        version: $rootScope.version
                    },
                    vars: $scope.vars,
                    commands: [data_commands],
                    ifs: $scope.ifs
                }
            };

            if (!data_commands) {
                Debug.stop();
                return;
            }
            if (angular.equals(data.project.commands, [{}])) {
                return
            };
            $scope.index_pos++;
            executeCommand(data);
        };

        // Robot tab -- new features

        $scope.installMod = function (mod) {
            Modules.installModule(mod.name, "master", function (data) {
                if (data.data.success) {
                    mod.status = "Installed";
                    mod.version = mod.last_version;
                    Modules.get(function (data) {
                        $rootScope.modules = data.data;
                        $rootScope.accept_var();
                    });
                }
            })
        }

        // Modules -- new features
        $scope.parse_textarea_json = function () {
            let module_textarea = document.querySelector('[formater="json"')
            try {
                var pretty = JSON.stringify(JSON.parse(module_textarea.value), undefined, 2);
                module_textarea.value = pretty;
            } catch (e) {
            }
        }



        class Notification {

            static uninstalledModules() {
                $.toast({
                    position: 'top',
                    heading: 'Alerta',
                    text: `${$rootScope.language[$rootScope.language_default].alert_uninstalled_modules} 
                                                        <a onclick="document.querySelector(\'#nav-profile-robot\').click()">
                                                        ${$rootScope.language[$rootScope.language_default].see}
                                                        </a>
                                                        `,
                    hideAfter: false,
                    icon: 'warning'

                });
            }

            static savedSuccessfully() {
                $.toast({
                    position: 'top',
                    heading: 'Excelente',
                    text: 'Su robot se ha guardado correctamente',
                    showHideTransition: 'slide',
                    icon: 'success'

                });
            }

            static savedError() {
                $.toast({
                    position: 'top',
                    heading: 'Error',
                    text: 'Su robot no se pudo guardar, trate descargando el robot',
                    showHideTransition: 'slide',
                    icon: 'error'

                });

            }
        }
    })
