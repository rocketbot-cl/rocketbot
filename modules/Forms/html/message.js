
/*

It's necessary to communicate the iframe with the Rocketbot view

*/
var clearInput = function(){
    document.getElementById('user').value =""
    document.getElementById('password').value =""
    document.getElementById('apikey').value =""
    document.getElementById('path_ini').value =""
}

var message = {
    type: 'iframe',
    commands: {}
}
var SendMessage = function () {
    parent.postMessage(message, "*");
}
// let path_assets = document.getElementById('path_assets');
// let opcion = path_assets.value;
// document.getElementById('path').innerText = opcion;

clearInput()
$('#options, #user, #password, #apikey, #path_ini').on('change', function (e) {
    message.commands['user'] = $("#user").val();
    message.commands['password'] = $("#password").val();
    message.commands['apikey'] = $("#apikey").val();
    message.commands['path_ini'] = $("#path_ini").val();
    message.commands['options'] = $("#options").val();
    SendMessage();
})
var eventMethod = window.addEventListener ? "addEventListener" : "attachEvent";
var eventer = window[eventMethod];
var messageEvent = eventMethod == "attachEvent" ? "onmessage" : "message";

// Listen to message from child window
eventer(messageEvent, function (e) {
    console.log('parent received message!:  ', e.data);

    clearInput()


    if (e.data && e.data.user) {
        document.getElementById('user').value = e.data.user
    }
    else document.getElementById('user').value =""
    if (e.data && e.data.password) {
        document.getElementById('password').value = e.data.password
    }
    else document.getElementById('password').value =""
    if (e.data && e.data.apikey) {
        document.getElementById('apikey').value = e.data.apikey
    }
    else document.getElementById('apikey').value =""
    if (e.data && e.data.path_ini) {
        document.getElementById('path_ini').value = e.data.path_ini
    }
    else document.getElementById('path_ini').value =""
    if (e.data && e.data.options) {
        document.getElementById('options').value = e.data.options
        document.getElementById('options').onchange();
    }
})