<template>
    <!--    <div>-->
    <div id='outDiv' style="position: relative">
        <!--        <canvas class="box" id="show" :style="{width:canvasWidth+'px',height:canvasHeight+'px'}"></canvas>-->
        <canvas class="box" id="show" width="300px" height="150px"></canvas>
        <div class="cover" id='cover'></div>
        <em id="cur"></em>
    </div>
</template>

<script>
    // import '../../util/utils.js'
    export default {
        name: "CanvasColor",
        data() {
            return {
                canvas:null,
                context:null,
                paramColor:'',
                viewWidth:0,
                viewHeight:0,
                selectWhite:''
            }
        },
        props:{
            data:String,
            canvasWidth:Number,
            canvasHeight:Number,
        },
        created() {
            this.viewWidth = this.canvasWidth;
            this.viewHeight = this.canvasHeight;
            // var color = 'rgb(210,233,249)'.colorHex();
            // console.log('created', color)
            // var color1 = 'rgb(247,206,116)'.colorHex();
            // console.log('created', color1)
        },
        mounted() {
            this.getParamColor('rgb(255,255,254)');
            this.initData();
            this.getDotList();
        },
        methods:{
            async getDotList(){
                this.canvas = document.getElementById("show");
                this.context = this.canvas.getContext("2d");
                console.log('getDotList',this.canvas.offsetLeft);
                // 获取整个 canvas 的像素信息
                var imgData = this.context.getImageData(0, 0,this.canvas.width+this.canvas.offsetLeft, this.canvas.height+this.canvas.offsetTop);
                // 清空数组
                var dotList = [];
                // 最后实现的效果每个点之间有一定的距离，gap 就是控制这个距离的
                var gap = 1;
                // 通过 width 和 height 遍历 imgData 对象，每隔 gap 个点取一次像素，找到红色的像素，
                // 每找到一个红色点，就创建一个 Dot 对象，并添加到 dotList 数组中
                for (var x = 0; x < imgData.width; x += gap) {
                    for (var y = 0; y < imgData.height; y += gap) {
                        var i = (y * imgData.width + x) * 4;
                        // console.log('getDotList',i);
                        // 判断像素点是不是红色
                        if (imgData.data[i] == this.paramColor[0] && imgData.data[i + 1] == this.paramColor[1] && imgData.data[i + 2] == this.paramColor[2]) {
                            var dot = {x,y} ;
                            dotList.push(dot);
                        }
                    }
                }

                if (dotList && dotList.length != 0) {
                    var cur = document.getElementById('cur');
                    cur.style.left = (dotList[0].x+this.canvas.offsetLeft)+'px';
                    cur.style.top = (dotList[0].y+this.canvas.offsetTop-this.canvas.height/2)+'px';
                }
                console.log('dot',dotList);
                dotList = [];
                return dotList;
            },
            initData() {
                let _this = this;
                var show = document.getElementById("show");
                show.setAttribute("width",this.canvasWidth);
                show.setAttribute("height",this.canvasHeight);
                // var cover = document.getElementById("cover");
                var cur = document.getElementById("cur");
                if (show.getContext) {//首先判断getcontext方法是否存在，这是一个良好的习惯
                    var context = show.getContext('2d');
                    var gradientBar = context.createLinearGradient(0, show.height, show.width, show.height);//创建渐变，前两个参数是渐变开始的横纵坐标，后两个参数是渐变结束的横纵坐标

                    gradientBar.addColorStop(0, '#f7ce74');
                    gradientBar.addColorStop(1/2, '#ffffff');
                    gradientBar.addColorStop(1, '#d2e9f9');

                    context.fillStyle = gradientBar;
                    context.fillRect(0, 0, show.width, show.width);

                    show.addEventListener('click', function (e) {
                        var ePos = {
                            x: e.layerX || e.offsetX,
                            y: e.layerY || e.offsetY
                        }
                        //前两个参数为鼠标的位置，后娘个参数为canvas的宽高
                        var imgData = context.getImageData(ePos.x, ePos.y, show.width, show.height).data;
                        //可以通过下面的方法获得当前的rgb值
                        var red = imgData[0];
                        var green = imgData[1];
                        var blue = imgData[2];
                        var rgbStr = "rgb(" + red + "," + green + ',' + blue + ")";
                        console.log(rgbStr);
                        var cover = document.getElementById("cover");
                        cover.style.backgroundColor = rgbStr;
                        _this.selectWhite = rgbStr;
                        // var cur = document.getElementById("cur");
                        var outDiv = document.getElementById('outDiv');
                        console.log('outDiv',outDiv.offsetTop+','+outDiv.offsetHeight);
                        var pos = {
                            x: e.clientX,
                            y: e.clientY-outDiv.offsetTop//当该组件整体为相对位置时，y轴的坐标是当前点的位置-最外层距离顶点的高度
                        }
                        cur.style.left = pos.x + 'px';
                        cur.style.top = pos.y + 'px';
                        console.log('onmousemove',cur.style.left);
                    });
                }
            },
            getParamColor(color) {
                let param = color;
                console.log('getParamColor',param.length)
                param = param.substring(4,param.length-1);
                console.log('getParamColor',param)
                this.paramColor = param.split(',');
                this.getDotList();
                var cover = document.getElementById("cover");
                cover.style.backgroundColor = color;
            }
        }
    }
</script>

<style scoped>
    .box {
        position: relative;
        background-color: pink;
        /*margin: 30px;*/
        border-radius: 15px;
    }
    /* 选择颜色的小方格 */
    #cur {
        width: 13px;
        height: 13px;
        outline: 2px solid #ffffff;
        margin-left: -1px;
        margin-top: -1px;
        position: absolute;
        border-radius: 13px;
    }

    #cover{
        position: absolute;
        left: 100px;
        top: 10px;
        width: 50px;
        height: 50px;
        background-color: antiquewhite;
        /* cover作为遮罩挡住了canvas，使用这个可以穿透遮罩，点击到下面的元素 */
        pointer-events: none;
    }
</style>