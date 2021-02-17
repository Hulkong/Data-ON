<template>
  <div v-show="willYouSeeIt" class="event__popup--privacy">
    <p class="event__popup--privacy__header">
      이벤트 응모를 위한 개인정보를 입력해주세요.
    </p>
    <span class="event__popup--privacy__close" @click="close">X</span>
    <!-- name -->
    <div class="event__popup--privacy__name">
      <label class="hd" for="name">
        이름
        <input
          type="text"
          name="name"
          placeholder=""
          v-model="name"
          :maxlength="10"
          required
        />
      </label>
    </div>
    <!-- name -->

    <!-- phone -->
    <div class="event__popup--privacy__phone">
      <input type="hidden" name="" :value="phoneNumber" />
      <label for="phone--firstnumber">
        이름
        <select name="" id="phone--firstnumber" required v-model="phone.first">
          <option value="initVal">선택</option>
          <option value="010">010</option>
          <option value="011">011</option>
          <option value="016">016</option>
          <option value="017">017</option>
          <option value="019">019</option>
        </select>
      </label>
      <span>-</span>
      <label for="phone--secondnumber">
        <input
          type="tel"
          id="phone--secondnumber"
          name="phone--secondnumber"
          placeholder=""
          v-model="phone.second"
          :maxlength="4"
          required
        />
      </label>
      <span>-</span>
      <label for="phone--thirdnumber">
        <input
          type="tel"
          id="phone--thirdnumber"
          name="phone--thirdnumber"
          placeholder=""
          v-model="phone.third"
          :maxlength="4"
          required
        />
      </label>
    </div>
    <!-- phone -->

    <!-- info -->
    <div class="event__popup--privacy__info">
      <p>개인정보 수집 및 이용에 대한 안내</p>
      <p>수집항목: 이름, 휴대폰번호</p>
      <p>수집목적: 이벤트 경품발송</p>
      <p>이용기간: 이벤트 종료 후 해당 정보를 지체없이 파기</p>
    </div>
    <!-- info -->

    <!-- checkbox -->
    <div class="event__popup--privacy__check">
      <input type="checkbox" id="checkbox" v-model="agreement" />
      <label for="checkbox"
        >위 개인정보 수집 및 이용에 대한 안내를 충분히 숙지하였으며 이에
        동의합니다.</label
      >
    </div>
    <!-- checkbox -->

    <!-- button -->
    <div class="event__popup--privacy__btn" @click="validate">참여완료하기</div>
    <!-- button -->
  </div>
</template>

<script>
export default {
  props: {
    willYouSeeIt: {
      type: Boolean,
      default: true,
    },
  },

  computed: {
    phoneNumber() {
      if (this.phone.first === "initVal") return -1;
      if (!this.phone.second) return -1;
      if (!this.phone.third) return -1;
      return [this.phone.first, this.phone.second, this.phone.third].join("-");
    },
  },

  data() {
    return {
      phone: {
        first: "initVal",
        second: null,
        third: null,
      },
      name: null,
      agreement: false,
    };
  },

  methods: {
    close() {
      this.init();
      this.$emit("close-popup-privacy");
    },

    init() {
      (this.phone.first = "initVal"), (this.phone.second = null);
      this.phone.third = null;
      this.name = null;
      this.agreement = false;
    },

    validate() {
      if (!this.name) return this.$emit("participate", "fail");
      if (!this.phoneNumber) return this.$emit("participate", "fail");
      if (!this.agreement) return this.$emit("participate", "fail");

      this.init();
      this.$emit("participate", "success");
      this.$emit("close-popup-privacy");
    },
  },
};
</script>

<style scoped>
input,
textarea,
button,
select {
  -webkit-appearance: checkbox;
  appearance: checkbox;
}
</style>