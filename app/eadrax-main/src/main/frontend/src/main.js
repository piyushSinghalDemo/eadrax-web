import Vue from "vue";
import App from "./App.vue";
import store from "./components/auth/AuthStore";
import VueCookies from "vue-cookies";
import VueGoodTablePlugin from "vue-good-table";
import "vue-good-table/dist/vue-good-table.css";
import VeeValidate from "vee-validate";
import router from "./router";
import Toasted from "vue-toasted";
import Vue2Filters from "vue2-filters";

Vue.config.productionTip = false;

Vue.use(Vue2Filters);
Vue.use(VueCookies);
Vue.use(VueGoodTablePlugin);
Vue.use(VeeValidate);
Vue.use(Toasted, {
  duration: 5000,
  position: "bottom-center",
  action: {
    text: "X",
    onClick: (e, toastObject) => {
      toastObject.goAway(0);
    }
  }
});

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
