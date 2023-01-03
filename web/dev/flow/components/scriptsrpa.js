Vue.component('scripts-execpython', {
    template:`
    <div class="row">
    <div class="col-md-12">
        <div class="form-group">
            <label>{{ commandFather.title_command}}:</label>
            <textarea class="form-control accept_vars"  type="text" id="code_edit_python" v-model.lazy="command.command"></textarea>
        </div>
    </div>
    </div>
    `,
    props:['commandData', 'commandFather'],
    watch: {
        'commandData': function(newVal, oldVal){
            editableCodeMirror.setValue(newVal.command)
            editableCodeMirror.setCursor(0)
            editableCodeMirror.refresh()
            
        }
    },
    mounted: function () {
               
        editableCodeMirror = CodeMirror.fromTextArea(document.getElementById('code_edit_python'), {
            mode: "python",
            theme: "material",
            lineNumbers: true,
            smartIndent: true,
            autocorrect: true,
            hint: CodeMirror.hint.python
        }); 
        
        editableCodeMirror.setCursor(0)
        editableCodeMirror.refresh()
        

        $("#modal-edit").on('shown.bs.modal', function () {
          if(editableCodeMirror){
            editableCodeMirror.refresh()
          }
        })
    },
    computed:{
        command: function(){
            var command = this.commandData
            
            return command;
        },
        
    }
})
