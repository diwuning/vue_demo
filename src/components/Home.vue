<template>
    <div>
        <ul>
            <li v-for="(item,index) in menuList" :key="index">
                <button style="border: 1px solid #f12416; padding: 10px" @click="jumpOther(index)">{{item.name}}</button>
            </li>
        </ul>
        <div @click="jumpDemo">测试</div>
        <div>{{result}}</div>
        <div class="left"></div>
        <div class="right"></div>
        <div style="height:1px;width:100%; background-color:black"></div>
        <div id="box1">
            <div id="box3"></div>
        </div>
        <div id="box4"></div>
        <div id="box2"></div>

        <div class="div1">
            <div class="son1">a</div>
            <div class="son2">b</div>
        </div>

    </div>
</template>

<script>
    export default {
        name: "Home",
        data() {
            return {
                menuList: [
                    {name:'不规则图形',path:'/css'},
                    {name:'vant组件', path: '/vant'},
                    {name:'Element UI', path: '/element'},
                    {name:'九宫格抽奖', path: '/NineEnergy'},
                    {name:'转盘抽奖', path: '/lucky'},
                    {name:'九宫格抽奖2', path: '/Nine'},
                    {name:'表单', path: '/login'},
                    {name:'照片墙', path: '/galley'},
                    {name:'网络请求', path: '/request'},
                    {name:'取色器ColorPicker', path: '/colorPicker'},
                    {name:'冷色取色器canvasColor', path: '/canvasColor'},
                    {name:'取色器CanvasColor1', path: '/canvasColor1'},
                    {name:'取色器CanvasColor2', path: '/canvasColor2'},
                    {name:'colorSetting', path: '/yxfColor'},
                    {name:'CanvasCircle', path: '/canvasCircle'},
                    {name:'colorDemo', path: '/colorDemo'},
                    {name:'js操作', path: '/jsOperate'},
                    {name:'vuex', path: '/vuexOperate'}
                ],
                result:''
            }
        },
        mounted() {
            console.log('mounted',history.state)
            window.addEventListener('popstate',e=>{
                console.log('mounted=====',e.state)
                this.result = e.state
            })
        },
        methods: {
            jumpOther(index) {
                for (let i=0;i<this.menuList.length;i++) {
                    if (i== index) {
                        this.$router.push(this.menuList[i].path)
                    }
                }

            },
            jumpDemo() {
                // let count = 0;
                console.log('jumpDemo')
                let state = {
                    user:'23jf',
                    title:'首页'
                }
                history.pushState(state,'asdf','yxfColor')
                // window.history.pushState(state,'jkl',window.location.href+'/colorDemo')
            }
        }
    }
</script>

<style scoped>
 li {
     list-style-type: none;
     display: inline;
     margin-left: 15px;
 }
 .left {
     width: 200px;
     height: 100px;
     background-color: green;
     float: left;
 }

 .right {
     height: 100px;
     background-color: red;
     overflow: hidden; /* 创建BFC */
 }

 #box1{
     width: 200px;
     height: 200px;
     background: lemonchiffon;
     margin-bottom: 50px;
     margin-top: 50px;
     /*overflow:hidden;*/
     /*border: 1px solid #00000000;*/
     /*display: inline-block;*/
     /*float:left;*/
     /*position: absolute*/
     /*padding: 10px;*/
 }
 #box2{
     width: 200px;
     height: 200px;
     background: lightcoral;
     margin-top:100px ;
     opacity: 0.3;
     /*float: left;*/
 }
    #box3 {
        width: 100px;
        height: 100px;
        background-color: #f12416;
        margin-top: 50px;
        /*display: inline-block;*/
        /*float:left;*/
        /*position: absolute*/
    }
    #box4 {
        margin-top: 50px;
        margin-bottom:50px ;
        background-color: #42b983;
        /*border: 1px solid salmon;*/
        /*padding: 1px;*/
    }
 .div1 {
     width: 150px;
     border: 1px solid red;
     /*使用BFC来清除浮动*/
     overflow: hidden;
 }
 .son1, .son2 {
     width: 100px;
     height: 100px;
     background-color: blue;
     float: left;
 }
 .son2 {
     background-color: greenyellow;
 }
</style>