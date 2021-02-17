<template>
  <div class="event-link">
    <p class="event-link__title">소문낸 링크를 입력해주세요</p>
    <div class="event-link__regist">
      <input
        class="event-link__regist__input"
        type="text"
        name="link"
        placeholder="소문 낸 링크를 많이 등록할 수록 당첨 확률은 UP~! (*동일 링크 등록은 제외)​"
        v-model="url"
      />
      {{ url }}
      <div class="event-link__regist__btn" @click="register">등록하기</div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      url: null,
    };
  },
  methods: {
    validateURL() {
      const regex = /(http|https):\/\/(\w+:{0,1}\w*@)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%@!\-\/]))?/;
      return regex.test(this.url);
    },

    register() {
      if (this.validateURL()) {
        this.url = null;
        this.$emit("register", "register");
        return;
      }

      this.$emit("not-register", "notRegister");
    },
  },
};
</script>

<style scoped>
</style>