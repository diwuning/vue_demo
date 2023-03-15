<template>
    <div style="height: 100%;">
        <el-row style="height: 100%; overflow: hidden;">
            <el-col :span="isCollapse?1:4" style="background-color: #545c64;height: 100%;" :style="isCollapse?'':'overflow:auto'">
                <div style="margin: 20px">
                    <img src="../../assets/chongke/chk_logo.png" width="30px" height="30px">
                    <span style="color: #ffffff; margin: 12px;" :style="isCollapse?'display:none':'visibility:visible'">充客智慧门店系统</span>
                </div>
                <el-menu :default-active="defaultActive" style="min-height: 100%;border-color: #00000000;" background-color="#545c64"
                         text-color="#fff" theme="dark" router :collapse="isCollapse" @select="menuSelect" @open="menuOpen">
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
                        <el-menu-item index="elCarousel">走马灯</el-menu-item>
                        <el-menu-item index="elForm">注册表单</el-menu-item>
                        <el-menu-item index="elTabDemo">tab标签页</el-menu-item>
                        <el-menu-item index="elTimeLine">时间轴</el-menu-item>
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
            <el-col :span="isCollapse?23:20" style="height: 100%; overflow: auto;">
            <!--   面包屑  -->
                <div style="position: relative;">
                    <i :class="isCollapse? 'el-icon-s-unfold' : 'el-icon-s-fold'" class="icon_style" @click="changeMenuStatus()"></i>
                    <head-top style="padding-left: 40px;"></head-top>
                </div>
                <div style="display: flex;">
                    <el-tag v-for="tag in $store.state.tags" :key="tag.path" style="margin-left:5px"
                            :class="currentPath==tag.path?'sel_tag_style':''"
                            closable @click="tagClick(tag)">{{tag.name}}</el-tag>
                </div>
                <el-empty description="描述文字" v-if="!currentPath"></el-empty>
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
                defaultActive:'',
                currentPath:''
            }
        },
        mounted() {
            //页面刷新时，回到el的主页面
            this.$router.push('/mainLayout')
        },
        methods: {
            changeMenuStatus() {
                this.isCollapse = !this.isCollapse;
            },
            menuSelect(key, keyPath) {
                console.log('menuSelect', key, keyPath)
                this.currentPath = '/'+key;
                setTimeout(()=>{
                    let curRoute = this.$router.currentRoute;
                    let itemTag = {path:curRoute.path, name:curRoute.meta[1]}
                    let tags = this.$store.state.tags;
                    tags.push(itemTag)
                    if(tags.length != 0) {
                        for(var i=0;i<tags.length;i++) {
                            for(var j=i+1; j< tags.length; j++) {
                                if(tags[i].path == tags[j].path) {
                                    var del = j;
                                    tags.splice(del,1)
                                }
                            }
                        }
                    }
                    console.log('======46666=========',tags)
                },500)
            },
            menuOpen(index) {
                console.log('menuOpen',index)
            },
            tagClick(value,event) {
                console.log('tagClick',value,event)
                this.currentPath = value.path
                this.$router.push(value.path)
            }
        }
    }
</script>

<style scoped>
    .el_menu_item_style {
        text-align: left;
    }
    .icon_style {
        position:absolute;
        display:flex;
        top:50%;
        transform: translate(0%,-50%);
        margin-left: 12px;
    }
    .sel_tag_style {
        color: white;
        background-color: blue;
    }
</style>
