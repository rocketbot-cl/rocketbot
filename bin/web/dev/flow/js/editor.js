/*
Get start node: 
var first_node = editor.getNodeFromId(editor.getNodesFromName("start")[0]).outputs.output_1.connections[0].node
editor.getNodeFromId(start_node).data.id
*/
/**
document.getElementById("icon_status_" + editor.getNodeFromId(2).data.id ).classList.remove("fa-pause")
document.getElementById("icon_status_" + editor.getNodeFromId(2).data.id ).classList.add("fa-check")
*/


var node_pre = 0;
var id = document.getElementById("drawflow");
const editor = new Drawflow(id, Vue, this);
editor.loadingFromDb = false;
editor.reroute = true;
editor.start();
var first_node, actual_node;
var is_multiselect = false;
var mult_arr = [];
var ctrlDown = false,
        ctrlKey = 17,
        cmdKey = 91,
        vKey = 86,
        cKey = 67;
var multiselect_dict = {};
var drag_start = false;
var active_node_id = null;
var node_copy = null;
let dr  = new Selectables({
        zone:'#drawflow',
        elements: ['.drawflow-node'],
        
        selectedClass: 'selected',
        
        key: 'altKey',
        moreUsing: 'altKey',
        
        start: function (e) {
            if (e.altKey) {
                is_multiselect = true;
                editor.editor_selected = false;
                editor.editor_mode = 'fixed';
                console.log('Starting selection on ' + this.elements + ' in ' + this.zone);
            }
        },
        
        stop: function (e) {
            editor.editor_mode='edit';
            is_multiselect = false;
            console.log('Finished selecting   ' + this.elements + ' in ' + this.zone);
        },
        
        onSelect: function (el) {
            if(el.id.includes('node-') == true) {
                let id = parseInt(el.id.split('-')[1]);
                console.log(id);
                try{
                    document.getElementById("node-"+id).addEventListener('mousedown', node_mousedown, false);
                    document.getElementById("node-"+id).addEventListener('mouseup', node_mouseup, false);
                } catch(err) {console.error(err)}
                
                
                mult_arr.push(id);
            }
            console.log('onselect', el);
        },
        
        onDeselect: function (el) {
            node_remove_listener(el);
            //console.log('ondeselect', el);
        },
        
        enabled: true
    });
    
let setSelectable = ()=>{
    dr.disable();dr.enable()
}
function node_remove_listener(el) {
    if(el.id.includes('node-') == true) {
        let temp_arr = [];
        for(value of mult_arr) {
            let id = parseInt(el.id.split('-')[1]);
            if(value == id) {
                try{
                    document.getElementById("node-"+value).removeEventListener('mousedown', node_mousedown, false);
                    document.getElementById("node-"+value).removeEventListener('mouseup', node_mouseup, false);
                } catch(err) {}
                temp_arr.push(value);
            }
        }
        for(value of temp_arr) {
            mult_arr = mult_arr.filter(function(ele){return ele != value;});
        }
    }
}

function node_mousedown(e) {
    if(e.type === 'mousedown') {
        drag_start = true;
        active_node_id = parseInt(e.currentTarget.id.split('-')[1]);
        for (i=1; i<=editor.nodeId; i++) {
            if(typeof editor.drawflow.drawflow.Home.data[i] !== "undefined") {
                let node = editor.getNodeFromId(active_node_id);
                multiselect_dict[i] = {'pos_x': editor.drawflow.drawflow.Home.data[i].pos_x - node.pos_x,
                'pos_y': editor.drawflow.drawflow.Home.data[i].pos_y - node.pos_y,};
            }
        }
    }
}


function node_mouseup(e) {
    if(e.type === 'mouseup') {
        drag_start = false;
        active_node_id = null;
        multiselect_dict = {};
    }
}


document.getElementById('drawflow').addEventListener('dblclick', clear_selection, false);
document.getElementById('drawflow').addEventListener('keydown', function(e){
    console.log(e)
    if(e.key === "Escape"){
        clear_selection();
    }
    if(e.key === "Backspace"){

        if(document.querySelectorAll("div.drawflow-node.selected").length >0){
            $.confirm({
                title: app.texts.delete ,
                
               
                content: `
                <div class="row">
                    <div class="col-3">     
                    <img src="flow/img/bots/message.png" alt=""> 
                    </div>
                    <div class="col-9 pt-4">
                       <h2> ${app.texts.delete}  ${document.querySelectorAll("div.drawflow-node.selected").length }  ?</h2>
                    </div>
                    
                </div>
                        `,
                icon: 'fas fa-trash-alt',
                theme: 'bootstrap',
                type: 'red',
                columnClass: 'medium',
                closeIcon: true,
                typeAnimated: true,
                
                buttons: {
                    ok: {
                        text: 'Yes, delete it',
                        btnClass: 'btn-danger',
                        action: function () {
                            let res = document.querySelectorAll("div.drawflow-node.selected").forEach((e)=>{
                                console.log(e)
                                deleteNode(e.id)
                            })

                        }
                    },
                    close: {
                        text: 'No, Cancel',
                    }
                }
            });

            
        }
    }
    if (e.keyCode == ctrlKey || e.keyCode == cmdKey) ctrlDown = true;
    if (ctrlDown && (e.keyCode == cKey)){
        console.log(actual_node)
        node_copy = copyObject(actual_node.data.id)
    };
    if (ctrlDown && (e.keyCode == vKey)){
        console.log("Document catch Ctrl+V", node_copy);
        cloneCommand(node_copy)
    }
});
document.getElementById('drawflow').addEventListener("keyup", (e)=>{
    if (e.keyCode == ctrlKey || e.keyCode == cmdKey) ctrlDown = false;
})


function clear_selection(e) {
    dr.foreach(dr.items, function (el) {
        el.classList.remove(dr.options.selectedClass);
        node_remove_listener(el);
    });
}
editor.on('mouseMove', function(position) {
    //console.log('Position mouse x:' + position.x + ' y:'+ position.y);
    if(drag_start == true) {
        for (i of mult_arr) {
            if(i != active_node_id) {
                if(typeof editor.drawflow.drawflow.Home.data[i] !== "undefined") {
                    try{
                        let node = editor.getNodeFromId(active_node_id);
                        let elem = document.getElementById("node-"+i).children[1].children[0];
                        let pos_x = multiselect_dict[i]['pos_x'];
                        let pos_y = multiselect_dict[i]['pos_y'];
                        editor.drawflow.drawflow.Home.data[i].pos_x = node.pos_x + pos_x;
                        editor.drawflow.drawflow.Home.data[i].pos_y = node.pos_y + pos_y;
                        document.getElementById(`node-${i}`).style.left = (node.pos_x + pos_x) + "px";
                        document.getElementById(`node-${i}`).style.top = (node.pos_y + pos_y) + "px";
                        editor.updateConnectionNodes(`node-${i}`);
                    } catch(err) {}
                }
            }
        }
    }
})

/* Mouse and Touch Actions */
editor.on("connectionCreated", function(info) {
    /**
    * Remove duplicated outputs
    */
   console.log(info)
    const nodeInfo = editor.getNodeFromId(info.output_id);
    if(nodeInfo.outputs[info.output_class].connections.length > 1) {
        let removeConnectionInfo = nodeInfo.outputs[info.output_class].connections[0];
        editor.removeSingleConnection(info.output_id, removeConnectionInfo.node, info.output_class, removeConnectionInfo.output);
    }
    const nodeInfoI = editor.getNodeFromId(info.input_id);

    if(nodeInfoI.inputs[info.input_class].connections.length > 1) {
        let removeConnectionInfo = nodeInfoI.inputs[info.input_class].connections[0];
        
        editor.removeSingleConnection(
            nodeInfoI.inputs.input_1.connections[0].node, 
            info.input_id, 

            nodeInfoI.inputs.input_1.connections[0].input,
            info.input_class
            );
    }
    setSelectable();
    
});
editor.on('contextmenu', function(event) {
    
    if(event.target.closest(".drawflow_content_node") != null || event.target.classList[0] === 'drawflow-node') {
        showConextMenu(event.clientX, event.clientY, event.target)
    }
});
editor.on('nodeSelected', function(event) {
    console.log('node_select',event)
    actual_node = editor.getNodeFromId(event)
})

editor.on('nodeCreated', function(event){
    
    setSelectable();
    //console.log('nodeCreated',editor.loadingFromDb, event)
    //
    
})
editor.on('nodeRemoved', function(id) {
    console.log("Node removed " + id);
    setSelectable();
    try{
        deleteCommandById(app.$data.bot.project.commands ,actual_node.data.id )
    }catch(e){}
})
function showConextMenu(x,y, target) {
    //var pos_x = editor.pos_x * ( editor.precanvas.clientWidth / (editor.precanvas.clientWidth * editor.zoom)) - (editor.precanvas.getBoundingClientRect().x * ( editor.precanvas.clientWidth / (editor.precanvas.clientWidth * editor.zoom)));
    //var pos_y = editor.pos_y * ( editor.precanvas.clientHeight / (editor.precanvas.clientHeight * editor.zoom)) - (editor.precanvas.getBoundingClientRect().y * ( editor.precanvas.clientHeight / (editor.precanvas.clientHeight * editor.zoom)));
    var pos_x = x * ( editor.precanvas.clientWidth / (editor.precanvas.clientWidth * editor.zoom)) - (editor.precanvas.getBoundingClientRect().x *  ( editor.precanvas.clientWidth / (editor.precanvas.clientWidth * editor.zoom)) ) ;
    var pos_y = y * ( editor.precanvas.clientHeight / (editor.precanvas.clientHeight * editor.zoom)) - (editor.precanvas.getBoundingClientRect().y *  ( editor.precanvas.clientHeight / (editor.precanvas.clientHeight * editor.zoom)) ) ;
    
    
    var contextmenu = document.createElement('div');
    contextmenu.id = "contextmenu";
    contextmenu.innerHTML = `
    <div class="contextmenu shadow d-none">
    <button class="btn btn-default btn-block btn-sm text-left m-0" onclick="editCommand(actual_node.data.id)"> <i class="fa fa-edit"></i> Edit </button>
    
    <button class="btn btn-default btn-block btn-sm text-left m-0" onclick="playNode()"> <i class="fa fa-play"></i> Play </button>
    <button class="btn btn-default btn-block btn-sm text-left m-0" onclick="deleteNode(actual_node.id)"> <i class="fa fa-trash"></i> Delete </button>
    <button class="btn btn-default btn-block btn-sm text-left m-0" onclick="copyNode()"> <i class="fa fa-copy"></i> Copy </button>
    <button class="btn btn-default btn-block btn-sm text-left m-0" > <i class="fa fa-paste"></i> Paste </button>
    <button class="btn btn-default btn-block btn-sm text-left m-0"> <i class="fa fa-upload"></i> Load bot </button>
    </div>
    
    <ul class="contextmenu dropdown-menu show shadow-lg" role="menu" >
    <li><div onclick="editCommand(actual_node.data.id)" class="dropdown-item" tabindex="-1" href="#" style="text-align: left; padding-right: 8px;" ><i class="fa fa-pencil-alt"></i>  ${app.texts.edit_command}</div></li>
    
    <li><div class="dropdown-item"  onclick="app.$data.viewVars=!app.$data.viewVars" tabindex="-1"  style="text-align: left; padding-right: 8px;"><b>{ }</b> ${app.texts.add_variable_text}</div></li>
    <!--
    <li><a class="dropdown-item" tabindex="-1" href="#" style="text-align: left; padding-right: 8px;"><i class="fa fa-copy"></i>  ${app.texts.copy} [ctrl+c]</a></li>
    <li><a class="dropdown-item" tabindex="-1" href="#" style="text-align: left; padding-right: 8px;"><i class="fa fa-paste"></i>  ${app.texts.paste} [ctrl+v]</a></li>
    -->
    <li><div onclick="cloneCommand(actual_node.data.id)" class="dropdown-item"  tabindex="-1" href="#" style="text-align: left; padding-right: 8px;"><i class="fa fa-clone"></i>  ${app.texts.clone}</div></li>
    <li class="divider"></li>
    <li><div class="dropdown-item" onclick="deleteNode()" tabindex="-1" href="#" style="text-align: left; padding-right: 8px;"><i class="fa fa-trash text-danger"></i>  ${app.texts.delete} - [del]</div></li>
    <li class="divider"></li>
    <li><div onclick="setBreakpoint()" class="dropdown-item" tabindex="-1" href="#" style="text-align: left; padding-right: 8px;"><i class="fa fa-circle"></i>  ${app.texts.toggle_breakpoint}</div></li>
    <li><div onclick="playNode()" class="dropdown-item" tabindex="-1" href="#" style="text-align: left; padding-right: 8px;"><i class="fas fa-play-circle"></i> ${app.texts.run_command}</div></li>
    <li><div onclick="app.startrobot()" class="dropdown-item" tabindex="-1" href="#" style="text-align: left; padding-right: 8px;"><i class="fas fa-flag-checkered"></i> ${app.texts.run_robot}</div></li>
    <li><div target="_blank" onclick="helpCommand()" id="help_command_menu" class="dropdown-item" tabindex="-1" style="text-align: left; padding-right: 8px;"><i class="fa fa-question-circle"></i> ${app.texts.command_help}</div></li>
    </ul>
    `;
    
    contextmenu.style.left = pos_x + "px";
    contextmenu.style.top = pos_y + "px";
    
    
    editor.precanvas.appendChild(contextmenu);
}
let helpCommand = ()=>{
    command = getCommandById(app.$data.bot.project.commands,actual_node.data.id)
    console.log(command)
    let url_ = "https://docs.rocketbot.com/?tag=" + command.father+ "-" + command.group;
    window.open(url_)
}
function showGroup(id, out, hiden_, c){
    let node_id;
    Object.values(editor.export().drawflow.Home.data).forEach((e)=>{
        if(e.data.id == id){
            let tmp_n = e.data
            tmp_n["hiden"] = hiden_
            editor.updateNodeDataFromId(e.id, tmp_n)
            node_id = e.id
            console.log(e)
            if(hiden_){
                
                    $("#btn_hide_" + out +"_" + id ).hide()
                    $("#btn_show_" + out +"_"  + id ).show()
               
            }else{
                
                    $("#btn_hide_" + out +"_"  + id ).show()
                    $("#btn_show_" + out +"_"  + id ).hide()
                
            }
            searchChild(editor.getNodeFromId(node_id),out, hiden_)
            editor.updateConnectionNodes('node-' + node_id)
        }
    })
    return false
}
function unShowConextMenu() {
    var contextmenu = document.getElementById('contextmenu')
    if(contextmenu != null) {
        contextmenu.remove();
    }
    
}

editor.on('click', function(event) {
    /**
    * Close contextual menu
    */
    if(event.target.closest("#contextmenu") === null) {
        unShowConextMenu();
    }
});

var elements = document.getElementsByClassName('drag-drawflow');
for (var i = 0; i < elements.length; i++) {
    elements[i].addEventListener('touchend', drop, false);
    elements[i].addEventListener('touchmove', positionMobile, false);
    elements[i].addEventListener('touchstart', drag, false );
}

var mobile_item_selec = '';
var mobile_item_group = '';
var mobile_last_move = null;
function positionMobile(ev) {
    mobile_last_move = ev;
}

function allowDrop(ev) {
    ev.preventDefault();
}

function drag(ev) {
    
    ev.dataTransfer.setData("node", ev.target.getAttribute('data-node'));
    ev.dataTransfer.setData("node-group", ev.target.getAttribute('data-node-group'));
    ev.dataTransfer.setData("node-command", ev.target.getAttribute('data-node-command'));
    
}

function drop(ev) {
    /*
    if (ev.type === "touchend") {
        var parentdrawflow = document.elementFromPoint( mobile_last_move.touches[0].clientX, mobile_last_move.touches[0].clientY).closest("#drawflow");
        if(parentdrawflow != null) {
            addNodeToDrawFlow(mobile_item_selec, mobile_item_group, mobile_last_move.touches[0].clientX, mobile_last_move.touches[0].clientY);
        }
        mobile_item_selec = '';
    } else {*/
    ev.preventDefault();
    if(ev.dataTransfer.files.length>0){
        var file = ev.dataTransfer.files[0], reader = new FileReader();
        reader.onload = function (event) {
            console.log(event.target.result)
            let j = JSON.parse(event.target.result);
            let codeTemp = []
            j.project.commands.forEach((e)=>{
                let c = e
                c.id = guid()
                app.$data.bot.project.commands.push(c)
                codeTemp.push(c)
                console.log(e)
            })
            let max_y= 0

            Object.entries(editor.export().drawflow.Home.data).map((e)=>{
               
                console.log( e[1])
                max_y = e[1].pos_y > max_y? e[1].pos_y: max_y
            })

            
            loadBotView_(codeTemp,null,max_y + 200)
            //holder.style.background = 'url(' + event.target.result + ') no-repeat center';

        };
        console.log(file);
        reader.readAsText(file);
    }
    var data = ev.dataTransfer.getData("node");
    var group = ev.dataTransfer.getData("node-group");
    var command = ev.dataTransfer.getData("node-command");
    if (data == 'module' && group == 'scripts') {
        
        //command = JSON.stringify(command);
    }
    console.log(data, group, command)
    
    addNodeToDrawFlow(data, group, ev.clientX, ev.clientY, command );
    //}
    
}

function addNodeToDrawFlow(name, group, pos_x, pos_y, command, id, command_complete, return_html, no_calculate_position) {
    //console.log(name, group, pos_x, pos_y, command, id, command_complete);
    //console.log(name, group, command);
    if(editor.editor_mode === 'fixed' || !name || !group) {
        return false;
    }
    if(!id) {
        id = guid()
        
    }
    if(!return_html){
        return_html = false;
    }
    
    if(!no_calculate_position){
        pos_x = pos_x * ( editor.precanvas.clientWidth / (editor.precanvas.clientWidth * editor.zoom)) - (editor.precanvas.getBoundingClientRect().x * ( editor.precanvas.clientWidth / (editor.precanvas.clientWidth * editor.zoom)));
        pos_y = pos_y * ( editor.precanvas.clientHeight / (editor.precanvas.clientHeight * editor.zoom)) - (editor.precanvas.getBoundingClientRect().y * ( editor.precanvas.clientHeight / (editor.precanvas.clientHeight * editor.zoom)));
    }
    var node_created_id ;
    var extra_class = extra_class_blink = "";
    var extra_class_not = "d-none";
    // console.log('father_dataf',command_complete, command, typeof command);
    
    var father_data = app.getFatherData(name, group, command);
    let command_ = '';
    
    if(!editor.loadingFromDb){
        var command__ = {...Command};
        command__.id = id
        command__.father = name
        command__.group = group
        if (name == 'module' && group == 'scripts') {
            //command = JSON.stringify(command);
            command__.command = command
        }
        app.$data.bot.project.commands.push(command__)
    }
    
    if(!father_data && command.length > 0) {
        if(command.startsWith('{') && command.endsWith('}')) {
            command_ = JSON.parse(command);
        }
        extra_class = 'd-none';
        extra_class_not = '';
        extra_class_blink = 'blink_me'
        father_data = {
            icon: '../../images/alerta.png',
            title: command_['module'] + '<br><b>Mod ' + command_['module_name'] + '</b>',
        }
    }
    var template = "";
    var class_ = "rocketbot";
    var connections_out = 1
    var connections_in = 1
    var extra_style = "#BC0116";
    var isMod = false;
    let class_edited = (command==null||command=="null")?"no-edited": "d-none"
    console.log("command", command, typeof(command), command==null, command=="null")
    switch (name) {
        case 'start':
        class_ = "start";
        connections_out = 1
        connections_in = 0
        template = `<div>
        <div class='running' id='running_${id}'><div></div></div>
        <div class='icon-container' style="background-image: url(data:image/svg+xml;base64,PHN2ZyBpZD0iQ2FwYV8xIiBkYXRhLW5hbWU9IkNhcGEgMSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB2aWV3Qm94PSIwIDAgNjQgNjQiPjxkZWZzPjxzdHlsZT4uY2xzLTF7ZmlsbDojZmZmO308L3N0eWxlPjwvZGVmcz48cGF0aCBjbGFzcz0iY2xzLTEiIGQ9Ik0xMy4zMSwxMS42N2ExLjg5LDEuODksMCwxLDAtMy42Ni45MkwyMiw2MS4yNmExLjksMS45LDAsMCwwLDEuODMsMS40MywyLDIsMCwwLDAsLjQ3LS4wNiwxLjg4LDEuODgsMCwwLDAsMS4zNi0yLjI5WiIvPjxwYXRoIGNsYXNzPSJjbHMtMSIgZD0iTTU0LjM3LDI1LjM3cS0zLTExLjEzLTYtMjIuMjZhMiwyLDAsMCwwLTItMS43NkMzNSwuNTQsMjcuNTcsMTEuNzksMTYuMjYsMTFjLS44OS0uMTEtMS40Ni4zNi0xLjI1LDEuMTYsMiw3LjQzLDQsMTQuODUsNiwyMi4yN2EyLjIzLDIuMjMsMCwwLDAsMiwxLjc1YzExLjMxLjgyLDE4LjczLTEwLjQ0LDMwLTkuNjJDNTQsMjYuNjQsNTQuNTgsMjYuMTgsNTQuMzcsMjUuMzdaTTQ1LjQ5LDQuMTZjLjU2LDIsMS4xMSw0LjA5LDEuNjcsNi4xNGEyMC41LDIwLjUsMCwwLDAtNi43LDEuMzlMMzguNzksNS41NUEyMC4xLDIwLjEsMCwwLDEsNDUuNDksNC4xNlptLTIzLjI5LDIzLTEuODktN2EyMC4yNiwyMC4yNiwwLDAsMCw3LTEuNTRjLS41NS0yLTEuMTEtNC4wOS0xLjY2LTYuMTRBNjcuMjQsNjcuMjQsMCwwLDAsMzIuMjMsOWMuNTUsMiwxLjExLDQuMSwxLjY2LDYuMTRhNjUuMTMsNjUuMTMsMCwwLDEtNi41NSwzLjQ4cS45NCwzLjQ5LDEuOSw3QTIwLjU4LDIwLjU4LDAsMCwxLDIyLjIsMjcuMTJabTguNzIsNC43LTEuNjgtNi4yM2E2Ny40Myw2Ny40MywwLDAsMCw2LjUtMy40NmMuNTYsMi4wOCwxLjEzLDQuMTYsMS42OSw2LjIzQTY2LjQzLDY2LjQzLDAsMCwxLDMwLjkyLDMxLjgyWm00Ljg2LTkuNzItMS44OS03YTYzLjA1LDYzLjA1LDAsMCwxLDYuNTctMy40M2wxLjg5LDdBNjMuMDUsNjMuMDUsMCwwLDAsMzUuNzgsMjIuMVptOC4zLDIuNzlxLS44Ni0zLjEyLTEuNjktNi4yM2EyMC4zLDIwLjMsMCwwLDEsNi42Ni0xLjM4Yy41NiwyLjA4LDEuMTMsNC4xNiwxLjY5LDYuMjNBMjAuNTYsMjAuNTYsMCwwLDAsNDQuMDgsMjQuODlaIi8+PC9zdmc+">              
        </div>
        <div class="drawflow_content_text">
        <h4>Start</h4>
        <small> </small>
        </div>
        </div>`;
        break;
        
        case 'trycatch':
        connections_out = 3;
        class_ = "logical";
        template = `<div class="${name} popover_" id="command_${id}" ondblclick="editCommand('${id}')" data-content="${command_complete?.description||''}" rel="popover" data-placement="top">
        <div class='running' id='running_${id}'><div></div></div>

        <div class="hide_group_1" id="btn_hide_1_${id}" onclick="showGroup('${id}',1, true, this)"> <i class="fa fa-minus-circle"></i> </div>
        <div class="hide_group_1 active" style="display:none" id="btn_show_1_${id}" onclick="showGroup('${id}',1, false, this)"> <i class="fa fa-plus-circle"></i> </div>
        
        <div class="hide_group_2" id="btn_hide_2_${id}" onclick="showGroup('${id}',2, true, this)"> <i class="fa fa-minus-circle"></i> </div>
        <div class="hide_group_2 active" style="display:none" id="btn_show_2_${id}" onclick="showGroup('${id}',2, false, this)"> <i class="fa fa-plus-circle"></i> </div>
        
        <div class="hide_group_3" id="btn_hide_3_${id}" onclick="showGroup('${id}',3, true, this)"> <i class="fa fa-minus-circle"></i> </div>
        <div class="hide_group_3 active" style="display:none" id="btn_show_3_${id}" onclick="showGroup('${id}',3, false, this)"> <i class="fa fa-plus-circle"></i> </div>
        
       
        <div class='icon-container' style='background-image: url(${father_data?.icon||''})'></div>
        <div class="if">Try</div>
        <div class="else">Catch</div>
        <div class="endif">End</div>
        
        <div class="drawflow_content_text">
        <h4><i id="icon_status_${id}" class="fa fa-pause"></i> ${father_data.name||father_data.title||father_data.en['title']}</h4>
        <small id='node_command_${id}'>${command}</small>
        </div>
        <div class="breakpoint d-none" id="breakpoint_${id}" onclick="setBreakpoint(this)"></div>
        <div class="btn_edit d-none" id="edit_${id}" onclick="editCommand(actual_node.data.id)"><i class="fa fa-pencil"></i></div>
        <div class="btn_disabled d-none" id="disabled_${id}" onclick="toogleDisabled(this)"><i class="far fa-eye-slash"></i></div>

        </div>`;
        
        
        
        break;
        case 'for':
        connections_out = 2;
        class_ = "logical";

        template = `<div class="${name} popover_" id="command_${id}" ondblclick="editCommand('${id}')" data-content="${command_complete?.description||''}" rel="popover" data-placement="top">
        <div class='running' id='running_${id}'><div></div></div>
        <div class="hide_group_1" id="btn_hide_1_${id}" onclick="showGroup('${id}',1, true, this)"> <i class="fa fa-minus-circle"></i> </div>
        <div class="hide_group_1 active" style="display:none" id="btn_show_1_${id}" onclick="showGroup('${id}',1, false, this)"> <i class="fa fa-plus-circle"></i> </div>
        
        <div class="hide_group_2" id="btn_hide_2_${id}" onclick="showGroup('${id}',2, true, this)"> <i class="fa fa-minus-circle"></i> </div>
        <div class="hide_group_2 active" style="display:none" id="btn_show_2_${id}" onclick="showGroup('${id}',2, false, this)"> <i class="fa fa-plus-circle"></i> </div>
        
         
        <div class="${class_edited}" id="no_edited_${id}"></div>
        <div class='icon-container' style='background-image: url(${father_data?.icon||''})'></div>
        <div class="if" >For</div>
        <div class="endif" style="top: 28px;">End for</div>    
        <div class="drawflow_content_text">
        <h4><i id="icon_status_${id}" class="fa fa-pause"></i> ${father_data.name||father_data.title||father_data.en['title']}</h4>
        <small id='node_command_${id}'>${command}</small>
        </div>
        <div class="breakpoint d-none" id="breakpoint_${id}" onclick="setBreakpoint(this)"></div>
        <div class="btn_edit d-none" id="edit_${id}" onclick="editCommand(actual_node.data.id)"><i class="fa fa-pencil"></i></div>
        <div class="btn_disabled d-none" id="disabled_${id}" onclick="toogleDisabled(this)"><i class="far fa-eye-slash"></i></div>

        </div>`;
        
        break;
        case 'group':
        connections_out = 2;
        class_ = "logical";
        template = `<div class="${name} popover_" id="command_${id}" ondblclick="editCommand('${id}')" data-content="${command_complete?.description||''}" rel="popover" data-placement="top">
        <div class='running' id='running_${id}'><div></div></div>
        
        <div class="hide_group_1" id="btn_hide_1_${id}" onclick="showGroup('${id}',1, true, this)"> <i class="fa fa-minus-circle"></i> </div>
        <div class="hide_group_1 active" style="display:none" id="btn_show_1_${id}" onclick="showGroup('${id}',1, false, this)"> <i class="fa fa-plus-circle"></i> </div>
        
        <div class="hide_group_2" id="btn_hide_2_${id}" onclick="showGroup('${id}',2, true, this)"> <i class="fa fa-minus-circle"></i> </div>
        <div class="hide_group_2 active" style="display:none" id="btn_show_2_${id}" onclick="showGroup('${id}',2, false, this)"> <i class="fa fa-plus-circle"></i> </div>
        
        <div class='icon-container' style='background-image: url(${father_data?.icon||''})'></div>
        <div class="if" > ${father_data.name||father_data.title||father_data.en['title']}</div>
        <div class="endif" style="top: 28px;">Continue</div> 
        <div class="drawflow_content_text">
        <h4><i id="icon_status_${id}" class="fa fa-pause"></i> ${father_data.name||father_data.title||father_data.en['title']}</h4>
        <small id='node_command_${id}'>${command_complete?.description}</small>
        </div>
        <div class="breakpoint d-none" id="breakpoint_${id}" onclick="setBreakpoint(this)"></div>
        <div class="btn_edit d-none" id="edit_${id}" onclick="editCommand(actual_node.data.id)"><i class="fa fa-pencil"></i></div>
        <div class="btn_disabled d-none" id="disabled_${id}" onclick="toogleDisabled(this)"><i class="far fa-eye-slash"></i></div>

        </div>`;
        
        break;
        case 'evaluatewhile':
        connections_out = 2;
        class_ = "logical";
        template = `<div class="${name} popover_" id="command_${id}" ondblclick="editCommand('${id}')" data-content="${command_complete?.description||''}" rel="popover" data-placement="top">
        <div class='running' id='running_${id}'><div></div></div>
        <div class="hide_group_1" id="btn_hide_1_${id}" onclick="showGroup('${id}',1, true, this)"> <i class="fa fa-minus-circle"></i> </div>
        <div class="hide_group_1 active" style="display:none" id="btn_show_1_${id}" onclick="showGroup('${id}',1, false, this)"> <i class="fa fa-plus-circle"></i> </div>
        
        <div class="hide_group_2" id="btn_hide_2_${id}" onclick="showGroup('${id}',2, true, this)"> <i class="fa fa-minus-circle"></i> </div>
        <div class="hide_group_2 active" style="display:none" id="btn_show_2_${id}" onclick="showGroup('${id}',2, false, this)"> <i class="fa fa-plus-circle"></i> </div>
       
        <div class="${class_edited}" id="no_edited_${id}"></div>
        <div class='icon-container' style='background-image: url(${father_data?.icon||''})'></div>
        <div class="if" >While</div>
        <div class="endif" style="top: 28px;">End</div>
        <div class="drawflow_content_text">
        <h4><i id="icon_status_${id}" class="fa fa-pause"></i> ${father_data.name||father_data.title||father_data.en['title']}</h4>
        <small id='node_command_${id}'>${command}</small>
        </div>
        <div class="breakpoint d-none" id="breakpoint_${id}" onclick="setBreakpoint(this)"></div>
        <div class="btn_edit d-none" id="edit_${id}" onclick="editCommand(actual_node.data.id)"><i class="fa fa-pencil"></i></div>
        <div class="btn_disabled d-none" id="disabled_${id}" onclick="toogleDisabled(this)"><i class="far fa-eye-slash"></i></div>

        </div>`;
        break;
        
        case 'evaluateIf':
        connections_out = 3;
        class_ = "logical";
        template = `<div class="${name} popover_" id="command_${id}" ondblclick="editCommand('${id}')" data-content="${command_complete?.description||''}" rel="popover" data-placement="top">
        <div class='running' id='running_${id}'><div></div></div>
        
        <div class="hide_group_1" id="btn_hide_1_${id}" onclick="showGroup('${id}',1, true, this)"> <i class="fa fa-minus-circle"></i> </div>
        <div class="hide_group_1 active" style="display:none" id="btn_show_1_${id}" onclick="showGroup('${id}',1, false, this)"> <i class="fa fa-plus-circle"></i> </div>
        
        <div class="hide_group_2" id="btn_hide_2_${id}" onclick="showGroup('${id}',2, true, this)"> <i class="fa fa-minus-circle"></i> </div>
        <div class="hide_group_2 active" style="display:none" id="btn_show_2_${id}" onclick="showGroup('${id}',2, false, this)"> <i class="fa fa-plus-circle"></i> </div>
        
        <div class="hide_group_3" id="btn_hide_3_${id}" onclick="showGroup('${id}',3, true, this)"> <i class="fa fa-minus-circle"></i> </div>
        <div class="hide_group_3 active" style="display:none" id="btn_show_3_${id}" onclick="showGroup('${id}',3, false, this)"> <i class="fa fa-plus-circle"></i> </div>

        <div class="${class_edited}" id="no_edited_${id}"></div>

        <div class='icon-container' style='background-image: url(${father_data?.icon||''})'></div>
        <div class="if">If</div>
        <div class="else">Else</div>
        <div class="endif">End If</div>
        
        <div class="drawflow_content_text">
        <h4><i id="icon_status_${id}" class="fa fa-pause"></i> ${father_data.name||father_data.title||father_data.en['title']}</h4>
        <small id='node_command_${id}'>${command}</small>
        </div>
        <div class="breakpoint d-none" id="breakpoint_${id}" onclick="setBreakpoint(this)"></div>
        <div class="btn_edit d-none" id="edit_${id}" onclick="editCommand(actual_node.data.id)"><i class="fa fa-pencil"></i></div>
        <div class="btn_disabled d-none" id="disabled_${id}" onclick="toogleDisabled(this)"><i class="far fa-eye-slash"></i></div>

        </div>`;
        
        break;
        case 'module':
        console.log(father_data)
        class_ = copyObject(group)
        template = `<div class="${name} popover_" id="command_${id}" ondblclick="editCommand('${id}')" data-content="${command_complete?.description||''}" rel="popover" data-placement="top">
        <div class='running' id='running_${id}'><div></div></div>
        <div class="need_install">
        <b class="${extra_class_not}  text-danger font-weight-bold" >You need to install the module</b>
        </div>
        <div class='icon-container ${extra_class_blink}' style='background-image: url(${father_data?.icon||''})'></div>
        <div class="drawflow_content_text">
        <h4><i id="icon_status_${id}" class="fa fa-pause"></i> ${father_data?.title?.en||father_data?.title||father_data?.en['title']||father_data?.module||'Install Module!!! '+command}</h4>
        <small class="${extra_class}" id='node_command_${id}'>${command}</small>
        </div>
        <div class="breakpoint d-none" id="breakpoint_${id}" onclick="setBreakpoint(this)"></div>
        <div class="btn_edit d-none" id="edit_${id}" onclick="editCommand(actual_node.data.id)"><i class="fa fa-pencil"></i></div>
        <div class="btn_disabled d-none" id="disabled_${id}" onclick="toogleDisabled(this)"><i class="far fa-eye-slash"></i></div>

        </div>`;      
        isMod = true;
        
        break;
        case "clickimage":
        case "existimage":
        case "ocrimage":
        case "waitimage":
            class_ = copyObject(group)
            template = `
            <div class="${name}_class popover_" id="command_${id}" ondblclick="editCommand('${id}')" data-content="${command_complete?.description||''}" rel="popover" data-placement="top">
                <div class='running' id='running_${id}'><div></div></div>
                <div class="${class_edited} circle" id="no_edited_${id}"></div>
                <i class="fa-solid fa-camera scissor"></i>

                <div class='icon-container-img' style='background-image: url(${command_complete?.extra_data||''})'></div>
                <div class="drawflow_content_text">
                <h4><i id="icon_status_${id}" class="fa fa-pause"></i> ${father_data?.name||father_data?.title||father_data?.en['title']||'Install Module!!!'}</h4>
                <small id='node_command_${id}'>${command}</small>
                </div>
                <div class="breakpoint d-none" id="breakpoint_${id}" onclick="setBreakpoint(this)"></div>
                <div class="btn_edit d-none" id="edit_${id}" onclick="editCommand(actual_node.data.id)"><i class="fa fa-pencil"></i></div>
                <div class="btn_disabled d-none" id="disabled_${id}" onclick="toogleDisabled(this)"><i class="far fa-eye-slash"></i></div>

            </div>`;      

        break;
        case "execRocketBotDB":
            class_ = copyObject(group)
            template = `<div class="${name}_class popover_" id="command_${id}" ondblclick="editCommand('${id}')" data-content="${command_complete?.description||''}" rel="popover" data-placement="top">
            <div class='running' id='running_${id}'><div></div></div>
            <div class='icon-container' style='background-image: url(${father_data?.icon||''})'></div>
            <div class="drawflow_content_text">
            <h4><i id="icon_status_${id}" class="fa fa-pause"></i> ${father_data?.name||father_data?.title||father_data?.en['title']||'Install Module!!!'}</h4>
            <b id='node_command_${id}'>
                <a target="_blank" href="flow?r=${command}&d=${app.$data.path_encode}">${command} <i class="fa fa-link"></i></a>
            </b>
            </div>
            <div class="breakpoint d-none" id="breakpoint_${id}" onclick="setBreakpoint(this)"></div>
            <div class="btn_edit d-none" id="edit_${id}" onclick="editCommand(actual_node.data.id)"><i class="fa fa-pencil"></i></div>
            <div class="btn_disabled d-none" id="disabled_${id}" onclick="toogleDisabled(this)"><i class="far fa-eye-slash"></i></div>

            </div>`;
        break;
        default:
        class_ = copyObject(group)
        template = `<div class="${name}_class popover_" id="command_${id}" ondblclick="editCommand('${id}')" data-content="${command_complete?.description||''}" rel="popover" data-placement="top">
        <div class='running' id='running_${id}'><div></div></div>
        <div class='icon-container' style='background-image: url(${father_data?.icon||''})'></div>
        <div class="drawflow_content_text">
        <h4><i id="icon_status_${id}" class="fa fa-pause"></i> ${father_data?.name||father_data?.title||father_data?.en['title']||'Install Module!!!'}</h4>
        <small id='node_command_${id}'>${command}</small>
        </div>
        <div class="breakpoint d-none" id="breakpoint_${id}" onclick="setBreakpoint(this)"></div>
        <div class="btn_edit d-none" id="edit_${id}" onclick="editCommand(actual_node.data.id)"><i class="fa fa-pencil"></i></div>
        <div class="btn_disabled d-none" id="disabled_${id}" onclick="toogleDisabled(this)"><i class="far fa-eye-slash"></i></div>

        </div>`;      
    }
    if(return_html) {
        return template;
    }
    
    node_created_id = editor.addNode(name,connections_in,connections_out, pos_x, pos_y, class_, {"id":id,"command": command}, template)
    //console.log(node_created_id)
    $(".popover_").popover({ trigger: "hover" });
    if(command_complete?.disabled) {
        document.getElementById(`node-${node_created_id}`).classList.add('disabled');
        
    }
    if(isMod){
        setColorMods(node_created_id, father_data);
        
        
    }
    return node_created_id;
}

var transform = '';
function setColorMods(node_created_id, father_data){
    var img;
    try{
        var setColor = function(img){
            var vibrant = new Vibrant(img);
                var swatches = vibrant.swatches()
                try{
                    extra_style = vibrant.VibrantSwatch.getHex();
                }catch(err){
                    extra_style = '#607d8b'
                }
                document.getElementById('node-'+img.id.replace("img_","")).style.cssText = document.getElementById('node-'+img.id.replace("img_","")).style.cssText + "border:12px solid "+extra_style+" !important"
            }

        if(father_data){
            img = document.createElement('img');
        
            img.id = "img_"+node_created_id;
            img.setAttribute('src',father_data.icon)
            img.onload = function(e) {
                setColor(img)
                
                //document.getElementById(`node-${this.id.replace("img_","")}`).style.setProperty( 'border','12px solid', extra_style, 'important' );
            }
        }else{
            img = document.getElementById("img_"+node_created_id);
            setColor(img);
        }
        
        //console.log(extra_style);
    }catch(e){
        console.error(e);
    }
}
function showpopup(e) {
    e.target.closest(".drawflow-node").style.zIndex = "9999";
    e.target.children[0].style.display = "block";
    //document.getElementById("modalfix").style.display = "block";
    
    //e.target.children[0].style.transform = 'translate('+translate.x+'px, '+translate.y+'px)';
    transform = editor.precanvas.style.transform;
    editor.precanvas.style.transform = '';
    editor.precanvas.style.left = editor.canvas_x +'px';
    editor.precanvas.style.top = editor.canvas_y +'px';
    console.log(transform);
    
    //e.target.children[0].style.top  =  -editor.canvas_y - editor.container.offsetTop +'px';
    //e.target.children[0].style.left  =  -editor.canvas_x  - editor.container.offsetLeft +'px';
    editor.editor_mode = "fixed";
    
}

function closemodal(e) {
    e.target.closest(".drawflow-node").style.zIndex = "2";
    e.target.parentElement.parentElement.style.display  ="none";
    //document.getElementById("modalfix").style.display = "none";
    editor.precanvas.style.transform = transform;
    editor.precanvas.style.left = '0px';
    editor.precanvas.style.top = '0px';
    editor.editor_mode = "edit";
}

function changeModule(event) {
    var all = document.querySelectorAll(".menu ul li");
    for (var i = 0; i < all.length; i++) {
        all[i].classList.remove('selected');
    }
    event.target.classList.add('selected');
}

function changeMode(option) {
    
    //console.log(lock.id);
    if(option == 'lock') {
        lock.style.display = 'none';
        unlock.style.display = 'block';
    } else {
        lock.style.display = 'block';
        unlock.style.display = 'none';
    }
    
}
function loadBotView(data){
    editor.clear();
    
    node_pre = 0;
    var command = data.project.commands
    var mynode = addNodeToDrawFlow('start',"start", 140, 150, [], 0);
    if(app.$data.robot_type == 'flow' && app.$data.bot?.flow) {
        loadFlowView();
    }else{
        app.$data.robot_type = '';
        app.$data.bot['flow'] = []
        app.$data.bot['commandsList'] =[]
        console.log("No command list")
        loadBotView_(command,300,150,'output_1',mynode)
    }
    first_node = editor.getNodeFromId(editor.getNodesFromName("start")[0])
    actual_node = first_node//.outputs.output_1.connections[0].node
    editor.loadingFromDb = false;
    setSelectable();
    
}
function loadFlowView(){
    var mods = [];
    for(var i in app.$data.bot.flow.drawflow.Home.data){
        
        var id_ = app.$data.bot.flow.drawflow.Home.data[i].data.id;
        
        if(id_){
            var command = getCommandById(app.$data.bot.project.commands, id_);
            var html
            if(command){
                if(command['father'] == 'module'){
                    try{
                    mods.push({id:app.$data.bot.flow.drawflow.Home.data[i].id, fd:app.getFatherData(command['father'],command['group'], command["command"]) });
                    }catch(e){}
                }
                html = addNodeToDrawFlow(command['father'],command['group'], app.$data.bot.flow.drawflow.Home.data[i].pos_x, app.$data.bot.flow.drawflow.Home.data[i].pos_y, command["command"], command['id'], command, true) 
            }else{
                console.log('command not found')
                html =  addNodeToDrawFlow('start',"start", 140, 150, [], 0, [], true);
            }

            app.$data.bot.flow.drawflow.Home.data[i].html = html;
        }
        
    }
    editor.on('import', function(data) {
        console.log(data)
        for(var i in mods){
                       
            setColorMods(mods[i].id, mods[i].fd);

        }

        $(".popover_").popover({ trigger: "hover" });
    });
    editor.import(app.$data.bot.flow)
    

}
function loadBotView_(data,x,y, output_, input_){
    //console.log(data)
    if(!x)x=140;
    if(!y)y=100;
    if(!output_) output_ = "output_1";
    if(!input_) input_ = node_pre;
    var count = 0;
    var mynode, prenode;
    for(var t=0; t< data.length; t++){
        var command = data[t]
        //console.log(command)
        count++;             
        mynode = addNodeToDrawFlow(command['father'],command['group'], x, y, command["command"], command['id'], command);
        
        if(count>1){
            editor.addConnection(prenode,mynode,output_, "input_1")
            
        }else{
            if(input_){
                
                editor.addConnection(input_,mynode,output_, "input_1")
            }
        }
        output_ = "output_1"
        
        if(['evaluateIf',  'trycatch'].includes( command['father'])) output_ = "output_3";
        if(['for', 'evaluatewhile', 'group'].includes( command['father'])) {
            output_ = "output_2"
            x = x + 60
        };
        prenode = mynode
        if(command['children'] && command['children'].length > 0){
            loadBotView_(command['children'], x+200, y-120, "output_1", mynode)
        }
        if(command['else'] && command['else'].length > 0){
            loadBotView_(command['else'], x+200, y, "output_2", mynode)
            y=y+180
        }
        x = x + 140;
        if(count > 600){
            count = 0;
            x = 0;
            y = y + 200;
        }
    }
}

function getNextCommand (my_id, nodo, output_conection){
    console.log(my_id, nodo, output_conection)
    try{
        if(my_id.outputs[`output_${output_conection}`].connections[nodo]){
            var id = my_id.outputs[`output_${output_conection}`].connections[nodo].node
            return editor.getNodeFromId(id)
        }
    }catch(e){
        console.log(e)
    }
    return null
}
function guid() {
    try{
        return crypto.randomUUID();
    }catch(e){
        
    }
    function s4() {
        return Math.floor((1 + Math.random()) * 0x10000)
        .toString(16)
        .substring(1);
    }
    return s4() + s4() + '-' + s4() + '-' + s4() + '-' + s4() + '-' + s4() + s4() + s4();
}
function log(){
    if(DEBUG) console.log( arguments)//Array.prototype.join.call(arguments, ' '));
}
function toogleDisabled(node){
    console.log(node)
    let id_ = "#node-" + actual_node.id;
    var c_ = getCommandById(app.$data.bot.project.commands, actual_node.data.id);
    if(c_?.disabled){
        $(id_).removeClass('disabled');
        c_.disabled = false;
    }else{
        $(id_).addClass('disabled');
        c_.disabled = true;
    }
    getCommandById(app.$data.bot.project.commands, actual_node.data.id, c_)

}
function setBreakpoint(node){
    let id_ = "#breakpoint_" + actual_node.data.id;
    if(actual_node.data?.breakpoint){
        actual_node.data['breakpoint'] = !actual_node.data['breakpoint']
    }else{
        actual_node.data['breakpoint'] = true;
    }
    //console.log(id_, actual_node.data['breakpoint'], $(id_))
    if(actual_node.data['breakpoint']){
        $(id_).removeClass('d-none')
        //console.log("show")
    }else{
        $(id_).addClass('d-none')
    }
    editor.updateNodeDataFromId(actual_node.id, actual_node.data);
    
}
function loadAutocomplete(){
    $(".accept_vars").textcomplete([{
        match: /(\w*){(\w*)$/,
        search: function (term, callback) {
            
            var words = [];
            for (var t = 0; t < app.$data.vars.length; t++) {
                words.push(app.$data.vars[t].name);
            }
            callback($.map(words, function (word) {
                return word.indexOf(term) === 0 ? word : null;
            }));
        },
        replace: function (word) {
            return '$1{' + word + '}';
        },
        template: function (hit) {
            hit = "<b>{}</b> " + hit
            return hit;
        }
        
    },{
        match: /(\w*)%(\w*)$/,
        search: function (term, callback) {
            
            var words = [
                'rocketbot_last_status','rocketbot_children_vars','date','day','month','year','hour','minute','second','milisecond','machine','tab','newline','enter','osname',
            ];
            
            callback($.map(words, function (word) {
                return word.indexOf(term) === 0 ? word : null;
            }));
        },
        replace: function (word) {
            return '$1%' + word + '%';
        },
        template: function (hit) {
            hit = "<i class='fas fa-robot '></i> " + hit
            return hit;
        },
    },{
        match: /(\w*)\.(\w*)$/,
        search: function (term, callback) {
            console.log("🚀 ~ file: editor.js ~ line 811 ~ loadAutocomplete ~ term, callbac", term.length)
            console.log(this)
            if(term.length == 0){

                
                fetch("../lint/python",
                {
                    method: 'POST',
                    headers: {
                    'Content-Type': 'application/x-www-form-urlencoded'
                    },
                    body: $.param({code: this.el.value})
                }).then((e)=> e.json()).then((res)=>{
                    console.log("res", res)
                    window.cacheData = res;
                    callback($.map(res, function (word) {
                        return word.indexOf(term) === 0 ? word : null;
                    }));
                })
            }else {
                callback($.map(window.cacheData, function (word) {
                    return word.indexOf(term) === 0 ? word : null;
                }));
            }
            
                
            
        },
        replace: function (word) {
            return '$1.' + word ;
        },
        template: function (hit) {
            hit = "<i class='fab fa-python '></i> " + hit
            return hit;
        },
    }])
    
    ;
}
