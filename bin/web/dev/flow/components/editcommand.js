Vue.component('modal-edit', {
    template:`
    <div>
    <div class="modal fade" id="modal-edit" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
    <div class="modal-dialog modal-lg" role="document">
        <div class="modal-content">
            <div class="modal-header">
                <h5 class="modal-title w-100" id="exampleModalLabel">
                <img style="width: 28px;float: left;" v-bind:src="commandFather.icon||''">  {{ commandFather.title?.en  || commandFather.title }} 
                <div class="m-1 ml-3 pl-2 float-right rem9 w-100">
                      <div v-if="!edit_description">
                       <small v-if="copyCommand.description" class="mr-3">"<b> {{ copyCommand.description}} </b>"</small> <small v-if="!copyCommand.description||copyCommand.description.length==0" class="text-muted"> {{app.texts.description}} </small> <i @click="edit_description=true" class="fa fa-pencil mr-1 can-click"></i>
                        </div>
                      <input v-if="edit_description" type="text" class="form-control" v-model="copyCommand.description" :placeholder="app.texts.description">
                      
                </div>
                
                </h5>
                
                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                </button>
            </div>
            <div class="modal-body">
                <div class="">
                    <p> <i class="fas fa-question-circle"></i> {{ commandFather?.en?.description|| commandFather.description?.en ||  commandFather.description }}</p>
                    
                    <virtual-clickimage  v-if="commandData && commandData.group == 'virtual'" v-bind:command-data="copyCommand" v-bind:command-father="commandFather"></virtual-clickimage>
                    
                    <web-use  v-if="commandData && commandData.father == 'use'" v-bind:command-data="copyCommand" v-bind:command-father="commandFather"></web-use>
                    <web-waitforobject v-if="commandData && commandData.father == 'waitforobject'" v-bind:command-data="copyCommand" v-bind:command-father="commandFather"></web-waitforobject>
                    <system-setvar v-if="commandData && commandData.father == 'setVar'" v-bind:command-data="copyCommand" v-bind:command-father="commandFather"></system-setvar>
                    <scripts-execpython 
                        v-if="commandData && commandData.father == 'execScriptPython'" 
                        v-bind:command-data="copyCommand" 
                        v-bind:command-father="commandFather"
                    >
                    </scripts-execpython>

                    <div v-if="commandData && commandData.father == 'execRocketBotDB'" class="form-group">
                            <label for="exampleFormControlSelect1">{{ commandFather.title_command}}</label>

                            <select2  :options="options" :inits="copyCommand.command" v-model="copyCommand.command">
                                <option disabled value="0">Select one</option>
                            </select2>
                    </div>
                    <div  v-if="commandData && (commandFather.command_available || commandFather.setVar) && !commandFather.form && legacy_command && commandData.father != 'setVar'  && commandData.father != 'execScriptPython'" class="form-group">
                        <label for="exampleFormControlSelect1">{{ commandFather.title_command}}</label>
                        
                        <input type="text" class="form-control accept_vars"   v-model="copyCommand.command">
                    </div>
                   
                    <div  v-if="commandFather.getResult && !commandData.group == 'virtual' " class="form-group">
                        <label >{{ app.texts.assign_result }}</label>
                        <input type="text" class="form-control accept_vars" v-model="copyCommand.getvar">
                    </div>
                    
                    <div v-show="commandFather.options && commandFather.command_available && legacy_command && commandData.father != 'setVar'" class="form-group">
                        <label>{{commandFather.title_options}}</label>
                        <select class="form-control" id="command_list_op" v-model="copyCommand.option">
                            <option name="" value="">-- Seleccione --</option>
                            <option v-for="option in commandFather.options" v-bind:value="option">{{option}}</option>
                        </select>
                    </div>
                    
                    <excel-readxlsx v-if="commandData && commandData.father == 'readxlsx'" v-bind:command-data="copyCommand" v-bind:command-father="commandFather"></excel-readxlsx>
                    <system-startapp v-if="commandData && commandData.father == 'startapp'" v-bind:command-data="copyCommand" v-bind:command-father="commandFather"></system-startapp>
                    <logic v-if="commandData && commandData.group == 'logic'" v-bind:command-data="copyCommand" v-bind:command-father="commandFather"></logic>              
                    <modules v-if="commandData && commandData.father == 'module' " v-bind:command-data="copyCommand" v-bind:command-father="commandFather"></modules>
                    <command-form v-if="commandData && commandData.father != 'module' && commandData && commandFather?.form?.inputs?.length > 0" v-bind:command-data="copyCommand" v-bind:command-father="commandFather"></command-form>
                   <!--
                    <hr>
                   {{ commandData }}
                    <hr>
                    {{ commandFather }}
                    <hr>
                    {{legacy_command}}-->
                </div>
            </div>
            <div class="modal-footer">
            <div class="stop-bot-error row">
                    
                    <div class="col-6">
                        <div class="form-group">
                            <div class="form-check " style="margin-top: 0px; ">
                                <input type="checkbox" class="form-check-input" v-model="copyCommand.run_onerror" >
                                <label class="form-check-label text-danger" >Error Handling: <span class="text-black">Run Robot</span></label>
                            </div>
                            <div v-show="copyCommand.run_onerror">
                            <select2  :options="options" :inits="robot_error" v-model="copyCommand.run_onerror_robot">
                                <option disabled value="0">Select one</option>
                            </select2>
                            </div>
                        </div>
                    </div>
                    <div class="col-6">
                        <div class="form-check " style="margin-top: 0px; ">
                            <input type="checkbox" class="form-check-input" v-model="copyCommand.stop_onerror" >
                            <label class="form-check-label text-danger" >Error Handling: Stop all</label>
                        </div>
                    </div>
                </div>
                <button type="button" class="btn btn-secondary" data-dismiss="modal">{{app.texts.cancel}}</button>
                <button type="button" class="btn btn-primary" @click='save' >{{app.texts.add_command}}</button>
            </div>
        </div>
    </div>
</div> 
           </div>     
    `,
    props:['editingCommand'],
    mounted: function(){
    },
    data: function (){
        return {
           
            commandModified: null,
            editableCodeMirror: null,
            commandFather :  {},
            commandData :  {},
            copyCommand : {},
            options : [],
            edit_description : false,
            robot_error:'',
            legacy_command: true,
            legacy_commands: ['use', 'waitforobject', 'for', 'execRocketBotDB', 'readxlsx', 'evaluateIf',"evaluatewhile", 'startapp','clickimage'],
            commandsToJson: ['use',  'readxlsx','module','for','startapp'],
            groupToJson:['virtual']
        }
    },
    
    watch: {
        'editingCommand': function(newVal, oldVal){
            this.edit_description = false;
            var vv = getCommandById(app.$data.bot.project.commands,newVal )
            console.log("editinCommand",vv)
            this.commandData= vv;
            if (vv.father == 'module' && vv.group == 'scripts') {
                this.commandFather= app.getFatherData(vv.father, vv.group, vv.command);
            }else{
                this.commandFather= app.getFatherData(vv.father, vv.group, vv);
            }
            console.log("commandFather",this.commandFather)
            this.copyCommand = JSON.parse(JSON.stringify(vv));
            this.options = app.bots.map(function(b){
                return {
                    id: b.name,
                    text: b.name
                }
            })
            this.robot_error = this.copyCommand.run_onerror_robot;
            this.legacy_command = !this.legacy_commands.includes(this.commandData.father)            
        }
    },
    methods: {
        
        'save': function(){
            $("#command_"+this.copyCommand.id).attr("data-content", this.copyCommand.description);
            console.log(this.copyCommand, this.commandFather)
            if(this.commandFather.father == 'execScriptPython'){
                this.copyCommand.command = editableCodeMirror.getValue()
            }
            let c = JSON.parse(JSON.stringify(this.copyCommand))
            if(
                this.commandsToJson.includes(this.commandFather.father) || 
                this.groupToJson.includes(this.commandFather.group) || 
                this.commandFather.form
                ){
                    c.command = JSON.stringify(c.command);                      
            }
            if(this.commandFather.group == 'virtual'){
                c["data_"] = JSON.parse(c.command)
            }
            console.log("🚀 ~ file: editcommand.js ~ line 160 ~ c", c)
            if(this.groupToJson.includes(this.commandFather.group)){
                console.log("Change image")
                document.querySelector("#command_"+c.id+" > div.icon-container-img").style.backgroundImage = "url(" + c.extra_data + ")"
                console.log(document.querySelector("#command_"+c.id+" > div.icon-container-img").style.backgroundImage = "url(" + c.extra_data + ")")
            }
            app.setCommand(c);
            if(c.command){
                try{
                    document.getElementById("no_edited_" + c.id).style.display = "none";
                }catch(e){}
            }
            $("#modal-edit").modal('hide');
        }
    }
})

Vue.component('modal-delete', {
    template:`
    <div>
    <div class="modal fade" id="modal-delete" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
    <div class="modal-dialog modal-lg" role="document">
        <div class="modal-content">
            <div class="modal-header">
                <h5 class="modal-title" id="exampleModalLabel">Delete Command</h5>
                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                </button>
            </div>
            <div class="modal-body">
                <h3> 
                    <img style="width: 28px;float: left;" v-bind:src="commandFather.icon||''">  {{ commandFather.title?.en  || commandFather.title }} 
                </h3>
                
                
                <p> <i class="fas fa-question-circle"></i> {{ commandFather?.en?.description|| commandFather.description?.en ||  commandFather.description }}</p>
                <div class="container">
                    
                    <web-use  v-if="commandData && commandData.father == 'use'" v-bind:command-data="copyCommand" v-bind:command-father="commandFather"></web-use>
                    <web-waitforobject v-if="commandData && commandData.father == 'waitforobject'" v-bind:command-data="copyCommand" v-bind:command-father="commandFather"></web-waitforobject>
                    <system-setvar v-if="commandData && commandData.father == 'setVar'" v-bind:command-data="copyCommand" v-bind:command-father="commandFather"></system-setvar>

                    <div v-if="commandData && commandData.father == 'execRocketBotDB'" class="form-group">
                            <label for="exampleFormControlSelect1">{{ commandFather.title_command}}</label>

                            <select2  :options="options" :inits="copyCommand.command" v-model="copyCommand.command">
                                <option disabled value="0">Select one</option>
                            </select2>
                    </div>
                    <div  v-if="commandData && (commandFather.command_available || commandFather.setVar) && legacy_command && commandData.father != 'setVar'" class="form-group">
                        <label for="exampleFormControlSelect1">{{ commandFather.title_command}}</label>
                        <input type="text" class="form-control" v-model="copyCommand.command">
                    </div>
                   
                    <div  v-if="commandFather.getResult " class="form-group">
                        <label >{{ app.texts.assign_result }}</label>
                        <input type="text" class="form-control" v-model="copyCommand.getvar">
                    </div>
                    
                    <div v-show="commandFather.options && commandFather.command_available && legacy_command && commandData.father != 'setVar'" class="form-group">
                        <label>{{commandFather.title_options}}</label>
                        <select class="form-control" id="command_list_op" v-model="copyCommand.option">
                            <option name="" value="">-- Seleccione --</option>
                            <option v-for="option in commandFather.options" v-bind:value="option">{{option}}</option>
                        </select>
                    </div>
                    <excel-readxlsx v-if="commandData && commandData.father == 'readxlsx'" v-bind:command-data="copyCommand" v-bind:command-father="commandFather"></excel-readxlsx>



                    <logic v-if="commandData && commandData.group == 'logic'" v-bind:command-data="copyCommand" v-bind:command-father="commandFather"></logic>
                    <modules v-if="commandData && commandData.father == 'module'" v-bind:command-data="copyCommand" v-bind:command-father="commandFather"></modules>

                   <!-- {{ commandData }}
                    <hr>
                    {{ commandFather }}
                    <hr>
                    {{legacy_command}}-->
                </div>
            </div>
            <div class="modal-footer">
            <div class="stop-bot-error row">
                    
                    <div class="col-6">
                        <div class="form-group">
                            <div class="form-check " style="margin-top: 0px; ">
                                <input type="checkbox" class="form-check-input" v-model="copyCommand.run_onerror" >
                                <label class="form-check-label text-danger" >Error Handling: <span class="text-black">Run Robot</span></label>
                            </div>
                            <div v-show="copyCommand.run_onerror">
                            <select2  :options="options" :inits="robot_error" v-model="copyCommand.run_onerror_robot">
                                <option disabled value="0">Select one</option>
                            </select2>
                            </div>
                        </div>
                    </div>
                    <div class="col-6">
                        <div class="form-check " style="margin-top: 0px; ">
                            <input type="checkbox" class="form-check-input" v-model="copyCommand.stop_onerror" >
                            <label class="form-check-label text-danger" >Error Handling: Stop all</label>
                        </div>
                    </div>
                </div>
                <button type="button" class="btn btn-secondary" data-dismiss="modal">{{app.texts.cancel}}</button>
                <button type="button" class="btn btn-primary" @click='save' >{{app.texts.add_command}}</button>
            </div>
        </div>
    </div>
</div> 
           </div>     
    `,
    props:['editingCommand'],
    mounted: function(){
        
    },
    data: function (){
        return {
            commandFather :  {},
            commandData :  {},
            copyCommand : {},
            options : [],
            robot_error:'',
            legacy_command: true,
            legacy_commands: ['use', 'waitforobject', 'for', 'execRocketBotDB', 'readxlsx', 'evaluateIf'],
            commandsToJson: ['use',  'readxlsx','module','for'],
        }
    },
    watch: {
        'editingCommand': function(newVal, oldVal){
            var vv = getCommandById(app.$data.bot.project.commands,newVal )
            this.commandData= vv;
            if (vv.father == 'module' && vv.group == 'scripts') {
                this.commandFather= app.getFatherData(vv.father, vv.group, vv.command);
            }else{
                this.commandFather= app.getFatherData(vv.father, vv.group, vv);
            }
            this.copyCommand = JSON.parse(JSON.stringify(vv));
            this.options = app.bots.map(function(b){
                return {
                    id: b.name,
                    text: b.name
                }
            })
            this.robot_error = this.copyCommand.run_onerror_robot;
            this.legacy_command = !this.legacy_commands.includes(this.commandData.father)
        }
    },
    methods: {
        'save': function(){
            console.log(this.copyCommand, this.commandFather)
            let c = JSON.parse(JSON.stringify(this.copyCommand))
            if(this.commandsToJson.includes(this.commandFather.father)){
                    c.command = JSON.stringify(c.command);  
            }
            app.setCommand(c);
            $("#modal-edit").modal('hide');
        }
    }
})