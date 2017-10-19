<template>
    <div class="file-publish">
        <Publish :filelist="filelist" :types="types"></Publish>
    </div>
</template>
<script>
import Publish from '#/Publish/Publish'
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
        Publish
    }
}
</script>
<style lang="scss">

</style>


