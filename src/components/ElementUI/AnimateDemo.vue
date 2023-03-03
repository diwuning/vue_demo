<template>
    <div style="background-color: #333333; height: 1000px">
        <div style="width: 20px; height: 20px">
            <img src="../../assets/logo.png" style="transform: rotate(-90deg);" width="20px" height="20px" @click="goBack()"/>
        </div>
        <div style="display: flex;">
            <div class="animate wave" style="width: 100px; height: 100px; margin-top:28px">
                <div class="w1"></div>
                <div class="w2"></div>
                <div class="w3"></div>
                <div class="w4"></div>
            </div>
            效果1：
            <img src="../../assets/shou.png" style="width: 60px; height: 60px;position: absolute;left: 25%;z-index: 1" class="swing"/>
        </div>
<!--        <div>-->
<!--            效果2：-->
<!--            <img src="../../assets/shou.png" style="width: 60px; height: 60px;margin-top:5%;margin-right:20%;z-index: 1" class="swing1"/>-->
<!--        </div>-->
        <div style="margin-top:15%;">
            效果3：
<!--            <div class="animate wave" style="width: 100px; height: 100px;">-->
<!--                <div class="w1"></div>-->
<!--                <div class="w2"></div>-->
<!--                <div class="w3"></div>-->
<!--                <div class="w4"></div>-->
<!--            </div>-->
            <img src="../../assets/shou.png" style="width: 60px; height: 60px; position: absolute; left: 30%; margin-top: 20px " class="wobble1"/>
        </div>
        <div>
            效果4(wobble原版）：
            <img src="../../assets/shou.png" style="width: 60px; height: 60px;margin-top:10%;z-index: 1;-webkit-animation: wobble 4s linear infinite;
        animation: wobble 4s linear infinite;"/>
        </div>

        <div class="circle">
            <div class="c1"></div>
            <div class="c2"></div>
            <div class="c3"></div>
        </div>
        <div class="container">
            <div class="dot"></div>
            <div class="wave1"></div>
        </div>
        <div class="example">
            <div class="dot1"></div>
        </div>
<!--        <div style="border: 3px solid #4CAF50;overflow: auto">-->
<!--            <img style="float: right" src="../../assets/logo.png" alt="W3School" width="180" height="167">-->
<!--            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus imperdiet, nulla et dictum interdum...-->
<!--        </div>-->

    </div>
</template>

<script>
    export default {
        name: "AnimateDemo",
        methods: {
            goBack () {
                this.$router.go(-1)
            }
        }
    }
</script>

<style scoped>
    @keyframes swing {
        20% {
            transform: rotate3d(0, 0, 1, 45deg);
            /*transform: rotateZ(45deg);*/
        }

        40% {
            transform: rotate3d(0, 0, 1, 15deg);
            /*transform: rotateZ(15deg);*/
        }

        60% {
            transform: rotate3d(0, 0, 1, 45deg);
            /*transform: rotateZ(45deg);*/
        }

        80% {
            transform: rotate3d(0, 0, 1, 15deg);
            /*transform: rotateZ(15deg);*/
        }

        /*to {*/
        /*    transform: rotate3d(1, 0, 1, 0deg);*/
        /*}*/
    }

    @keyframes swing1 {
        20% {
            transform: rotate(20deg);;
        }

        40% {
            transform: rotate(0deg);;
        }

        60% {
            transform: rotate(20deg);;
        }

        80% {
            transform: rotate(0deg);;
        }
        from {
            transform: translate(-120px);;
        }
    }
    .swing1 {
        transform-origin: left bottom;
        -webkit-animation: swing 4s linear infinite;
        animation: swing 4s linear infinite;
    }

    @keyframes swing2 {
        to {
            transform: rotate3d(0, 0, 1, 45deg);
        }
    }
    @keyframes swing3 {
        20%,60% {
            /*transform: rotate(20deg);*/
            transform: translate3d(40px,20px,0px) rotate(20deg);
        }

        40%,80% {
            /*transform: rotate(0deg);*/
            transform: translate3d(0px,0px,0px) rotate(0deg);
        }
        /*from {*/
        /*    transform: translate(-40px);;*/
        /*}*/
    }
    @keyframes swing4 {
        from {
            opacity: 1;
        }

        to {
            transform: rotate3d(0, 0, 1, 45deg);
            opacity: 0;
        }
    }

    .swing {
        transform-origin: left bottom;
        /*-webkit-animation: swing3 3s linear infinite;*/
        /*animation: swing3 3s linear infinite;*/
        /*-webkit-animation: swing4 2s linear infinite;*/
        /*animation: swing4 2s linear infinite;*/
        -webkit-animation: swing3 4s linear infinite;
        animation: swing3 4s linear infinite;
    }

    @keyframes wobble1 {
        /*from {*/
        /*    transform: translate3d(0, 0, 0);*/
        /*}*/
        0% {
            transform: translate3d(0, 0, 0);
        }
        15% {
            transform: translate3d(-45px, 0px, 0) rotate3d(0, 0, 1, -10deg);
        }

        30% {
            transform: translate3d(40px, 20px, 0) rotate3d(0, 0, 1, 8deg);
        }

        45% {
            transform: translate3d(-35px, 0px, 0) rotate3d(0, 0, 1, -8deg);
        }

        60% {
            transform: translate3d(30px, 20px, 0) rotate3d(0, 0, 1, 7deg);
        }

        75% {
            transform: translate3d(-25px, 0px, 0) rotate3d(0, 0, 1, -6deg);
        }
        /*100% {*/
        /*    transform: translate3d(0px, 0px, 0) rotate3d(0, 0, 1, 5deg);*/
        /*}*/

        /*to {*/
        /*    transform: translate3d(0, 0, 0);*/
        /*}*/
    }

    .wobble1 {
        /*animation-name: wobble;*/
        -webkit-animation: wobble1 4s linear infinite;
        animation: wobble1 4s linear infinite;
    }

    /*水波纹效果*/
    @-webkit-keyframes opac{
        from {
            opacity: 0.8;
            width:0;
            height:0;
            top:50%;
            left:50%;
        }
        to {
            opacity : 0;
            width:100%;
            height:100%;
            top:0;
            left:0;
        }
    }
    .animate .w2{
        -webkit-animation-delay:1s;
    }
    .animate .w3{
        -webkit-animation-delay:2s;
    }
    .animate .w4{
        -webkit-animation-delay:3s;
    }
    .wave{
        width: 22.7rem;
        height: 22.7rem;
        position: absolute;
        /*top: 0;*/
        left: 0;
        right: 0;
        margin: 0 auto;
    }
    .wave *{
        border:1px solid #fff;
        position:absolute;
        border-radius:50%;
        -webkit-animation:opac 3s infinite;
    }

    /*水波纹效果二*/
    .circle {
        /*position:absolute;*/
        left:0;
        /*top:0;*/
        right: 0;
        margin: 0 auto;
        width:90px;
        height:90px

    }
    .circle div {
        position: absolute;
        top: 40%;
        left: 50%;
        background: #fff;
        width: 90px;
        height: 90px;
        margin-left: -45px;
        margin-top: -45px;
        opacity: 1;
        border-radius: 90px;
        animation: 1.2s linear infinite;
        -webkit-animation: 1.2s linear infinite;
        -ms--webkit-animation: 1.2s linear infinite;
        -moz--webkit-animation: 1.2s linear infinite;
        -o--webkit-animation: 1.2s linear infinite;
    }
    .circle div.c1 {
        width:20px;
        height:20px;
        margin-left:-10px;
        margin-top:-10px;
        opacity:1;
        border-radius:90px
    }
    .circle div.c2 {
        -webkit-animation-name:c2;
        -webkit-animation-delay:.6s;
        -ms-animation-name:c2;
        -ms-animation-delay:.6s;
        -moz-animation-name:c2;
        -moz-animation-delay:.6s;
        -o-animation-name:c2;
        -o-animation-delay:.6s;
        animation-name:c2;
        animation-delay:.6s;
    }
    .circle div.c3 {
        -webkit-animation-name:c2;
        -webkit-animation-delay:1.2s;
        -ms-animation-name:c2;
        -ms-animation-delay:1.2s;
        -moz-animation-name:c2;
        -moz-animation-delay:1.2s;
        -o-animation-name:c2;
        -o-animation-delay:1.2s;
        animation-name:c2;
        animation-delay:1.2s;
    }
    @-webkit-keyframes c2 {
        0% {
            -webkit-transform:scale(.222);
            -ms-transform:scale(.222);
            -moz-transform:scale(.222);
            -o-transform:scale(.222);
            transform:scale(.222);
            opacity:1
        }
        50% {
            -webkit-transform:scale(.622);
            -ms-transform:scale(.622);
            -moz-transform:scale(.622);
            -o-transform:scale(.622);
            transform:scale(.622);
            opacity:.4
        }
        98% {
            -webkit-transform:scale(1);
            -ms-transform:scale(1);
            -moz-transform:scale(1);
            -o-transform:scale(1);
            transform:scale(1);
            opacity:.2
        }
        100% {
            opacity:0
        }
    }
    @-ms-keyframes c2 {
        0% {
            -webkit-transform:scale(.222);
            -ms-transform:scale(.222);
            -moz-transform:scale(.222);
            -o-transform:scale(.222);
            transform:scale(.222);
            opacity:1
        }
        50% {
            -webkit-transform:scale(.622);
            -ms-transform:scale(.622);
            -moz-transform:scale(.622);
            -o-transform:scale(.622);
            transform:scale(.622);
            opacity:.4
        }
        98% {
            -webkit-transform:scale(1);
            -ms-transform:scale(1);
            -moz-transform:scale(1);
            -o-transform:scale(1);
            transform:scale(1);
            opacity:.2
        }
        100% {
            opacity:0
        }
    }
    @-moz-keyframes c2 {
        0% {
            -webkit-transform:scale(.222);
            -ms-transform:scale(.222);
            -moz-transform:scale(.222);
            -o-transform:scale(.222);
            transform:scale(.222);
            opacity:1
        }
        50% {
            -webkit-transform:scale(.622);
            -ms-transform:scale(.622);
            -moz-transform:scale(.622);
            -o-transform:scale(.622);
            transform:scale(.622);
            opacity:.4
        }
        98% {
            -webkit-transform:scale(1);
            -ms-transform:scale(1);
            -moz-transform:scale(1);
            -o-transform:scale(1);
            transform:scale(1);
            opacity:.2
        }
        100% {
            opacity:0
        }
    }
    @-o-keyframes c2 {
        0% {
            -webkit-transform:scale(.222);
            -ms-transform:scale(.222);
            -moz-transform:scale(.222);
            -o-transform:scale(.222);
            transform:scale(.222);
            opacity:1
        }
        50% {
            -webkit-transform:scale(.622);
            -ms-transform:scale(.622);
            -moz-transform:scale(.622);
            -o-transform:scale(.622);
            transform:scale(.622);
            opacity:.4
        }
        98% {
            -webkit-transform:scale(1);
            -ms-transform:scale(1);
            -moz-transform:scale(1);
            -o-transform:scale(1);
            transform:scale(1);
            opacity:.2
        }
        100% {
            opacity:0
        }
    }
    @keyframes c2 {
        0% {
            -webkit-transform:scale(.222);
            -ms-transform:scale(.222);
            -moz-transform:scale(.222);
            -o-transform:scale(.222);
            transform:scale(.222);
            opacity:1
        }
        50% {
            -webkit-transform:scale(.622);
            -ms-transform:scale(.622);
            -moz-transform:scale(.622);
            -o-transform:scale(.622);
            transform:scale(.622);
            opacity:.4
        }
        98% {
            -webkit-transform:scale(1);
            -ms-transform:scale(1);
            -moz-transform:scale(1);
            -o-transform:scale(1);
            transform:scale(1);
            opacity:.2
        }
        100% {
            opacity:0
        }
    }


    /*水波纹效果三*/
    .container{
        position: relative;
        width: 100px;
        height: 100px;
        margin: 10px;
    }
    .dot{
        position: absolute;
        left: 15px;
        top:15px;
        width:6px;
        height: 6px;
        border-radius: 50%;
    }
    .wave1{
        position: absolute;
        left: 2px;
        top: 2px;
        width: 24px;
        height: 24px;
        border: 6px solid yellow;
        border-radius: 50%;
        opacity: 0;
        animation: waveCircle 3s ease-out;
        animation-iteration-count: infinite;
    }
    @-webkit-keyframes waveCircle {
        0%{
            transform: scale(0);
            opacity: 0;
        }
        10%{
            transform: scale(0.1);
            opacity: 0.1;
        }
        20%{
            transform: scale(0.2);
            opacity: 0.2;
        }
        30%{
            transform: scale(0.3);
            opacity: 0.3;
        }
        75%{
            transform: scale(0.6);
            opacity: 0.5;
        }
        100%{
            transform: scale(1);
            opacity: 0;
        }
    }

    /*水波纹效果四*/
    .example {
        position:relative;
        margin:50px auto;
        width:50px;
        height:50px;
    }
    .dot1:before{
        content:' ';
        position: absolute;
        z-index:2;
        left:0;
        top:0;
        width:10px;
        height:10px;
        background-color: #ff4200;
        border-radius: 50%;
    }

    .dot1:after {
        content:' ';
        position: absolute;
        z-index:1;
        width:10px;
        height:10px;
        background-color: #ff4200;
        border-radius: 50%;
        box-shadow: 0 0 10px rgba(0,0,0,.3) inset;
        -webkit-animation: waveCircle1 3s ease infinite normal ;
        animation: waveCircle1 3s ease infinite normal;
        /*-webkit-animation-name: ripple;
    -webkit-animation-duration: 1s;
    -webkit-animation-timing-function: ease;
    -webkit-animation-delay: 0s;
    -webkit-animation-iteration-count: infinite;
    -webkit-animation-direction: normal;*/
    }

    @keyframes waveCircle1 {
        0% {
            left:5px;
            top:5px;
            width:0;
            height:0;
        }
        100% {
            left:-20px;
            top:-20px;
            opacity: 0;
            width:50px;
            height:50px;
        }
    }

    @keyframes circleChange{
        0%{transform: scale(1);opacity: 0.95;}
        25%{transform: scale(2);opacity: 0.75;}
        50%{transform: scale(3);opacity: 0.5;}
        75%{transform: scale(4);opacity: 0.25;}
        100%{transform: scale(5);opacity: 0.05;}
    }
</style>