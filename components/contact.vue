<template>
  <div
    :style="{ visibility: isShow ? 'visible' : 'hidden' }"
    class="contact"
    :class="{ active: isShow }"
  >
    <!-- header -->
    <div class="header">
      <span>{{ changeTitle }}</span>
    </div>
    <!-- header -->

    <!-- contents -->
    <div class="contents">
      <div v-if="!isShowSecond" class="before">
        <!-- name -->
        <div class="subbox name">
          <span class="hd">이름</span>
          <input
            type="text"
            name="name"
            placeholder="이름을 작성해주세요 :)"
            v-model="name.value"
          />
          <p class="errorMsg" v-show="name.error.isError">
            {{ name.error.msg }}
          </p>
        </div>
        <!-- name -->

        <!-- email -->
        <div class="subbox eamil">
          <span class="hd">이메일</span>
          <input
            type="text"
            name="email"
            placeholder="메일 주소를 작성해주세요 :)"
            v-model="email.value"
          />
          <p class="errorMsg" v-show="email.error.isError">
            {{ email.error.msg }}
          </p>
        </div>
        <!-- email -->

        <!-- selectbox -->
        <div class="subbox selectbox">
          <span class="hd">의견 유형</span>
          <div class="select_container">
            <select v-model="selectbox.value">
              <option value="0">오류신고</option>
              <option value="1">기능개선</option>
              <option value="2">데이터 문의</option>
            </select>
          </div>
        </div>
        <!-- selectbox -->

        <!-- textarea -->
        <div class="subbox textarea">
          <textarea
            type="text"
            name="opinion"
            placeholder="의견 내용을 남겨주세요."
            v-model="textarea.value"
          />
          <p class="errorMsg" v-show="textarea.error.isError">
            {{ textarea.error.msg }}
          </p>
        </div>
        <!-- textarea -->

        <!-- captchar -->
        <div class="subbox captchar">
          <div class="captchar_contents">
            <google-rcaptchar @verify="googleVerify"></google-rcaptchar>
          </div>
        </div>
        <!-- captchar -->

        <!-- checkbox -->
        <div class="subbox checkbox">
          <input type="checkbox" id="cb1" v-model="checkbox.value" />
          <label for="cb1"></label>
          <span>개인정보 수집 및 이용 동의(필수)</span>
          <span class="detail">[자세히보기]</span>
          <span class="errorMsg" v-show="checkbox.error.isError">{{
            checkbox.error.msg
          }}</span>
        </div>
        <!-- checkbox -->
      </div>
      <div v-else class="after">
        <img src="/images/ask/img-receive.png" alt />
        <p>- 접수완료 -</p>
        <span>소중한 의견 감사합니다!</span>
        <span>빠른 시일내에 답변 드리겠습니다 :D</span>
      </div>
    </div>
    <!-- contents -->

    <div class="footer" :class="{ after: isShowSecond }">
      <div class="button send" @click="clickSendButton">
        <span>보내기</span>
      </div>
      <div class="button cancel" @click="clickCloseButton">
        <span>닫기</span>
      </div>
    </div>
    <p class="errorMsg server" v-show="server.error.isError">
      {{ server.error.msg }}
    </p>
  </div>
</template>

<script>
export default {
  props: {
    isShow: {
      default: true,
      type: Boolean,
    },
  },
  data: () => ({
    title: "의견 남기기",
    isAllPass: false,
    isShowSecond: false,
    isVerifyCaptchar: false,
    name: {
      value: null,
      error: {
        isError: false,
        msg: "10자이내로 작성해주세요",
      },
    },
    email: {
      value: null,
      error: {
        isError: false,
        msg: "이메일 형식에 맞지 않습니다",
      },
    },
    selectbox: {
      value: 0,
      error: {
        isError: false,
        msg: "",
      },
    },
    checkbox: {
      value: false,
      error: {
        isError: false,
        msg: "필수항목입니다",
      },
    },
    textarea: {
      value: null,
      error: {
        isError: false,
        msg: "필수항목입니다",
      },
    },
    server: {
      value: null,
      error: {
        isError: false,
        msg: "서버와 연결이 끊어졌습니다. 다시 시도해주세요.",
      },
    },
  }),

  watch: {
    "name.value": _.debounce(function() {
      if (this.validTarget(this.name, "이름을 입력해주세요"))
        this.validNameLimitTen(this.name);
    }, 600),
    "email.value": _.debounce(function() {
      if (this.validTarget(this.email, "이메일을 입력해주세요"))
        this.validEmail(this.email);
    }, 600),
  },

  computed: {
    changeTitle() {
      return this.isShowSecond ? "접수 완료" : "의견 남기기";
    },
  },

  methods: {
    /**
     * @description 테스트 파라미터 자동입력
     */
    setTest() {
      this.name.value = "김용현";
      this.email.value = "y_h_kim@openmate-on.co.kr";
      this.isVerifyCaptchar = true;
      this.textarea.value = "테스트입니다.";
      this.checkbox.value = true;
    },

    /**
     * @description init data
     */
    init() {
      this.name.value = null;
      this.email.value = null;
      this.selectbox.value = 0;
      this.googleVerify = false;
      this.textarea.value = null;
      this.checkbox.value = false;
      this.isAllPass = false;
      this.isShowSecond = false;
    },

    /**
     * @description verify in google rcaptchar
     * @param {String} data: return value
     */
    googleVerify(data) {
      if (data) this.isVerifyCaptchar = true;
    },

    /**
     * @description setting error message
     * @param {Object} target to apply target
     * @param {String} msg  error message
     */
    setErrorMsg(target = {}, msg = "") {
      if (!target.error) return "no target";

      target.error.isError = true;
      target.error.msg = msg;
    },

    /**
     * @description validate data
     * @param {Object} target to apply target
     * @param {String} msg error message
     * @returns {Boolean}
     */
    validTarget(target = {}, msg = "필수항목입니다") {
      target.error.isError = false;

      if (!target.value || target.value.length === 0) {
        this.isAllPass = false;
        this.setErrorMsg(target, msg);
        return false;
      }

      return true;
    },

    /**
     * @description 이름의 자릿수 10자 제한 검증
     * @param {Object} target to apply target
     * @returns {Boolean}
     */
    validNameLimitTen(target = {}) {
      const name = target.value;
      target.error.isError = false;

      if (name && name.length > 10) {
        this.isAllPass = false;
        this.setErrorMsg(target, "10자이내로 작성해주세요");
        return false;
      }

      return true;
    },

    /**
     * @description validate email type
     * @param {Object} target to apply target
     * @returns {Boolean}
     */
    validEmail(target = {}) {
      const regex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      const email = target.value;
      target.error.isError = false;

      if (!regex.test(email)) {
        this.isAllPass = false;
        this.setErrorMsg(target, "이메일 형식에 맞지 않습니다");
        return false;
      }

      return true;
    },

    /**
     * @description request to server
     */
    requestToServer(params = {}) {
      return new Promise((resolve, reject) => {
        axios
          .post(" /api/inquires/", params)
          .then((response) => resolve(response.data))
          .catch((error) => reject(error));
      });
    },

    /**
     * @description click to Send Button
     */
    clickSendButton() {
      const data = this.$data.params;
      this.isAllPass = true;

      if (this.validTarget(this.name, "이름을 입력해주세요"))
        this.validNameLimitTen(this.name);
      if (this.validTarget(this.email, "이메일을 입력해주세요"))
        this.validEmail(this.email);
      this.validTarget(this.checkbox);
      this.validTarget(this.textarea);
      if (!this.isVerifyCaptchar) this.isAllPass = false;

      if (!this.isAllPass) return;

      this.requestToServer({
        name: this.name.value,
        email: this.email.value,
        type: this.selectbox.value,
        content: this.textarea.value,
      })
        .then(() => (this.isShowSecond = true))
        .catch((err) => {
          this.setErrorMsg(this.server, this.server.error.msg);
          this.isShowSecond = false;
        });
    },

    /**
     * @description click to close button
     */
    clickCloseButton() {
      this.init();
      this.$emit("close");
    },
  },

  beforeCreate() {},
  created() {},
  beforeMount() {},
  mounted() {
    this.setTest();
  },
  beforeDestroy() {},
  destroyed() {},
};
</script>

<style scoped>
/*
.text-color {
  color: #fff;
}
.background-color {
  color: #0091e1;
}
.error-color {
  color: #ff2121;
}
.accent-color {
  color: #333333;
}
.font-xl {
  font:  normal normal bold 1.375rem/1.25rem Noto Sans CJK KR;
}
.font-l {
  font: normal normal normal 1.125rem/2rem Noto Sans CJK KR;
}
.font-m {
  font: normal normal normal 1rem/1.25rem Noto Sans CJK KR;
}
.font-s {
  font: normal normal bold 0.875rem/1.25rem Noto Sans CJK KR;
}
.font-s-s {
  font: normal normal normal 0.875rem/1.125rem Noto Sans CJK KR;
} 
.font-xs {
  font: normal normal normal 0.75rem/1.125rem Noto Sans CJK KR;
}
.font-xxs {
  font: normal normal normal 0.625rem/1.25rem Noto Sans CJK KR;
}
.font-xxs-s {
  font: normal normal normal 0.625rem/1.125rem Noto Sans CJK KR;
}
*/
.contact {
  /*
  --text-color: #fff;
  --background-color: #0091e1;
  --error-color: #ff2121;
  --accent-color: #333333;
  --font-XL: normal normal bold 1.375rem/1.25rem Noto Sans CJK KR;
  --font-L: normal normal normal 1.125rem/2rem Noto Sans CJK KR;
  --font-M: normal normal normal 1rem/1.25rem Noto Sans CJK KR;
  --font-S: normal normal bold 0.875rem/1.25rem Noto Sans CJK KR;
  --font-S-S: normal normal normal 0.875rem/1.125rem Noto Sans CJK KR;
  --font-XS: normal normal normal 0.75rem/1.125rem Noto Sans CJK KR;
  --font-XXS: normal normal normal 0.625rem/1.25rem Noto Sans CJK KR;
  --font-XXS-S: normal normal normal 0.625rem/1.125rem Noto Sans CJK KR;
  */
  background-color: #fff;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  width: 443px;
  height: 604px;
  box-shadow: 6px 6px 10px #00000029;
  border: 2px solid #008bd9;
  border-radius: 14px;
}

/* width */
::-webkit-scrollbar {
  width: 3px;
}

/* Track */
::-webkit-scrollbar-track {
  background: #fff;
}

/* Handle */
::-webkit-scrollbar-thumb {
  background: #0091E1;
      border-radius: 8px;
}

/* Handle on hover */
::-webkit-scrollbar-thumb:hover {
  background:#005583;
}

/* input 기본 스타일 초기화 */
input,
select {
  width: calc(100% - 165px);
  height: 100%;
  border-width: 0px;
  border: none;
  color: #919294;
  font: normal normal normal 1rem/1.25rem Noto Sans CJK KR;
}

select {
  width: 100%;
  background: transparent;
  background-image: url("/images/ask/btn-op03.png");
  background-repeat: no-repeat;
  background-position-x: 100%;
  background-position-y: 3px;
  -webkit-appearance: none;
  -moz-appearance: none;
  appearance: none;
  cursor: pointer;
}

select::-ms-expand {display:none}

textarea {
  width: 100%;
  height: 120px;
  overflow-y: scroll;
  border: 1px solid #707070;
  font: normal normal normal 0.875rem/1.125rem Noto Sans CJK KR;;
  color: #919294;
  margin: 0px;
  padding: 10px;
  box-sizing: border-box;
  resize: none;
}

input[id="cb1"] + label {
  display: inline-block;
  width: 18px;
  height: 18px;
  border: 1px solid #707070;
  cursor: pointer;
}

input[id="cb1"]:checked + label {
  background-image: url("/images/ask/ico-check.png");
  background-repeat: no-repeat;
  background-size: contain;
  background-position: center;
}

input[id="cb1"] {
  display: none;
}

.header {
  width: 100%;
  text-align: center;
  background: url(/images/ask/apply-bg.png) no-repeat #0075c1;
  background-size: cover;
  line-height: 50px;
  height: 50px;
  border-top-left-radius: 10px;
  border-top-right-radius: 10px;
  background-position-x: -9px;
  background-position-y: -9px;
}

.header span {
  vertical-align: middle;
  color: #fff;
  font: normal normal bold 1.375rem/1.25rem Noto Sans CJK KR;
}

.contents {
  width: 100%;
}

.contents .after {
  text-align: center;
  padding: 52px 84px 0 84px;
}

.contents .after img {
  width: 275px;
  height: 202px;
}

.contents .after p {
  padding: 22px 0 59px 0;
  font: normal normal bold 1.375rem/1.25rem Noto Sans CJK KR;
  color: #008bd9;
}

.contents .after span {
  display: inline-block;
  font: normal normal normal 1.125rem/2rem Noto Sans CJK KR;
  color: #656565;
}

.subbox {
  padding-top: 33px;
  border-bottom: 1px solid #d5d5d5;
}

.subbox.selectbox,
.subbox.textarea,
.subbox.captchar,
.subbox.checkbox {
  border-bottom: none;
}

.select_container {
  display: inline-block;
  width: 110px;
}

.subbox.textarea {
  padding: 22px 31px 0 31px;
}

.subbox.captchar {
  height: 67px;
  padding-top: 40px;
  padding: 23px 31px 0 31px;
}

.captchar_contents {
  /* background: #f3f3f3; */
  /* width: 100%; */
  /* height: 100%; */
}

.subbox.checkbox {
  padding: 19px 31px 0 31px;
}

.subbox.checkbox span {
  vertical-align: super;
  padding-left: 11px;
  color: #656565;
  font: normal normal normal 0.625rem/1.125rem Noto Sans CJK KR;;
}

.subbox.checkbox span.detail {
  font: normal normal normal 0.75rem/1.125rem Noto Sans CJK KR;;
  cursor: pointer;
}

.subbox .hd {
  width: 100px;
  display: inline-block;
  text-align: left;
  padding-left: 31px;
  color: #333333;
  font: normal normal bold 16px/20px Noto Sans CJK KR;
}

.footer {
  padding: 14px 31px 0 31px;
  display: flex;
  justify-content: space-between;
  position: relative;
  bottom: 0px;
}

.footer.after {
  justify-content: center;
  bottom: -37px;
}

.footer.after .button.send {
  display: none;
}

.footer .button {
  display: inline-block;
  width: 170px;
  height: 40px;
  line-height: 40px;
  text-align: center;
  background-color: #0091e1;
  border-radius: 20px;
  cursor: pointer;
}

.footer .button.cancel {
  float: right;
  border: 1px solid #0091e1;
  background-color: #fff;
}

.footer .button span {
  font: normal normal normal 0.875rem/1.125rem Noto Sans CJK KR;;
  color: #fff;
  vertical-align: middle;
}

.footer .button.cancel span {
  color: #0091e1;
}

.errorMsg {
  /* visibility: hidden; */
  font: normal normal normal 0.625rem/1.25rem Noto Sans CJK KR;;
  color: #ff2121;
  position: absolute;
  left: 135px;
}

.subbox.textarea .errorMsg,
.subbox.checkbox .errorMsg {
  color: #ff2121;
  position: static;
}

.errorMsg.server {
  text-align: center;
  font: normal normal normal 1rem/1.25rem Noto Sans CJK KR;
  position: static;
  padding-top: 16px;
}

/*
##Device = 대부분의 스마트폰 모바일 기기(세로)
##Screen = 320px에서 479px 사이
*/
@media (min-width: 320px) and (max-width: 480px) {
  .contact {
    position: fixed;
    top: -200vh;
    left: 0;
    width: 100%;
    height: 100%;
    border-radius: unset;
    transition: all 1s;
  }

  .contact.active {
    visibility: visible;
    top: 0;
  }

  .contents .after {
    text-align: center;
    padding: 55px 0 0 0;
  }

  .contents .after img {
    width: 213px;
    height: 156px;
  }

  .contents .after p {
    display: none;
  }

  .contents .after span {
    display: inline-block;
    font: normal normal normal 1rem/1.5rem Noto Sans CJK KR;
    color: #656565;
  }

  .contents .after span:first-of-type {
    font: normal normal bold 1.125rem/1.5rem Noto Sans CJK KR;
    color: #333333;
    padding-top: 37px;
  }

  .contents .after span:last-child {
    padding-top: 18px;
  }

  .footer .button {
    width: 140px;
    height: 44px;
  }

  .footer.after {
    padding-top: 69px;
  }

  .footer.after .cancel {
    background-color: #0091e1;
  }

  .footer.after .cancel span {
    color: #fff;
  }

  .header {
    border-radius: unset;
    background: url(/images/Layout/header-mbg.jpg) no-repeat #0075c1;
    background-size: cover;
    line-height: 62px;
    height: 62px;
  }

  .captchar_contents {
    transform: scale(0.77);
    -webkit-transform: scale(0.85);
    transform-origin: 0 0;
    -webkit-transform-origin: 0 0;
  }

  #rc-imageselect {
    transform: scale(0.77);
    -webkit-transform: scale(0.77);
    transform-origin: 0 0;
    -webkit-transform-origin: 0 0;
  }
}
</style>
