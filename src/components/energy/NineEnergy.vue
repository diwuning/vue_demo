<template>
  <div id="page-nine">
    <div class="pond-head" v-on:click="init"  style="display:none">
      <img src="../../assets/pond-head.png" alt="">
    </div>
    <CProgress style="display:none"></CProgress>
    <div style="height: 75px;display: flex;align-items: center; width: 100%">
      <span style="flex: 1000; font-size: 18px">福利抽奖</span>
      <button id="downloadButton">安装</button>
      <div style="float: right;margin-right: 20px; ">
        <button style="width: 80px; border: 1px solid #ff5c5c; color: #ff5c5c; padding: 6px; font-size: 3.2vw">抽奖说明</button><br/>
        <button style="width: 80px; margin-top: 8px; border: 1px solid #ff5c5c; color: #ff5c5c;padding: 6px">我的奖品</button>
      </div>
    </div>
    <div class="container-out">
      <div class="container-in">
        <!--   九宫格的每一格     -->
        <div class="content-out" v-for="(box,index) in list" :key="index"
             :style="{left:box.left+'px',top:box.top+'px','background-color':index==indexSelect?colorAwardSelect:colorAwardDefault}">
          <img class="pond-name-img" :src="box.image_url" alt="">
          <div class="pond-name">{{box.name}}</div>
        </div>
      </div>
      <div class="start-btn" v-on:click="startBtn">
        <img src="../../assets/pond-button.png" style="height:80px;width:100%;" alt="">
        <img src="../../assets/pond-cj.png" :style="{'top':btntop+'px'}"
             style="position:absolute;left:5px;height:68px;width:89px;top:0;" alt="">
      </div>
<!--      <div class="start-btn" v-on:click="startBtn">-->
<!--        <div style="position: relative; background-color: #c62015; border-radius: 8px; height: 70%; display: flex; justify-content: center; align-items: center; color: #ffffff">立即抽奖</div>-->
<!--        <div style="position: relative; height: 30%; display: flex; justify-content: center; align-items: center;color:#000000; font-weight: normal; font-size: 12px">消耗0能量</div>-->
<!--      </div>-->
      <!--   九宫格周围类似灯的圆点     -->
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
    <div style="margin: 20px;">
      <button style="padding: 10px 30px 10px 30px; border: 1px solid #ff5c5c; color: #ff5c5c; font-size: 15px; float: left; margin-right: 10px">获奖名单</button>
      <vue-seamless-scroll
              :data="list"
              :class-option="classOption"
              class="scroll-content">
        <ul>
          <li v-for="(item,index) in list"
              :key="index" style="height: 50px; display: flex;">
            <div  style="position: relative; align-self: center;">
              <span class="header_login" slot="right" v-show="item.type != 2">恭喜**获得</span>
              {{item.name}}
            </div>
          </li>
        </ul>
      </vue-seamless-scroll>
    </div>

  </div>
</template>
<script type="text/javascript" charset="UTF-8" src="https://web.cdn.openinstall.io/openinstall.js"></script>
<script>
import product from '../../assets/djj.jpg'
import CProgress from "../progress/CProgress";
// import OpenInstall from './../../util/openinstall'
export default {
  name: 'Nine',
  components: {
    CProgress
  },
  data () {
    return {
      list: [
        { id: 1, type: 1, name: '20个能量', image_url: product,count:8 },
        { id: 2, type: 2, name: '谢谢参与', image_url: product,count:7},
        { id: 3, type: 3, name: '泡沫洗手机', image_url: product,count:1 },
        { id: 4, type: 1, name: '50个能量', image_url: product,count:6 },
        { id: 5, type: 3, name: '毛巾礼盒', image_url: product,count:2 },
        { id: 6, type: 1, name: '80个能量', image_url: product,count:5 },
        { id: 7, type: 3, name: '感应小夜灯', image_url: product,count:3 },
        { id: 8, type: 1, name: '100个能量', image_url: product,count:4 }
      ],
      circleList: [],
      colorCircleFirst: '#F12416',
      colorCircleSecond: '#FFFFFF',
      colorAwardDefault: '#F5F0FC',
      colorAwardSelect: '#ffe400',
      btntop: 0, // 按钮的样式
      time: '', // 定时器
      indexSelect: 0, // 奖品下标
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
  mounted() {
    this.initJump()
  },
  methods: {
    initJump() {
      var data = OpenInstall.parseUrlParams();///openinstall.js中提供的工具函数，解析url中的所有查询参数
      new OpenInstall({
        /*appKey必选参数，openinstall平台为每个应用分配的ID*/
        appKey : "vghhgm",
        /*自定义遮罩的html*/
        //mask:function(){
        //  return "<div id='_shadow' style='position:fixed;left:0;top:0;background:rgba(0,255,0,0.5);filter:alpha(opacity=50);width:100%;height:100%;z-index:10000;'></div>"
        //},
        /*OpenInstall初始化完成的回调函数，可选*/
        onready : function() {
          /*在app已安装的情况尝试拉起app*/
          this.schemeWakeup();
          console.log('openInstall','11111111111111111111')
          /*用户点击某个按钮时(假定按钮id为downloadButton)，安装app*/
          var m = this, button = document.getElementById("downloadButton");
          button.onclick = function() {
            m.wakeupOrInstall();
            return true;
          }
        }
      }, data);
    },
    init: function () {
      var ts = this
      var list = this.list
      var left = 9
      var top = 9

      for (var i = 0; i < 8; i++) {
        if (i === 0) {
          left = 9
          top = 9
        } else if (i < 3 && i !== 0) {
          top = top + 0
          left = left + 98 + 4
        } else if (i >= 3 && i < 5) {
          left = left + 0
          top = top + 79 + 4
        } else if (i >= 5 && i < 7) {
          left = left - 98 - 4
          top = top + 0
        } else if (i >= 7 && i < 8) {
          left = left + 0
          top = top - 79 - 4
        }
        list[i].top = top
        list[i].left = left
      }
      this.list = list
      var cleft = 4 // e
      var ctop = 4 // a
      var dian = []
      for (var j = 0; j < 24; j++) {
        if (j === 0) {
          cleft = 4
          ctop = 4
        } else if (j < 6) {
          ctop = 2
          cleft += 55
        } else if (j === 6) {
          ctop = 2
          cleft = 330
        } else if (j < 12) {
          ctop += 46
          cleft = 331.5
        } else if (j === 12) {
          ctop = 272.5
          cleft = 330
        } else if (j < 18) {
          ctop = 275
          cleft -= 55
        } else if (j === 18) {
          ctop = 273
          cleft = 5
        } else {
          if (!(j < 24)) return
          ctop -= 46
          cleft = 2.5
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
      }, 10000)
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
    width: 100%;
    /*background-image: url("./../../assets/bg2.png");*/
    background-size: 100% 100%;
    height: 100%;
  }

  .pond-head img{
    width: 100%;
    height: 215px;
  }
  .container-out{
    height: 283px;
    width: 340px;
    background-color: #F47915;
    margin: 16px auto 15px auto;
    border-radius: 8px;
    position: relative;
  }
  .circle{
    position: absolute;
    display: block;
    border-radius: 50%;
    height: 7px;
    width: 7px;
  }
  .content-out{
    position: absolute;
    height: 72px;
    width: 98px;
    background-color: #f5f0fc;
    border-radius: 8px;
    box-shadow: 0 8px 0 #FFCEC0;
  }
  .container-in{
    width: 320px;
    height: 263px;
    background-color: #f12416;
    border-radius: 10px;
    position: absolute;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    margin: auto;
  }
  .pond-name-img{
    position: absolute;
    top: 6px;
    left: 0;
    width: 100%;
    height: 46px;
    z-index: 1;
  }
  .pond-name{
    position: absolute;
    top: 75%;
    color: #c62015;
    width: 98px;
    overflow: hidden;
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 1;
    font-size: 9pt;
    text-align: center;
  }
  .start-btn{
    position: absolute;
    margin: auto;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
    border-radius: 8px;
    height: 79px;
    width: 98px;
    color: #f6251e;
    text-align: center;
    font-weight: bolder;
    /*line-height: 77px;*/
    /*background-image: url("../../assets/pond-button.png");*/
    background-color: #FFCEC0;
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
  .prize_name{
    overflow: hidden;
    text-overflow:ellipsis;
    white-space: nowrap;
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
</style>
