import Vue from 'vue'
import App from './App.vue'
import router from './router'
import scroll from 'vue-seamless-scroll'

Vue.use(scroll)

Vue.config.productionTip = false

import Antd from 'ant-design-vue';
import 'ant-design-vue/dist/antd.css';
Vue.use(Antd);

//引入mock数据
import './components/login/LoginService'

/*导入axios*/
import axios from "axios";
Vue.prototype.$axios = axios;

import coverflow from "vue-coverflow";
Vue.use(coverflow)

import store from "./store";

//事件总线
// Vue.prototype.bus = new Vue();

new Vue({
  router,
  store,  //store和router一样，将我们创建的Vuex实例挂载到这个vue实例中
  render: h => h(App),
}).$mount('#app')
