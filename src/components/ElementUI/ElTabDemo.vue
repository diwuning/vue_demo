<template>
    <div>
        <!--  设置 type 属性为 card 就可以使选项卡改变为标签风格。将type设置为border-card,变为卡片化的标签页  -->
        <!-- 选项卡所在位置 tabPosition="left|right|top|bottom" -->
        <el-tabs v-model="activeName" @tab-click="handleClick" type="card" tab-position="top" editable @edit="handleTabsEdit"
                 style="margin-left: 20px; border-bottom: 1px solid #333333">
            <el-tab-pane name="first">
                <span slot="label"><i class="el-icon-bangzhu"></i>用户管理</span>
                用户管理
            </el-tab-pane>
            <el-tab-pane label="配置管理" name="second">配置管理</el-tab-pane>
            <el-tab-pane label="角色管理" name="third">角色管理</el-tab-pane>
            <el-tab-pane label="定时任务补偿" name="fourth">定时任务补偿</el-tab-pane>
        </el-tabs>
        <div style="display: flex; margin: 20px">
            <h3>动态增减标签页</h3>
            <el-button size="small" @click="handleTabsEdit('','add')">add tab</el-button>
        </div>
        <!--动态增减标签页，增减标签页按钮只能在选项卡样式的标签页下使用-->
        <!--单独做删除标签页时也可以把editable @edit写成closable @tab-remove=,同样做增加时可用addable @tab-add-->
        <el-tabs v-model="editableTabsValue" @tab-click="handleClick" type="card" tab-position="top" editable @edit="handleTabsEdit" style="margin-left: 20px">
            <el-tab-pane v-for="(item) in editableTabs" :key="item.name" :label="item.title" :name="item.name">
                {{item.content}}
            </el-tab-pane>
        </el-tabs>
    </div>

</template>

<script>
    export default {
        name: "ElTabDemo",
        data() {
            return {
                activeName: 'second',
                editableTabsValue:'2',
                editableTabs: [
                    {title:'Tab 1', name:'1', content:'Tab 1 content'},
                    {title:'Tab 2', name:'2', content:'Tab 2 content'},
                ],
                tabIndex:2
            }
        },
        methods: {
            handleClick(tab, event) {
                console.log(tab, event);
            },
            //动态增减标签页
            handleTabsEdit(targetName, action) {
                if(action == 'add') {
                    let newTabName = ++ this.tabIndex + '';
                    this.editableTabs.push({title:'New Tab',name:newTabName,content:'New Tab content'});
                    this.editableTabsValue = newTabName;
                }
                if(action === 'remove') {
                    let tabs = this.editableTabs;
                    let activeName= this.editableTabsValue;
                    if(activeName === targetName) {
                        tabs.forEach((tab,index) => {
                            if(tab.name === targetName) {
                                let nextTab = tabs[index+1] || tabs[index-1];
                                if(nextTab) {
                                    activeName = nextTab.name;
                                }
                            }
                        })
                        this.editableTabsValue = activeName;
                        this.editableTabs = tabs.filter(tab => tab.name !== targetName);
                    }
                }
            }
        }
    }
</script>

<style scoped>

</style>
