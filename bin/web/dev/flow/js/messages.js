Vue.component('message', {
    template:`
    <div class="message">
        <div class="message-header">
            <div class="message-title">{{ message.title }}</div>
            <div class="message-date">{{ message.date }}</div>
        </div>
        <div class="message-body">
            <div v-html="message.body"></div>
        </div>
    </div>`,
    props:['message'],
    data(){
        return{
            message: this.message
        }
    },
    mounted: function () {
        console.log('message ', this.message);        
    },
    methods: {
        close: function(){
            this.$emit('close', this.message.id)
        },
        open: function(){
            this.$emit('open', this.message.id)
        }
    }
})