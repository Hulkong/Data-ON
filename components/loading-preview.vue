<template lang="html">
  <div class="loading-page" v-if="loading">
    <p class="load_text">데이터 로딩중...</p>
  </div>
</template>

<script>
    // 페이지 이동시 로딩 화면 
  export default {
    props:{
        loading: Boolean
    },
    methods: {
    }
  }
</script>

<style scoped>
  .loading-page {
    position: relative;
    top: 0;
    left: 0;
    width: 100%;
    height: 300px;
    background: rgba(0, 0, 0, 0.8);
    text-align: center;
    padding-top: 130px;
    font-size: 30px;
    font-family: sans-serif;
    z-index: 9999;
  }
  .loading-page >>> p.load_text {
      color:#fff
  }
</style>