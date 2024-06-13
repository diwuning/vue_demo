<template>
    <div class="navBar_style">
        <!--  给子组件传值，如果传的固定的字符串，可以用title="一起来收能量",如果传的是已定义的变量，则属性前加:即:title="title"     -->
       <NavBar title="一起来收能量" :back="false">
           <template v-slot:right>
               <img src="../../assets/icon_share.png" align="right" height="20" width="20">
           </template>
       </NavBar>
    </div>
    <div class="container">
        <div class="main_container">
            <div class="total_score">
                <img src="./../../assets/icon_energy.png" class="totalImg">
                <span class="scoreLabel">能量</span>
                <span class="total_txt">{{ totalScore }}</span>
            </div>
            <div class="scoreDiv">
                <table v-for="(item,index) in ballList" :key="index" class="ball"
                       :style="{top:item.top+'px',left:item.left+'px',transition:'all 2s'}" v-show="item.status === 1">
                    <tr>
                        <td>
                            <span class="ball_small">
                              {{ item.score }}
                            </span>
                        </td>
                    </tr>
                    <tr>
                        <td>
                            <span class="ball_tip">{{item.title}}</span>
                        </td>
                    </tr>
                </table>
            </div>
        </div>
        <div class="btn_div">
            <img src="../../assets/icon_rules.png" class="left_rules"/>
            <img src="../../assets/icon_lottery.png" class="right_lottery" @click="jumpLottery"/>
            <img src="../../assets/icon_tasks.png" class="right_task animation" @click="jumpTask"/>
            <img src="" class="point animation"/>
        </div>
        <div class="shopList_div">
            <div class="shopList_title_container">
                <span class="shopList_title">能量兑换</span>
                <span class="shopList_title_tip">(不定时更新)</span>
                <span class="shopList_card">我的卡券</span>
                <img src="../../assets/icon_next.png" class="shopList_next">
            </div>
            <div class="shopList_content">
                <div class="shopList_item" v-for="(item,index) in shopList" :key="index">
                    <div :style="{marginRight:index%2==0?'5px':'15px',marginLeft:index%2!=0?'5px':'15px'}">
                        <div class="item_top">
                            <img :src="item.imgUrl" class="item_img"/>
                            <div class="item_tip">能量{{item.tip}}</div>
                        </div>
                        <div class="item_title single_ellipsis more_line">
                            {{item.name}}
                        </div>
                        <div class="mark_price">
                            {{item.markPrice}}
                        </div>
                        <div class="sale_price">{{item.salePrice}}
                            <span class="sale_label">折扣价</span>
                        </div>
                    </div>
                </div>
            </div>
            <div class="h_center_align">
                <text class="more_goods">更多商品</text>
            </div>
        </div>
    </div>
</template>

<script>
    import NavBar from "../components/NavBar";
    import product from '../assets/icon_product.png';
    export default {
        name: "Energy",
        components:{
            NavBar
        },
        data() {
            return {
                title:'收能量',
                totalScore: 120,
                ballList: [
                    {
                        top: 30, left: 40, title: '分享后领取', score: 10, status:1
                    },
                    {
                        top: 70, left: 80, title: '签到', score: 10, status:1
                    },
                    {
                        top: 90, left: 220, title: '执行云场景2', score: 5, status:1
                    },
                    {
                        top: 120, left: 300, title: '执行云场景3', score: 10, status:1
                    },
                    {
                        top: 120, left: 300, title: '执行云场景4', score: 20, status:1
                    }
                ],
                shopList: [
                    {name: '卡萨帝BCD-629WDSTU1十字对开变频智能干湿', imgUrl: product, salePrice: '￥14499.00', markPrice: '￥20499.00',tip:'20抵200'},
                    {name: '卡萨帝BCD-629WDSTU2十字对开变频智能干湿对开变频智能干湿', imgUrl: product, salePrice: '￥14699.00', markPrice: '￥21499.00',tip:'20抵200'},
                    // {name: '卡萨帝BCD-629WDSTU2十字对开变频智能干湿', imgUrl: product, salePrice: '￥14699.00', markPrice: '￥21499.00'}
                ]
            }
        },
        created() {
            console.log('availWidth',window.screen.pixelDepth);
            this.initEnergy()
        },
        methods:{
            initEnergy() {
                let list = []
                let screenWidth = window.screen.availWidth;
                let perWidth = screenWidth/(this.ballList.length+1);
                for(let i=0;i<this.ballList.length; i++) {
                    let listItem = this.ballList[i];
                    listItem.top = this.getRandom(45,210);
                    listItem.left = this.getRandom(i*perWidth,(i+1)*perWidth);
                    list.push(listItem);
                }
                this.ballList = list;
            },
            getRandom(min, max) {
                return Math.floor(Math.random() * (max - min + 1)) + min;
            },
            jumpLottery() {
                this.$router.push('/nineLottery')
                /*如果在router/index.js中配置path:'/nineLottery/:label',则可以直接通过path传参，用this.$route.params.label接收参数*/
                // this.$router.push('/nineLottery/九宫')

                //params传参只能用name匹配路由，用path的话，用this.$route.params.label为undefined
                // this.$router.push({name:'NineLottery',params:{label:'九宫格'}})

                /* query传参，name和path都可以，用this.$route.query.label方式取值*/
                // this.$router.push({path:'/nineLottery',query:{label:'九宫'}})
            },
            jumpTask() {
                this.$router.push('/tasks')
            }
        }
    }
</script>

<style scoped>
    .container {
        width: 100%;
        height: 100%;
        position: fixed; /*高度充满100% */
        background-image: url("./../assets/bg_energy.png");
        background-size: 100% 100%;
        padding-bottom: 20px;
        overflow-x: hidden;
        overflow-y: scroll;
    }
    .main_container {
        position: relative;
        width: 100%;
        height: 270px;
    }
    .total_score {
        height: 32px;
        min-width: 92px;
        border-top-left-radius: 100px;
        border-bottom-left-radius: 100px;
        background: rgba(255,255,255,0.5);
        float: right;
        right: 0px;
        margin-top: 20px;
        box-shadow: 0 2px 4px 0 rgba(165,165,165,0.50);
        display: flex;
        align-items: center;
    }
    .totalImg {
        height: 32px;
        width: 30px;
        margin-left: 1px;
        margin-top: 4px;
    }
    .total_txt {
        font-size: 18px;
        font-family: DINAlternate-Bold;
        color: #FF8100;
        margin-left: 2px;
        /*行内元素 左右margin有效*/
        /*margin: 0 auto;*/
        margin-right: 10px;
    }
    .scoreLabel {
        font-size: 15px;
        margin-left: 6px;
        font-family: PingFangSC-Regular;
        color: #FF8100;
    }
    .scoreDiv {
        /*left: 10px;*/
        /*right: 16px;*/
        /*display: inline-flex;*/
        /*position: absolute;*/
        width: 100%;
        height: 270px;
    }
    .ball {
        animation: heart 1.5s ease-in-out 2.5s infinite alternate;
        position: absolute;
        -webkit-tap-highlight-color:rgba(0,0,0,0);
    }
    @keyframes heart {
        from{transform:translate(0,0)}
        to{transform:translate(0,8px)}
    }
    .ball_small {
        width: 42px;
        height: 42px;
        border-radius: 50%;
        background-image: linear-gradient(180deg, #FCEC02 0%, #FF7C1F 100%);
        box-shadow: 0 2px 8px 0 rgba(255,176,0,0.60), inset 0 0 6px 1px rgba(255,255,255,0.20);
        position: absolute;
        display: flex;
        align-items: center;
        justify-content: center;
        z-index: 1;
        font-family: DINAlternate-Bold;
        font-size: 20px;
        color: #FFFFFF;
        text-shadow: 0 2px 4px rgba(228,115,5,0.80);
        float: left;
        left: 50%;
        transform: translate(-50%,0%);
    }
    .ball_tip {
        position: relative;
        color: #FF8100;
        text-align: center;
        /*margin-top: 4px;*/
        top: 42px;
        display: block;
        font-size: 12px;
        width: 82px;
        font-family: PingFangSC-Regular;
        letter-spacing: 0.03px;
    }
    .btn_div {
        height: 68px;
        padding-top: 44px;
    }
    .left_rules {
        width: 38px;
        height: 48px;
        float: left;
        margin-left: 12px;
    }
    .right_lottery {
        width: 50px;
        height: 50px;
        position: absolute;
        right: 62px;
    }
    .right_task {
        width: 38px;
        height: 48px;
        position: absolute;
        right: 12px;
    }
    .point {
        width: 10px;
        height: 10px;
        background-color: red;
        border-radius: 10px;
        border: 1px solid #FFFFFF;
        position: absolute;
        right: 12px;
    }
    .animation {
        animation: bounce-up 3s linear infinite;
        -webkit-animation: bounce-up 3s linear infinite;
    }
    @keyframes bounce-up {
        25% {transform: translateY(5px)}
        50%,100% {transform: translateY(0)}
        75% {transform: translateY(-5px)}
    }
    @-webkit-keyframes bounce-up {
        25% {-webkit-transform: translateY(5px);}
        50%, 100% {-webkit-transform: translateY(0);}
        75% {-webkit-transform: translateY(-5px);}
    }
    .shopList_div {
        margin: 0px 12px 20px 12px;
        background-color: #FFFFFF;
        border-radius: 10px;
        height: 377px;
    }
    .shopList_title_container {
        padding: 14px 15px 12px 15px;
        display: flex;
        align-items: center;
    }
    .shopList_title {
        font-family: PingFangSC-Medium;
        font-size: 17px;
        color: #333333;
        position: relative;
    }
    .shopList_title_tip {
        font-family: PingFangSC-Regular;
        font-size: 14px;
        color: #999999;
        margin-left: 10px;
    }
    .shopList_card {
        font-family: PingFangSC-Regular;
        font-size: 14px;
        color: #999999;
        text-align: center;
        position: absolute;
        float: right;
        right: 45px;
    }
    .shopList_next {
        position: absolute;
        float: right;
        right: 30px;
        width: 8px;
        height: 12px;
    }
    .shopList_content {
        display: flex;
        /*justify-content: space-between;*/
        /*不加此属性，列表中所有项显示在一行。加了之后，才分行显示*/
        flex-wrap: wrap;
    }
    .shopList_item {
        width: 50%;
        /*position: relative;*/
    }
    .item_top {
        position: relative;
        /*组件内部有浮动元素，引起父组件高度塌陷问题，浮动元素与下方组件重叠，
          解决方法：给父组件设置高度或overflow:hidden;
          父组件添加伪元素:after,其中设置clear:both;content:'';display:block三个属性缺一不可;
          浮动元素后加空元素clear:both*/
        overflow: hidden;
    }
    .item_img {
        height: 156px;
        width: 100%;
        border-radius: 4px;
        float: left;
    }
    .item_title {
        font-family: PingFangSC-Medium;
        font-size: 12px;
        color: #333333;
        letter-spacing: 0.14px;
        line-height: 17px;
        margin-top: 12px;
        text-align: left;
    }
    .single_ellipsis {
        overflow: hidden;
        text-overflow: ellipsis;
        /*单行显示省略号时需要white-space: nowrap;*/
        /*white-space: nowrap;*/
    }
    .more_line {
        display: -webkit-box;
        -webkit-box-orient: vertical;
        -webkit-line-clamp: 2;
        display: -moz-box;
        -moz-line-clamp: 2;
        -moz-box-orient: vertical;
    }
    .mark_price {
        font-family: PingFangSC-Regular;
        font-size: 10px;
        color: #BBBBBB;
        line-height: 14px;
        margin-top: 8px;
        text-align: left;
        /*删除线*/
        text-decoration: line-through;
    }
    .sale_price {
        font-family: DINAlternate-Bold;
        font-size: 14px;
        color: #EC2854;
        letter-spacing: 0.14px;
        line-height: 19px;
        text-align: left;
    }
    .sale_label {
        font-family: PingFangSC-Regular;
        font-size: 11px;
        color: #EC2854;
        letter-spacing: 0.13px;
    }
    .more_goods {
        margin-top: 20px;
        border: 1px solid #2283E2;
        border-radius: 22px;
        width: 200px;
        display: inline-block;
        height: 44px;
        line-height: 44px;
        color: #2283E2;
        margin-bottom: 20px;
    }
    .h_center_align {
        text-align: center;
    }
    .item_tip {
        background-image: linear-gradient(0deg, #FF7C1F 0%, #ffb000 100%);
        box-shadow: 0 2px 8px 0 #BABABA, inset 0 0 6px 1px rgba(255,255,255,0.20);
        border-radius: 0px 100px 100px 0px;
        position: absolute;
        padding: 4px 12px 4px 8px;

        font-family: PingFangSC;
        font-size: 12px;
        color: #FFFFFF;
        line-height: 17px;
        letter-spacing: 0.14px;
        text-shadow: 0 2px 4px #ffb000;
        z-index: 100;
    }
</style>
