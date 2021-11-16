import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import vuetify from "./plugins/vuetify";
import axios from "axios";

axios.defaults.withCredentials = true;
axios.defaults.headers.get["Cache-Control"] = "no-cache, no-store";
axios.defaults.baseURL = process.env.VUE_APP_API_URL;

Vue.config.productionTip = false;
Vue.use(axios);

new Vue({
  store,
  router,
  vuetify,
  render: (h) => h(App),
}).$mount("#app");
