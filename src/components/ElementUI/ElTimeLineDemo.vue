<template>
    <div style="margin: 20px">
        <el-timeline>
            <!--当style里的display=flex时，时间轴上的每一项宽度按内容显示，当不设置display时，宽度是全屏显示-->
            <el-timeline-item v-for="(activity,index) in activities" :key="index" :timestamp="activity.timestamp"
                              style="text-align: left;" :icon="activity.icon" :type="activity.type"
                              :size="activity.size" :color="activity.color" placement="top">
                <el-card>
                    {{activity.content}}<br/>{{activity.timestamp}}
                </el-card>
            </el-timeline-item>
        </el-timeline>
    </div>
</template>

<script>
    export default {
        name: "ELTimeLineDemo",
        data() {
            return {
                activities: [
                    {content:'活动按期开始',timestamp:'2018-04-15'},
                    /*type 节点类型: primary / success / warning / danger / info*/
                    {content:'支持使用图标',timestamp:'2018-04-15',size:'large',type:'primary',icon:'el-icon-more'},
                    {content:'支持自定义颜色',timestamp:'2018-04-13',color:'#0bbd87'},
                    /*size: normal / large*/
                    {content:'支持自定义尺寸',timestamp:'2018-04-11',size:'normal'}
                ]
            }
        }
    }
</script>

<style scoped>

</style>
