<template>
    <div>
        <img src="./../../assets/logo.png" style="width: 20px; height: 20px; float: left; transform: rotate(90deg)" @click="backReturn">
        <h3>CSS故障艺术</h3>
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