<template>
    <div>
        <NavBar title="网络请求" :back="true"></NavBar>
        <div class="title_style">
            总能量值为{{totalScore}}
        </div>

        <div>
            任务列表
            <div v-for="(item,index) in tasks" :key="index">
                任务名称：{{item.title}}
            </div>
        </div>
    </div>
</template>

<script>
    import NavBar from "./navBar/NavBar";
    export default {
        name: "NetRequest",
        components:{
            NavBar
        },
        data() {
            return {
                totalScore:0,
                tasks:null
            }
        },
        created() {
            this.getTotal()
            // this.getGoodList()
            // this.getGoodsList2()
            this.getTasks()
        },
        methods: {
            getGoodList() {
                let clientInfo = {
                    'version': '7.4.0',
                    'phoneInfo': 'iOS;iPhone XS Max;13.6.0',
                    'clientId': 'B06378BB-A3FC-431D-8B73-E123902D7F5A'
                }
                this.$axios({
                    method:'POST',
                    url:'http://192.168.31.5:8083/hulian/goods/eGoodsList',
                    data:{
                        pageNum:1,
                        pageSize:10
                    },
                    headers:{
                        'Content-Type': 'application/json;charset=UTF-8',
                        'accessToken':'fitColnv5XIDS1768zvyUmcb79S+YORV93UA/LcKacrM5n5ZUfocedCyDJ+Mmxel',
                        'clientInfo':JSON.stringify(clientInfo),
                        'Access-Control-Allow-Origin':'*'
                    }
                }).then(function (response) {
                    console.log('getGoodList',response)
                }).catch(function (error) {
                    console.log('getGoodList error',error)
                })
            },
            getGoodsList2() {
                let clientInfo = {
                    'version': '7.4.0',
                    'phoneInfo': 'iOS;iPhone XS Max;13.6.0',
                    'clientId': 'B06378BB-A3FC-431D-8B73-E123902D7F5A'
                }
                this.$axios.post('http://192.168.31.5:8083/hulian/goods/eGoodsList',{
                    // this.$axios.post('https://zjxj.tabfamily.cn/hlapi/api/Goods/getList',{
                    pageNum:1,
                    pageSize:10
                },{
                    headers: {
                        'Content-Type': 'application/json;charset=UTF-8',
                        'accessToken':'fitColnv5XIDS1768zvyUmcb79S+YORV93UA/LcKacrM5n5ZUfocedCyDJ+Mmxel',
                        'clientInfo':JSON.stringify(clientInfo),
                        'Access-Control-Allow-Origin':'*'
                    }
                }).then(function (response) {
                    console.log('axios=====',response)
                }).catch(function (error) {
                    console.log('axios===',error)
                })
            },
            getTotal() {
                let self = this
                let headerParams = {
                    "appId": "oms-UAHF2V31EH",
                    "timestamp": "1633685014586",
                    "sign": "d2faf3f187c8d8e1b285f300a66861d1f69007d1d97b420725dd751597d140c3",
                    "accountToken": "250b483ee08042ef8ee328be2d2bc712",
                    "uhomeAccessToken": "250b483ee08042ef8ee328be2d2bc712",
                    "uhomeUserId": "12695327",
                    "uhomeAppId": "MB-UZHSH-0001",
                    "clientId": "B06378BB-A3FC-431D-8B73-E123902D7F5A",
                    "Content-Type": "application/json;charset=UTF-8"
                }
                this.$axios({
                    method:'POST',
                    url:'https://zj.haier.net/omsopenapi/energy/getScoreSum',
                    data:{
                        userId:'12695327'
                    },
                    headers:headerParams
                }).then(function (response) {
                    console.log('getTotal',response.data.data.score)
                    self.totalScore = response.data.data.score
                }).catch(function (error) {
                    console.log('getTotal error',error)
                })
            },
            async getTasks() {
                let that = this
                this.$axios({
                    url:'/js/tasks.json',
                    method:'GET'
                }).then(function (res) {
                    console.log('getTasks',res)
                    that.tasks = res.data
                    console.log('getTasks',this.tasks)
                }).catch(err=>{
                    console.log('getTasks',err)
                });
                // this.$axios.get('/js/tasks.json').then(function (res) {
                //     console.log('getTasks',res)
                // }).catch(err=>{
                //     console.log('getTasks',err)
                // });
            }
        }
    }
</script>

<style scoped>
.title_style {
    margin-top: 24px;
    margin-bottom: 15px;
}
</style>
