<template>
  <contact :selects="selects"></contact>
</template>

<script>
import { VueReCaptcha } from "vue-recaptcha-v3";
export default {
  data: () => ({
    selects: [
      { value: "오류신고" },
      { value: "오류신고" },
      { value: "오류신고" }
    ]
  }),

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
</style>