const { createApp } = Vue;

const myApp = {
  data() {
    return {
      immos: [],
      chosenImmo: {},
      chosenImmo2: {},
      editToken: false,
      text: 0,
    };
  },
  methods: {
    async getImmos() {
      try {
        const { data } = await axios.get('/immos');
        this.immos = data;
        this.editToken = false;
      } catch (error) {
        console.error(error);
      }
    },
    async delImmo({ id }) {
      await axios.delete(`/immos/${id}`);
      this.getImmos();
    },
    async editImmo(i) {
      this.chosenImmo = { ...i };
      this.chosenImmo2 = i;
      this.editToken = true;
    },
    async changePrice() {
      const id = this.chosenImmo2.id;
      await axios.patch(`/immos/${id}`, {"price": this.text});
      this.getImmos();
      this.editToken = false;
    },
  },
};

createApp(myApp).mount('#app');
