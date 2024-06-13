<template>
    <div>
        <div id="dragBox">
            <div v-for="(item,index) in list" :key="index" class="box1" :style="{left:(index*60 +10)+'px'}"  :id="'a'+index"
                 v-on:mousedown.native="mousedownFunc($event, index)">点击{{index}}</div>
        </div>
    </div>
</template>

<script>
    export default{
        name:'DragView',
        data() {
            return {
                list: [1, 2, 3, 4, 5],
                isDrag: false,
                boxObj: null,
                box: null,
                disX: 0,
                disY: 0
            }
        },
        mounted() {
            this.boxObj = document.getElementById("dragBox")
        },
        methods: {
            // 鼠标按下事件
            mousedownFunc(e, index) {
                console.log('mousedownFunc',e)
                // 去除鼠标默认事件
                document.oncontextmenu = function(e) {
                    e.preventDefault()
                }
                // 阻止冒泡
                e.stopPropagation()
                let oEvent = e || event
                // clientX，clientY：鼠标点击位置到浏览器可视区域x，y距离
                // offsetLeft，offsetTop:元素距离父级元素的偏移距离
                this.box = document.getElementById("a" + index)
                this.disX = oEvent.clientX - this.box.offsetLeft
                this.disY = oEvent.clientY - this.box.offsetTop
                this.isDrag = true
                console.log('a' + index)
                console.log('对象', this.boxObj)
                this.boxObj.onmousemove = this.eleMousemove
                this.boxObj.onmouseup = this.eleMoveUp
            },
            // 鼠标抬起
            eleMousemove(e) {
                // 加入该判断拖拽更流畅
                if (this.isDrag) {
                    var oEvent = e || event
                    // 计算点击元素到父级元素的定位top，left距离
                    var l = oEvent.clientX - this.disX
                    var t = oEvent.clientY - this.disY
                    // 设置拖拽边界(限定在浏览器可视区域（空白区域）之内)
                    // 限定左边界
                    // if(l<0){
                    //   l=0
                    // }else if(l>document.documentElement.clientWidth-box.offsetWidth){
                    //   限定右边界
                    //   l=document.documentElement.clientWidth-box.offsetWidth
                    // }
                    // 限定上边界
                    // if(t<0){
                    //   t=0
                    // }else if(t>document.documentElement.clientHeight-box.offsetHeight){
                    //   限定下边界
                    //   t=document.documentElement.clientHeight-box.offsetHeight
                    // }
                    /** 限定拖拽范围，限定拖拽元素在指定的范围内 */
                    // 限定左边界和上边界
                    if (l < 0) {
                        l = 0
                    }
                    if (t < 0) {
                        t = 0
                    }
                    // 限定右边界的距离(当l=父元素宽-子元素宽时，刚好子元素放在父元素最右边)
                    if (l > this.boxObj.clientWidth - this.box.clientWidth) {
                        l = this.boxObj.clientWidth - this.box.clientWidth
                    }
                    // 限定下边界的距离(当t=父元素高-子元素高时，刚好子元素放在父元素最下边)
                    if (t > this.boxObj.clientHeight - this.box.clientHeight) {
                        t = this.boxObj.clientHeight - this.box.clientHeight
                    }
                    this.box.style.left = l + 'px'
                    this.box.style.top = t + 'px'
                }
            },
            // 鼠标抬起
            eleMoveUp() {
                // var oEvent = e || event
                this.isDrag = false
                this.boxObj.onmousemove = null
                this.boxObj.onmouseup = null
            },
            drag(box, obox) {
                var disX
                var disY
                var that = this
                // 鼠标左键按下事件
                box.onmousedown = function(ev) {
                    var oEvent = ev || event
                    // clientX，clientY：鼠标点击位置到浏览器可视区域x，y距离
                    // offsetLeft，offsetTop:元素距离父级元素的偏移距离
                    disX = oEvent.clientX - box.offsetLeft
                    disY = oEvent.clientY - box.offsetTop
                    that.isDrag = true
                    console.log('isDrag', that.isDrag)
                    console.log('clientX', oEvent.clientX)
                    console.log('clientY', oEvent.clientY)
                    console.log('offsetLeft', box.offsetLeft)
                    console.log('offsetTop', box.offsetTop)
                    console.log('disX', disX)
                    console.log('disY', disY)
                    // 鼠标移动事件
                    document.onmousemove = function(ev) {
                        // 加入该判断拖拽更流畅
                        if (that.isDrag) {
                            var oEvent = ev || event
                            // 计算点击元素到父级元素的定位top，left距离
                            var l = oEvent.clientX - disX
                            var t = oEvent.clientY - disY
                            // 设置拖拽边界(限定在浏览器可视区域（空白区域）之内)
                            // 限定左边界
                            // if(l<0){
                            //   l=0
                            // }else if(l>document.documentElement.clientWidth-box.offsetWidth){
                            //   限定右边界
                            //   l=document.documentElement.clientWidth-box.offsetWidth
                            // }
                            // 限定上边界
                            // if(t<0){
                            //   t=0
                            // }else if(t>document.documentElement.clientHeight-box.offsetHeight){
                            //   限定下边界
                            //   t=document.documentElement.clientHeight-box.offsetHeight
                            // }
                            /** 限定拖拽范围，限定拖拽元素在指定的范围内 */
                            // 限定左边界和上边界
                            if (l < 0) {
                                l = 0
                            }
                            if (t < 0) {
                                t = 0
                            }
                            // 限定右边界的距离(当l=父元素宽-子元素宽时，刚好子元素放在父元素最右边)
                            if (l > obox.clientWidth - box.clientWidth) {
                                l = obox.clientWidth - box.clientWidth
                            }
                            // 限定下边界的距离(当t=父元素高-子元素高时，刚好子元素放在父元素最下边)
                            if (t > obox.clientHeight - box.clientHeight) {
                                t = obox.clientHeight - box.clientHeight
                            }
                            box.style.left = l + 'px'
                            box.style.top = t + 'px'
                        }
                    }
                    document.onmouseup = function() {
                        that.isDrag = false
                        document.onmousemove = null
                        document.onmouseup = null // 鼠标抬起来后，onmouseup事件本身也没意义了，所以最好清理掉
                    }
                    return false // 阻止默认行为，空的div在低版本ff下，第二次拖动手型会变异常
                }
            }
        }
    }
</script>

<style scoped>
    #dragBox{
        position: relative;
        width:300px;
        height:300px;
        border:1px solid red;
        /*margin-left:200px;*/
    }
    .box1{
        width:50px;
        height:50px;
        background:#13CE66;
        /* 一定要设置定位,拖拽就是根据定位实现的 */
        position: absolute;
        top:200px;
    }
</style>
