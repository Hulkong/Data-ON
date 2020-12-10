<template>
  <div>
    <div>
      <vue-recaptcha
        ref="recaptcha"
        @verify="onVerify"
        @error="onError"
        sitekey="6LfgUAAaAAAAAJdCmJt5OYhAB_w4P4rmpxeX1xD9"
      ></vue-recaptcha>
    </div>
  </div>
</template>

<script>
import VueRecaptcha from "vue-recaptcha";
export default {
  data: () => ({}),
  components: { VueRecaptcha },
  computed: {},
  methods: {
    onVerify(verify) {
      this.$emit("verify", verify);
    },
    onError(error) {
      this.$emit("error", error);
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