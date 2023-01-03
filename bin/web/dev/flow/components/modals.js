Vue.component('modal-export', {
    template:`
    <div>
        <div class="modal" tabindex="-1" role="dialog" id="modal_export">
            <div class="modal-dialog modal-lg modal-dialog-centered" role="document">
                <div class="modal-content">
                    <div class="modal-header">
                        <img src="flow/img/bots/message.png">
                        <h5 class="modal-title"> {{app.$data.texts.export_variable}}: {{app.$data.robot_name}}</h5>
                        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                    <div class="modal-body">

                        <div class="row">
                            <div class="col-12">

                            <div id="carouselExampleCaptions" class="carousel slide border-1" data-ride="carousel">
                            <ol class="carousel-indicators">
                            <li data-target="#carouselExampleCaptions" data-slide-to="0" class="active"></li>
                            <li data-target="#carouselExampleCaptions" data-slide-to="1"></li>
                            </ol>
                            <div class="carousel-inner">
                            <div class="carousel-item active">
                                <img src="flow/img/stack.jpg" class="d-block w-100" alt="...">
                                <div class="carousel-caption d-none d-md-block">
                                <h5> {{app.$data.texts.export_info}}</h5>
                                </div>
                            </div>
                            <div class="carousel-item">
                                <img src="flow/img/delconnector.jpg" class="d-block w-100" alt="...">
                                <div class="carousel-caption d-none d-md-block">
                                <h5>{{app.$data.texts.export_warning}}</h5>
                                </div>
                            </div>
                            
                            </div>
                            <a class="carousel-control-prev" data-target="#carouselExampleCaptions" role="button" data-slide="prev">
                                <span class="carousel-control-prev-icon" aria-hidden="true"></span>
                                <span class="sr-only">Previous</span>
                            </a>
                            <a class="carousel-control-next"data-target="#carouselExampleCaptions" role="button" data-slide="next">
                                <span class="carousel-control-next-icon" aria-hidden="true"></span>
                                <span class="sr-only">Next</span>
                            </a>
                        </div>
                            
                            
                        </div>
                        
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-primary" data-dismiss="modal">{{app.$data.texts.export_sub}}</button>
                        <button type="button" class="btn btn-success" data-dismiss="modal">{{app.$data.texts.export}}</button>
                        <button type="button" class="btn btn-secondary" data-dismiss="modal">{{app.$data.texts.cancel}}</button>
                    </div>
                </div>
            </div>
        </div>
        </div>
        <!-- Second Modal -->

        <div class="modal" tabindex="-1" role="dialog" id="modal_export_select">
            <div class="modal-dialog modal modal-dialog-centered" role="document">
                <div class="modal-content">
                    <div class="modal-header">
                        <img src="flow/img/bots/message.png">
                        <h5 class="modal-title"> {{app.$data.texts.export_variable}}: {{app.$data.robot_name}}</h5>
                        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                    <div class="modal-body">

                        <div class="row">
                            <div class="col-12">
                                
                                <h5>{{app.$data.texts.export_bot_help}}</h5>
                                <hr class="hr-rocket">
                                <div class="form-group form-check">
                                    <input type="checkbox" class="form-check-input" v-model="withModules" id="exampleCheck1">
                                    <label class="form-check-label" for="exampleCheck1">{{app.$data.texts.include_modules}}</label>
                                </div>
                                <div class="form-group form-check">
                                    <input type="checkbox" class="form-check-input" v-model="toProduction" id="exampleCheck2">
                                    <label class="form-check-label" for="exampleCheck2">{{app.$data.texts.export_production}}</label>
                                </div>
                            </div>
                            
                        </div>
                        
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-primary" @click="exportBot"><i v-if="loading" class="fa fa-spinner fa-spin"></i> {{app.$data.texts.save_db}}</button>

                        <button type="button" class="btn btn-secondary" data-dismiss="modal">{{app.$data.texts.cancel}}</button>
                    </div>
                </div>
            </div>
        </div>

    </div>
`,
    
    data() {
        return {
            loading: false,
            withModules: false,
            toProduction: false
        }
    },
    methods: {
        exportBot(){
            this.loading = true
            app.exportDb(this.toProduction, this.withModules, (d)=>{
                console.log(d)
                this.loading= false
            })
        },
        searchFileSave(id, extensions, default_extension){
            app.searchFileSave(null, extensions, default_extension).then((ret)=>{
                this.command.command[id] = ret
            })
        },
        searchFolder(id){
            app.searchFolder(null).then((ret)=>{
                this.command.command[id] = ret
            })
        },
        searchFile(id, extensions){
            app.searchFile(null,extensions).then((ret)=>{
                this.command.command[id] = ret
            })
            
        }
    },
    computed:{
        
    }
})
