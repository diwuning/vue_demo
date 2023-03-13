<template>
    <div style="display: flex;">
        <el-select ref="provinceSel" v-model="province" placeholder="请选择" @change="provinceChange">
            <el-option v-for="item in provinces" :key="item.value" :label="item.label" :value="item.value"></el-option>
        </el-select>
        <el-select ref="citySel" v-model="city" placeholder="请选择" @change="cityChange" class="componentMargin">
            <el-option v-for="item in cities" :key="item.value" :label="item.label" :value="item.value"></el-option>
        </el-select>
        <el-select ref="areaSel" v-model="area" placeholder="请选择" @change="areaChange" class="componentMargin">
            <el-option v-for="item in areas" :key="item.value" :label="item.label" :value="item.value"></el-option>
        </el-select>
    </div>
</template>

<script>
    const areaList = require('../../../static/area')
    export default {
        name: "areaDropdown",
        props: ['updateArea'],
        data() {
            return {
                province:'',
                city:'',
                area:'',
                provinces: [],
                cities: [],
                areas:[],
                selArea: {}
            }
        },
        created() {
            console.log('created',this.updateArea)
            this.getAreaData('86',1)
            if(this.updateArea) {
                let passData = this.updateArea.split(',');
                this.province = passData[0];
                this.getAreaData(passData[0],2)
                this.city = passData[1]
                this.getAreaData(passData[1],3)
                this.area = passData[2]
            }
        },
        methods: {
            getAreaData(code,level) {
                let provinceList = areaList[code];
                let provinces = [];
                let provinceKeys = Object.keys(provinceList);
                let provinceValues = Object.values(provinceList);
                for(let i=0; i<provinceKeys.length; i++) {
                    provinces.push({'value':provinceKeys[i], 'label': provinceValues[i]});
                }
                console.log('getAreaData', provinces)
                if(level == 1) {
                    this.provinces = provinces;
                } else if(level == 2) {
                    this.cities = provinces;
                } else {
                    this.areas = provinces;
                }
            },
            provinceChange(params) {
                console.log('provinceChange', params,this.$refs.provinceSel.hoverIndex)
                this.selArea.province = this.provinces[this.$refs.provinceSel.hoverIndex]
                this.getAreaData(this.province,2)
                //向父组件传值
                this.$emit('getAreaValue',this.selArea,1)
                if(this.city) {
                    this.city = ''
                }
                if(this.area) {
                    this.area = ''
                }
            },
            cityChange(value) {
                console.log('cityChange', value,this.$refs.citySel.hoverIndex);
                this.selArea.city = this.cities[this.$refs.citySel.hoverIndex]
                this.getAreaData(this.city, 3)
                //向父组件传值
                this.$emit('getAreaValue',this.selArea,2)
                if(this.area) {
                    this.area = ''
                }
            },
            areaChange(value) {
                console.log('areaChange', value,this.area)
                this.selArea.area = this.areas[this.$refs.areaSel.hoverIndex]
                //向父组件传值
                this.$emit('getAreaValue',this.selArea,3)
            }
        }
    }
</script>

<style scoped>
    .componentMargin {
        margin-left: 5px;
    }
</style>
