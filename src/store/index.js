import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)

const index = new Vuex.Store({
    state:{
        name:'hello Vuex',
        count:0,
        secondName:'second',
        secondCount:0,
        otherParams:''
    },
    getters:{
        countNum(state) {
            return state.count + '个'
        },
        getSecondName(state) {
            return (params) => {
                return '第二个名字是'+state.secondName+','+params
            }

        },
        useOtherGetter(state,getters) {
            return state.name+','+getters.countNum
        },
        useOtherGetterParams (state,getters) {
            return (name) => {
                return state.secondName+','+getters.getSecondName(name)
            }
        }
    },
    mutations:{
        edit(state) {
            state.name = 'Hello Jack'
        },
        addProperty(state,payload) {
            state.name='hello Rose'
            state.otherParams = payload
        },
        add(state,weight) {
            Vue.set(state,'weight',weight)
        },
        addCount(state) {
            return state.count++
        }
    },
    actions: {
        asyncAddProperty(context, payload) {
            setTimeout(()=> {
                context.commit('addProperty',payload)
            },2000);
        },
        asyncAdd(context,payload) {
            setTimeout(()=> {
                context.commit('add',payload)
            },2000)
        },
        actionAddCount(context) {
            return new Promise(((resolve, reject) => {
                setTimeout(()=>{
                    context.commit('addCount')
                    resolve()
                },2000)
                console.log(reject)
            }))
        }
    }
})
export default index