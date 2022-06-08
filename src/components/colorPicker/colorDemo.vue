<template>
    <div>
        <div style="width: 100%;height: 150px; " :style="{backgroundColor: bgColor}"></div>
        <CanvasCircle ref="canvasCircle" @getChildColor="getColor"></CanvasCircle>
<!--        <CanvasCircle ref="canvasCircle"></CanvasCircle>-->
    </div>
</template>

<script>
    import CanvasCircle from "./CanvasCircle";
    export default {
        name: "colorDemo",
        components:{
            CanvasCircle
        },
        data() {
            return {
                bgColor:'#42b983'
            }
        },
        methods:{
            getColor(e) {
                console.log('getColor',e);
                this.bgColor = e
            }
        },
        created() {
            // this.bus.$on('updateColor',(data)=>{
            //     this.bgColor = data
            // })
        }
    }
</script>

<style scoped>

</style>