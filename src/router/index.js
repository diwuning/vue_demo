import Vue from 'vue'
import Router from 'vue-router'
import Nine from "../components/nine/Nine";
import VantDemo from "../components/vant/VantDemo";
import HelloWorld from "../components/HelloWorld";
import CProgress from "../components/progress/CProgress";
import luckywheel from "../components/luckywheel/luckywheel";
import NineEnergy from "../components/energy/NineEnergy";
import Home from "../components/Home";
import CssImg from "../components/css/CssImg";
import Login from "../components/Antd/Login";
import Galley from "../components/page/Galley";
import NetRequest from "../components/NetRequest";
import ColorPicker from "../components/colorPicker/ColorPicker";
// import CanvasColor from "../components/colorPicker/CanvasColor";
import CanvasColor from "../components/color/CanvasWhite";
// import CanvasColor1 from "../components/colorPicker/CanvasColor1";
// import CanvasColor2 from "../components/colorPicker/CanvasColor2";
import CanvasColor2 from "../components/color/CanvasColor";
import yxfColor1 from "../components/colorPicker/yxfColor";
import CanvasColor3 from "../components/colorPicker/CanvasColor3";
import colorDemo from "../components/colorPicker/colorDemo";
import yxfColor from "../components/color/yxfColor";
import jsOperate from "../components/jsfunction/jsOperate";
import VuexOperate from "../components/vuex/VuexOperate";
import NineLottery from "../components/nineLottery/NineLottery";
import cssFloat from "../components/css/cssFloat";
import ElementUIDemo from "../components/ElementUI/ElementUIDemo";
import ButtonUI from "../components/ElementUI/ButtonUI";
import TableUi from "../components/ElementUI/TableUi";
import AnimateDemo from "../components/ElementUI/AnimateDemo";
import ElLogin from "../components/ElementUI/ElLogin";
import HMenuDemo from "../components/ElementUI/HMenuDemo";
import MainLayoutE from "../components/ElementUI/MainLayoutE";
import ElCarousel from "../components/ElementUI/ElCarousel";
import ElForm from "../components/ElementUI/ElForm";
import ElTabDemo from "../components/ElementUI/ElTabDemo";

Vue.use(Router)

//重复点击相同路由时报错Uncaught (in promise) NavigationDuplicated: Avoided redundant navigation to current location:
const originalPush = Router.prototype.push
Router.prototype.push = function push(location) {
  return originalPush.call(this, location).catch(err => err)
}

export default new Router({
  mode:'history',
  routes: [
    {
      path: '/Nine',//九宫格抽奖（旧）+进度条
      name: 'Nine',
      component: Nine
    },
    {
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '/vant',
      name: 'VantDemo',
      component: VantDemo
    },
    {
      path: '/css',
      name: 'CssImg',
      component: CssImg
    },
    {
      path: '/cssFloat',
      name: 'CssFloat',
      component: cssFloat
    },
    {
      path: '/progress', //进度条
      name: 'CProgress',
      component: CProgress
    },
    {
      path: '/lucky',//转盘抽奖
      name: 'luckywheel',
      component: luckywheel
    },
    {
      path: '/hello',
      name: 'HelloWorld',
      component: HelloWorld
    },
    {
      path: '/login',//表单
      name: 'Login',
      component: Login
    },
    {
      path: '/galley',
      name: 'Galley',
      component: Galley
    },
    {
      path: '/NineEnergy',//九宫格抽奖（旧）
      name: 'NineEnergy',
      component: NineEnergy
    },
    {
      path: '/request',
      name: 'NetRequest',
      component: NetRequest
    },
    {
      path: '/colorPicker',
      name: 'ColorPicker',
      component: ColorPicker
    },
    {
      path: '/canvasColor',
      name: 'CanvasColor',
      component: CanvasColor
    },
    {
      path: '/canvasColor1',
      name: 'CanvasColor1',
      component: CanvasColor3
    },
    {
      path: '/canvasColor2',
      name: 'CanvasColor2',
      component: CanvasColor2
    },
    {
      path: '/yxfColor',
      name: 'yxfColor1',
      component: yxfColor1
    },
    {
      path: '/doubleColor',//取色器例子
      name: 'yxfColor',
      component: yxfColor
    },
    {
      path: '/colorDemo',
      name: 'colorDemo',
      component: colorDemo
    },
    {
      path: '/jsOperate',
      name: 'jsOperate',
      component: jsOperate
    },
    {
      path: '/vuexOperate',
      name: 'VuexOperate',
      component: VuexOperate
    },
    {
      path: '/ninelottery',//九宫格抽奖（新）
      name: 'NineLottery',
      component: NineLottery
    },
    // 子组件只能在一个页面的嵌套路由中，如果在两个嵌套路由中，则哪个在前，跳转到哪个父页面的相应页面
    {
      path:'/mainLayout',
      name:'MainLayoutE',
      component:MainLayoutE,
      children:[
        {
          path:'/elButton',//使用element的el-menu功能需要加/，否则跳转错误
          component: ButtonUI,
          meta: ['vue后台框架', '按钮示例'],//面包屑功能用到的
        },
        {
          path: '/elTable',
          component: TableUi,
          meta: ['vue后台框架', '分页表格'],
        },
        {
          path: '/elAnimate',
          component: AnimateDemo,
          meta: ['vue后台框架', '动画'],
        },
        {
          path: '/elLogin',
          component: ElLogin,
          meta: ['vue后台框架', '表单登陆'],
        },
        {
          path: '/horizontal',
          component: HMenuDemo,
          meta: ['vue后台框架', '水平导航'],
        },
        {
          path: '/elCarousel',
          component: ElCarousel,
          meta: ['vue后台框架','走马灯']
        },
        {
          path: '/elForm',
          component: ElForm,
          meta: ['vue后台框架','注册表单']
        },
        {
          path: '/elTabDemo',
          name:'tab标签页',
          component: ElTabDemo,
          meta: ['vue后台框架','tab标签页']
        }
      ]
    },
    {
      path: '/elementUi',
      name: 'ElementUIDemo',
      component: ElementUIDemo,
      children:[
        {
          path:'/elButton',//使用element的el-menu功能需要加/，否则跳转错误
          component: ButtonUI
        },
        {
          path: '/elTable',
          component: TableUi
        },
        {
          path: '/elAnimate',
          component: AnimateDemo
        },
        {
          path: '/elLogin',
          component: ElLogin
        },
        {
          path: '/horizontal',
          component: HMenuDemo
        }
      ]
    },
  ]
})
