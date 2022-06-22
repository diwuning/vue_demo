<template>
  <div>
    <div>
        {{totalArr}}
    </div>
      <div>
          ======={{chongArr}}
      </div>
      <div>
          扩展运算符用法：
          <div @click="concatArr">numArr:{{numArr}}; arr1:{{arr1}},合并数组：{{resultArr}}</div>
      </div>
      <div>
          typeScript练习
          <input v-model.number="inputValue1" />+
          <input v-model.number="inputValue2" v-on:blur="typeScriptTest(inputValue1,inputValue2)"/>=
          <input :value="resultNum"/>
      </div>
      <div>
          闭包
          <div id="bibaoId">闭包</div>
      </div>
  </div>
</template>

<script>
    export default {
        name: "jsOperate",
        data() {
            return {
                totalArr:['a','b','c','d','e','h'],
                chongArr:['a','b','c','a','d'],
                numArr:[1,2,3,4,5,6],
                numStr:['1','5','9','2','0'],
                arr1: [3, 4],
                resultArr:[],
                inputValue1:0,
                inputValue2:0,
                resultNum:0
            }
        },
        created() {
            this.addArr();
            this.evalTest()
            this.bibaoTest()
        },
        methods: {
            addArr() {
                let newValue = this.totalArr.push('s')
                console.log('addArr',newValue) //返回新数组的个数
                console.log('addArr totalArr',this.totalArr) //[ "a", "b", "c", "d", "e", "h", "s" ]
                let touValue = this.chongArr.unshift('s')
                console.log('addArr',touValue) //返回新数组的个数
                console.log('addArr chongArr',this.chongArr) //[ "s", "a", "b", "c", "a", "d" ]
                console.log('addArr',this.totalArr.shift()) //a
                console.log('addArr',this.totalArr.pop()) //s
            },
            concatArr() {
                this.resultArr = [5,this.arr1];//[ 5, [ 3, 4 ] ]
                this.resultArr = [5,...this.arr1]; //[ 5, 3, 4 ]
                //用扩展运算符代替concat赋值
                let ary1 = [1,2,3];
                let ary2 = [3,4,5];
                let ary = ary1.concat(ary2);
                console.log('ary',ary); //[ 1, 2, 3, 3, 4, 5 ]
                console.log('ary1',ary1) //[ 1, 2, 3 ]

                let ary3 = [...ary1,...ary2];
                console.log('ary3',ary3) //[ 1, 2, 3, 3, 4, 5 ]

                let ary4 = ary1.push(...ary2);
                console.log('ary4',ary4)  //6
                console.log('ary1',ary1) //[ 1, 2, 3, 3, 4, 5 ]

                //扩展运算符可以与解构赋值结合起来，生成数组
                //JS对于传入参数的数量没有限制，如果传入参数过多，函数会自动将多余的参数舍弃，如果传入的参数少于定义传参数量，调用的函数会返回NaN。JS引入了rest参数，可以处理过多传入的参数
                const [first,...rest] = [1,2,3,4,5];
                console.log('first',first) //1
                console.log('rest',rest) //[ 2, 3, 4, 5 ]

                //Math
                console.log('Math',Math.max(100, 3, 4)) //100
                //在没有扩展运算符，在数组上使用Math.max()最容易方法就是使用.apply()。
                var arr = [2, 4, 8, 6, 0];
                function max(arr) {
                    return Math.max.apply(null, arr);
                }
                console.log('apply',max(arr)); //8
                //使用扩展运算符
                var max1 = Math.max(...arr);
                console.log('...',max1);//8

                console.log('numStr',Math.max(...this.numStr)); //9

                let strArr = ['h','e','s','a','c']
                console.log('strArr',Math.max(...strArr));//NaN

                let oDivs = document.getElementsByTagName('div');//获取页面中所有的div标签
                console.log('伪数组',oDivs); //HTMLCollection { 0: div#app, 1: div, 2: div, 3: div, 4: div, 5: div, length: 6, … }
                let oDivs1 = [...oDivs];//将伪数组转换为真正的数组
                console.log('伪数组 扩展',oDivs1); //[ div#app, div, div, div, div, div ]
                let oDivs2 =  Array.prototype.slice.call(oDivs);
                console.log('伪数组 prototype',oDivs2);
                console.log('转换后的数组操作',oDivs2.pop()) //如果直接用oDivs.pop()会报错，执行不下去了

                //字符串转数组
                let str = "hello";
                let chars = [...str];
                console.log(chars); //[ "h", "e", "l", "l", "o" ]
                let splitArr = str.split('')
                console.log('split',splitArr) //[ "h", "e", "l", "l", "o" ]

            },
            evalTest() {
                console.log('eval',eval('var x=1')); //undefined

                console.log('eval====2',eval('{a:2}'))  //2
                /*
                * typeScriptTest 3
                  eval====3 undefined
                * */
                console.log('eval====3',eval('this.typeScriptTest(1,2)'))
            },
            bibaoTest() {
                //可能为引起内存泄漏的代码
                // window.onload = function () {
                //     var el = document.getElementById('bibaoId');
                //     el.onclick = function () {
                //         alert(el.id)
                //     }
                // }
                //解决方法
                window.onload = function () {
                    var el = document.getElementById('bibaoId');
                    var id = el.id; //解除循环引用
                    el.onclick = function () {
                        alert(id)
                    }
                    el = null;  //将闭包引用的外部函数的变量清除
                }
                //柯里化函数
                //普通函数
                // function getArea(w,h){
                //     return w * h;
                // }
                // const area1 = getArea(10,20); //200
                // const area2 = getArea(10,30);  //300
                // const area3 = getArea(10,40);  //400

                //柯里化函数
                function getArea(w){
                    return function(h){
                        return w * h;
                    }
                }
                const getTenArea = getArea(10);

                const area1 = getTenArea(20);
                const area2 = getTenArea(30);
                const area3 = getTenArea(40);

                const getComonArea = function (x) {
                    return (num) => {
                        return x*num;
                    }
                }
                const commonArea1 = getComonArea(10)
                const res1 = commonArea1(200);
                console.log('res1',res1) //2000

                console.log('area1',area1) //200
                console.log('area2',area2) //300
                console.log('area3',area3) //400

            },
            typeScriptTest(value1,value2) {
                const plus = (x,y) => {
                    if(typeof x === 'number' && typeof y === 'number') {
                        return x+y
                    }
                    return new Error('请输入数字')
                };
                this.resultNum = plus(value1,value2);
                console.log('typeScriptTest',this.resultNum)
            }
        }
    }
</script>

<style scoped>

</style>