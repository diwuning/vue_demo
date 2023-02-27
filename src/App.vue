<template>
  <div id="app">
<!--      <div style="display: flex;justify-content: space-between; margin: 15px">-->
<!--          <router-link v-for="(item,index) in menuList" :key="index" :to="item.path" class="router_link">-->
<!--              <span class="link_style">{{item.name}}</span>-->
<!--          </router-link>-->
<!--      </div>-->
      <router-view/>
  </div>
</template>

<script>
export default {
  name: 'App',
    data() {
      return {
          menuList: [
              {name:'首页',path:'/'},
              {name:'不规则图形',path:'/css'},
              {name:'抽奖', path: '/NineEnergy'},
              {name:'取色器', path: '/yxfColor'},
              {name:'js操作', path: '/jsOperate'},
              {name:'vuex', path: '/vuexOperate'}
          ],
      }
    }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  /*margin-top: 60px;*/
    background-color: #f5f5f5;
    height: 100%;
}
    html,body {
        margin: 0;
        padding: 0;
        height: 100%;
    }
    .link_style {
        /*width: 80px;*/
        display: inline-block;
    }
    .link_style:after {
        border-bottom: 1px solid #f12416;
    }
    .router_link:visited {
        border-bottom: 1px solid #f12416;
    }
</style>
