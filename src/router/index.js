import Vue from 'vue'
import Router from 'vue-router'
import Nine from "../components/nine/Nine";
import HelloWorld from "../components/HelloWorld";
import CProgress from "../components/progress/CProgress";
import luckywheel from "../components/luckywheel/luckywheel";

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
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
    }
  ]
})
