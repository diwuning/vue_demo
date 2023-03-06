<template>
    <el-menu mode="horizontal" :default-active="$route.path" active-text-color="#09f">
        <template v-for="(val, key) in menuList">
            <el-submenu
                    :index="val[props.index]"
                    v-if="val[props.children] && val[props.children].length > 0"
                    :key="key"
            >
                <template slot="title">
                    <i :class="val.icon"></i>
                    <span>{{ val[props.label] }}</span>
                </template>
                <SubItem :chil="val[props.children]" :props="props" @getSubItem="onMenuItemClick" />
            </el-submenu>
            <el-menu-item :index="val[props.index]" v-else @click="onMenuItemClick(val)" :key="key">
                <i :class="val.icon"></i>
                <span slot="title">{{ val[props.label] }}</span>
            </el-menu-item>
        </template>
    </el-menu>
</template>

<script>
    import SubItem from './SubMenuView'
    export default {
        name: "HMenuView",
        components: { SubItem },
        props: {
            menuList: {
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
        mounted() {
            console.log('HMenuView mounted',this.menuList, this.props)
        },
        methods: {
            onMenuItemClick(item) {
                this.$emit("getmenu", item);
            },
        },
    }
</script>

<style scoped>

</style>
