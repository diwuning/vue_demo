<template>
    <div>
        <div style="width: 20px; height: 20px">
            <img src="../../assets/logo.png" style="transform: rotate(90deg);" width="20px" height="20px" @click="goBack()"/>
        </div>
        <!-- stripe 斑马纹 -->
        <el-table :data="list.slice((page-1)*pageSize,page*pageSize)"
                  stripe style="font-size: 12px">
            <el-table-column prop="id" label="id" width="35"></el-table-column>
            <el-table-column prop="name" label="名称" width="80"></el-table-column>
            <el-table-column label="姓名" width="100">
                <template slot-scope="scope">
                    <!-- Popover 弹出框 -->
                    <!--  trigger属性用于设置何时触发 Popover，支持四种触发方式：hover，click，focus 和 manual -->
                    <!--  对于弹出内容，可以使用content属性，也可以直接在<el-popover>标签间写 -->
                    <el-popover trigger="hover" placement="top">
                        <p>姓名: {{ scope.row.name }}</p>
                        <p>住址: {{ scope.row.address }}</p>
                        <!--  对于触发 Popover 的元素，有两种写法：使用 slot="reference" 的具名插槽 -->
                        <div slot="reference" class="name-wrapper">
                            <el-tag size="medium">{{ scope.row.name }}</el-tag>
                        </div>
                    </el-popover>
                </template>
            </el-table-column>
            <el-table-column label="图标" width="50">
                <!--通过 Scoped slot 可以获取到 row, column, $index 和 store（table 内部的状态管理）的数据-->
                <template slot-scope="scope">
                    <!-- placement属性决定展示效果：placement属性值为：方向-对齐位置；四个方向：top、left、right、bottom；
                    三种对齐位置：start, end，默认为空; 提供了两个不同的主题：dark和light；
                     更多的content展示：<div slot="content">多行信息<br/>第二行信息</div>-->
                    <el-tooltip effect="dark" placement="top-start" :content="scope.row.name">
                        <img :src="scope.row.image_url" width="20px" height="20px">
                    </el-tooltip>
                </template>
            </el-table-column>
            <el-table-column label="操作">
                <template slot-scope="scope">
                    <el-button size="mini" @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
                    <el-button size="mini" @click="handleDel(scope.$index, scope.row)" type="danger">删除</el-button>
                </template>
            </el-table-column>
        </el-table>
        <el-pagination background
                       :page-size="pageSize"
                       :total="list.length"
                       layout="prev, pager, next"
                       @current-change="pageChange" style="margin-top: 10px"/>
    </div>
</template>

<script>
    import logo from "../../assets/logo.png";
    export default {
        name: "TableUi",
        data () {
            return {
                page: 1,
                pageSize: 4,
                list: [
                    { id: 1, type: 1, name: '10个能量', address: 'address', image_url: logo },
                    { id: 2, type: 2, name: '谢谢参与', address: 'address', image_url: logo },
                    { id: 3, type: 1, name: '笔记本电脑', address: 'address', image_url: logo },
                    { id: 4, type: 1, name: '20个能量', address: 'address', image_url: logo },
                    { id: 5, type: 2, name: '谢谢参与', address: 'address', image_url: logo },
                    { id: 6, type: 1, name: '小夜灯', address: 'address', image_url: logo },
                    { id: 7, type: 1, name: '50个能量', address: 'address', image_url: logo },
                    { id: 8, type: 1, name: '加湿器', address: 'address', image_url: logo }
                ],
            }
        },
        methods: {
            pageChange (page) {
                console.log('pageChange', page)
                this.page = page
            },
            handleEdit (index, row) {
                console.log('handleEdit', row)
                console.log('handleEdit', index)
            },
            handleDel (index, row) {
                console.log('handleDel', row)
                console.log('handleDel', index)
                this.list.splice(index,1)
            },
            goBack () {
                this.$router.go(-1)
            }
        }
    }
</script>

<style scoped>
.labelStyle {
    font-size: 12px;
}
</style>
