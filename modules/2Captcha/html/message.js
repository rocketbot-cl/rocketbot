
/*

It's necessary to communicate the iframe with the Rocketbot view

*/

function dataHandler(e) {
    console.log('parent received message!:  ', e.data);
    if (e.data) {
        if (e.data.input) {
            $("#input").val(e.data.input);
        }
        if (e.data.table) {
            tabledata = e.data.table
            table.setData(tabledata)
        }
        return 
    } 

    // tabledata = document.DEFAULT_TABLE;
    // table.setData(tabledata)
}

var message = {
    type: 'iframe',
    commands: {}
}
var SendMessage = function () {
    parent.postMessage(message, "*");
}


var eventMethod = window.addEventListener ? "addEventListener" : "attachEvent";
var eventer = window[eventMethod];
var messageEvent = eventMethod == "attachEvent" ? "onmessage" : "message";

// Listen to message from child window
eventer(messageEvent, dataHandler);

function getDataFromRB({ module_name, command_name }) {
    let api = document.URL.split("module")[0]
    var formData = new FormData()
    let command_ = {
        "project": {
            "profile": {
                "name": module_name,
                "description": "",
                "version": "2020.12.30"
            },
            "vars": [
                {
                    "name": module_name + "_fake_var",
                    "data": "",
                    "type": "string",
                    "collapse": true,
                    "$$hashKey": "object:1204"
                }
            ],
            "commands": [
                {
                    "father": "module",
                    "command": `{\"module_name\":\"${module_name}\",\"module\":\"${command_name}\",\"var_name\":\"${module_name + "_fake_var"}\"}`,
                    "option": "",
                    "var": "",
                    "index": 0,
                    "group": "scripts",
                    "execute": 0,
                    "if": "",
                    "children": [],
                    "else": [],
                    "id": "50ad1403-a6d8-d1da-c654-77eba1a4830a",
                    "mode_live": true,
                    "getvar": "",
                    "extra_data": null,
                    "screenshot": "",
                    "execute_debbug": 0,
                    "img": ""
                }
            ],
            "ifs": []
        }
    }

    formData.append('info', JSON.stringify(command_))
    formData.append('db', "")
    var data = null
    return fetch(api + "execute", {
        method: "POST",
        body: formData,
    }).then(res => res.json())
        .catch(error => console.error('Error:', error))
        .then(response => {
            
            data = response.vars[0].data;
            data = data.replaceAll("\'", "\"")
            data = data.replaceAll("None", "\"None\"")
            
            // obj = JSON.parse(data)
            obj = eval('(' + data + ')')
            
            return obj.dataFromCaptcha[0];
        });
}