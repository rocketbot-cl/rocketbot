Vue.component('excel-readxlsx', {
    template:`
<div class="excel-readxlsx row">
    <div class="col-md-12">
        <div class="form-group">
            <label>{{app.texts.path}}:</label>
            <div class="input-group">
                <input class="form-control accept_vars" id="modal_archivos_file_name_xlsx" type="text"
                    v-model.lazy="command.command.file_path">
                <div class="input-group-append">
                    <button class="btn btn-outline-secondary" type="button" @click="searchFile()"><i
                            class="fa fa-spin fa-spinner" v-show="app.file_loading"></i>
                        {{app.texts.search}}</button>
                </div>
            </div>
        </div>
    </div>

    <div class="col-md-6">
        <div class="form-group">
            <label>{{app.texts.assign_result}}:</label>
            <input class="form-control accept_vars" type="text" v-model.lazy="command.getvar">
        </div>
    </div>

    <div class="col-md-6">
        <div class="form-group">
            <label>Id:</label>
            <input class="form-control accept_vars" type="text" v-model.lazy="command.command.identificator"
                placeholder="default">
        </div>
    </div>
</div>
    `,
    props:['commandData', 'commandFather'],
    methods: {
        searchFile(id, extensions){
            app.searchFile(null,app.extensions.xlsx).then((ret)=>{
                this.command.command.file_path = ret
            })
            
        }
    },
    computed:{
        command: function(){
            var command = this.commandData
            console.log('web-use ', this.commandData);
            if(command.command){
                
                console.log('web-use ', typeof(command.command), command.command);
                if(typeof(command.command) == 'string'){
                    command.command = JSON.parse(command.command)
                }                
            }else{
                
                command.command = {                    
                    file_path: '',
                    identificator: '',
                }
            }
            return command;
        }
    }
})
