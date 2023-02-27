<template>
    <div>
        <img src="./../../assets/logo.png" style="width: 20px; height: 20px; float: left; transform: rotate(90deg)" @click="backReturn">
        <h3>CSS故障艺术</h3>
        <div class="content-item">
                            <img src="../../assets/pond-head.png" style="width: 120px; height: 120px;">
        </div>
        <div>
            <span>1.图片的 Glitch Art 风</span>
            <div class="mix"></div>
        </div>
        <div>
            动态类抖音风格 Glitch 效果
            <Glitch/>
        </div>
        <div style="background-color: black; position: relative; top: 10px; height: 100px; color: white;">
            Glitch1
            <Glitch1/>
        </div>
        <div style="background-color: black; position: relative; top: 20px; height: 200px;color: white">
            Glitch抖动效果
            <Glitch2/>
        </div>
    </div>
</template>

<script>
    import Glitch from "./Glitch";
    import Glitch2 from "./Glitch2";
    import Glitch1 from "./Glitch1";
    export default {
        name: "CssImg",
        components:{
            Glitch2,
            Glitch1,
            Glitch
        },
        methods: {
            backReturn: function () {
                this.$router.go(-1)
            },
        }
    }
</script>

<style scoped>
    .content-item div {
        width: 260px;
        height: 260px;
        border-radius: 10px;
        background-size: contain;
        position: relative;
        margin: 112px 0px;
        background-image: url("../../assets/pond-head.png");
    }

    .content-item div::after {
        content: "";
        background: inherit;
        width: 200px;
        height: 200px;
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        filter: blur(20px) brightness(80%);
        transition: all 300ms;
        z-index: -1;
    }

    .content-item div:hover::after {
        width: 280px;
        height: 280px;
    }
.mix {
    width: 200px;
    height: 200px;
    background: url('./../../assets/mix_bg.jpg'), #0ff;
    background-size: 200px 200px;
    background-blend-mode: lighten;
}
.mix:after {
     content: '';
     position: absolute;
     margin-left: -95px;
     width: 200px;
     height: 200px;
     background: url('./../../assets/mix_bg.jpg'),#f00;
    background-size: 200px 200px;
     background-blend-mode: lighten;
     mix-blend-mode: darken;
 }


</style>