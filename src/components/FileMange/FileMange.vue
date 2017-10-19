<template>
    <div class="file-mange">
        <Mange :types="types"></Mange>
    </div>
</template>
<script>
import Mange from '#/Mange/Mange'
export default {
    data() {
        return {
            filelist: {},
            types: {}
        }
    },
    created() {
        this.$http.get("/file/list.do").then(res => {
            var res = res.body
            this.filelist = Object.assign({}, this.filelist, res.data)
        }, res => {
        })
        this.$http.get("/category/get_category.do").then(res => {
            var res = res.body
            this.types = Object.assign({}, this.types, res.data)
        }, res => {
        })
    },
    components: {
        Mange
    }
}
</script>
<style lang="scss">

</style>


