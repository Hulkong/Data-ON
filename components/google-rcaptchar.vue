<template>
  <div>
    <div>
      <vue-recaptcha
        ref="recaptcha"
        @verify="onVerify"
        sitekey="6Ld_JP4ZAAAAAFiyjSHomsE2KE91s5-Qv_XUJ_NW"
      ></vue-recaptcha>
    </div>
  </div>
</template>

<script>
import VueRecaptcha from "vue-recaptcha";
export default {
  data: () => ({
    siteKey: "6Ld_JP4ZAAAAAFiyjSHomsE2KE91s5-Qv_XUJ_NW"
  }),
  components: { VueRecaptcha },
  computed: {},
  methods: {
    onVerify(verify) {
      this.$emit("verify", verify);
    }
  },

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