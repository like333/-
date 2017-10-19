<template>
  <div class="bar">
    <h1 class="title l">移动培训中心管理平台</h1>
    <a class="r exit">安全退出</a>
  </div>
</template>
<script>
export default {

}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
.bar {
  padding: 0 40px;
  background: #005c9e url(./title_bg.png);
  height: 72px;
  line-height: 72px;
  .title {
    color: white;
    font-size: 24px;
    font-weight: normal;
  }
  .exit {
    color: white;
    cursor: pointer;
  }
  a:hover {
    text-decoration: underline;
  }
}
</style>
