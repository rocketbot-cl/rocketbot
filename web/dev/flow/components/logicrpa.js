Vue.component('logic', {
    template:`
<div class="row">
  <div class="col-md-6" v-if="commandFather.father=='for'">
      <div v-show="commandFather.command_available" class="form-group">
          <label>{{app.texts.variables}}</label>
          <select class="form-control" v-model="command.var">
            <option disabled value="">-- Sel. --</option>
            <option v-for="v in app.vars">
                {{v.name}}
            </option>
          </select>
      </div>
  </div>
  <div class="col-md-6" v-if="commandFather.father=='for'">
       
    <div v-show="commandFather.command_available" class="form-group">
        <label>{{commandFather.title_command}}</label>
        <input class="form-control accept_vars"  type="text" v-model.lazy="command.command.iterable">
    </div>
  </div>
  <div  v-show="commandFather.father!='for'" v-bind:class="{'col-12':commandFather.father!='for','col-6':commandFather.father=='for'}">                        
      <div v-show="commandFather.command_available" class="form-group">
          <label>{{commandFather.title_command}}</label>
          <input class="form-control accept_vars"  type="text" v-model.lazy="command.command">
      </div>
  </div>
  <div class="col-12" v-if="commandFather.father=='for'">
    Python code: <code>for {{command.var}} in {{command.command.iterable}}</code>
  </div>
</div>
    `,
    props:['commandData', 'commandFather'],
    
    computed:{
        command: function(){
            if (this.commandFather.father == 'for'){
                var command = this.commandData
                if(command.command){
                    
                    console.log('For ', typeof(command.command), command.command);
                    if(typeof(command.command) == 'string'){
                        command.command = JSON.parse(command.command)
                    }                
                
                }else{
                    command.command = {iterable: null, count:0}
                }
            }
            return this.commandData
        }
    },
    mounted() {
        console.log('logicrpa.js');
        console.log(this.commandData);
        console.log(this.commandFather);
    },
})
