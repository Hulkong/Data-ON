<template lang="html">
  <div class="loading-page" v-if="loading">
    <p class="load_text">로딩중...</p>
  </div>
</template>

<script>
    // 페이지 이동시 로딩 화면 
  export default {
    data: () => ({
      loading: false
    }),
    methods: {
      start() {
        this.loading = true
      },
      finish() {
        this.loading = false
      }
    }
  }
</script>

<style scoped>
  .loading-page {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.8);
    text-align: center;
    padding-top: 200px;
    font-size: 30px;
    font-family: sans-serif;
    z-index: 9999;
  }
  .loading-page >>> p.load_text {
      color:#fff
  }
</style>