<template>
    <div style="height: 100%">
        <el-row style="height: 100%;">
            <el-col :span="4" style="background-color: #545c64;height: 100%">
                <div style="margin: 20px">
                    <img src="../../assets/chongke/chk_logo.png" width="30px" height="30px">
                    <span style="color: #ffffff; margin: 12px">充客智慧门店系统</span>
                </div>
                <el-menu :default-active="defaultActive" style="min-height: 100%;" background-color="#545c64"
                         text-color="#fff" theme="dark" router :collapse="isCollapse">
                    <el-menu-item index="mainLayout" class="el_menu_item_style"><i class="el-icon-menu"></i><span slot="title">首页</span></el-menu-item>
                    <el-submenu index="2" class="el_menu_item_style">
                        <template slot="title">
                            <i class="el-icon-document"></i>
                            <span slot="title">示例</span>
                        </template>
                        <el-menu-item index="elButton">按钮示例</el-menu-item>
                        <el-menu-item index="elTable">分页表格</el-menu-item>
                        <el-menu-item index="elLogin">表单登陆</el-menu-item>
                        <el-menu-item index="horizontal">水平导航</el-menu-item><!--水平导航栏，多级菜单-->
                    </el-submenu>
                    <el-submenu index="3" class="el_menu_item_style">
                        <template slot="title"><i class="el-icon-plus"></i><span slot="title">动画</span></template>
                        <el-menu-item index="elAnimate">Animate.css</el-menu-item>
                    </el-submenu>
                    <el-submenu index="4" class="el_menu_item_style">
                        <template slot="title"><i class="el-icon-star-on"></i><span slot="title">图表</span></template>
                        <el-menu-item index="ninelottery">vue-seamless-scroll</el-menu-item>
                        <!-- <el-menu-item index="newMember">用户数据</el-menu-item> -->
                    </el-submenu>
                    <el-submenu index="5" class="el_menu_item_style">
                        <template slot="title"><i class="el-icon-edit"></i><span slot="title">编辑</span></template>
                        <!-- <el-menu-item index="uploadImg">上传图片</el-menu-item> -->
                        <el-menu-item index="vueEdit">文本编辑</el-menu-item>
                    </el-submenu>
                    <el-submenu index="6" class="el_menu_item_style">
                        <template slot="title"><i class="el-icon-setting"></i><span slot="title">设置</span></template>
                        <el-menu-item index="adminSet">管理员设置</el-menu-item>
                        <!-- <el-menu-item index="sendMessage">发送通知</el-menu-item> -->
                    </el-submenu>
                </el-menu>
            </el-col>
            <el-col :span="20" style="height: 100%; background-color:#ffffff">
            <!--   面包屑  -->
                <head-top></head-top>
                <keep-alive>
                    <router-view></router-view>
                </keep-alive>
            </el-col>
        </el-row>
    </div>
</template>

<script>
    import headTop from "./view/headTop";
    export default {
        name: "MainLayoutE",
        components: {headTop},
        data() {
            return {
                isCollapse:false,
            }
        }
    }
</script>

<style scoped>
    .el_menu_collapse {
        width: 200px;
    }
    .el_menu_item_style {
        text-align: left;
    }
</style>
