<template>
    <div class="header h_center">
        <div>
            <img src="../../assets/back.png" align="left" height="18" width="12" v-show="back" @click="goBack">
        </div>
        <span class="title"> {{title}}</span>
        <div class="h_center">
            <slot name="right"></slot>
        </div>
    </div>
</template>

<script>
    export default {
        name: "NavBar",
        props:{
            title:String,
            back:Boolean
        },
        methods:{
            goBack() {
                this.$router.go(-1)
            }
        }
    }
</script>

<style scoped>
    .title {
        font-size: 17px; font-family: PingFangSC-Medium; color: #333333;
    }
    .header {
        padding-left: 16px;
        padding-right: 16px;
        background-color: white;
        height: 44px;
        font-size: 17px;
        justify-content: space-between;
    }
    .h_center {
        display: flex;
        align-items: center;
    }
</style>