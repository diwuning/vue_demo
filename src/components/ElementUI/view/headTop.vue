<template>
    <div class="header_container">
        <el-breadcrumb separator="/">
            <el-breadcrumb-item :to="{ path: '/manage' }">首页</el-breadcrumb-item>
            <el-breadcrumb-item v-for="(item, index) in $route.meta" :key="index">{{item}}</el-breadcrumb-item>
        </el-breadcrumb>
    </div>
</template>

<script>
    export default {
        mounted() {
            //在router/index.js中的路径设置中设置了meta，面包屑中才能显示
            console.log('headTop',this.$route)
        }
    }
</script>

<style scoped>
    .header_container{
        background-color: #EFF2F7;
        height: 60px;
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding-left: 20px;
    }
</style>
