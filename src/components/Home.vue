<template>
    <div>
<!--        <ul>-->
<!--            <li v-for="(item,index) in menuList" :key="index" style="background-color: #42b983">-->
<!--                <button style="border: 1px solid #f12416; padding: 0px" @click="jumpOther(index)">{{item.name}}</button>-->
<!--            </li>-->
<!--        </ul>-->
        <NavBar title="Vue示例" :back="false">
            <template v-slot:right>
                <img src="../assets/icon_share.png" align="right" height="20" width="20">
            </template>
        </NavBar>
        <div v-for="(item,index) in menuList" :key="index" class="menu_item">
            <button style="border: 1px solid #f12416" @click="jumpOther(index)">{{item.name}}</button>
        </div>
        <div @click="jumpDemo">测试</div>
        <div>{{result}}</div>


    </div>
</template>

<script>
    import NavBar from "./navBar/NavBar";
    export default {
        name: "Home",
        components:{
            NavBar
        },
        data() {
            return {
                menuList: [
                    // {name:'vant组件', path: '/vant'},
                    {name:'九宫格抽奖', path: '/ninelottery'},
                    {name:'转盘抽奖', path: '/lucky'},
                    {name:'九宫格抽奖2', path: '/Nine'},
                    {name:'css不规则图形',path:'/css'},
                    {name:'css样式',path:'/cssFloat'},
                    {name:'AntD表单', path: '/login'},
                    {name:'照片墙', path: '/galley'},
                    {name:'网络请求', path: '/request'},
                    {name:'取色器ColorPicker', path: '/colorPicker'},
                    {name:'冷色取色器canvasColor', path: '/canvasColor'},
                    {name:'取色器CanvasColor1', path: '/canvasColor1'},
                    {name:'取色器CanvasColor2', path: '/canvasColor2'},
                    {name:'colorSetting', path: '/yxfColor'},
                    {name:'取色器例子', path: '/doubleColor'},
                    {name:'colorDemo', path: '/colorDemo'},
                    {name:'js操作', path: '/jsOperate'},
                    {name:'vuex', path: '/vuexOperate'},
                    {name:'elementUi',path:'elementUi'}
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
 .menu_item {
     display: inline-block;
 }

</style>