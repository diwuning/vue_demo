<template>
  <div>
    <div>
        {{totalArr}}
    </div>
      <div>
          ======={{chongArr}}
      </div>
  </div>
</template>

<script>
    export default {
        name: "jsOperate",
        data() {
            return {
                totalArr:['a','b','c','d','e','h'],
                chongArr:['a','b','c','a','d'],
                numArr:[1,2,3,4,5,6]
            }
        },
        created() {
            this.addArr()
        },
        methods: {
            addArr() {
                let newValue = this.totalArr.push('s')
                console.log('addArr',newValue)
                let touValue = this.chongArr.unshift('s')
                console.log('addArr',touValue)
                console.log('addArr',this.totalArr.shift())
            }
        }
    }
</script>

<style scoped>

</style>