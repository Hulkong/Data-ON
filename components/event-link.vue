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
        this.$emit("send-url", this.url);
        this.$emit("register", "register");
        this.url = null;
        return;
      }

      this.$emit("not-register", "notRegister");
    },
  },
};
</script>

<style scoped>
.event-link__title {
  color: #333333;
  font-size: 3.5rem;
  line-height: 1;
  margin-bottom: 3rem;
}

.event-link__regist {
  text-align: left;
}

.event-link__regist__input {
  width: 70%;
  height: 60px;
      min-width: 625px;
  background: #FFFFFF;
  border: 1px solid #707070;
  padding-left: 1rem;
}

.event-link__regist__btn {
  width: 25%;
  float: right;
  height: 60px;
  line-height: 60px;
  background: #0062AC 0% 0% no-repeat padding-box;
  margin-left: 23px;
  text-align: center;
  cursor: pointer;
}
</style>