<template>
    <div>
        <img src="../../assets/logo.png" style="transform: rotate(90deg);" width="20px" height="20px" @click="goBack()"/>
        <ul>
            <li v-for="(item, index) in componentList" :key="index">
                <button style="width: 100px; border: 1px solid #b2b2b2" @click="jump(item.path)">{{item.name}}</button>
            </li>
        </ul>
        <router-view></router-view>
    </div>
</template>

<script>
    export default {
        name: "ElementUIDemo",
        data() {
            return {
                componentList: [
                    {name:'按钮', path: '/elementUi/elButton' },
                    {name:'分页表格', path: '/elementUi/elTable'},
                    {name:'家庭', path: '/family'},
                    {name:'动画', path: '/animate'},
                    {name:'表单', path: '/login'},
                    {name:'列表', path: '/list'}
                ]
            }
        },
        methods: {
            jump (path) {
                this.$router.push(path)
            },
            goBack () {
                this.$router.go(-1)
            }
        }
    }
</script>

<style scoped>
    ul {
        list-style-type: none;
        padding: 0;
    }
    li {
        display: inline-block;
        margin: 0 10px;
    }
</style>