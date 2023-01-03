Vue.component('select2', {
    props: ['options', 'value', 'inits'],
    template: '<select id="select_robot"><slot></slot></select>',
    mounted: function () {
      var vm = this
      $(this.$el)
        // init select2
        .select2({ data: this.options })
        .val(this.inits)
        .trigger('change')
        // emit event on change.
        .on('change', function () {
          vm.$emit('input', this.value)
        })
    },
    watch: {
      value: function (value) {
        // update value
        $(this.$el)
            .val(value)
            .trigger('change')
      },
      options: function (options) {
        // update options
        $(this.$el).empty().select2({ data: options }).val(this.inits).trigger('change')
      }
    },
    destroyed: function () {
      $(this.$el).off().select2('destroy')
    }
  })