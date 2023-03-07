<!--此时点击menu中的某一项会跳转到另一个页面的相关项目下，需要将router/index.js中的elementUi的设置放到mainLayout之前，才会正确跳转-->
<!--主要使用的控件有container布局容器，NavMenu水平导航栏和侧边栏，以及页头的使用，还有点击按钮，侧边栏折叠和展开功能-->
<template>
    <div style="height: 100%; position: fixed; width: 100%">
        <img src="../../assets/logo.png" style="transform: rotate(90deg);position:absolute; display: flex" width="20px" height="20px" @click="goBack()"/>
        <el-container>
            <el-header style="font-size: 40px; height: 120px">
                ElementUI 示例
                <!-- 点击此图片，可实现侧边栏菜单的折叠和关闭 -->
                <img :src="collapseImg" width="20px" height="20px" @click="changeOpen()"/>
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
                    <el-menu :default-active="defaultActive" style="min-height: 100%;" theme="dark" router :collapse="isCollapse">
                        <el-menu-item index="elementUi"><i class="el-icon-menu"></i><span slot="title">首页</span></el-menu-item>
                        <el-submenu index="2">
                            <template slot="title">
                                <i class="el-icon-document"></i>
                                <span slot="title">示例</span>
                            </template>
                            <el-menu-item index="elButton">按钮示例</el-menu-item>
                            <el-menu-item index="elTable">分页表格</el-menu-item>
                            <el-menu-item index="elLogin">表单登陆</el-menu-item>
                            <el-menu-item index="horizontal">水平导航</el-menu-item><!--水平导航栏，多级菜单-->
                        </el-submenu>
                        <el-submenu index="3">
                            <template slot="title"><i class="el-icon-plus"></i><span slot="title">动画</span></template>
                            <el-menu-item index="elAnimate">Animate.css</el-menu-item>
                        </el-submenu>
                        <el-submenu index="4">
                            <template slot="title"><i class="el-icon-star-on"></i><span slot="title">图表</span></template>
                            <el-menu-item index="ninelottery">vue-seamless-scroll</el-menu-item>
                            <!-- <el-menu-item index="newMember">用户数据</el-menu-item> -->
                        </el-submenu>
                        <el-submenu index="5">
                            <template slot="title"><i class="el-icon-edit"></i><span slot="title">编辑</span></template>
                            <!-- <el-menu-item index="uploadImg">上传图片</el-menu-item> -->
                            <el-menu-item index="vueEdit">文本编辑</el-menu-item>
                        </el-submenu>
                        <el-submenu index="6">
                            <template slot="title"><i class="el-icon-setting"></i><span slot="title">设置</span></template>
                            <el-menu-item index="adminSet">管理员设置</el-menu-item>
                            <!-- <el-menu-item index="sendMessage">发送通知</el-menu-item> -->
                        </el-submenu>
                    </el-menu>
                </el-aside>
                <el-main>
                    <!--   页头   -->
                    <el-page-header @back="goBack" content="详情" style="border: 1px solid #333333;padding: 14px 12px"></el-page-header>
                    <keep-alive>
                        <router-view></router-view>
                    </keep-alive>
                </el-main>
            </el-container>
        </el-container>
    </div>
</template>

<script>
    import collapseImg from '../../assets/back_left.png';
    import noCollapseImg from '../../assets/back.png';
    export default {
        name: "ElementUIDemo",
        data() {
            return {
                componentList: [
                    {name:'按钮', path: '/elButton' },
                    {name:'分页表格', path: '/elTable'},
                    {name:'家庭', path: '/family'},
                    {name:'动画', path: '/elAnimate'},
                    {name:'el表单', path: '/elLogin'},
                    {name:'列表', path: '/list'}
                ],
                asideWidth:'200px',
                activeIndex2: '1',
                isCollapse:false,
                collapseImg: noCollapseImg
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
            },
            changeOpen() {
                this.isCollapse = !this.isCollapse;
                if(this.isCollapse) {
                    this.collapseImg = collapseImg
                } else {
                    this.collapseImg = noCollapseImg
                }
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
    /*可实现侧边栏菜单的折叠和关闭*/
    /*.el-menu-vertical-demo:not(.el-menu--collapse) {*/
    /*    width: 200px;*/
    /*    min-height: 400px;*/
    /*}*/
</style>
