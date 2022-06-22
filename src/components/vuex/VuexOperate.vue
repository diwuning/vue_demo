<template>
    <div>
        <!-- 直接取值 或 使用映射后的值-->
        <div>原值：{{$store.state.count}} 或 {{count}}</div>
        <div>姓名：{{$store.state.name}} 或 {{newName}}</div>
        <div>第二种：{{$store.state.secondName}}</div>
        <div>
            getters
            <div>
                <div>总数：{{$store.getters.countNum}}</div>
                <div>mapGetters: {{getSecondName('name')}}</div>
                <div>use getters: {{useOtherGetter}}</div>
                <div>use getters and params: {{useOtherGetterParams('Tom')}}</div>
            </div>
        </div>
        <div>
            mutations
            <div>修改后的名字：{{newName}}</div>
            <div>修改otherParams的值：{{otherParams}}</div>
            <div v-color="msgColor">新增的参数：{{$store.state.weight}}</div>
        </div>
        <div>
            actions
            <div>
                <button @click="actionAddCount">增加</button>
                <input v-model="inputValue" placeholder="多行文本输入……" v-focus/>
<!--                <textarea v-model="message2" placeholder="多行文本输入……" v-focus></textarea>-->
            </div>
        </div>
    </div>
</template>

<script>
    import {mapState, mapGetters,mapMutations,mapActions} from 'vuex'
    export default {
        name: "VuexOperate",
        data() {
            return {
                msgColor:'red',
                inputValue:''
            }
        },
        computed: {
            ...mapState({
                // mapState默认会把state当第一个参数传进来
                newName:state=>state.name,
                count:'count' // 传字符串的方式等同于state => state.count
            }),
            ...mapState([
                "secondCount",
                "secondName",
                "otherParams"
            ]),
            ...mapGetters([
                "getSecondName",
                "useOtherGetter",
                "useOtherGetterParams"
            ])
        },
        mounted() {
            // 直接取值
            console.log('',this.$store.state.count)
            console.log('',this.$store.getters.getSecondName('name')+'====='+this.getSecondName('nameTwo'))
            //调用mutations
            this.$store.commit('edit')
            this.$store.commit('addProperty',{age:14, sex:'女'}) //此方法输出的otherParams的值为{age:14, sex:'女'}
            setTimeout(this.$store.commit({ //此方法输出的otherParams的值为{ "type": "addProperty", "payload": { "length": 170 } }
                type:'addProperty',
                payload:{length:170}
            }),1000)
            this.add('80kg') //直接调用映射的函数，添加的state，可在页面中直接调用
            //调用actions
            this.useActions()
        },
        methods:{
            ...mapMutations([
                "add"
            ]),
            ...mapActions([
                "asyncAdd",
                "actionAddCount"
            ]),
            useActions() {
                this.$store.dispatch('asyncAddProperty',{color:'red'})
                this.asyncAdd('90KG')
                // this.actionAddCount().then(res => {
                //     console.log('actionAddCount',res)
                // }).catch(error=> {
                //     console.log('actionAddCount error',error)
                // })

            }
        },
        directives: {
            color: {
                inserted: function (el,binding) {
                    console.log('v-color',binding)
                    el.style.color = binding.value
                }
            },
            // focus: {
            //     inserted:function (el) {
            //         el.focus()
            //     }
            // }
        }
    }
</script>

<style scoped>

</style>