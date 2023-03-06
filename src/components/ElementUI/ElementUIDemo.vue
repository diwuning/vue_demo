<template>
    <div style="height: 100%; position: fixed; width: 100%">
        <img src="../../assets/logo.png" style="transform: rotate(90deg);position:absolute; display: flex" width="20px" height="20px" @click="goBack()"/>
        <el-container>
            <el-header style="font-size: 40px">
                ElementUI 示例
                <el-menu
                        :default-active="activeIndex2"
                        class="el-menu-demo"
                        mode="horizontal"
                        background-color="#545c64"
                        text-color="#fff"
                        active-text-color="#ffd04b">
                    <el-menu-item index="1">处理中心</el-menu-item>
                    <el-submenu index="2">
                        <template slot="title">我的工作台</template>
                        <el-menu-item index="2-1">选项1</el-menu-item>
                        <el-menu-item index="2-2">选项2</el-menu-item>
                        <el-menu-item index="2-3">选项3</el-menu-item>
                        <el-submenu index="2-4">
                            <template slot="title">选项4</template>
                            <el-menu-item index="2-4-1">选项1</el-menu-item>
                            <el-menu-item index="2-4-2">选项2</el-menu-item>
                            <el-menu-item index="2-4-3">选项3</el-menu-item>
                        </el-submenu>
                    </el-submenu>
                    <el-menu-item index="3" disabled>消息中心</el-menu-item>
                    <el-menu-item index="4"><a href="https://www.ele.me" target="_blank">订单管理</a></el-menu-item>
                </el-menu>
            </el-header>
            <el-container>
                <el-aside :width="asideWidth">
                    <ul>
                        <li v-for="(item, index) in componentList" :key="index">
                            <button style="width: 100px; border: 1px solid #b2b2b2" @click="jump(item.path)">{{item.name}}</button>
                        </li>
                    </ul>
                    <el-menu :default-active="defaultActive" style="min-height: 100%;" theme="dark" router>
                        <el-menu-item index="elementUi"><i class="el-icon-menu"></i>首页</el-menu-item>
                        <el-submenu index="2">
                            <template slot="title"><i class="el-icon-document"></i>示例</template>
                            <el-menu-item index="elButton">按钮</el-menu-item>
                            <el-menu-item index="elTable">表格</el-menu-item>
                            <el-menu-item index="elLogin">登陆</el-menu-item>
                        </el-submenu>
                        <el-submenu index="3">
                            <template slot="title"><i class="el-icon-plus"></i>动画</template>
                            <el-menu-item index="elAnimate">Animate.css</el-menu-item>
                        </el-submenu>
                        <el-submenu index="4">
                            <template slot="title"><i class="el-icon-star-on"></i>图表</template>
                            <el-menu-item index="ninelottery">vue-seamless-scroll</el-menu-item>
                            <!-- <el-menu-item index="newMember">用户数据</el-menu-item> -->
                        </el-submenu>
                        <el-submenu index="5">
                            <template slot="title"><i class="el-icon-edit"></i>编辑</template>
                            <!-- <el-menu-item index="uploadImg">上传图片</el-menu-item> -->
                            <el-menu-item index="vueEdit">文本编辑</el-menu-item>
                        </el-submenu>
                        <el-submenu index="6">
                            <template slot="title"><i class="el-icon-setting"></i>设置</template>
                            <el-menu-item index="adminSet">管理员设置</el-menu-item>
                            <!-- <el-menu-item index="sendMessage">发送通知</el-menu-item> -->
                        </el-submenu>
                        <el-submenu index="7">
                            <template slot="title"><i class="el-icon-warning"></i>说明</template>
                            <el-menu-item index="explain">说明</el-menu-item>
                        </el-submenu>
                    </el-menu>
                </el-aside>
                <el-main>
                    <keep-alive>
                        <router-view></router-view>
                    </keep-alive>
                </el-main>
            </el-container>
        </el-container>
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
                    {name:'动画', path: '/elementUi/elAnimate'},
                    {name:'el表单', path: '/elementUi/elLogin'},
                    {name:'列表', path: '/list'}
                ],
                asideWidth:'200px',
                activeIndex2: '1',
            }
        },
        computed: {
            defaultActive: function(){
                return this.$route.path.replace('/', '');
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
    .el-container {
        height: 100%;
    }
    .el-header {
        background-color: #b3c0d1;
        color: #333333;
    }
    .el-aside {
        background-color: #D3DCE6;
    }
    ul {
        list-style-type: none;
        padding: 0;
    }
    li {
        display: inline-block;
        margin: 0 10px;
    }
    .el-menu-vertical-demo:not(.el-menu--collapse) {
        width: 200px;
        min-height: 400px;
    }
</style>
