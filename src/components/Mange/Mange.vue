<template>
  <div class="mange">
    <div class="search-wrapper">
      <label for="cateName">分类名称：</label>
      <select id="cateName">
        <option selected disabled>-请选择-</option>
        <option v-for="item in types.list" :key="item.id">{{item.fileType}}</option>
      </select>
    </div>
  </div>
</template>
<script>
export default {
  props: {
    types: {
      type: Object
    }
  },
  data() {
    return {

    }
  },
}
</script>
<style lang="scss">

</style>


