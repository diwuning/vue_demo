<template>
    <div>
        <NavBar title="九宫格抽奖" :back="true"></NavBar>
        <div id="page-nine">
            <div style="float: right; right: 0">
                <div class="lottery_instr lottery_instr_top">抽奖说明</div>
                <div class="lottery_instr lottery_earn_top">我的奖品</div>
            </div>
            <img src="../../assets/lottery1/lottery_title.png" class="lottery_title"/>
            <div class="nine_container">
                <div class="container-in hv_center">
                    <!--   九宫格的每一格     -->
                    <div class="content_out" v-for="(box,index) in list" :key="index"
                         :style="{left:box.left+'px',top:box.top+'px', width:'73px', height:'73px'}">
                        <div :class="index == indexSelect?'lottery_item_sel':'lottery_item'" v-if="box.type == 1" >
                            <div class="item_bottom">{{box.name}}</div>
                        </div>
                        <div :class="index == indexSelect?'lottery_item_no_sel':'lottery_item_no'" v-if="box.type == 2">
                            <div class="item_bottom">{{box.name}}</div>
                        </div>
                        <div :style="{backgroundImage:index === indexSelect?'url('+box.selImg+')':'url('+box.image_url+')'}" class="lottery_item_goods" v-if="box.type === 3">
                            <div class="item_bottom">{{box.name}}</div>
                        </div>
                    </div>
                </div>
                <!--开始按钮-->
                <div class="start_btn hv_center" @click="startBtn">
                    <div class="start_prize flex_center">抽奖</div>
                    <div class="start_prize_tip flex_center" v-if="count<2">消耗{{count*100}}能量</div>
                    <div class="start_prize_tip_small flex_center" v-if="count>=2">抽奖次数用完了</div>
                </div>
                <!-- 九宫格周围类似灯的圆点-->
                <div class="circle" v-for="(item,index) in circleList" :key="index"
                     :style="{'top':item.topCircle+'px','left':item.leftCircle+'px','background-color':index%2==0?colorCircleFirst:colorCircleSecond}">
                </div>
            </div>

            <div class="prize" v-show="prize==1">
                <div class="prize-box">
                    <img class="prize-img" src="../../assets/pond-success.png" alt="">
                    <div class="prize-msg">
                        <div>恭喜</div>
                        <div>抽中{{prize_name}}</div>
                        <div class="continue" v-on:click="conTinue">继续抽奖</div>
                    </div>
                </div>
            </div>
            <div class="prize" v-show="prize==2">
                <div class="prize-box">
                    <img class="prize-img2" src="../../assets/pond-empty.png" alt="">
                    <div class="prize-msg">
                        <div>谢谢参与</div>
                        <div>再换个姿势抽奖</div>
                        <div class="continue" v-on:click="conTinue">继续抽奖</div>
                    </div>

                </div>
            </div>
            <div class="men" v-show="men"></div>

            <div class="prize_list">
                <img src="../../assets/lottery1/icon_prize.png" class="prize_img"/>
                <van-swipe :autoplay="3000" :duration="2000" :show-indicators="false" vertical class="prize_swipe">
                    <van-swipe-item class="prize_swipe_item" v-for="(item,index) in list" :key="index">
                        <div class="prize_swipe_item_content">用户***获得了{{item.name}}</div>
                    </van-swipe-item>
                </van-swipe>
            </div>
            <div style="margin: 20px;">
                <button style="padding: 10px 30px 10px 30px; border: 1px solid #ff5c5c; color: #ff5c5c; font-size: 15px; float: left; margin-right: 10px">获奖名单</button>
                <vue-seamless-scroll
                        :data="list"
                        :class-option="classOption"
                        class="scroll-content">
                    <ul>
                        <li v-for="(item,index) in list"
                            :key="index" style="height: 50px; display: flex;">
                            <div class="prize_swipe_item_content" style="position: relative; align-self: center;">
                                <span  slot="right" v-show="item.type != 2">恭喜**获得</span>
                                {{item.name}}
                            </div>
                        </li>
                    </ul>
                </vue-seamless-scroll>
            </div>

        </div>
    </div>
</template>
<script>
    import product from '../../assets/lottery1/lottery_item_goods_bg.png'
    import selProduct from '../../assets/lottery1/lottery_item_goods_bg_sel.png'
    import { Swipe, SwipeItem} from 'vant';
    import NavBar from "../navBar/NavBar";
    // import OpenInstall from './../../util/openinstall'
    export default {
        name: 'NineLottery',
        components: {
            [Swipe.name]:Swipe,
            [SwipeItem.name]:SwipeItem,
            NavBar
        },
        data () {
            return {
                list: [
                    { id: 1, type: 1, name: '20能量', image_url: product,count:8 },
                    { id: 2, type: 2, name: '谢谢参与', image_url: product,count:7},
                    { id: 3, type: 3, name: '泡沫洗手机', image_url: product,count:1,selImg:selProduct },
                    { id: 4, type: 1, name: '50能量', image_url: product,count:6 },
                    { id: 5, type: 3, name: '毛巾礼盒', image_url: product,count:2, selImg:selProduct },
                    { id: 6, type: 1, name: '80能量', image_url: product,count:5 },
                    { id: 7, type: 3, name: '感应小夜灯', image_url: product,count:3 ,selImg:selProduct },
                    { id: 8, type: 1, name: '100能量', image_url: product,count:4 }
                ],
                circleList: [],
                colorCircleFirst: '#F12416',
                colorCircleSecond: '#FFFFFF',
                colorAwardDefault: '#F5F0FC',
                colorAwardSelect: '#ffe400',
                btntop: 0, // 按钮的样式
                time: '', // 定时器
                indexSelect: 0, // 奖品下标
                count:0,//抽奖次数
                lottert: 0, // 中奖下标
                prize: 0, // 是否中奖
                prize_name: '', // 奖品名字
                men: false,
                classOption:{
                    singleHeight: 50,
                    waitTime: 1000,
                    step: 0.5,
                    hoverStop: false
                }
            }
        },
        created () {
            this.init()
        },
        methods: {
            init: function () {
                var ts = this
                var list = this.list
                var left = 9
                var top = 9

                for(let i=0; i<8; i++) {
                    if(i === 0) {
                        left = 5
                        top = 5
                    } else if(i<3 && i != 0) {
                        top = top +0
                        left = left+76+4
                    } else if(i >=3 && i< 5) {
                        left= left +0
                        top = top + 73+6
                    } else if (i >=5 && i<7) {
                        left = left -76-4
                        top = top + 0
                    } else if (i>=7 && i<8) {
                        left = left +0
                        top = top -73 -6
                    }
                    list[i].top = top
                    list[i].left = left
                }
                this.list = list
                var cleft = 4 // e
                var ctop = 4 // a
                var dian = []
                for (var j = 0; j < 24; j++) {
                    if(j=== 0) {
                        cleft = 11
                        ctop = 22
                    } else if(j<6) {
                        ctop = 20
                        cleft +=43
                    } else if(j === 6) {
                        ctop = 20
                        cleft = 272
                    } else if (j < 12) {
                        ctop += 43
                        cleft = 273.5
                    } else if (j === 12) {
                        ctop = 281
                        cleft = 272
                    } else if (j < 18) {
                        ctop = 283
                        cleft -= 45
                    } else if (j === 18) {
                        ctop = 281
                        cleft = 11
                    } else {
                        if (!(j < 24)) return
                        ctop -= 43
                        cleft = 10.5
                    }
                    dian.push({
                        topCircle: ctop,
                        leftCircle: cleft
                    })
                }

                this.circleList = dian
                setInterval(function () {
                    if (ts.colorCircleFirst === '#FFFFFF') {
                        ts.colorCircleFirst = '#F12416'
                        ts.colorCircleSecond = '#FFFFFF'
                    } else {
                        ts.colorCircleFirst = '#FFFFFF'
                        ts.colorCircleSecond = '#F12416'
                        ts.btntop = 0
                    }
                }, 900)
                this.time = setInterval(function () {
                    if (ts.btntop === 0) {
                        ts.btntop = -3
                    } else {
                        ts.btntop = 0
                    }
                }, 900)
            },
            startBtn: function () {
                clearInterval(this.time)
                this.men = true
                this.btntop = 0
                this.lottert = 0
                var ts = this
                var i = this.indexSelect
                var list = this.list
                var time = null
                var s = 0

                time = setInterval(function () {
                    i++
                    i %= 8
                    s += 30
                    ts.indexSelect = i
                    if (ts.lottert > 0 && i + 1 === ts.lottert) {
                        clearInterval(time)
                        ts.time = setInterval(function () {
                            if (ts.btntop === 0) {
                                ts.btntop = -3
                            } else {
                                ts.btntop = 0
                            }
                        }, 900)
                        if (list[i].type === 2) {
                            ts.prize = 2
                        } else {
                            ts.prize_name = list[i].name
                            ts.prize = 1
                        }
                    }
                }, 200 + s)

                setTimeout(function () {
                    // ts.lottert = ts.randomNum(1, 8)
                    ts.lottert = ts.chance()
                    // ts.lottert = 4
                    // }, 2e3)
                }, 5000)
            },
            //抽奖，设置中奖概率
            chance: function() {
                let resultNum = 0
                let res = 0
                // var rand = Math.random()*50
                var rand = Math.random()*100
                console.log('chance',rand)
                let prizeArr = [0.000167,0.000167,0.000333,1.332667,1.666667,7,40,50]
                console.log('chance',prizeArr)
                if (rand < prizeArr[0]) {
                    resultNum = 1
                } else if (rand < prizeArr[1]) {
                    resultNum = 2
                } else if (rand < prizeArr[2]) {
                    resultNum = 3
                } else if (rand < prizeArr[3]) {
                    resultNum = 4
                } else if (rand < prizeArr[4]) {
                    resultNum = 5
                } else if (rand < prizeArr[5]) {
                    resultNum = 6
                    //随机数*50时，
                    // } else if (rand < prizeArr[6]) {
                    //   resultNum = 7
                    // } else if (rand < prizeArr[7]) {
                    //   resultNum = 8
                    //随机数*100时
                } else if (rand < prizeArr[7]) {
                    resultNum = 8
                } else {
                    resultNum = 7
                }
                console.log('chance',resultNum)
                for (let i = 0; i < this.list.length; i++) {
                    if (resultNum == this.list[i].count) {
                        res = i+1
                    }
                }
                console.log('chance res',res)
                return res
            },
            randomNum: function (minNum, maxNum) {
                switch (arguments.length) {
                    case 1:
                        return parseInt(Math.random() * minNum + 1, 10)
                    // break
                    case 2:
                        return parseInt(Math.random() * (maxNum - minNum + 1) + minNum, 10)
                    // break
                    default:
                        return 0
                    // break
                }
            },
            conTinue: function () {
                this.men = false
                this.prize = 0
            },
            jumpWheel () {
                this.$router.push('/lucky')
            }
        }
    }
</script>

<style scoped>
    body,div,dl,dt,dd,ul,ol,li,h1,h2,h3,h4,h5,h6,pre,code,form,fieldset,legend,input,textarea,p,blockquote,th,td,hr,button,article,aside,details,figcaption,figure,footer,header,hgroup,menu,nav,section {
        margin:0;
        padding:0;
    }
    html{
        background: #f12416;
    }
    #page-nine{
        /*width: 100%;*/
        background-image: url("../../assets/lottery1/lottery_bg.png");
        background-size: 100% 100%;
        /*height: 100%;*/
        position: absolute;
        left: 0;
        top: 44px;
        right: 0;
        bottom: 0;
    }
    .lottery_title {
        width: 159px;
        height: 39px;
        top: 64px;
        position: absolute;
        left: 50%;
        transform: translateX(-50%);
    }
    .lottery_instr {
        border: 1px solid #FFFFFF;
        border-top-left-radius: 12px;
        border-bottom-left-radius: 12px;
        height: 24px;
        color: #FFFFFF;
        font-size: 12px;
        line-height: 24px;
        padding: 0px 12px;
    }
    .lottery_instr_top {
        margin-top: 7px;
    }
    .lottery_earn_top {
        margin-top: 14px;
    }
    .nine_container {
        margin-right: 44px;
        margin-left: 48px;
        background-image: url("../../assets/lottery1/lottery_nine_bg.png");
        background-size: 100% 100%;
        width: 291px;
        height: 309px;
        margin-top: 120px;
        position: relative;
    }
    .circle{
        position: absolute;
        display: block;
        border-radius: 50%;
        height: 7px;
        width: 7px;
    }
    .container-in{
        width: 245px;
        height: 243px;
        background-color: #880800;
        border-radius: 4px;
    }
    .hv_center {
        position: absolute;
        left: 0;
        right: 0;
        top: 0;
        bottom: 0;
        margin: auto;
    }
    .content_out {
        position: absolute;
    }
    .lottery_item {
        background-image: url('../../assets/lottery1/lottery_item_energy_bg.png');
        background-size: 100% 100%;
        border-radius: 4px;
        height: 100%;
    }
    .lottery_item_sel {
        background-image: url('../../assets/lottery1/lottery_item_energy_bg_sel.png');
        background-size: 100% 100%;
        border-radius: 4px;
        height: 100%;
    }
    .lottery_item_no_sel {
        background-image: url('../../assets/lottery1/lottery_item_no_bg_sel.png');
        background-size: 100% 100%;
        border-radius: 4px;
        height: 100%;
    }
    .lottery_item_no {
        background-image: url('../../assets/lottery1/lottery_item_no_bg.png');
        background-size: 100% 100%;
        border-radius: 4px;
        height: 100%;
    }
    .lottery_item_goods {
        background-size: 100% 100%;
        border-radius: 4px;
        height: 100%;
    }
    .item_bottom {
        position: absolute;
        bottom:0;
        background: #FF3C3A;
        border-radius: 10px;
        width:70px; height: 20px;
        font-family: PingFangSC-Medium;
        font-size: 11px;
        color: #FFFFFF;
        line-height: 20px;
        text-align: center;
        margin-bottom: 5px;
        left: 50%;
        transform: translateX(-50%);
    }
    .start_btn {
        background-image: linear-gradient(-36deg, #FF2424 0%, #FF8479 99%);
        border-radius: 4px;
        width: 73px;
        height: 73px;
        text-align: center;
    }
    .start_prize {
        font-family: PingFangSC-Medium;
        font-size: 28px;
        color: #FFFFFF;
        height: 60%;
        top:5px
    }
    .start_prize_tip {
        font-family: PingFangSC-Medium;
        font-size: 12px;
        color: #FFFFFF;
        height: 40%;
    }
    .start_prize_tip_small {
        font-family: PingFangSC-Medium;
        font-size: 10px;
        color: #FFFFFF;
        height: 40%;
    }
    .flex_center {
        display: flex;
        justify-content: center;
        align-items: center;
    }
    .prize{
        background: rgba(0,0,0,0.25);
        position: fixed;
        left: 0;
        top: 0;
        width: 100vw;
        height: 100vh;
        z-index: 1;
        display: -webkit-box;
        display: -webkit-flex;
        display: flex;
        -webkit-box-align: center;
        -ms-flex-align: center;
        -ms-grid-row-align: center;
        align-items: center;
        z-index: 100;
    }
    .prize-box{
        margin: 0 auto;
        position: relative;
        display: flex;
        align-items: center;
        flex-direction:column;
    }
    .prize-img{
        width:100vw;
        max-height: 231px;
        max-width: 375px;
    }
    .prize-img2{
        width:100vw;
        max-height: 120px;
        max-width: 375px;
    }
    .prize-msg{
        margin-top: -7px;
        width: 78.5vw;
        max-width: 294.5px;
        text-align: center;
        background:#ffffff;
        padding-bottom: 6px;
        font-size: 13pt;
    }
    .continue{
        width: 240px;
        height: 40px;
        margin: 28px auto;
        background: #ff5c5c;
        line-height: 40px;
        color: #ffffff;
        border-radius: 20px;
    }
    .men{
        position: fixed;
        width: 100vw;
        height: 100vh;
        z-index: 1;
        left: 0;
        top: 0;
    }
    .scroll-content {
        height: 50px;
        overflow: hidden;
    }

    .prize_list {
        height: 92px;
        margin: 22px 12px 0px 12px;
        background-color: #FFFFFF;
        border-radius: 10px;
        display: flex;
        align-items: center;
    }
    .prize_img {
        width: 135px;
        height: 65px;
        margin-left: 9px;
    }
    .prize_swipe {
        height: 50%;
        flex: 1;
        margin: 0 12px 0 7px;
    }
    .prize_swipe_item {
        display: flex;
        align-content: center;
    }
    .prize_swipe_item_content {
        margin: auto 12px;
        font-size: 13px;
        font-family: PingFangSC-Medium;
    }
</style>
