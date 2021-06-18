import Vue from 'vue'
import Router from 'vue-router'
import Nine from "../components/nine/Nine";
import HelloWorld from "../components/HelloWorld";
import CProgress from "../components/progress/CProgress";
import luckywheel from "../components/luckywheel/luckywheel";
import NineEnergy from "../components/energy/NineEnergy";
import Home from "../components/Home";
import CssImg from "../components/css/CssImg";
import Login from "../components/Antd/Login";

Vue.use(Router)

export default new Router({
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
      path: '/NineEnergy',
      name: 'NineEnergy',
      component: NineEnergy
    }
  ]
})
