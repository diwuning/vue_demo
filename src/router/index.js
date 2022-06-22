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
import CanvasColor from "../components/colorPicker/CanvasColor";
// import CanvasColor1 from "../components/colorPicker/CanvasColor1";
import CanvasColor2 from "../components/colorPicker/CanvasColor2";
import yxfColor from "../components/colorPicker/yxfColor";
import CanvasColor3 from "../components/colorPicker/CanvasColor3";
import CanvasCircle from "../components/colorPicker/CanvasCircle";
import colorDemo from "../components/colorPicker/colorDemo";
import jsOperate from "../components/jsfunction/jsOperate";
import VuexOperate from "../components/vuex/VuexOperate";

Vue.use(Router)

export default new Router({
  mode:'history',
  routes: [
    {
      path: '/Nine',
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
      path: '/progress',
      name: 'CProgress',
      component: CProgress
    },
    {
      path: '/lucky',
      name: 'luckywheel',
      component: luckywheel
    },
    {
      path: '/hello',
      name: 'HelloWorld',
      component: HelloWorld
    },
    {
      path: '/login',
      name: 'Login',
      component: Login
    },
    {
      path: '/galley',
      name: 'Galley',
      component: Galley
    },
    {
      path: '/NineEnergy',
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
      name: 'yxfColor',
      component: yxfColor
    },
    {
      path: '/canvasCircle',
      name: 'CanvasCircle',
      component: CanvasCircle
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
        }
  ]
})
