<template>
  <div class="error-page">
      <include-header></include-header>
      <Nuxt />
      <!-- s : #footer-wrap //-->
      <include-footer></include-footer>
      <!-- e : #footer-wrap //-->
  </div>
</template>
<style scoped>

.error-page {
  position: relative;
  padding: 80px 158px 0 158px;
  letter-spacing: -0.08em;
  line-height: 1.8;
  word-break: keep-all;
}
.error-page >>> #header-wrap .inner {
  position: fixed;
  left: 0;
  top: 0;
  z-index: 55;
  width: 100%;
  min-width: 360px;
  max-width: none;
  -webkit-transition: top 0.8s ease-in-out;
  transition: top 0.8s ease-in-out;
  height: 80px;
  background: url(/images/Layout/header-bg.jpg) no-repeat #0075c1;
}

.error-page >>> #header-wrap .inner h2 {
  z-index: 55;
  width: 166px;
  height: 30px;
  position: absolute;
  left: 65px;
  top: 26px;
} 

.error-page >>> #header-wrap .inner h2 a {
  display: block;
  height: 30px;
  background: url(/images/slogo.png) no-repeat left center;
  background-size: 100% auto;
}

.error-page >>> .top-search {
  display: none;
}
</style>