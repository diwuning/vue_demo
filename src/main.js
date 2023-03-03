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
import axios from 'axios'
Vue.prototype.$axios = axios;

import coverflow from "vue-coverflow";
Vue.use(coverflow)

import store from "./store";

//事件总线
// Vue.prototype.bus = new Vue();

// import {Picker,Button,Field,Popup,Cell, CellGroup} from 'vant'
// Vue.use(Picker,Button)
// Vue.use(Field)
// Vue.use(Popup)
// Vue.use(Cell)
// Vue.use(CellGroup)
import vant from 'vant';
import 'vant/lib/index.css';

Vue.use(vant);

//============== element-ui 设置 start================
//element-ui的完整引入
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
Vue.use(ElementUI);
// 引入element时,可以引入全局配置对象，该对象目前支持 size 与 zIndex 字段。
// size 用于改变组件的默认尺寸，zIndex 设置弹框的初始 z-index（默认值：2000）
// Vue.use(ElementUI, {size:'small', zIndex:3000});

// 国际化，element组件内部默认使用中文，若希望使用其他语言，则要进行多语言设置
/*import locale from 'element-ui/lib/locale/lang/en';
Vue.use(ElementUI, {locale});*/
//============== element-ui 设置 end================

Vue.directive('focus',{
  inserted:function (el) {
    el.focus()
  }
})

new Vue({
  router,
  store,  //store和router一样，将我们创建的Vuex实例挂载到这个vue实例中
  render: h => h(App),
}).$mount('#app')
