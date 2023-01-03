Vue.component('modal-edit-var', {
    template:`
    <div>
    <div class="modal" tabindex="-1" role="dialog" id="modal_add_var">
    <div class="modal-dialog modal-lg modal-dialog-centered" role="document">
        <div class="modal-content">
            <div class="modal-header">
                <h5 class="modal-title"> Robot: {{app.$data.robot_name}}</h5>
                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                </button>
            </div>
            <div class="modal-body">

                <h3>{{app.$data.texts.add_variable}}</h3>
                <hr class="hr-rocket">
                <div class="form-group">
                    <label>{{app.$data.texts.variable_name}}:</label>
                    <input class="form-control" v-model="var_name" v-change="isValidVarname(var_name)">
                    <small class="text-danger" v-show="var_exist">
                        Can't repeat a name.
                    </small>
                    <small class="text-danger" v-show="!validName">
                        This variable name is invalid.
                    </small>
                </div>
                <div class="row">
                    <div class="col-md-4">
                        <div class="form-group">
                            <label>{{app.$data.texts.variable_type}}:</label>
                            <select class="form-control" v-model="var_type" id="var_type">
                                <option value="string" default>General</option>
                                <option value="password">Password</option>
                            </select>
                        </div>
                    </div>
                    <div class="col-md-4">
                        <div class="mt-3 pt-4">
                            <div class="form-check">
                                <input class="form-check-input" type="checkbox" v-model="var_disable" id="isDisableVar" >
                                <label class="form-check-label" for="isDisableVar">
                                    {{app.$data.texts.disable}}
                                </label>
                            </div>
                        </div>
                    </div>
                    <div class="col-md-4">
                        <div class="form-group">
                            <label>{{app.$data.texts.group}}:</label>
                            <input class="form-control" v-model="var_group">
                            
                        </div>
                    </div>
                </div>
                <div class="form-group">
                    <label>{{app.$data.texts.variable_data}}:</label>
                    <textarea v-show="var_type=='string'" class="form-control" v-model="var_data"></textarea>
                    <input v-show="var_type=='password'" class="form-control" v-model="var_data" type="password">
                </div>


            </div>
            <div class="modal-footer">
                <button type="button" @click="addVar()" v-disabled="!var_name || var_exist || !validName" class="btn btn-primary">{{app.$data.texts.add_variable}}</button>
                <button type="button" class="btn btn-secondary" data-dismiss="modal">{{app.$data.texts.cancel}}</button>
            </div>
        </div>
    </div>
</div>
</div>
`,
    props: ['var_name', 'var_type', 'var_data', 'var_index', 'var_disable', 'var_group'],
    data(){
      return {
        var_exist: false,
        validName: true,

      }  
    },
    methods: {
        isValidVarname: function(var_name){},
        addVar: function(){
            console.log(this.var_name, this.var_type, this.var_data, this.var_index, this.var_disable)
            if(this.var_index>=0 ){
                    console.log('exist')
                    this.var_exist = true;
                    Vue.set(app.$data.vars,this.var_index,{
                        'data': this.var_data ,
                        'name' : this.var_name,
                        'type' : this.var_type,
                        'disabled' :this.var_disable,
                        'category' : this.var_group
                    });
                    

            }else{
                console.log('new')
                this.var_exist = false;
                app.$data.vars.push({
                    name: this.var_name,
                    type: this.var_type,
                    data: this.var_data,
                    disabled: this.var_disable,
                    category: this.var_group
                })
            }

            $('#modal_add_var').modal('hide');
        }

    },
});