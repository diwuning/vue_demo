<template>
    <div>
        <NavBar title="CSS样式" :back="true"></NavBar>
        <div>
            <!--     两栏布局 方法一，左边固宽浮动，右边BFC  -->
            <div class="left">左边200px,固宽浮动</div>
            <div class="right">右边BFC</div>
            <p></p>
            <!--     两栏布局 方法二, 父flex，右边固宽浮动，左边flex:1 -->
            <div style="display: flex; background-color: #ffb000;color:white">
                <div style="background-color: green;flex:1">左边栏flex:1</div>
                <div style="background-color: #00000000; width: 200px; float: right">右边栏200px,浮动</div>
            </div>
            <p></p>
            <div>外边距折叠问题</div>
            <div style="height:1px; width:100%; background-color:black"></div>
            <div style="position: relative">
                <div id="box1">
                    <div id="box3">box3</div>
                    box1
                </div>
                <div id="box4"></div>
                <div id="box2">box2</div>
                <div id="box5">
                    1、父子元素margin-top折叠：<br/>
                    (1)父元素加透明边框；父元素加padding;父元素加overflow:hidden;<br/>
                    (2)父子元素加float；父子元素设绝对定位；父子设display:inline-block;<br/>
                    2、兄弟元素：<br/>
                    后面的元素加float; 给任意一个兄弟元素加div设为透明边框<br/>
                    3、空元素: <br/>
                    加透明边框；加padding；设固定高度<br/>
                    4、父子元素margin-bottom折叠：<br/>
                    父元素设置border或padding-bottom;父固宽;
                </div>
            </div>

            <div>清除浮动3种示例</div>
            <div style="text-align: left">1、父元素overflow:hidden;<br/>2、父元素:after{content:""; display: block; clear:both; }；<br/>3、空元素+clear:both</div>
            <div class="div1">
                <div class="son1">a</div>
                <div class="son2">b浮动</div>
                <div style="clear: both"></div>
            </div>
            <!--  postion为默认时，top,left不起作用      -->
<!--            <div style="background-color: #42b983; top:50px;left: 30px;">-->
<!--                <img src="../../assets/product.png" style="background-color: blue"/>-->
<!--            </div>-->
            <div class="total">
                <div v-for="(item,index) in list" :key="index" class="div2">
                    <div class="innerDiv">{{item.name}}</div>
                </div>
            </div>

        </div>
    </div>
</template>

<script>
    import NavBar from "../navBar/NavBar";
    export default {
        name: "cssFloat",
        components:{
            NavBar
        },
        data() {
            return {
                list:[
                    {id:1,name:'name1'},
                    {id:2,name:'name2'},
                    {id:3,name:'name3'},
                    {id:4,name:'name4'},
                ]
            }

        }
    }
</script>

<style scoped>
    .left {
        width: 200px;
        height: 50px;
        background-color: green;
        float: left;
    }

    .right {
        height: 50px;
        background-color: red;
        overflow: hidden; /* 创建BFC */
    }

    #box1{
        width: 120px;
        height: 100px;
        background: #fbc27f;
        margin-bottom: 20px;
        margin-top: 50px;
        /*overflow:hidden;*/
        /*border: 1px solid #00000000;*/
        /*display: inline-block;*/
        /*float:left;*/
        /*position: absolute*/
        /*padding: 10px;*/
    }
    #box2{
        width: 100px;
        height: 100px;
        background: lightcoral;
        margin-top:30px ;
        /*兄弟间外边距重叠，除了加float外，还可以给其中一个兄弟加div,在div上设置边框*/
        /*float: left;*/
    }
    #box3 {
        width: 50px;
        height: 50px;
        background-color: #f12416;
        margin-top: 50px;
        /*display: inline-block;*/
        /*float:left;*/
        /*position: absolute*/
    }
    #box4 {
        margin-top: 50px;
        margin-bottom:50px ;
        background-color: #42b983;
        /*border: 1px solid salmon;*/
        /*padding: 1px;*/
    }
    #box5 {
        float: right; background-color: #42b983; right: 0; position:absolute;width: 260px; height: 240px; top: 0px;
        text-align: left;font-size: 13px;
    }
    .div1 {
        width: 150px;
        border: 1px solid red;
        /*使用BFC来清除浮动*/
        /*overflow: hidden;*/
    }
    /*.div1:after{*/
    /*    content: '';*/
    /*    display: block;*/
    /*    clear: both;*/
    /*}*/
    .son1, .son2 {
        width: 100px;
        height: 100px;
        background-color: blue;

    }
    .son2 {
        background-color: greenyellow;
        float: left;
    }
    .total {
        display:flex;
        /*width:100%;*/
        margin: 20px;
        /*设置flex-wrap: wrap，才会一行显示两个*/
        flex-wrap: wrap;
    }
    .div2 {
        width:50%;
        height:50px;
        border:#f12416 1px solid;
        padding:5px 5px;
    }
    .innerDiv {
        padding:5px 5px;
        /*如果设置了width:100%，再设置margin, 内容会溢出父元素*/
        /*margin: 8px 5px;*/
        background-color: #42b983;
        width: 100%;
        height: 100%;
        border:#8a8a8a 1px solid;
        border-radius: 5px;
    }

</style>