<template>
    <div>
        <van-cell-group>
            <vant-field readonly clickable label="城市" :value="value" placeholder="选择城市" @click="showPicker=true">
            </vant-field>
        </van-cell-group>
<!--        <van-popup v-model="showPicker" round position="bottom">-->
<!--            <van-picker-->
<!--                    title="标题"-->
<!--                    show-toolbar-->
<!--                    :columns="columns"-->
<!--                    @confirm="onConfirm"-->
<!--                    @cancel="showPicker=false"-->
<!--                    @change="onChange"-->
<!--            />-->
<!--        </van-popup>-->
        <van-time-picker></van-time-picker>
    </div>
</template>
<script>
    export default {
        name: "VantDemo",
        data() {
            return {
                value: '',
                showPicker: false,
                columns: ['杭州', '宁波', '温州', '绍兴', '湖州', '嘉兴', '金华', '衢州'],
            }
        },
        methods:{
            clickButton(e) {
                console.log('',e)
            },
            onConfirm(value) {
                this.value = value;
                this.showPicker = false
            }
        }
    }
</script>

<style scoped>

</style>