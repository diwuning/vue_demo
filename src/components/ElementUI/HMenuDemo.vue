<template>
    <div>
        <HMenuView :menu-list="menuList" :props="defaultProps" @getmenu="onGetMenu" />
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
                ]
            }
        },
        methods: {
            onGetMenu(item) {
                this.$router.push({
                    path: item.path,
                    query: { t: new Date().getTime() },
                });
            },
        },
    }
</script>

<style scoped>

</style>
