Vue.component('web-use', {
    template:`
<div class="web-use row">
    <div class="col-md-12">
        <div class="form-group ">
            <label for="web-use-url">{{app.texts.server_config_title}}:</label>
            <input type="text" v-model.lazy="command.command.url" class="form-control" id="web-use-url" placeholder="Enter URL">
        </div>
    </div>
    <div class="col-md-6">
        <div class="form-group md-12">
            <label class="ng-binding">{{app.texts.select_navigator}}:</label>
            <select class="form-control" id="command_list_op" v-model.lazy="command.option">
                <option  >-- Select --</option>
                <option label="chrome" value="chrome" >chrome</option>
                <option label="firefox" value="firefox">firefox</option>
                <option label="ie" value="ie">ie</option>
                <option label="safari" value="safari">safari</option>
            </select>
        </div>
    </div>
    <div class="col-md-6">
        <div class="form-group">
            <label for="web-use-iddriver"><small><b>* Optional</b></small> {{app.texts.identifier}}:</label>
            <input type="text" v-model.lazy="command.command.id_driver" class="form-control md-6" id="web-use-iddriver" placeholder="Enter ID Driver Default">
        </div>
    </div>
    <div class="col-md-12">
        <div class="form-group">
            <label for="web-use-profile"><small><b>* Optional</b></small> {{app.texts.profile}}:</label>
            <input type="text" v-model.lazy="command.command.profile" class="form-control" id="web-use-profile" placeholder="Enter Profile Default">
        </div>
    </div>
</div>
    `,
    props:['commandData', 'commandFather'],
    
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
                    url: '',
                    id_driver: '',
                    profile: '',
                    option: ''
                }
            }
            return command;
        }
    }
})

Vue.component('web-waitforobject', {
    template:`
<div class="web-waitforobject">
<div class="row">
<div class="col-9">
  <div class="form-group">
    <label>{{app.texts.data_search}}:</label>
    <input class="form-control accept_vars" type="text" v-model.lazy="command.command.object">
  </div>
</div>

<div class="col-3">
  <div class="form-group">
    <label>{{app.texts.data_type}}:</label>
    <select class="form-control" v-model.lazy="command.option">
      <option name="" value="">-- Seleccione --</option>
      <option v-for="x in commandFather.options" :value="x">{{x}}</option>
    </select>
  </div>
</div>
<div class="col-3">
  <div class="form-group">
    <label>{{app.texts.wait}} {{app.texts.before}}:</label>
    <div class="input-group">
      <input class="form-control accept_vars" type="text" v-model.lazy="command.command.before">
      <div class="input-group-append">
        <span class="input-group-text" id="basic-addon2">{{app.texts.seconds}} <i
            class="fa fa-hourglass-start "> </i></span>
      </div>
    </div>
  </div>
</div>

<div class="col-6">
  <div class="form-group">
          <label>{{app.texts.action}} {{app.texts.and}} {{app.texts.wait}} {{app.texts.max}}:</label>

    <div class="input-group">

      <div class="input-group-prepend">

      <select class="form-control" v-model.lazy="command.command.wait_for">
        <option value="present">Present</option>
        <option value="visible">Visible</option>
        <option value="not_visible">Not Visible</option>
        <option value="clickable">Clickable</option>

      </select>
      </div>
      <input class="form-control accept_vars" type="text" v-model.lazy="command.command.wait_time">
      <div class="input-group-append">
        <span class="input-group-text" id="basic-addon2">{{app.texts.seconds}} <i
            class="fa fa-hourglass-half "></i></span>
      </div>
    </div>
  </div>
</div>
<div class="col-3">
  <div class="form-group">
    <label>{{app.texts.wait}} {{app.texts.after}}:</label>
    <div class="input-group">
      <input class="form-control accept_vars" type="text" v-model.lazy="command.command.after">
      <div class="input-group-append">
        <span class="input-group-text" id="basic-addon2">{{app.texts.seconds}} <i
            class="fa fa-hourglass-end "></i></span>
      </div>
    </div>
  </div>
</div>
<div class="col-12">
   
    <div class="form-group">
      <label>{{app.texts.assign_result}}</label>
      <input class="form-control accept_vars" type="text" v-model.lazy="command.getvar"
        placeholder="{variable}">
    </div>

</div>
</div>
</div>
    `,
    props:['commandData', 'commandFather'],
    
    computed:{
        command: function(){
            var command = this.commandData
            console.log('web-wait ', this.commandData);
            if(command.command){
                
                console.log('web-wait ', typeof(command.command), command.command);
                if(typeof(command.command) == 'string'){
                    command.command = JSON.parse(command.command)
                }                
            }else{
                
                command.command = {
                    object: '',
                    wait_for: '',
                    wait_time: '',
                    after: '',
                    assign_result: ''
                }
            }
            return command;
        }
    }
})