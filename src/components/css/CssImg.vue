<template>
    <div>
        <img src="./../../assets/logo.png" style="width: 20px; height: 20px; float: left; transform: rotate(90deg)" @click="backReturn"><br/>
        <div style="display: flex; margin-top: 30px; background-color: black; padding: 20px">
            <div class="loading_blue_circle"></div>
            <svg viewBox="25 25 50 50" class="loading_svg_red">
                <circle r="20" cx="50" cy="50" class="loading_circle_red"></circle>
            </svg>
            <svg viewBox="0 0 50 50" class="loading_svg_ball">
                <circle class="ring" cx="25" cy="25" r="20"></circle>
                <circle class="ball" cx="25" cy="5" r="3.5"></circle>
            </svg>

        </div>
        <div style="display: flex">
            <div class="color_change1">渐变效果</div>
            <div class="color_change2"></div>
            <div class="color_change3"></div>
        </div>
        <div>
            <!--    转角效果        -->
            <svg width="100" height="280" xmlns="http://www.w3.org/2000/svg" version="1.1">
                <polyline points="10 60 50 20 90 60" stroke="black" stroke-width="20"
                          stroke-linecap="butt" fill="none" stroke-linejoin="miter"/>
                <polyline points="10 140 50 100 90 140" stroke="black" stroke-width="20"
                          stroke-linecap="round" fill="none" stroke-linejoin="round"/>
                <polyline points="10 220 50 180 90 220" stroke="black" stroke-width="20"
                          stroke-linecap="square" fill="none" stroke-linejoin="bevel"/>
            </svg>
            <!--   path1:曲线；path2：直虚线        -->
            <svg width="200" height="150" xmlns="http://www.w3.org/2000/svg" version="1.1">
                <path d="M 10 75 Q 50 10 100 75 T 190 75" stroke="black"
                    stroke-dasharray="5,10,5" fill="none"/>
                <path d="M 10 75 L 190 75" stroke="red"
                    stroke-width="1" stroke-dasharray="5,5" fill="none"/>
            </svg>
            <!--   矩形和椭圆        -->
            <svg xmlns="http://www.w3.org/2000/svg" version="1.1" width="120" height="100">
                <rect x="1" y="20" rx="20" ry="20" width="100" height="100"
                    style="fill:red;stroke:black;stroke-width:5;opacity:0.5; fill-opacity:0.5;stroke-opacity:0.5" />
                <ellipse cx="50" cy="80" rx="40" ry="20" style="fill:yellow;stroke:purple;stroke-width:2"/>
            </svg>
            <!--   多边形：实心五角星        -->
            <svg height="210" width="200">
                <polygon points="100,10 40,198 190,78 10,78 160,198"
                    style="fill:lime;stroke:purple;stroke-width:5;fill-rule:nonzero;" />
            </svg>
            <!--   多边形：五边形        -->
            <svg height="210" width="200">
                <polygon points="100,10 190,78 160,198 40,198 10,78"
                         style="fill:lime;stroke:purple;stroke-width:5;fill-rule:nonzero;" />
            </svg>
            <!--   多段线    -->
            <svg xmlns="http://www.w3.org/2000/svg" version="1.1" width="130" height="190">
                <polyline points="20,20 40,25 60,40 80,80 120,100 120,180"
                          style="fill:none;stroke:black;stroke-width:3" />
            </svg>
            <svg xmlns="http://www.w3.org/2000/svg" version="1.1" height="200" width="250">
                <path id="lineAB" d="M 50 175 l 75 -150" stroke="red" stroke-width="3" fill="none" />
                <path id="lineBC" d="M 125 25 l 75 150" stroke="red" stroke-width="3" fill="none" />
                <path d="M 88 100 l 75 0" stroke="green" stroke-width="3" fill="none" />
                <path d="M 50 175 q 75 -150 150 0" stroke="blue" stroke-width="5" fill="none" />
                <!-- Mark relevant points -->
                <g stroke="black" stroke-width="3" fill="black">
                    <circle id="pointA" cx="50" cy="175" r="3" />
                    <circle id="pointB" cx="125" cy="25" r="3" />
                    <circle id="pointC" cx="200" cy="175" r="3" />
                </g>
                <!-- Label the points -->
                <g font-size="30" font="sans-serif" fill="black" stroke="none" text-anchor="middle">
                    <text x="50" y="175" dx="-30">A</text>
                    <text x="125" y="25" dy="-10">B</text>
                    <text x="200" y="175" dx="30">C</text>
                </g>
            </svg>
        </div>
        <div>
        <!--   滤镜     -->
            <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
                <filter id="feBlend1">
                    <feFlood result="floodFill" x="0" y="0" width="100%" height="100%" flood-color="green" flood-opacity="0.9"/>
                    <feBlend in="SourceGraphic" in2="floodFill" mode="normal"/>
                </filter>
                <filter id="feBlend2">
                    <feFlood result="floodFill" x="0" y="0" width="100%" height="100%" flood-color="green" flood-opacity="0.9"/>
                    <feBlend in="floodFill" in2="SourceGraphic" mode="normal"/>
                </filter>
                <circle cx="50" cy="50" r="40" fill="red" filter="url(#feBlend1)" />
                <circle cx="150" cy="50" r="40" fill="red" filter="url(#feBlend2)"/>
            </svg>
            <svg width="200" height="200" viewBox="0 0 10 90"
                 preserveAspectRatio="xMidYMid meet"
                 xmlns="http://www.w3.org/2000/svg"
                 xmlns:xlink="http://www.w3.org/1999/xlink">
                <filter id="filter1">
                    <feGaussianBlur in="SourceGraphic" stdDeviation="1" result="Gau1"/>
                    <feOffset dx="3" dy="3" />
                    <feGaussianBlur  stdDeviation="1" out="Gau2" result="Gau2"/>
                    <!--↓-->
                    <feComposite in="Gau1" in2="SourceAlpha" operator="in" ></feComposite>
                    <!--↑-->
                </filter>
                <g  filter="">
                    <circle cx="40" cy="40" r="10" fill="blue" filter="url(#filter1)"></circle>
                </g>>

            </svg>
            <svg width="150" height="150">
                <defs>
                    <filter id="ga" x="0" y="0">
                        <feGaussianBlur in="SourceAlpha" stdDeviation="5" result="blur"></feGaussianBlur>
                        <feOffset in="blur" dx="10" dy="10" result="offsetBlur"></feOffset>
                        <feMerge>
                            <feMergeNode in="offsetBlur" />
                            <feMergeNode in="SourceGraphic" />
                        </feMerge>
                    </filter>
                </defs>
                <rect x="10" y="10" width="100" height="100" fill="black" filter="url(#ga)"></rect>
            </svg>
        </div>
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

    .loading_blue_circle {
        border: 3px solid hsla(185, 100%, 62%, 0.2);
        border-top-color: #3cefff;
        border-radius: 50%;
        width: 3em;/*删掉后圆棍在转，变成13em后类似椭圆，宽的地方高亮*/
        height: 3em;
        animation: spin 1s linear infinite;
    }
    @keyframes spin {
        to {
            transform: rotate(360deg);
        }
    }

    .loading_svg_red {
        width: 3.75em;
        transform-origin: center;
        animation: rotate 2s linear infinite;
    }
    .loading_circle_red {
        fill: none;
        stroke: #fc2f70;
        stroke-width: 2;/*圆环宽度*/
        stroke-dasharray: 1, 200;/*不加这句，半圆转完一圈后变成整圆*/
        stroke-dashoffset: 0;
        stroke-linecap: round;
        animation: dash 1.5s ease-in-out infinite;
    }
    @keyframes rotate {
        100% {
            transform: rotate(360deg);
        }
    }
    @keyframes dash {
        0% {
            stroke-dasharray: 1,200;
            stroke-dashoffset: 0;
        }
        50% {
            stroke-dasharray: 90, 200;
            stroke-dashoffset: -35px;
        }
        100% {
            stroke-dashoffset: -125px;
        }
    }

    /*黑色大圆球边上有个黑色小圆球在转*/
    .loading_svg_ball {
        width: 3.75em;
        animation: 1.5s spin ease infinite;
    }

    /*淡红色圆球上有个黑色小圆球在转*/
    .ring {
        fill: none;
        stroke: hsla(341, 97%, 59%, 0.3);
        stroke-width: 2;
    }
    /*圆球上小圆球的样式，黑变红*/
    .ball {
        fill: #fc2f70;
        stroke:none;
    }

    .color_change1 {
        background: #1E9600;  /* fallback for old browsers */
        background: -webkit-linear-gradient(to right, #FF0000, #FFF200, #1E9600);  /* Chrome 10-25, Safari 5.1-6 */
        background: linear-gradient(to right, #FF0000, #FFF200, #1E9600); /* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */
        width: 33%; height: 100px;
    }
    .color_change2 {
        background: #2980B9;  /* fallback for old browsers */
        background: -webkit-linear-gradient(to right, #FFFFFF, #6DD5FA, #2980B9);  /* Chrome 10-25, Safari 5.1-6 */
        background: linear-gradient(to right, #FFFFFF, #6DD5FA, #2980B9); /* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */
        width: 33%; height: 100px;
    }
    .color_change3 {
        background: #ef32d9;  /* fallback for old browsers */
        background: -webkit-linear-gradient(to right, #89fffd, #ef32d9);  /* Chrome 10-25, Safari 5.1-6 */
        background: linear-gradient(to right, #89fffd, #ef32d9); /* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */
        width: 33%; height: 100px;
    }

</style>