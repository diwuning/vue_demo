<template>
    <div>
        <coverflow :coverList="images" :coverWidth="160" :index="current" :coverSpace="50" :coverFlat="true" @change="onChange(current)"></coverflow>
    </div>
</template>

<script>
    import coverflow from 'vue-coverflow'
    export default {
        name: "Galley",
        components: {
            coverflow
        },
        data() {
            return {
                images: [
                    {cover:'https://placekitten.com/801/800',title:''},
                    {cover:'https://placekitten.com/802/800',title:''},
                    {cover:'https://placekitten.com/803/800',title:''},
                    {cover:'https://placekitten.com/804/800',title:''},
                    {cover:'https://placekitten.com/805/800',title:''},
                    {cover:'https://placekitten.com/806/800',title:''},
                    {cover:'https://placekitten.com/807/800',title:''},
                    {cover:'https://placekitten.com/808/800',title:''},
                    {cover:'https://placekitten.com/809/800',title:''},
                    {cover:'https://placekitten.com/810/800',title:''}
                ],
                current: 1
            }
        },
        created() {
            setTimeout(() => {
                this.current ++
            },1000)
        },
        methods: {
            onChange(index) {
                this.current = index+1
            }
        }
    }
</script>

<style scoped>

</style>