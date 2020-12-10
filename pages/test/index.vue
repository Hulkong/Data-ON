<template>
  <div class="inform">
    <div class="tab">
      <span>개인정보 취급방침</span>
    </div>

    <div class="contents-layout">
      <p class="header">서비스 약관</p>
      <div class="main-layout">
        <p class="title">제 1장.총칙</p>
        <div class="sub-layout">
          <sub class="sub-title">제 1 조 (목적)</sub>
          <span class="contents">test</span>
        </div>
        <div class="sub-layout">
          <sub class="sub-title">제 1 조 (목적)</sub>
          <span class="contents">test</span>
        </div>
        <div class="sub-layout">
          <sub class="sub-title">제 1 조 (목적)</sub>
          <span class="contents">test</span>
        </div>
      </div>
      <div class="main-layout">
        <p class="title">제 1장.총칙</p>
        <div class="sub-layout">
          <sub class="sub-title">제 1 조 (목적)</sub>
          <span class="contents">test</span>
        </div>
        <div class="sub-layout">
          <sub class="sub-title">제 1 조 (목적)</sub>
          <span class="contents">test</span>
        </div>
        <div class="sub-layout">
          <sub class="sub-title">제 1 조 (목적)</sub>
          <span class="contents">test</span>
        </div>
      </div>
      <div class="main-layout">
        <p class="title">제 1장.총칙</p>
        <div class="sub-layout">
          <sub class="sub-title">제 1 조 (목적)</sub>
          <span class="contents">test</span>
        </div>
        <div class="sub-layout">
          <sub class="sub-title">제 1 조 (목적)</sub>
          <span class="contents">test</span>
        </div>
        <div class="sub-layout">
          <sub class="sub-title">제 1 조 (목적)</sub>
          <span class="contents">test</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data: () => ({}),

  props: {},

  computed: {},
  methods: {},

  beforeCreate() {},
  created() {},
  beforeMount() {},
  mounted() {},
  beforeDestroy() {},
  destroyed() {}
};
</script>

<style scoped>
div {
  box-sizing: border-box;
  background-color: aquamarine;
}

.inform {
  position: relative;
  background: beige;
  padding: 0 172px;
  letter-spacing: -0.08em;
  line-height: 1.8;
}

.tab {
  width: 540px;
  height: 44px;
  line-height: 44px;
  margin: 0 auto;
  border: 1px solid #ccc;
  border-left: none;
  font-size: 16px;
  font-weight: bold;
  text-align: center;
}

.contents-layout {
}

.header {
  padding: 50px 0;
  font-size: 36px;
  font-weight: bold;
  color: #313131;
}

.main-layout {
  padding-bottom: 50px;
}

.sub-layout {
  padding-bottom: 30px;
}

.sub-layout:last-of-type {
  padding-bottom: 0;
}

.title {
  font-size: 24px;
  font-weight: bold;
  color: #313131;
}

.sub-title {
  display: block;
  font-size: 14px;
  font-weight: bold;
  color: #313131;
}
</style>