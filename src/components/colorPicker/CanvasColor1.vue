<template>
    <div>
        <canvas class="box" id="show" width="300px" height="300px"></canvas>
        <div class="cover" id='cover'></div>
        <em id="cur"></em>
    </div>
</template>

<script>
    export default {
        name: "CanvasColor1",
        mounted() {
            var show = document.getElementById("show");
            // var cover = document.getElementById("cover");
            var cur = document.getElementById("cur");
            if (show.getContext) {//首先判断getcontext方法是否存在，这是一个良好的习惯
                var context = show.getContext('2d');
                var gradientBar = context.createLinearGradient(0, show.width, show.width, show.width);//创建渐变，前两个参数是渐变开始的横纵坐标，后两个参数是渐变结束的横纵坐标
                gradientBar.addColorStop(0, '#f00');
                gradientBar.addColorStop(1 / 6, '#f0f');
                gradientBar.addColorStop(2 / 6, '#00f');
                gradientBar.addColorStop(3 / 6, '#0ff');
                gradientBar.addColorStop(4 / 6, '#0f0');
                gradientBar.addColorStop(5 / 6, '#ff0');
                gradientBar.addColorStop(1, '#f00');

                context.fillStyle = gradientBar;
                context.fillRect(0, 0, show.width, show.width);

                //白色透明黑色，明暗度实现
                var lightToDark = context.createLinearGradient(0, 0, 0, show.width);
                lightToDark.addColorStop(0, "#fff");
                lightToDark.addColorStop(1 / 2, 'rgba(255,255,255,0)');
                lightToDark.addColorStop(1, '#000');

                context.fillStyle = lightToDark;
                context.fillRect(0, 0, show.width, show.width);

                show.addEventListener('click', function (e) {
                    console.log('click',e);
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
                    // var cur = document.getElementById("cur");
                    var pos = {
                        x: e.clientX,
                        y: e.clientY
                    }
                    cur.style.left = pos.x + 'px';
                    cur.style.top = pos.y + 'px';
                    console.log('onmousemove',cur.style.left);
                });
            }
        },
        methods:{
            getDotList(){
                this.canvas = document.getElementById("show");
                this.context = this.canvas.getContext("2d");
                // 获取整个 canvas 的像素信息
                var imgData = this.context.getImageData(0, 0,this.canvas.width, this.canvas.height);
                // 清空数组
                var dotList = [];
                // 最后实现的效果每个点之间有一定的距离，gap 就是控制这个距离的
                var gap = 1;
                // 通过 width 和 height 遍历 imgData 对象，每隔 gap 个点取一次像素，找到红色的像素，
                // 每找到一个红色点，就创建一个 Dot 对象，并添加到 dotList 数组中
                for (var x = 0; x < imgData.width; x += gap) {undefined
                    for (var y = 0; y < imgData.height; y += gap) {undefined
                        var i = (y * imgData.width + x) * 4;
                        // 判断像素点是不是红色
                        if (imgData.data[i] == 255 && imgData.data[i + 1] == 0 && imgData.data[i + 2] == 0 && imgData.data[i + 3] == 255) {undefined
                            var dot = {x,y} ;
                            dotList.push(dot);
                        }
                    }
                }
                return dotList;
            },
        }
    }
</script>

<style scoped>
    .box {
        position: relative;
        background-color: pink;
        margin: 30px;
    }
    /* 选择颜色的小方格 */
    #cur {
        width: 13px;
        height: 13px;
        outline: 2px solid #535353;
        margin-left: -1px;
        margin-top: -1px;
        position: absolute;
    }

    #cover{
        position: absolute;
        left: 100px;
        top: 100px;
        width: 50px;
        height: 50px;
        background-color: antiquewhite;
        /* cover作为遮罩挡住了canvas，使用这个可以穿透遮罩，点击到下面的元素 */
        pointer-events: none;
    }
</style>