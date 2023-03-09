<template>
    <div>
        <HMenuView :menu-list="menuList" :props="defaultProps" @getmenu="onGetMenu" />
        <div>当前选择的是：{{resultSelect}}</div>
        <!--  默认展开id为2和3的节点，默认选中id为4的节点      -->
        <el-tree ref="tree" :data="treeData" :props="defaultPropsTree" @node-click="handleNodeClick"
                 show-checkbox @check-change="handleCheckChange"
                 node-key="id" :default-expanded-keys="[2,3]" :default-checked-keys="[3]">
        </el-tree>
        <div>树节点的选择</div>
        <div><button @click="getCheckedNodes">通过node获取</button><button @click="getCheckedKeys">通过key获取</button>
            <button @click="setCheckedNodes">通过node设置</button><button @click="setCheckedKeys">通过key设置</button>
            <button @click="resetChecked">清空</button></div>
    </div>
</template>
<!--水平NavMenu导航栏的用法，多级菜单-->
<script>
    import HMenuView from "./hMenu/HMenuView";
    export default {
        name: "HMenuDemo",
        components: {
            HMenuView
        },
        data() {
            return {
                defaultProps: {
                    children: "children",
                    label: "title",
                    index: "path",
                },
                menuList: [
                    {title: 'first', path: '1', children: [
                        {title: 'first-1', path: '1-1', children: [
                            {title: 'first-1-1', path: '1-1-1', children: [
                                {title: 'first-1-1-1', path: '1-1-1-1', children: [
                                    {title: 'first-1-1-1-1', path: '1-1-1-1-1'},
                                    {title: 'first-1-1-1-2', path: '1-1-1-1-2'}
                                ]},
                            {title: 'first-1-1-2', path: '1-1-1-2'}
                        ]},
                        {title: 'first-1-2', path: '1-1-2'}
                        ]},
                        {title: 'first-2', path: '2-1'}
                    ]},
                    {title: 'second', path: '2', children: [
                        {title: 'second-1', path: '2-1', children: [
                             {title: 'second-1-1', path: '2-1-1'}
                        ]}]
                    },
                    {title: 'third', path: '3'}
                ],
                defaultPropsTree: {
                    children:'children',
                    label:'label'
                },
                treeData: [
                    {id:1,level:1,label:'一级1',children:[{id:3,level:2,label:'二级 1-1',children:[{id:6,level:3,label:'三级 1-1-1'}]}]},
                    {id:2,level:1,label: '一级2',children:[{id:4,level:2,label:'二级 2-1',children:[{id:7,level:3,label:'三级 2-1-1'}]},
                            {id:5,level:2,label:'二级 2-2',children:[{id:8,level:3,label:'三级 2-2-1', disabled:true}]}]} //将节点8设为禁用
                ],
                resultSelect:''
            }
        },
        methods: {
            onGetMenu(item) {
                this.$router.push({
                    path: item.path,
                    query: { t: new Date().getTime() },
                });
            },
            handleNodeClick(data) {
                console.log('handleNodeClick',data);
            },
            handleCheckChange(data, checked, indeterminage) {
                //选择第几级节点，就会调用几次，先调用大节点，依次调用到点击的节点
                console.log('handleCheckChange',data,checked,indeterminage)
                if(checked) {
                    this.resultSelect = data.label;
                } else {
                    this.resultSelect = ''
                }
            },
            getCheckedNodes() {
                this.$message.info(this.$refs.tree.getCheckedNodes());
            },
            getCheckedKeys() {
                this.$message.info(this.$refs.tree.getCheckedKeys());
            },
            setCheckedNodes() {
                this.$refs.tree.setCheckedNodes([
                    {id:3,label:'二级 1-1'}
                ])
            },
            setCheckedKeys() {
                this.$refs.tree.setCheckedKeys([3]);
            },
            //清空，一次只能清一个节点？
            resetChecked() {
                this.$refs.tree.setCheckedKeys([]);
            }
        },
    }
</script>

<style scoped>

</style>
