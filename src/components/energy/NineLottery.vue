<template>
    <div>
        <NavBar title="九宫格抽奖" :back="true"></NavBar>
        <div class="lottery_container">
            <div style="float: right; right: 0">
                <div class="lottery_instr lottery_instr_top">抽奖说明</div>
                <div class="lottery_instr lottery_earn_top">我的奖品</div>
            </div>
            <img src="../assets/lottery/lottery_title.png" class="lottery_title"/>
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
                <div class="start_btn hv_center" @click="startPrize">
                    <div class="start_prize flex_center">抽奖</div>
                    <div class="start_prize_tip flex_center" v-if="count<2">消耗{{count*100}}能量</div>
                    <div class="start_prize_tip_small flex_center" v-if="count>=2">抽奖次数用完了</div>
                </div>
                <!-- 九宫格周围类似灯的圆点-->
                <div class="circle" v-for="(item,index) in circleList" :key="index"
                     :style="{'top':item.topCircle+'px','left':item.leftCircle+'px','background-color':index%2==0?colorCircleFirst:colorCircleSecond}">
                </div>
            </div>

            <div class="prize" v-show="prize==1&&num != 0">
                <div class="prize-box">
                    <img class="prize-img" src="../assets/lottery/pond-success.png" alt="">
                    <div class="prize-msg">
                        <div>恭喜</div>
                        <div>抽中{{prize_name}}</div>
                        <div v-show="prize_type==2" style="font-size: 12px; display: flex; justify-content: center" @click="jumpActivity()">请到我的奖品页面进行兑换 <img style="width: 15px; height: 15px; margin-left: 3px" src="./../assets/lottery/icon_hand.png"></div>
                        <div class="continue" v-on:click="conTinue">继续抽奖</div>
                    </div>
                </div>
            </div>
            <div class="prize" v-show="prize==2">
                <div class="prize-box">
                    <img class="prize-img2" src="../assets/lottery/pond-empty.png" alt="">
                    <div class="prize-msg">
                        <div>谢谢参与</div>
                        <div>再换个姿势抽奖</div>
                        <div class="continue" v-on:click="conTinue">继续抽奖</div>
                    </div>
                </div>
            </div>

            <div class="prize_list">
                <img src="../assets/lottery/icon_prize.png" class="prize_img"/>
                <van-swipe :autoplay="3000" :show-indicators="false" vertical class="prize_swipe">
                    <van-swipe-item class="prize_swipe_item" v-for="(item,index) in prizeList" :key="index">
                        <div class="prize_swipe_item_content">{{item.userName}}获得了{{item.prizeName}}</div>
                    </van-swipe-item>
                </van-swipe>
            </div>
        </div>
    </div>
</template>

<script>
    import NavBar from "../components/NavBar";
    import product from '../assets/lottery/lottery_item_goods_bg.png'
    import selProduct from '../assets/lottery/lottery_item_goods_bg_sel.png'
    import { Swipe, SwipeItem } from 'vant';
    export default {
        name: "NineLottery",
        components:{
            NavBar,
            [Swipe.name]:Swipe,
            [SwipeItem.name]:SwipeItem
        },
        data() {
            return {
                list: [
                    { id: 1, type: 1, name: '20能量', image_url: product,selImg:selProduct,count:8 },
                    { id: 2, type: 2, name: '谢谢参与', image_url: product,count:7},
                    { id: 3, type: 3, name: '泡沫洗手机', image_url: product,selImg:selProduct,count:1 },
                    { id: 4, type: 1, name: '50能量', image_url: product,count:6 },
                    { id: 5, type: 3, name: '毛巾礼盒', image_url: product,selImg:selProduct,count:2 },
                    { id: 6, type: 1, name: '80能量', image_url: product,count:5 },
                    { id: 7, type: 3, name: '感应小夜灯', image_url: product,selImg:selProduct,count:3 },
                    { id: 8, type: 1, name: '100能量', image_url: product,count:4 }
                ],
                circleList: [],
                colorCircleFirst:'#FCE584',
                colorCircleSecond: '#FFFFFF',
                indexSelect: 0, // 奖品下标
                count:0,
                prizeList:[
                    {id:0, userName:'张三',prizeName:'10能量'},
                    {id:1, userName:'李四',prizeName:'20能量'},
                ],
                lottert: 0, // 中奖下标
                men:false,
                prize:0,//是否中奖
                prize_name:'',
                prize_type:0,
                num: 0,
            }
        },
        created() {
            console.log('Nine created',this.$route.params.label+','+this.$route.query.label)
            this.init()
        },
        methods:{
            initPrizeList() {

            },
            init: function () {
                let ts = this;
                let list = this.list;
                let left = 9;
                let top = 9;
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
                //点
                let cleft = 4
                let ctop = 4
                let dian = []
                for(let j = 0; j<24; j++) {
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
                        topCircle:ctop,
                        leftCircle: cleft
                    })
                    this.circleList = dian
                    setInterval(function () {
                        if(ts.colorCircleFirst === '#FFFFFF') {
                            ts.colorCircleFirst='#FCE584'
                            ts.colorCircleSecond = '#FFFFFF'
                        } else {
                            ts.colorCircleFirst='#FFFFFF'
                            ts.colorCircleSecond = '#FCE584'
                        }
                    },900)
                }
            },
            startPrize() {
                this.men = true;
                this.lottert = 0;
                let ts = this;
                let i=this.indexSelect;
                let list = this.list;
                let time = null;
                let s = 0;

                time = setInterval(function () {
                    i++
                    i %= 8
                    s += 30
                    ts.indexSelect = i
                    if(ts.lottert > 0 && i+1 === ts.lottert) {
                        clearInterval(time)
                        if(list[i].type === 2) {
                            ts.prize = 2
                        } else {
                            ts.prize_name = list[i].name
                            ts.prize_type = list[i].type
                            ts.prize = 1
                            let startIndex = ts.prize_name.indexOf('能量')
                            if(startIndex != -1) {
                                let energyNum = ts.prize_name.substring(0,startIndex)
                                console.log('个数', energyNum+','+startIndex)
                                //奖品为能量时，添加能量
                                localStorage.setItem('energyNum',energyNum)
                            }
                        }
                    }
                },200+s)
                // let startTime = ts.randomNum(0,3000)
                clearInterval(ts.timer4)
                ts.timer4 = setTimeout(function () {
                    ts.lottert = ts.randomNum(0,8)
                    ts.num = ts.lottert
                },5000)
            },
            randomNum: function (minNum, maxNum) {
                switch (arguments.length) {
                    case 1:
                        return parseInt(Math.random()*minNum+1, 10)
                    case 2:
                        return parseInt(Math.random()*(maxNum-minNum+1)+minNum, 10)
                    default:
                        return 0
                }
            },
            conTinue: function () {
                this.men = false
                this.prize = 0
                this.num = 0
            },
        },
    }
</script>

<style scoped>
.lottery_container {
    background-image: url("../assets/lottery/lottery_bg.png");
    background-size: 100% 100%;
    /*position: fixed;*/
    /*height: 100%;*/
    /*width: 100%;*/
    /*高度充满全屏方法二*/
    position: absolute;
    left: 0;
    top: 44px;
    right: 0;
    bottom: 0;
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
    .lottery_title {
        width: 159px;
        height: 39px;
        top: 64px;
        position: absolute;
        left: 50%;
        transform: translateX(-50%);
    }
    .nine_container {
        margin-right: 44px;
        margin-left: 48px;
        background-image: url("../assets/lottery/lottery_nine_bg.png");
        background-size: 100% 100%;
        width: 291px;
        height: 309px;
        margin-top: 120px;
        position: relative;
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
        background-image: url('../assets/lottery/lottery_item_energy_bg.png');
        background-size: 100% 100%;
        border-radius: 4px;
        height: 100%;
    }
    .lottery_item_sel {
        background-image: url('../assets/lottery/lottery_item_energy_bg_sel.png');
        background-size: 100% 100%;
        border-radius: 4px;
        height: 100%;
    }
    .lottery_item_no_sel {
        background-image: url('../assets/lottery/lottery_item_no_bg_sel.png');
        background-size: 100% 100%;
        border-radius: 4px;
        height: 100%;
    }
    .lottery_item_no {
        background-image: url('../assets/lottery/lottery_item_no_bg.png');
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
    .circle {
        position: absolute;
        border-radius: 50%;
        height: 7px;
        width: 7px;
        display: block;
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
        font-size: 15px;
        font-family: PingFangSC-Medium;
    }
/* 成功或失败的弹窗*/
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
</style>