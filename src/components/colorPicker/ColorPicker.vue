<template>
    <div>
        <div @click="colorInputClick">
            <div disabled :value="color" @click="colorInputClick" style="width: 200px;border:1px solid green;" :style="{'background-color':color}">请选择一个颜色{{color}}</div>
        </div>
        <div v-show="isShowColors" class="color-select-layer">
            <Sketch v-model = "color" @input="colorValueChange"></Sketch>
        </div>


    </div>
<!--    <el-col class="controls-box">-->
<!--        <el-col :span="8" class="label-col" :style="{'background-color':color}"><label>请选择颜色</label></el-col>-->
<!--        <el-col :span="16">-->
<!--            <div @click="colorInputClick">-->
<!--                <el-input disabled :value="color" @click="colorInputClick"></el-input>-->
<!--            </div>-->
<!--            <div v-show="isShowColors" class="color-select-layer">-->
<!--                <Sketch v-model="color" @input="colorValueChange"></Sketch>-->
<!--            </div>-->
<!--        </el-col>-->
<!--    </el-col>-->
</template>

<script>
    import { Sketch } from 'vue-color'
export default {
        name: "ColorPicker",
        components:{Sketch},
        data(){
            return {
                color:'#3f3f3f',
                isShowColors: true,
            }
        },
        methods: {
            // 颜色输入框点击事件处理
            colorInputClick () {
                console.log('000000000000000')
                this.isShowColors = !this.isShowColors
            },
            // 颜色值改变事件处理
            colorValueChange (val) {
                console.log(val)

                // 取颜色对象的十六进制值
                this.color = val.hex
            }
        }

    }
</script>

<style scoped>
    .color-select-layer {
        position: relative;
        left: 0px;
        top: 10px;
        padding: 15px 0;
    }
    .label-col {
        padding: 8px 5px;
    }
    .controls-box {
        position: absolute;
        left: 50px;
        top: 50px;
        width: 300px;
        padding: 10px;
        background-color: #fafafa;
        border: 1px solid #c3c3c3;
        border-radius: 5px;
    }
</style>