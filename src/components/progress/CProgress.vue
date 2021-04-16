<template>
    <div class="vue-progress-bar">
        <div class="vue-progress-inner">
            <div class="progress-content" :style="{width: progress*100+'%'}"></div>
        </div>
        <div style="float: right;align-self: center;font-size: 13px;margin-left: 6px; margin-right: 10px; width: 20%">福气值{{totalEnergy}}</div>
    </div>
</template>

<script>
    export default {
        name: "CProgress",
        data() {
            return {
                progress: 0,
                totalEnergy: 0,
                limitEnergy: 20000
            }
        },
        created() {
            this.totalEnergy = 18000
            this.progress = this.totalEnergy/this.limitEnergy
        }
    }
</script>

<style scoped>
.vue-progress-bar {
    display: flex;
    height: 35px;
    background-image: linear-gradient(0deg, #FFCEC0 0%, #FFCEC0 100%);
    /*box-shadow: 0 2px 8px 0 #BABABA, inset 0 0 6px 1px rgba(255,255,255,0.20);*/
    border-radius: 100px;
    border: 1px solid #F47915;
}
    .vue-progress-inner {
        /*display: flex;*/
        /*position: relative;*/
        height: 25px;
        width: 75%;
        margin-left: 14px;
        align-self: center;
        background-color: #F4a010;
        /*background-image: linear-gradient(0deg, #ff5c5c 0%, #FCEC42 91%);*/
        /*background-image: linear-gradient(0deg, #FCEC02 0%, #FCEC02 100%);*/
        /*box-shadow: 0 2px 8px 0 #BABABA, inset 0 0 6px 1px rgba(255,255,255,0.20);*/
        border-radius: 100px;
        border: 1px solid #ff5c5c;
    }
    .progress-content {
        height: 23px;
        align-self: center;
        background-image: linear-gradient(0deg, #F47915 0%, #F47915 100%);
        border-radius: 100px;
        border: 1px solid #00000000;
    }
</style>