Vue.component('command-menu',{
    template:`
    <div class="col_" id="controlMenu">
    <div v-if="app.$data.commands.length > 0">
        <div  v-for="(command, index) in app.$data.commands" v-if="command.visible" class="drag-drawflow">
          <div v-on:click="viewMenu('menu_'+index)" class="c-pointer" role="button" aria-expanded="false" aria-controls="collapseExample">            
            <i class="fa-regular fa-folder" v-bind:id="'menu_'+index+'_icon'" ></i>
            <img v-bind:src="command.icon" class="icon"> <b>{{command.title}}</b>
          </div>
          <div  v-if="command.children" class="command-menu collapse" v-bind:id="'menu_'+index"  >
            <div  v-for="(comm, indexChild) in command.children" v-if="comm.visible" class="drag-drawflow" v-bind:draggable="comm.children? false:true" ondragstart="drag(event)"  v-bind:data-node="comm.father" v-bind:data-node-group="comm.group" v-bind:data-node-command="comm.command" >
              <div v-on:click="viewMenu('menu_'+index+'_'+indexChild)" >
                <div class="divider-item"></div>
                <i v-if="comm.children" class="fas fa-folder" v-bind:id="'menu_'+index+'_'+indexChild+'_icon'"></i>

                <img v-bind:src="comm.icon" class="icon"> {{comm?.title || comm?.name}}
              </div>
              <div class="collapse" v-bind:id="'menu_'+index+'_'+indexChild">

                <div v-if="comm.children && comm2.visible"  v-for="comm2 in comm.children"  class="drag-drawflow" draggable="true" ondragstart="drag(event)"  v-bind:data-node="comm2.father" v-bind:data-node-group="comm2.group" v-bind:data-node-command="comm2.command" >
                  <div class="divider-item"></div>

                  <img v-bind:src="comm2.icon" class="icon"> {{ comm2.title}}
                </div>
              </div>
            </div>
          </div>
        </div>
        <hr>
        <div  v-for="(command, index) in app.$data.modules"  class="drag-drawflow">
          <div  v-on:click="viewMenu('menu_m'+index)" class="c-pointer" role="button" aria-expanded="false" aria-controls="collapseExample">            
            <i class="fa-regular fa-folder" v-bind:id="'menu_m'+index+'_icon'" ></i>
            <img v-bind:src="command.icon" class="icon"> 
           <!-- <b>{{command?.title[app.language]}} </b>-->
                <b v-if="command[app.language]">{{command[app.language]?.title }} </b>
                <b v-if="!command[app.language] && command['en']">{{command['en']?.title }} </b>
                <b v-if="!command[app.language] && !command['en']">{{command?.title[app.language]|| command?.title['en'] }}</b>
          </div>
          <div  v-if="command.children" class="command-menu collapse" v-bind:id="'menu_m'+index"  >
            <div  v-for="(comm, indexChild) in command.children" class="drag-drawflow" v-bind:draggable="comm.children? false:true" ondragstart="drag(event)"  
            v-bind:data-node="comm.father" v-bind:data-node-group="comm.group" v-bind:data-node-command="JSON.stringify({'module_name':comm.module_name, 'module': comm.module})" >
              <div v-on:click="viewMenu('menu_'+index+'_m'+indexChild)" >
                <div class="divider-item"></div>
                <i v-if="comm.children" class="fas fa-folder" v-bind:id="'menu_'+index+'_'+indexChild+'_icon_'"></i>

                <img v-bind:src="comm.icon" class="icon"> {{comm.name}}
                <span v-if="comm[app.language]">{{comm[app.language]?.title }}</span>
                <span v-if="!comm[app.language] && comm['en']">{{comm['en']?.title }}</span>
                <span v-if="!comm[app.language] && !comm['en']">{{comm?.title[app.language]|| comm?.title['en'] }}</span>

                <!--<b v-if="!comm.name">{{comm?.title[app.language]}}</b>-->
              </div>
        
            </div>
          </div>
        </div>
      </div>
    </div>
    `,
    methods:{

        viewMenu: function(id){
            var obj = document.getElementById(id);
            var icon = document.getElementById(id+'_icon')
            if(obj.classList.contains("collapse"))
            { 
              obj.classList.remove("collapse")
              if(icon){
                icon.classList.remove("fa-folder")
                icon.classList.add("fa-folder-open")
              }
              
            }else{
              obj.classList.add("collapse")
              if(icon){
                icon.classList.remove("fa-folder-open")
                icon.classList.add("fa-folder")
              }
            };
          },
    }
})