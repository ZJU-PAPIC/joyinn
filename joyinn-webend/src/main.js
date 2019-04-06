import Vue from "vue";
import "./plugins/fontawesome";
import "./plugins/axios";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import "./plugins/element.js";
import VueAwesomeSwiper from "vue-awesome-swiper";
import moment from "moment";

// require styles
import "swiper/dist/css/swiper.css";

Vue.use(VueAwesomeSwiper);

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  moment,
  render: h => h(App)
}).$mount("#app");
