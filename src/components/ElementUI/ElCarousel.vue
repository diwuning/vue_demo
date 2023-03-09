<template>
    <div>
        <!--  默认情况下，在鼠标 hover 底部的指示器时就会触发切换。通过设置trigger属性为click，可以达到点击触发的效果-->
        <!--  indicator-position指示器的位置。默认情况下，显示在内部，外部要设置为outside，为none时不显示-->
        <!-- arrow属性定义了切换箭头的显示时机。always/hover/never,默认hover-->
        <!-- 将type属性设置为card即可启用卡片模式, 可以通过直接点击两侧的幻灯片进行切换, 显示3张，一张在前，两张在后-->
        <!-- autoplay: 是否自动切换，默认true; loop: 是否循环展示，默认true-->
        <el-carousel ref="outCarousel" height="150px" indicator-position="outside" arrow="always"
                     direction="horizontal" @change="carouselChange">
            <el-carousel-item v-for="item in 4" :key="item">
                <h3 class="small">{{item}}</h3>
            </el-carousel-item>
        </el-carousel>
        <el-carousel ref="cardCarousel" height="150px" indicator-position="outside" arrow="always"
                     type="card" direction="horizontal" @change="carouselChange">
            <el-carousel-item v-for="item in 4" :key="item">
                <h3 class="small">{{item}}</h3>
            </el-carousel-item>
        </el-carousel>
        <el-carousel ref="vCarousel" height="150px" arrow="always"
                     direction="vertical" @change="carouselChange">
            <el-carousel-item v-for="item in 4" :key="item">
                <h3 class="small">{{item}}</h3>
            </el-carousel-item>
        </el-carousel>
    </div>
</template>

<script>
    export default {
        name: "ElCarousel",
        methods: {
            carouselChange(data, param) {
                console.log('carouselChange',data, param)
            },
        }
    }
</script>

<style scoped>
    .el-carousel {
        margin: 0px 10px
    }
    .el-carousel__item h3 {
        color: #475669;
        font-size: 18px;
        opacity: 0.75;
        line-height: 150px;
        margin: 0;
    }
    .el-carousel__item:nth-child(2n) {
        background-color: #99a9bf;
    }
    .el-carousel__item:nth-child(2n+1) {
        background-color: #D3DCE6;
    }
</style>
