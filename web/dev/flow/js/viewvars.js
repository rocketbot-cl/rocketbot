Vue.component('view-vars', {
   
    template: `
    <div class="view-vars">
    <div class="dsd"  style="position: absolute;top: 0px;z-index: 100;height: 100%;width: 100%;max-width: 50%;">
    <div class="close_vars" @click="app.$data.viewVars=false;"><i class="fas fa-times"></i></div>
        <div class="var-modal">
            <div class="modal-header">
                
                <h5 class="modal-title mr-3">
                    {{app.$data.texts.variables}}
                </h5>
                <button class="btn btn-success btn-sm float-right mt-1 mb-1 mr-1 rounded btn-block" @click="editVar(null,-1);">
                    <i class="fa fa-plus-circle"></i> {{app.$data.texts.add_variable}}
                </button>
                <button class="btn btn-primary mr-1 btn-sm float-right mt-1 mb-1 rounded btn-block" @click="modalExport()">
                    <i class="fa fa-download"></i> {{app.$data.texts.export_variable}}
                </button>
                <button class="btn btn-info mr-1 btn-sm float-right mt-1 mb-1 rounded btn-block" @click="modalImport()" >
                    <i class="fa fa-upload"></i> {{app.$data.texts.import_variable}}
                </button>
            </div>
            
            <div class="modal-body">
                
                <div class="table-responsive tableFixHead">
                    <table class="table table-striped table-bordered table-sm table-ellipsis">
                        <thead>
                            <tr>
                                <th width="20px"></th>
                                <th width="20px">{{app.$data.texts.disable}}</th>
                                <th width="30%"> 
                                        <input v-model="search" class="form-control input-sm" v-bind:placeholder="app.$data.texts.variable_name" /> 

                                </th>
                                <th width="50%"> {{app.$data.texts.variable_data}}</th>
                                <th width="90px">
                                    <div class="btn-group" role="group">
                                        <div class="btn btn-outline-danger btn-sm form-inline" @click="removeVarAll()" title="Remove All">
                                            <i class="fas fa-trash-alt"></i><i class="fa fa-level-down-alt"></i>
                                        </div>
                                        <div class="btn btn-outline-warning btn-sm form-inline" @click="eraseVarAll()" title="Clear All">
                                            <i class="fas fa-eraser"></i><i class="fa fa-level-down-alt"></i>
                                        </div>
                                       
                                    </div>
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr v-for="(var_, index) in filteredItems" class="can-click rem8" v-bind:class="{'table-secondary': var_?.disabled}" >
                                
                                <td>
                                    <small>
                                        <i class="fa fa-archive" v-bind:class="{'fa-unlock':var_.type == 'password', 'fa-archive':var_.type == 'string'}"></i>
                                    </small>
                                </td>
                                <td>
                                    <div class="form-check text-center">
                                        <input class="form-check-input" type="checkbox" v-model="var_.disabled"  >
                                    </div>
                                </td>
                                <td class="can-click" v-on:dblclick="editVar(var_, index)">
                                    {{var_.name}}
                                </td>
                                <td class="can-click" v-on:dblclick="editVar(var_, index)">
                                    <div v-show="!var_.type || var_.type == 'string'">
                                        <div v-show="var_.collapse==true|| var_.collapse == undefined">{{var_.data | limitTo(app.$data.max_char) }}{{var_.data .length > app.$data.max_char ? '&hellip;' : ''}}
                                            <div 
                                            class="text-center btn btn-outline-primary btn-sm rounded"  
                                            v-show="var_.data.length>app.$data.max_char && (var_.collapse==true|| var_.collapse == undefined)"
                                            @click="editVar(var_, index);"
                                            >
                                            <i class="fas fa-arrows-alt-v"></i> {{app.$data.texts.expand}}
                                            <small>({{ var_.data.length }} {{app.$data.texts.char}})</small>
                                        </div>
                                    </div>
                                </div>
                                <span v-show="var_.type == 'password'"> {{'*'| repeatString(var_.data.length)}}</span>
                            </td>
                            <td>
                                <div class="btn-group" role="group">
                                    <div class="btn btn-success btn-sm form-inline"  @click="editVar(var_, index);">    
                                        <i class="fas fa-pencil"></i>
                                    </div>
                                    <div class="btn btn-info btn-sm form-inline btn-copy" :data-clipboard-text="var_.data"  @click="copyVar(var_);">    
                                        <i class="fas fa-clipboard"></i>
                                    </div>
                                    
                                    <div class="btn btn-warning btn-sm form-inline" @click="eraseVar(index)">    
                                        <i class="fas fa-eraser"></i>
                                    </div>
                                    <div class="btn btn-danger btn-sm form-inline" @click="removeVar(index)">
                                        <i class="fas fa-trash-alt"></i>
                                    </div>
                                    
                                </div>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
        </div>
     </div>

     <modal-edit-var 
        v-bind:var_name="var_name" 
        v-bind:var_type="var_type" 
        v-bind:var_index="var_index" 
        v-bind:var_data="var_data" 
        v-bind:var_disable="var_disable" 
        v-bind:var_group="var_group"
        >
    </modal-edit-var>
        <modal-export-vars></modal-export-vars>
        <modal-import-vars></modal-import-vars>
        `,
        data(){
            return {
                search: '',
                var_name:'', 
                var_type:'', 
                var_data:'',
                var_disable: false,
                var_editing: null,
                var_index: null,
                var_group: ''
            }
        },
        mounted() {
            console.log('view-vars mounted');
            var clipboard = new ClipboardJS('.btn-copy');
        },        
        computed: {
            filteredItems() {
                if (this.search == '') {
                    return app.$data.vars;
                }
                
                return app.$data.vars.filter(item => item.name.includes(this.search?.toLowerCase()))
                }
        },
        filters: {
            limitTo: function(value, length) {
                if (value.length > length) {
                    value = value.substring(0, length - 3) ;
                }
                return value
            },
            repeatString: function(value, length) {
                length = parseInt(length);
                var tmp = value;
                for (var i = 0; i < length - 1; i++) {
                    tmp += value;
                }
                return tmp;
            }
        },
        methods: {
            modalExport(){
                $('#modal_export_vars').modal('show');
            },
            modalImport(){
                $('#modal_import_vars').modal('show');
            },
            addVarmoda(var_, collapse){},
            editVar(var_, idx_){
                console.log('editVar', var_);
                if(var_){
                    this.var_name = var_.name;
                    this.var_type = var_.type;
                    this.var_data = var_.data;
                    this.var_disable = var_?.disabled?var_.disabled : false;
                    this.var_group = var_?.category?var_.category : '';

                }else{
                    this.var_name = '';
                    this.var_type = 'string';
                    this.var_data = '';
                    this.var_disable = false
                    this.var_group = ''
                }
                this.var_editing = var_;
                this.var_index = idx_;
                $('#modal_add_var').modal('show');               
            },
            removeVar(index){
                console.log('removeVar', index);
                $.confirm({
                    title: 'Delete "'+ app.$data.vars[index].name+'" ?',
                    
                   
                    content: `
                    <div class="row">
                    <div class="col-3">     
                        <img src="img/bots/message.png" alt=""> 
                        </div>
                        <div class="col-9 pt-4">
                        Are you sure to <b>delete</b> this variable? This event cannot be reversed
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
                                app.$data.vars.splice(index, 1);

                            }
                        },
                        close: {
                            text: 'No, Cancel',
                        }
                    }
                });

            },
            eraseVar(index){
                app.$data.vars[index].data = '';
            },
            removeVarAll(){
                console.log('removeVarAll');
                $.confirm({
                    title: 'Delete all variable?',

                    content: `
                    <div class="row">
                    <div class="col-3">     
                        <img src="img/bots/message.png" alt=""> 
                        </div>
                        <div class="col-9 pt-4">
                        Are you sure to <b>delete</b> all variables? This event cannot be reversed
                        </div>
                        
                    </div>
                            `,
                    icon: 'fas fa-eraser',
                    theme: 'bootstrap',
                    type: 'red',
                    columnClass: 'medium',
                    closeIcon: true,
                    typeAnimated: true,
                    buttons: {
                        ok: {
                            text: 'Yes, Delete all',
                            btnClass: 'btn-danger',
                            action: function () {
                                app.$data.vars = [];
                            }
                        },
                        close: {
                            text: 'No, Cancel',
                        }
                    }
                });
                
            },
            eraseVarAll(){
                $.confirm({
                    title: 'Clear all variable?',
                    content: `
                    <div class="row">
                    <div class="col-3">     
                        <img src="img/bots/message.png" alt=""> 
                        </div>
                        <div class="col-9 pt-4">
                            Are you sure to <b>clear</b> all variables? This event cannot be reversed
                        </div>
                        
                    </div>
                            `,
                    icon: 'fas fa-eraser',
                    theme: 'bootstrap',
                    type: 'red',
                    columnClass: 'medium',
                    closeIcon: true,
                    typeAnimated: true,
                    buttons: {
                        ok: {
                            text: 'Yes, Clear all',
                            btnClass: 'btn-danger',
                            action: function () {
                                for(var i=0; i<app.$data.vars.length; i++){
                                    app.$data.vars[i].data = '';
                                }
                            }
                        
                        },
                        close:{
                            text: 'No, Cancel',
                        }
                    }
                });
                
            },
            copyVar(v){
                console.log(v)
                $.toast({ 
                    heading: '<b>"' + v.name + '"</b> copied ',
                    text : "Variable information copied to the clipboard", 
                    showHideTransition : 'plain',  // It can be plain, fade or slide
                    allowToastClose : true,       // Show the close button or not
                    hideAfter : true,              // `false` to make it sticky or time in miliseconds to hide after
                    stack : 5,      
                    allowToastClose: true,
                    icon: 'info',
              hideAfter: 5000,// `fakse` to show one stack at a time count showing the number of toasts that can be shown at once
                    position : 'right'       // bottom-left or bottom-right or bottom-center or top-left or top-right or top-center or mid-center or an object representing the left, right, top, bottom values to position the toast on page
                  })
            }
        }
    })