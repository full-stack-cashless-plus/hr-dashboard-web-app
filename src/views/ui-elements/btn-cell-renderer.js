import Vue from 'vue';

export default Vue.extend({
  template: `
        <span>
            <button @click="btnClickedHandler()">EDIT</button>
        </span>
    `,
  methods: {
    btnClickedHandler() {
      this.params.clicked(this.params.value);
    }
  },
});
