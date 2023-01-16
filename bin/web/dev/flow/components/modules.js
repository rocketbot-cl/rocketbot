Vue.component('modules', {
    template:`
<div class="row">
    
    <div v-for="input in forms" v-bind:class="input.css">
        <div class="form-group" v-if="input.type=='input'">
        <label>{{input?.title[app.language]||input?.title['en']||input?.title}}</label>
        <input style="{{input.style}}" class="form-control accept_vars" type="text"
           v-model.lazy="command.command[input.id]" :placeholder="input?.placeholder[app.language]||input?.placeholder['en']||input?.placeholder">
           <small class="text-helper" v-if="input.help" v-html="input?.help[app.language] ||input?.help['en'] || input?.help"></small>
           </div>


        <div class="form-group" v-if="input.type=='file_new'">
            <label>{{input?.title[app.language]||input?.title['en']||input?.title}}</label>
            <div class="input-group">
                <input class="form-control accept_vars" type="text" :id="input.id"
                :placeholder="input?.placeholder[app.language]||input?.placeholder['en']||input?.placeholder"
                v-model.lazy="command.command[input.id]">
                <div class="input-group-append">
                <button class="btn btn-outline-secondary" type="button" @click="searchFileSave(input.id, input.extensions, input.default_extension)"><i
                    class="fa fa-spin fa-spinner" v-show="loading"></i>
                    {{app.texts.search}}</button>
                </div>
            </div>
            
            <small class="text-helper"  v-if="input.help" v-html="input?.help[app.language] ||input?.help['en'] || input?.help"></small>
                
        </div>

        <div class="form-group" v-if="input.type=='file_select'">
        <label>{{input?.title[app.language]||input?.title['en']||input?.title}}</label>
        <div class="input-group">
            <input class="form-control accept_vars" type="text" :id="input.id"
            :placeholder="input?.placeholder[app.language]||input?.placeholder['en']||input?.placeholder"
            v-model.lazy="command.command[input.id]">
            <div class="input-group-append">
            <button class="btn btn-outline-secondary" type="button" @click="searchFile(input.id, input.extensions)"><i
                class="fa fa-spin fa-spinner" v-show="loading"></i>
                {{app.texts.search}}</button>
            </div>
        </div>
        <small class="text-helper" v-if="input.help" v-html="input?.help[app.language] ||input?.help['en'] || input?.help"></small>

        </div>

        
        <div class="form-group" v-if="input.type=='folder_select'">
        <label>{{input?.title[app.language]||input?.title['en']||input?.title}}</label>
        <div class="input-group">
            <input class="form-control accept_vars" type="text" :id="input.id"
            :placeholder="input?.placeholder[app.language]||input?.placeholder['en']||input?.placeholder"
            v-model.lazy="command.command[input.id]">
            <div class="input-group-append">
            <button class="btn btn-outline-secondary" type="button" @click="searchFolder(input.id)"><i
                class="fa fa-spin fa-spinner" v-show="loading"></i>
                {{app.texts.search}}</button>
            </div>
        </div>
        <small class="text-helper" v-if="input.help" v-html="input?.help[app.language] ||input?.help['en'] || input?.help"></small>

        </div>

        
        <div class="form-group" v-if="input.type=='select'">

            <label>{{input?.title[app.language]||input?.title['en']||input?.title}}</label>

            <select style="{{input.style}}" class="form-control" v-model.lazy="command.command[input.id]">
                <option v-for="item in input.options" :value="item.value">{{item.title}}</option>
            </select>
            <small class="text-helper" v-if="input.help" v-html="input?.help[app.language] ||input?.help['en'] || input?.help"></small>
            </div>

        <!--
        <div class="form-group form-check" v-if="input.type=='checkbox'">
        <input style="{{input.style}}" type="checkbox" class="form-check-input" :id="input.id"
            v-model.lazy="command.command[input.id]">
        <label class="form-check-label" for="{{input.id}}">{{input?.title[app.language]||input?.title['en']||input?.title}}</label>
        <small class="text-helper" v-html="input?.help[app.language] ||input?.help['en'] || input?.help"></small>
        </div>
        <div class="form-group" v-if="input.type=='textarea'">
        <label  for="{{input.id}}">{{input?.title[app.language]||input?.title['en']||input?.title}}</label>
        <textarea style="{{input.style}}"  class="form-control" :id="input.id" 
       :placeholder="input?.placeholder[app.language]||input?.placeholder['en']||input?.placeholder"
            v-model.lazy="command.command[input.id]"></textarea style="{{input.style}}">
            <small class="text-helper" v-if="input.help" v-html="input?.help[app.language] ||input?.help['en'] || input?.help"></small>
            </div>
        -->
			<div class="form-group" v-if="input.type=='label'">
        <label  style="{{input.style}}" class="form-check-label" for="{{input.id}}">{{input?.title[app.language]||input?.title['en']||input?.title}}</label>
        </div>

        <div class="form-group" v-if="input.type=='html'">
        <label  for="{{input.id}}">{{input?.title[app.language]||input?.title['en']||input?.title}}</label><br>
        <iframe style="{{input.style}}" class="iframe" id="modal_iframe" @load.once="iframeLoaded" :src="'../module/'+commandFather.module_name+'/html/'+input.src" :data-iframe="'../module/'+commandFather.module_name+'/html/'+input.src" >
        </iframe>
    </div>
</div>
    `,
    props:['commandData', 'commandFather'],
    data() {
        return {
            loading: false,
        }
    },
	mounted() {
		console.log("commandData",this.commandData)
		var this_ = this;
		$("#modal-edit").on('shown.bs.modal', function () {
			//if exist iframe in modal
			var iframe = document.getElementById('modal_iframe');
			if(iframe){
				this_.iframeLoaded({target:iframe})
			}
		});
	},
    methods: {
		iframeLoaded: function(e){
			console.log("iframe loaded",e)
			var iframe = e.target;
			var iframeWin = iframe.contentWindow || iframe.contentDocument.parentWindow;
			if (iframeWin.document.body) {
				iframe.height = iframeWin.document.documentElement.scrollHeight || iframeWin.document.body.scrollHeight;
			}
			// set data from command
			if(typeof this.commandData.command == 'string'){
				this.commandData.command = JSON.parse(this.commandData.command)
			}
			iframeWin.postMessage(this.commandData.command['iframe'], '*');
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
        forms:function(){
            var f = [];
            console.log("inputs",this.commandFather.form.inputs)
            if(this.commandFather.form){
                f = JSON.parse(JSON.stringify(this.commandFather.form.inputs))

            }
            console.log(f)
            return f
        },
        command: function(){
            
            var command = this.commandData
            console.log('module ', command, command.command);
            console.log('father', this.commandFather)
            if(command.command){
                
                console.log('module command ', typeof(command.command), command.command);
                if(typeof(command.command) == 'string'){
                    command.command = JSON.parse(command.command)
                }                
            
            }
            return command;
        }
    }
})
