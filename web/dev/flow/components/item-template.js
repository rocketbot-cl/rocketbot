Vue.component('item-template', {
  template:`
    <div>
      <input type="text" class="form-control accept_vars" v-model.lazy="command" @change="ch">
    </div>
  `,
  
      props: ['modelVar'],
      
      computed:{
        command: function(){
            var command = this.modelVar
            console.log(command)
            return command;
        }
      },
      watch:{
        'command': function(e){
          console.log(e)
        }
      }, methods: {
        'ch': function(e,c){
          console.log(e,this)
          app.$emit('change', this)
        }
      },
    })
  