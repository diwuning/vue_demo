<template>
    <div>
        <template v-for="(val, key) in chil">
            <el-submenu
                    :index="val[props.index]"
                    :key="key"
                    v-if="val[props.children] && val[props.children].length > 0"
            >
                <template slot="title">{{ val[props.label] }}</template>
                <sub-item :chil="val[props.children]" :props="props" @getSubItem="onSubTtemClick" />
            </el-submenu>
            <el-menu-item
                    :index="val[props.index]"
                    v-else
                    :key="key"
                    @click="onSubTtemClick(val)"
            >{{ val[props.label]}}</el-menu-item>
        </template>
    </div>
</template>

<script>
    export default {
        name: "subItem",//当name为SubMenuView时，第三级菜单显示不出来，调用sub-item时，name必须为subItem
        props: {
            chil: {
                type: Array,
                default() {
                    return [];
                },
            },
            props: {
                type: Object,
                default() {
                    return {
                        children: "children",
                        label: "label",
                        index: "id",
                    };
                },
            },
        },
        methods: {
            onSubTtemClick(item) {
                this.$emit("getSubItem", item);
            },
        },
    }
</script>

<style scoped>

</style>
