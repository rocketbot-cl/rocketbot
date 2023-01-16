Vue.component('link-addons',{
    template: `<div class="link-addons">
        <div v-html="item" @click="viewAddon"></div>
      </div>`,
    props:['addonsList', 'robotname', 'pathencode'],
    
    
    computed: {
      item: function(){
        //console.log(this.addonsList)
        return this.addonsList.replace("{{robot_name}}",this.robotname).replace("{{path_encode}}", this.pathencode)
      }
    },
    methods: {
      viewAddon(){
        console.log("viwq")
      }
    },
    
})

