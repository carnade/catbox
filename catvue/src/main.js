import Vue from 'vue'
import App from './App.vue'
import axios from "axios";
/*import VueRouter from 'vue-router'

Vue.use(VueRouter)*/
Vue.config.productionTip = false
Vue.prototype.$http = axios;



new Vue({
  render: h => h(App),
}).$mount('#app')