<!--取色器的正式例子，彩光和白光-->
<template>
    <div style="background-color: black;">
        <div style="display: flex; height: 44px;align-items: center">
            <div style="width: 100px;color: white" @click="selectColorSystem(1)">彩光</div>
            <div style="width: 100px;color: white" @click="selectColorSystem(2)">白光</div>
        </div>
        <div style="display: flex; height: 44px;align-items: center;" v-if="isWhite">
            <div v-for="(item,index) in whiteList" :key="index" :class="item.isChecked?'btn_select_style':'btn_style-common'" :style="{'background-color': item.value}" @click="selectColor(item.value,index,1)"></div>
            <img src="../../assets/icon_add1.png"  class="btn_style-common" @click="addWhite">
            <img src="../../assets/icon_del.png" class="btn_style-common" v-show="isShowWhiteDel" @click="delWhite(delIndex)">
        </div>
        <div style="display: flex; height: 44px;align-items: center;" v-else>
            <div v-for="(item,index) in colorList" :key="index" :class="item.isChecked?'btn_select_style':'btn_style-common'" :style="{'background-color': item.value}" @click="selectColor(item.value,index,2)"></div>
            <img src="../../assets/icon_add1.png"  class="btn_style-common" @click="addColor">
            <img src="../../assets/icon_del.png" class="btn_style-common" v-show="isShowColorDel" @click="delColor(delIndex)">
        </div>

        <CanvasWhite ref="whiteColor" :canvas-width="340" :canvas-height="170" v-if="isWhite"></CanvasWhite>
        <CanvasColor ref="canvasColor" :data="color" :canvas-width="340" :canvas-height="170" v-else></CanvasColor>
    </div>
</template>

<script>
    import CanvasColor from "./CanvasColor";
    import '../../util/utils.js'
    import CanvasWhite from "./CanvasWhite";
    export default {
        name: "yxfColor",
        components:{
            CanvasColor,
            CanvasWhite
        },
        data() {
            return {
                color:'rgb(100,255,83)',
                isWhite:false,
                colorList:[{value:'rgb(255,18,38)',isChecked:false},{value:'rgb(100,255,83)',isChecked:false},{value:'rgb(41,53,255)',isChecked:false}],
                // whiteList:['rgb(210,233,249)','rgb(255,255,255)','rgb(247,206,116)'],
                whiteList:[{value:'rgb(210,233,249)',isChecked:false},{value:'rgb(255,255,255)',isChecked:false},{value:'rgb(247,206,116)',isChecked:false}],
                isShowColorDel:false,
                isShowWhiteDel:false,
                delIndex:-1,
            }
        },
        mounted() {
            this.$refs.canvasColor.getParamColor(this.color)
        },
        methods:{
            selectColor(color,index,colorIndex) {
                if (color.indexOf('rgb') != 0) {
                    this.color = color.colorRgb();
                } else {
                    this.color = color;
                }
                this.delIndex = index;

                if (colorIndex == 1) {
                    this.$refs.whiteColor.getParamColor(this.color)
                    this.changeStatus(this.whiteList,index);
                    if(index >2) {
                        this.isShowWhiteDel = true;
                    } else {
                        this.isShowWhiteDel = false;
                    }
                } else {
                    this.$refs.canvasColor.getParamColor(this.color)
                    this.changeStatus(this.colorList,index);
                    if(index >2) {
                        this.isShowColorDel = true;
                    } else {
                        this.isShowColorDel = false;
                    }
                }
            },
            selectColorSystem(index) {
                if (index == 2) {
                    this.isWhite = true;
                } else {
                    this.isWhite = false;
                }
                this.delIndex = -1;
            },
            addColor() {
                this.changeStatus(this.colorList,this.color.length)
                //获取子组件的值，this.$refs.canvasColor.$data.selectColor和this.$refs.canvasColor.getSelectColor()结果是一样的。
                this.colorList.push({value:this.$refs.canvasColor.$data.selectColor,isChecked:true});
                this.isShowColorDel = true;
                this.delIndex = this.colorList.length-1;
            },
            addWhite() {
                this.changeStatus(this.whiteList,this.color.length)
                //获取子组件的值，this.$refs.whiteColor.$data.selectWhite和this.$refs.whiteColor.getSelectColor()结果是一样的。
                this.whiteList.push({value:this.$refs.whiteColor.$data.selectWhite,isChecked:true});
                this.isShowWhiteDel = true;
                this.delIndex = this.whiteList.length-1;
            },
            delColor(index) {
                this.colorList.splice(index,1)
            },
            delWhite(index) {
                this.whiteList.splice(index,1)
            },
            changeStatus(list,index) {
                for(let i=0;i<list.length;i++) {
                    if (i == index) {
                        list[index].isChecked = true;
                    } else {
                        list[i].isChecked = false;
                    }
                }
            }
        }
    }
</script>

<style scoped>
.btn_style-common {
    height: 20px;width: 20px; border-radius: 20px;margin-left: 15px;
}
    .btn_select_style {
        height: 25px;width: 25px; border-radius: 25px;margin-left: 15px;
    }
</style>