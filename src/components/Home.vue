<template>
    <div>
        <ul>
            <li v-for="(item,index) in menuList" :key="index">
                <button style="border: 1px solid #f12416; padding: 10px" @click="jumpOther(index)">{{item.name}}</button>
            </li>
        </ul>
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
                ]
            }
        },
        methods: {
            jumpOther(index) {
                for (let i=0;i<this.menuList.length;i++) {
                    if (i== index) {
                        this.$router.push(this.menuList[i].path)
                    }
                }

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
</style>