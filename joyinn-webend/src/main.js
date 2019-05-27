import Vue from "vue";
// import "./plugins/fontawesome";
import "./plugins/axios";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import "./plugins/element.js";
import VueAwesomeSwiper from "vue-awesome-swiper";
import moment from "moment";
import VueQuillEditor from "vue-quill-editor";
import Croppa from "vue-croppa";

import "quill/dist/quill.core.css";
import "quill/dist/quill.snow.css";
import "quill/dist/quill.bubble.css";

import "vue-croppa/dist/vue-croppa.css";

Vue.use(VueQuillEditor);
Vue.use(Croppa);

// for img lazyload
Vue.use(VueLazyload, {
  preLoad: 2,
  attempt: 1,
  listenEvents: [
    "scroll",
    "wheel",
    "mousewheel",
    "resize",
    "animationend",
    "transitionend",
    "touchmove"
  ]
});
import VueLazyload from "vue-lazyload";

// import { MdButton, MdIcon } from "vue-material/dist/components";

// require styles
import "swiper/dist/css/swiper.css";
// import "vue-material/dist/vue-material.min.css";

Vue.use(VueAwesomeSwiper);

// Vue.use(MdButton);
// Vue.use(MdIcon);

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  moment,
  render: h => h(App)
}).$mount("#app");
