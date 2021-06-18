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

new Vue({
  router,
  render: h => h(App),
}).$mount('#app')
