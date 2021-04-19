import Vue from 'vue'
import Router from 'vue-router'
import Nine from "../components/nine/Nine";
import HelloWorld from "../components/HelloWorld";
import CProgress from "../components/progress/CProgress";
import luckywheel from "../components/luckywheel/luckywheel";
import NineEnergy from "../components/energy/NineEnergy";

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/Nine',
      name: 'Nine',
      component: Nine
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
      path: '/home',
      name: 'HelloWorld',
      component: HelloWorld
    },
    {
      path: '/',
      name: 'NineEnergy',
      component: NineEnergy
    }
  ]
})
