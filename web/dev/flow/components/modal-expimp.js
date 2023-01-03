Vue.component('modal-export-vars', {
    template:`<div class="modal" tabindex="-1" role="dialog" id="modal_export_vars">
    <div class="modal-dialog modal-dialog-centered" role="document">
        <div class="modal-content">
            <div class="modal-header">
                <h5 class="modal-title"> Robot: {{app.$data.robot_name}}</h5>
                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                </button>
            </div>
            <div class="modal-body">

                <h3>{{app.$data.texts.export_variable}}</h3>
                <hr class="hr-rocket">
                <h5>{{app.$data.texts.export_variable_help}}</h5>
                
                <div class="custom-control custom-checkbox mt-3 mb-3" >
                    <input type="checkbox" class="custom-control-input" id="alldata"  v-model="alldata">
                    <label class="custom-control-label" for="alldata">
                        {{app.$data.texts.include_data}}
                    </label>
                  </div>

                
            </div>
            <div class="modal-footer">
                <button type="button" @click="exportVars()" class="btn btn-primary">{{app.$data.texts.export_variable}}</button>
                <button type="button" class="btn btn-secondary" data-dismiss="modal">{{app.$data.texts.cancel}}</button>
            </div>
        </div>
    </div>
</div>
</div>`,
data(){
    return {
        alldata: true,
    }
},
methods: {
    exportVars: function(){
        var alldata = this.alldata;
        // Clone vars and send to api
        var data = JSON.parse(JSON.stringify(app.$data.vars));
        
        if (!alldata) {
            for (var v = 0; v < data.length; v++) {
                data[v].data = '';
            }
        }
        // Connecto to api
        var url = '/exportVars';
        var body = $.param({ 'vars': JSON.stringify(data) })

        fetch(url, {
            method: 'POST',
            headers: {'Content-Type':'application/x-www-form-urlencoded'},
            body: body
        }).then(function(response) {
            
            $("#modal_export_vars").modal('hide')
        }).catch(function(error) {
            app.$data.modal_export_vars = false;
            app.$data.modal_import_vars = false;
            app.$data.modal_export_vars_error = true;
        }
        );

        
    },
},
});

Vue.component('modal-import-vars', {
    template:`<div class="modal" tabindex="-1" role="dialog" id="modal_import_vars">
    <div class="modal-dialog modal-dialog-centered" role="document">
        <div class="modal-content">
            <div class="modal-header">
                <h5 class="modal-title"> Robot: {{app.$data.robot_name}}</h5>
                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                </button>
            </div>
            <div class="modal-body">

                <h3>{{app.$data.texts.import_variable}}</h3>
                <hr class="hr-rocket">
                <h5>{{app.$data.texts.import_variable_help}}</h5>
                <div class="mt-3 mb-3">
                <div class="custom-control custom-checkbox " >
                    <input type="checkbox" class="custom-control-input" id="alldataImp" v-model="alldataImp" checked>
                    <label class="custom-control-label" for="alldataImp">
                        {{app.$data.texts.include_data}}
                    </label>
                  </div>
                  <div class="custom-control custom-checkbox " >
                    <input type="checkbox" class="custom-control-input" id="replaceImp" v-model="replaceImp" checked>
                    <label class="custom-control-label" for="replaceImp">
                        {{app.$data.texts.replace_imp}}
                    </label>
                  </div>
                  </div>

                
            </div>
            <div class="modal-footer">
                <button type="button" @click="importVars()" class="btn btn-primary">{{app.$data.texts.import_variable}}</button>
                <button type="button" class="btn btn-secondary" data-dismiss="modal">{{app.$data.texts.cancel}}</button>
            </div>
        </div>
    </div>
</div>`,
data(){
    return {
        alldataImp: true,
        replaceImp: true,
    }
},
methods: {
    importVars: function(){
        var alldata = this.alldataImp;
        var replaceAll_data = this.replaceImp;
        // Connecto to api
        var url = '/importVars';
         fetch(url, {
            method: 'POST',
            headers: {'Content-Type':'application/x-www-form-urlencoded'},
        })
        .then(response => response.json())
        .then(data => {
            console.log(data);
            if(data.status){
                var v = JSON.parse(data.vars);
                console.log(v);
                var exist = false;
                for (var y = 0; y < v.length; y++) {
                    exist = false;
                    for (var t = 0; t < app.$data.vars.length; t++) {
                        if (app.$data.vars[t].name == v[y].name) {
                            if (alldata && replaceAll_data) {
                                app.$data.vars[t].data = v[y].data;
                            }
                            exist = true;
                            break;
                        }
                    }
                    if (!exist) {
                        if (!alldata) {
                            v[y].data = '';
                        }
                        app.$data.vars.push(v[y])
                    }
                }
            }
            $("#modal_import_vars").modal('hide')
        }).catch(function(error) {
            console.log(error);
        }
        );

    },
    exportVars: function(){
        var alldata = this.alldata;
        // Clone vars and send to api
        var data = JSON.parse(JSON.stringify(app.$data.vars));
        
        if (!alldata) {
            for (var v = 0; v < data.length; v++) {
                data[v].data = '';
            }
        }
        // Connecto to api
        var url = '/exportVars';
        var body = $.param({ 'vars': JSON.stringify(data) })

        fetch(url, {
            method: 'POST',
            headers: {'Content-Type':'application/x-www-form-urlencoded'},
            body: body
        }).then(function(response) {
            
            $("#modal_export_vars").modal('hide')
        }).catch(function(error) {
            app.$data.modal_export_vars = false;
            app.$data.modal_import_vars = false;
            app.$data.modal_export_vars_error = true;
        }
        );

        
    },
},
});