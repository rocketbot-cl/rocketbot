
Vue.component('virtual-clickimage', {
    template:`
<div class="system-setvar ">
    <div class="row">
        <div class="col-md-8">
            <input type="file" onchange="angular.element(this).scope().onFile(this.files[0])" id="crop_file" class="d-none">
            <div class="col-md-12 justify-content-md-center btn-group" role="group" aria-label="Basic example">
                
                <button class="btn btn-secondary" @click="getScreenShot()">
                    <i class="fa fa-camera"></i> {{app.texts.screenshot}}</button>
                <button class="btn btn-primary" @click="getCropperData()">
                    <i class="fa fa-hand-pointer"></i> {{app.texts.select_reference}}</button>
                <button class="btn btn-warning" ng-disabled="!ref_data" @click="getCropperReference()">
                    <i class="fa fa-mouse-pointer"></i> {{app.texts.select_focus}}</button>
                
            </div>

            <div ng-if="dataUrl" class="img-container img-thumbnail">
                <img loading='lazy' ng-if="dataUrl" id="image_cropper" :src="dataUrl" ng-cropper ng-cropper-proxy="cropperProxy" ng-cropper-show="showEvent" ng-cropper-hide="hideEvent"
                    ng-cropper-options="options" class="img-fluid">
            </div>
            
        </div>
        <div class="col-md-4">
            <div class="row">
                <label class="col-md-8">{{app.texts.image_search}}:</label>
                <label class="col-md-4">{{app.texts.click_point}}:</label>
            </div>
            <div class="row">
                <div class="col-md-8">
                    <div class="row">
                        <div class="col-md-12">
                        
                            <img loading='lazy' src="/images/icons/mouse_click_cursor.png" ng-show="!$parent.command_img_point" class="pos-cursor" v-bind:class="lower(command.command.option)">
                            <img loading='lazy' :src="command.extra_data" class="img-fluid img-thumbnail img-preview">
                        </div>
                    </div>
                </div>
                <div class="col-md-4">
                    <div class="row">
                        <div class="col-md-12 previewCrop">
                            <img loading='lazy' :src="dataUrl"  class="img-fluid img-thumbnail img-preview">
                            <img loading='lazy' src="/images/icons/mouse_click_cursor.png" ng-show="$parent.command_img_point" class="pos-cursor {{$parent.commandFather_op| lowercase | nospace}}">
                        </div>
                    </div>
                </div>
            </div>
            <hr class="hr-rocket">
            <div class="row">
                <div class="col-md-6" v-show="commandFather.options">
                    <div class="form-group">
                        <label>{{commandFather.title_options}}:</label>
                        <select class="form-control" v-model="command.option" id="command_list_op" >
                            <option name="" value="">-- Sel. --</option>
                            <option v-for="item in commandFather.options" :value="item">{{item}}</option>
                        </select>
                    </div>
                </div>
                <div class="col-md-6">
                    <div class="form-group">
                        <label>{{app.texts.accuracy}}:</label>
                        <select type="number" class="form-control" v-model="command.command.accuracy" ng-init="command.command.accuracy='0.8'">
                            <option value="1.0">1.0</option>
                            <option value="0.9">0.9</option>
                            <option value="0.8">0.8</option>
                            <option value="0.7">0.7</option>
                            <option value="0.6">0.6</option>
                            <option value="0.5">0.5</option>
                            <option value="0.4">0.4</option>
                        </select>
                    </div>
                </div>
                <div class="col-md-6" v-show="commandFather.father == 'clickimage'">
                    <div class="form-group">
                        <label>{{app.texts.mouse_button}}:</label>
                        <select type="number" class="form-control" v-model="command.command.clicks" ng-init="command.command.clicks='simple'">
                            <option value="simple">{{app.texts.left}}</option>
                            <option value="doble">{{app.texts.double_left}}</option>
                            <option value="derecho">{{app.texts.right}}</option>
                            <option value="derecho_doble">{{app.texts.double_right}}</option>
                            <option value="medio">{{app.texts.middle}}</option>
                        </select>
                    </div>
                </div>
                <div class="col-6">
                    <div class="form-group">
                        <label>{{app.texts.gray_scale}}:</label>
                        <select type="number" class="form-control" v-model="command.command.gray_scale" ng-init="command.command.gray_scale='1'">
                            <option value="1">{{app.texts.yes}}</option>
                            <option value="0">{{app.texts.no}}</option>
                        </select>
                    </div>
                </div>
                <div class="col-md-6">
                    <div class="form-group">
                        <label>{{app.texts.minSearchTime}}</label>
                        <input class="form-control" v-model="command.command.seconds" :placeholder="app.texts.seconds">
                    </div>
                </div>
                
                <div class="col-md-6" >
                    <div class="form-group">
                        <label>{{app.texts.assign_result}}:</label>
                        <select class="form-control" v-model="command.getvar" >
                            <option name="" value="">-- Sel. --</option>
                            <option v-for="item in app.$data.vars" :value="item.name">{{item.name}}</option>
                        </select>
                    </div>
                </div>
                <div class="col-md-6">
                    <div class="form-group">
                        <label>{{app.texts.text}} <small>({{app.texts.optional}})</small>:</label>
                        <input type="text" class="form-control" v-model="command.command.get_word">
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>
    `,
    props:['commandData', 'commandFather'],
    data(){
        return {
            dataUrl: "../images/bkg.jpg",
            cropper: null,
            fileCrop: null,
            dataCropper:null
        }
    },
    methods: {
        getCropperData(){
            this.command.extra_data = this.cropper.getCroppedCanvas().toDataURL('image/png') 
            this.command.command.ref = this.cropper.getData()
        },
        getCropperReference(){
            this.command.command.point = this.cropper.getData()
        },
        setCropper(){
            try{  if(this.cropper)this.cropper.destroy()}catch(e){console.log(e)}
            this.cropper = new Cropper(document.querySelector("#image_cropper"), {
                movable: true,
                aspectRatio: 16 / 9,
                preview: '.previewCrop',
                data: this.command.command.point,
            });
        },
        lower(e){ return e?e.toLowerCase():""},
        getScreenShot() {
            var w = 200;
            var h = 50;
      
            w = 250; h = 130;
      
            var left = screen.width - w - 20;
            var top = screen.height - h - 150;
            console.log(top, left)
            let t_ = this
            window.addEventListener('message', function (e) {
                console.log(e)
                let isScreenshot = false;                                
                let image64 = "";
                for (var t = 0; t < e.data.length; t++) {
                    if (e.data[t].name == "resultado_screenshot_internal") {
                        image64 = 'data:image/png;base64,' + e.data[t].data;
                    }
                    if (e.data[t].name == "type" && e.data[t].data == "screenshot") {
                        isScreenshot = true;
                    }
                    if (e.data[t].name == "url_image") {
                        t_.command.command.background = e.data[t].data;
                    }
                }
                if(isScreenshot){
                    try{  if(this.cropper)this.cropper.destroy()}catch(e){console.log(e)}
                    t_.dataUrl = image64
                    t_.dataCropper = image64
                    //t_.fileCrop = dataURItoBlob(image64)
                    setTimeout(()=>{
                        t_.setCropper();
                    },500)
                }
                
            }, false);
            
            window.open('assets/screenshot.html?_=' + app.$data.version + Date.now() + '&robotname=' + app.$data.robot_name + '#' + app.$data.path_encode, '_blank', 'toolbar=no, location=no, directories=no, status=no, menubar=no, scrollbars=no, resizable=no, copyhistory=no,width=' + w + ',height=' + h + ',left=' + left + ',top=' + top + '');
        }
    },
    destroyed() {
        try{document.querySelector("#modal-edit > div").classList.remove("modal-complete")}catch(e){}
        try{  if(this.cropper)this.cropper.destroy()}catch(e){console.log(e)}
    },
    created() {document.querySelector("#modal-edit > div").classList.add("modal-complete")},
    
    computed:{
        command: function(){
            let command = this.commandData
            console.log('virtual-click ', this.commandData);
            if(command.command){       
                if(typeof(command.command) == 'string'){
                    command.command = JSON.parse(command.command)
                    fetch('../getscreenshot', {
                        method: 'POST',
                        headers: {'Content-Type': 'application/x-www-form-urlencoded'},
                        body: $.param({ robot: app.$data.robot_name, image: command.command.background }),
                    })                     
                    .then(response => response.text())
                    .then(data => {
                        this.dataUrl = data
                        this.fileCrop = dataURItoBlob(data)
                        this.dataCropper = command.command.point;
                        setTimeout(()=>{
                            this.setCropper();
                        },500)
                    });
                }                
            }else{          
                command.command = {                    
                    ref: "",
                    point: "",
                    accuracy: "0.7",
                    seconds: 0,
                    clicks: "simple",
                    click: "simple",
                    gray_scale: '1',
                    background: ''
                }
                
                this.dataUrl= "../images/bkg.jpg"
                setTimeout(()=>{
                    this.setCropper()
                },500);
            }
            return command;
        }
    }
})
