<template>
  <div v-show="willYouSeeIt" class="event__popup">
    <div class="event__popup__contents" v-html="message">
      {{ message }}
    </div>
    <div
      class="event__popup__button--confirm"
      @click="$emit('close-popup-notice')"
    >
      확인
    </div>
  </div>
</template>

<script>
export default {
  props: {
    willYouSeeIt: {
      type: Boolean,
      default: true,
    },
    message: {
      type: String,
      default: "커스터마이징 해주세요.",
    },
  },
};
</script>

<style scoped>
.event__popup {
  position: fixed;
  left: 25vw;
  top: 25vh;
  margin: auto;
  width: 50%;
  border: 3px solid green;
  background-color: #fff;
  border-radius: 12px;
  box-shadow: 2px 2px 2px 2px grey;
}
</style>