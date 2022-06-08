<template>
    <div style="background-color: black">
        <div style="width: 100%;height: 450px;">
            <div style="display: flex; height: 44px;align-items: center">
                <div style="width: 100px;color: white" @click="selectColorSystem(1)">彩光</div>
                <div style="width: 100px;color: white" @click="selectColorSystem(2)">白光</div>
            </div>
            <div style="display: flex; height: 44px;align-items: center;" v-if="isWhite">
                <div v-for="(item,index) in whiteList" :key="index" class="btn_style-common" :style="{'background-color': item}" @click="selectColor(item,1)"></div>
                <img src="../../assets/icon_add1.png"  class="btn_style-common" @click="addWhite">
            </div>
            <div style="display: flex; height: 44px;align-items: center;" v-else>
                <div v-for="(item,index) in colorList" :key="index" class="btn_style-common" :style="{'background-color': item}" @click="selectColor(item,2)"></div>
                <img src="../../assets/icon_add1.png"  class="btn_style-common" @click="addColor">
            </div>

            <CanvasColor ref="whiteColor" :canvas-width="340" :canvas-height="170" v-if="isWhite"></CanvasColor>
            <CanvasColor2 ref="canvasColor" :data="color" :canvas-width="340" :canvas-height="170" v-else></CanvasColor2>
        </div>


        <CanvasCircle ref="canvasCircle" :data="color" :canvas-width="300" :canvas-height="300"></CanvasCircle>
    </div>
</template>

<script>
    import '../../util/utils.js'
    import CanvasColor2 from "./CanvasColor2";
    import CanvasColor from "./CanvasColor";
    import CanvasCircle from "./CanvasCircle";
    export default {
        name: "yxfColor",
        components:{
            CanvasColor2,
            CanvasColor,
            CanvasCircle
        },
        data() {
            return {
                color:'rgb(100,255,83)',
                isWhite:false,
                colorList:['rgb(255,18,38)','rgb(100,255,83)','rgb(41,53,255)'],
                whiteList:['rgb(210,233,249)','rgb(255,255,255)','rgb(247,206,116)']
            }
        },
        mounted() {
            this.$refs.canvasColor.getParamColor(this.color)
            window.addEventListener('popstate',e=>{
                console.log('popstate',e.state)
            })
        },
        methods:{
            selectColor(color,colorIndex) {
                if (color.indexOf('rgb') != 0) {
                    this.color = color.colorRgb();
                } else {
                    this.color = color;
                }

                if (colorIndex == 1) {
                    this.$refs.whiteColor.getParamColor(this.color)
                } else {
                    this.$refs.canvasColor.getParamColor(this.color)
                }

            },
            selectColorSystem(index) {
                if (index == 2) {
                    this.isWhite = true;
                } else {
                    this.isWhite = false;
                }
            },
            addColor() {
                //获取子组件的值，this.$refs.canvasColor.$data.selectColor和this.$refs.canvasColor.getSelectColor()结果是一样的。
                this.colorList.push(this.$refs.canvasColor.$data.selectColor);
            },
            addWhite() {
                //获取子组件的值，this.$refs.canvasColor.$data.selectColor和this.$refs.canvasColor.getSelectColor()结果是一样的。
                this.whiteList.push(this.$refs.whiteColor.$data.selectWhite);
            }
        }
    }
</script>

<style scoped>
.btn_style-common {
    height: 20px;width: 20px; border-radius: 20px;margin-left: 15px;
}
</style>