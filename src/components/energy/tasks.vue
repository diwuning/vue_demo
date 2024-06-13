<template>
    <div>
<!--        <img src="../assets/tasks.json"-->
    </div>
</template>

<script>
    import axios from 'axios'
    export default {
        name: "tasks",
        created() {
            this.getTasksFromJson();
        },
        methods: {
            async getTasksFromJson() {
                let result = await axios({
                    url:'/js/tasks.json',
                    method:'get'
                })
                console.log('getTasksFromJson',result)
            }
        }
    }
</script>

<style scoped>

</style>