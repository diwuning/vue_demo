<template>
  <div id="page">
    <div class="pond-head" v-on:click="init">
      <img src="../../assets/pond-head.png" alt="">
    </div>
    <CProgress></CProgress>
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
    <button style="padding: 10px 30px 10px 30px; border: 1px solid #ff5c5c; color: #ff5c5c; font-size: 15px; margin-top: 20px" v-on:click="jumpWheel()">转盘抽奖</button>
    <button style="padding: 10px 30px 10px 30px; border: 1px solid #ff5c5c; color: #ff5c5c; font-size: 15px; margin-top: 20px; margin-left: 10px" v-on:click="jumpEnergy()">能量抽奖</button>
  </div>
</template>
<script>
import product from '../../assets/djj.jpg'
import CProgress from "../progress/CProgress";
export default {
  name: 'Nine',
  components: {
    CProgress
  },
  data () {
    return {
      list: [
        { id: 1, type: 1, name: '十元代金卷', image_url: product },
        { id: 2, type: 2, name: '谢谢参与', image_url: product },
        { id: 3, type: 1, name: '笔记本电脑', image_url: product },
        { id: 4, type: 1, name: '20元优惠券', image_url: product },
        { id: 5, type: 1, name: '500积分', image_url: product },
        { id: 6, type: 1, name: '100元现金', image_url: product },
        { id: 7, type: 1, name: '健身卡一张', image_url: product },
        { id: 8, type: 2, name: '谢谢参与', image_url: product }
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
      men: false
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
        ts.lottert = ts.randomNum(1, 8)
        // ts.lottert = 4
      // }, 2e3)
      }, 10000)
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
    },
    jumpEnergy () {
      this.$router.push('/ninelottery')
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
  #page{
    width: 100%;
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
    line-height: 77px;
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
</style>
