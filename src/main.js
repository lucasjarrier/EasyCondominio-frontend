import Vue from 'vue'
import App from './App.vue'
import VueMask from 'v-mask';
import router from "./router"
import Element from 'element-ui'
import locale from 'element-ui/lib/locale/lang/pt-br'
import { BootstrapVue, BootstrapVueIcons } from "bootstrap-vue"
import "bootstrap/dist/css/bootstrap.css"
import "bootstrap-vue/dist/bootstrap-vue.css"

Vue.use(BootstrapVue);
Vue.use(BootstrapVueIcons);
Vue.use(Element,{locale})
Vue.use(VueMask);

Vue.config.productionTip = false

new Vue({
  name: "#app",
  router,
  render: (h) => h(App),
}).$mount("#app");


