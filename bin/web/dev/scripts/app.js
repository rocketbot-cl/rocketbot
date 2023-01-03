'use strict';

/**
* @ngdoc overview
* @name rocketstudiowebApp
* @description
* # rocketstudiowebApp
*
* Main module of the application.
*/

var editableCodeMirror;


var saveDataCommand = function (text, name, type) {
    var id = "file_download";
    var elem = document.getElementById(id);
    if (elem) {
        elem.parentNode.removeChild(elem);
    }
    var a = document.createElement("a");
    document.body.appendChild(a);
    a.id = id;
    var file = new Blob([text], {
        type: type
    });
    a.href = URL.createObjectURL(file);
    a.download = name;
    a.click();
};

/**
* Genera ID unico
*/
function guid() {
    function s4() {
        return Math.floor((1 + Math.random()) * 0x10000)
            .toString(16)
            .substring(1);
    }
    return s4() + s4() + '-' + s4() + '-' + s4() + '-' + s4() + '-' + s4() + s4() + s4();
}
$(document).ready(function () {
    $("#files").hide();
})
function getPos(el) {
    // yay readability
    for (var lx = 0, ly = 0; el != null; lx += el.offsetLeft, ly += el.offsetTop, el = el.offsetParent) {
        return { x: lx, y: ly };
    }
}

function dataURItoBlob(dataURI) {
    // convert base64/URLEncoded data component to raw binary data held in a string
    var byteString;
    if (dataURI.split(',')[0].indexOf('base64') >= 0) {
        byteString = atob(dataURI.split(',')[1]);
    } else {
        byteString = unescape(dataURI.split(',')[1]);
    }
    // separate out the mime component
    var mimeString = dataURI.split(',')[0].split(':')[1].split(';')[0];

    // write the bytes of the string to a typed array
    var ia = new Uint8Array(byteString.length);
    for (var i = 0; i < byteString.length; i++) {
        ia[i] = byteString.charCodeAt(i);
    }

    return new Blob([ia], {
        type: mimeString
    });
}
function Check_Version() {
    var rv = -1; // Return value assumes failure.

    if (navigator.appName == 'Microsoft Internet Explorer') {

        var ua = navigator.userAgent,
            re = new RegExp("MSIE ([0-9]{1,}[\\.0-9]{0,})");

        if (re.exec(ua) !== null) {
            rv = parseFloat(RegExp.$1);
        }
    }
    else if (navigator.appName == "Netscape") {
        /// in IE 11 the navigator.appVersion says 'trident'
        /// in Edge the navigator.appVersion does not say trident
        if (navigator.appVersion.indexOf('Trident') === -1) rv = 12;
        else rv = 11;
    }

    return rv;
}
//alert(Check_Version())
var ps;
var update_scroll = function () {
    if (ps) ps.update();
}
var ps_commands;
var update_scroll_commands = function () {
    window.setTimeout(function () {
        ps_commands.update();
    }, 200);

}

var pagesizes = ["A0", "A1", "A2", "A3", "A4", "A5", "A6", "A7", "A8", "A9", "A10", "B0", "B1", "B2", "B3", "B4", "B5", "B6", "B7", "B8", "B9", "B10", "C0", "C1", "C2", "C3", "C4", "C5", "C6", "C7", "C8", "C9", "C10", "LETTER", "LEGAL", "ELEVENSEVENTEEN", "JUNIOR_LEGAL", "HALF_LETTER", "GOV_LETTER", "GOV_LEGAL", "TABLOID", "LEDGER"]

var default_img = "images/bkg.jpg";
var __CHILD_WINDOW_HANDLE_SCREENSHOT = null;
var url_server = "/",
    dbstore = "rocketbot",
    dbname = "history",
    dbversion = 5;
/**
* Version de RocketbotStudio
*/
var version = "2022.01.20"  + (anti_cache_id ? "." + anti_cache_id : "_");
var userAgent = navigator.userAgent.toLowerCase();
var isElectron = userAgent.indexOf(' electron/') > -1;




function setCookie(cname, cvalue, exdays) {
    var d = new Date();
    d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000));
    var expires = "expires=" + d.toUTCString();
    document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
}

function getCookie(cname) {
    var name = cname + "=";
    var ca = document.cookie.split(';');
    for (var i = 0; i < ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0) == ' ') {
            c = c.substring(1);
        }
        if (c.indexOf(name) == 0) {
            return c.substring(name.length, c.length);
        }
    }
    return "";
}
var loading_img = document.getElementById("loop")
if (getCookie('theme') == "dark") {
    $("#dark_mode").attr('href', 'styles/dark.css');
    $("body").addClass("theme-dark")
    if (loading_img) loading_img.src = "images/loading-loop-still-dark.gif";
} else {
    $("#dark_mode").attr('href', '');
    $("body").removeClass("theme-dark")
    if (loading_img) loading_img.src = "images/loading-loop-still.gif";
}


/**
* Application RocketbotStudio
* Created by Luciano David Cuello
* neotecsoft@gmail.com / david@rocketbot.cl
*/
angular
    .module('rocketstudiowebApp', [
        'ngAnimate',
        'ngCookies',
        'ngResource',
        'ngRoute',
        'ngSanitize',
        'ngTouch',
        'ngStorage',
        'indexedDB',
        'angular-toArrayFilter',
        'thatisuday.dropzone',
        'ngCropper',
        'dndLists',
        'ui.bootstrap.contextMenu',
        'rt.select2',
        'btford.markdown'
    ])
    .config(function ($rootScopeProvider) {
        $rootScopeProvider.digestTtl(14);
        // 15 is int value, just set to more than 10. If not works justincrement it bye one every-time and refresh page to test
    })
    .config(function ($routeProvider) {
        $routeProvider
            .when('/', {
                templateUrl: 'views/init.html?v=' + version,
                controller: 'InitCtrl',
                controllerAs: 'init'
            })
            // .when('/edit', {
            //     templateUrl: 'views/dev.html?v=' + version,
            //     controller: 'MainCtrl',
            //     controllerAs: 'main'
            // })
            // .when('/edit/:robo_name', {
            //     templateUrl: 'views/dev.html?v=' + version,
            //     controller: 'MainCtrl',
            //     controllerAs: 'main'
            // })
            .when('/edit/:robo_name/:type/:path', {
                templateUrl: 'views/dev.html?v=' + version,
                controller: 'MainCtrl',
                controllerAs: 'main'
            })
            // .otherwise({
            //     redirectTo: '/'
            // });
    })
    .run(function ($rootScope, $http, $timeout, Config, Validators, Bots) {
        $rootScope.caduca = '';
        $rootScope.anti_cache_id = anti_cache_id;
        $rootScope.bots_in_bot = [];
        $rootScope.production = '';
        $rootScope.file_path = '';
        $rootScope.licensed = false;
        $rootScope.language_default = 'es';

        Config.get(function (data) {
            if (data.data.editor) {
                if (data.data.editor.theme) {
                    if (data.data.editor.theme == "dark") {
                        $("#dark_mode").attr('href', 'styles/dark.css');
                        $("body").addClass("theme-dark")

                    } else {
                        $("#dark_mode").attr('href', '');
                        $("body").removeClass("theme-dark")
                    }
                }
                if (data.data.editor.lang) {
                    $rootScope.setLanguage(data.data.editor.lang.toLowerCase())
                    $rootScope.language_default = data.data.editor.lang.toLowerCase();
                }
            } else {
                $rootScope.setLanguage('es');
            }
            if (data.data.server) {
                url_server = "http://localhost:" + data.data.server.port + "/"
            }

        })
        var hr = document.location.href;
        var url = new URL(hr);

        if (url.searchParams.get("port")) {
            // url_server = "http://localhost:" + url.searchParams.get("port");
            url_server = "http://localhost:" + url.searchParams.get("port") + "/";
            console.log(url_server)
        }

        /*
        $http.get(url_server + 'caduca').then(function (data) {
            $rootScope.caduca = data.data;
        })
        $http.get(url_server + 'production').then(function (data) {
            $rootScope.production = data.data;
        })
        */
        $http.get(url_server + 'license').then(function (data) {

            $rootScope.production = data.data.production;
            $rootScope.caduca = data.data.expire;
            $rootScope.licensed = data.data.licensed;
            $rootScope.serial = data.data.serial;
            version = data.data.version;
            $rootScope.version = data.data.version;
            $rootScope.licenseIsOnline = data.data.isOnline;
            $rootScope.licenseIsOnlineOk = data.data.isOnlineOk;
            $rootScope.errorMessage = data.data.msgError;
            if (!$rootScope.$$phase) {
                $rootScope.$apply();
            };
            $rootScope.click_no_lic = function () {
                if ($rootScope.viewLic) {
                    console.log("View lic");
                    $("#nolicense").hide();
                    $rootScope.viewLic()
                } else {
                    console.log("no lic")
                    window.location.href = "/"
                }
            }
            if (!$rootScope.licensed) {
                /*$.confirm({
                    title: 'Not licensed',
                    content: "You don't have an active license, you need it to create a robot",
                    icon: 'icon-ripple fas fa-exclamation-triangle',
                    theme:'supervan',
                    type: 'red',
                    typeAnimated: true,
                    buttons: {
                        close: function () {
                            if($rootScope.viewLic){
                                console.log("View lic");
                                $rootScope.viewLic()
                            }else{
                                console.log("no lic")
                                window.location.href = "/"
                            }
                        }
                    }
                });*/
                $("#nolicense").show();

            } else {
                if ($rootScope.licenseIsOnline && $rootScope.licenseIsOnline != $rootScope.licenseIsOnlineOk) {
                    $.confirm({
                        title: 'Error on license online',
                        content: $rootScope.errorMessage,
                        icon: 'icon-ripple fas fa-heart-broken',
                        theme: 'supervan',
                        type: 'red',
                        typeAnimated: true,
                        buttons: {
                            close: function () {
                                if ($rootScope.viewLic) {
                                    console.log("View lic");
                                    $rootScope.viewLic()
                                } else {
                                    console.log("no lic")
                                    window.location.href = "/"
                                }
                            }
                        }
                    });
                }
            }
        })
        $rootScope.url_commands = url_server + "commands/" + $rootScope.language_default;
        $rootScope.language = {};
        //$rootScope.tree = {}
        $rootScope.centerView = function (id) {
            setTimeout(function () {
                document.getElementById(id).scrollIntoView({
                    block: 'center',
                    behavior: 'smooth'
                });
            }, 300);
        };
        $rootScope.loadMenus = function () {
            //ps_commands = new PerfectScrollbar( document.querySelector('#list_commands'));
            $rootScope.dzOptions = {
                url: '/',
                autoProcessQueue: false,
                dictDefaultMessage: "Drag and Drop JSON file",
            };
            /**
            * Fin drag and drop
            */
            $rootScope.menuOptionsOnly = [
            {
                text: '<i class="fa fa-paste"></i> ' + 'Paste',
                click: function ($itemScope, $event, modelValue, text, $li) {
                    $.post(
                        url_server + "paste"
                    ).then(function (data) {
                        var d = JSON.parse(data);
                        delete d['$$hashKey'];
                        $rootScope.copyCommand($rootScope.commands, d);

                    });
                }
            }
            ];
            $rootScope.menuOptionsC = [
                {
                    text: '<i class="fa fa-copy"></i> ' + 'Copy',
                    click: function ($itemScope, $event, modelValue, text, $li) {
                        var data_ = JSON.stringify($itemScope.command);
                        $.post(
                            url_server + "copy", {
                            'data': data_
                        }
                        ).then(function (data) {
                            console.log(data);
                        });
                    }
                }
            ];
            $rootScope.menuOptions = [
                // NEW IMPLEMENTATION
                {
                    text: '<i class="fa fa-copy"></i> ' + 'Copy',
                    click: function ($itemScope, $event, modelValue, text, $li) {
                        console.log($itemScope.command)
                        var data_ = JSON.stringify($itemScope.command);
                        $.post(
                            url_server + "copy", {
                            'data': data_
                        }
                        ).then(function (data) {
                            console.log(data);
                        });
                    }
                },
                {
                    text: '<i class="fa fa-paste"></i> ' + 'Paste',
                    click: function ($itemScope, $event, modelValue, text, $li) {
                        $.post(
                            url_server + "paste"
                        ).then(function (data) {
                            var d = JSON.parse(data);
                            delete d['$$hashKey']
                            if (d.command.group === 'logic') {
                                $rootScope.copyCommand($itemScope.command.children, d);
                            } else {
                                $rootScope.copyCommand($rootScope.commands, d);
                            }
                        });
                    }
                }
            ];
        };

        $rootScope.setLanguage = function (l) {
            $rootScope.language_default = l;
            $rootScope.url_commands = url_server + "commands/" + l;
            $http.get($rootScope.url_commands).then(function (params) {

                var data = params.data;

                $rootScope.tree = data.commands;
                $rootScope.language[l] = data.texts;
                $rootScope.loadMenus = function (func) {
                    $rootScope.dzOptions = {
                        url: '/',
                        autoProcessQueue: false,
                        dictDefaultMessage: ($rootScope.language[$rootScope.language_default].drag_drop_text || "Drag and Drop JSON file"),
                    };
                    /**
                    * Fin drag and drop
                    */
                    $rootScope.menuOptionsOnly = [
                    {
                        text: '<i class="fa fa-paste"></i> ' + ($rootScope.language[$rootScope.language_default].paste || "Paste"),
                        click: function ($itemScope, $event, modelValue, text, $li) {
                            $.post(
                                url_server + "paste"
                            ).then(function (data) {
                                var d = JSON.parse(data);
                                delete d['$$hashKey']
                                $rootScope.copyCommand($rootScope.commands, d);

                            });
                        }
                    }
                    ];
                    $rootScope.menuOptionsC = [
                        // NEW IMPLEMENTATION
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
                                    console.log(data)
                                });
                            }
                        },
                        {
                            html: '<a target="_blank" href_="" id="help_command_menu" class="dropdown-item" tabindex="-1" href="#" style="text-align: left; padding-right: 8px;">' +
                                '<i class="fa fa-question-circle"></i> ' + ($rootScope.language[$rootScope.language_default].command_help || "Command Help") +
                                '</a>',
                            click: function ($itemScope, $event, modelValue, text, $li) {
                                console.log($rootScope.help_command_link);
                                window.open($rootScope.help_command_link);
                            }
                        }
                    ];
                    if(func){
                        func();
                    }
                };
                /*     $timeout(function(){
                    
                    var tmp_ = document.querySelector('#list_commands');
                    ps_commands = new PerfectScrollbar(tmp_)
                }, 1500)*/
            })
            $timeout(function () {
                $("body.page-loaded .loader-wrap ").fadeOut(1500);
            }, 1500);
        }
        $rootScope.search_results = 0;
        $rootScope.initDrag = function () {
            $rootScope.ini_add_command = 0;
        };
        $rootScope.time_load = Date.now();
        $rootScope.robot_name = 'RocketBot';

        window.localStorage.setItem("server_url", url_server);
        $rootScope.url_server = url_server;
        /*
        if (navigator.language.indexOf("es") !== -1) {
            $rootScope.setLanguage('es');
        }else {
            $rootScope.setLanguage('en');
        }
        */

        $rootScope.isValidBotName = function (scope, name) {
            if (name) {
                scope.validBotName = Validators.validName(name);
            }
            return scope.validBotName
        }
    });
