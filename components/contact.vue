<template>
  <div class="contact">
    <!-- header -->
    <div class="header">
      <span>의견 남기기</span>
    </div>
    <!-- header -->

    <!-- contents -->
    <div class="contents">
      <!-- name -->
      <div class="subbox name">
        <span class="hd">이름</span>
        <input type="text" name="name" placeholder="이름을 작성해주세요 :)" v-model="params.name" />
        <p class="errorMsg" v-show="this.errorMsg.name">10자이내로 작성해주세요</p>
      </div>
      <!-- name -->

      <!-- email -->
      <div class="subbox eamil">
        <span class="hd">이메일</span>
        <input type="text" name="email" placeholder="메일 주소를 작성해주세요 :)" v-model="params.email" />
        <p class="errorMsg" v-show="this.errorMsg.email">이메일 형식에 맞지 않습니다</p>
      </div>
      <!-- email -->

      <!-- selectbox -->
      <div class="subbox selectbox">
        <span class="hd">의견 유형</span>
        <div class="select_container">
          <select name="type">
            <option
              v-for="(item, index) in selects"
              :key="index"
              :value="item.value"
            >{{ item.value }}</option>
          </select>
        </div>
      </div>
      <!-- selectbox -->

      <!-- textarea -->
      <div class="subbox textarea">
        <textarea type="text" name="opinion" placeholder="의견 내용을 남겨주세요." v-model="params.opinion" />
        <p class="errorMsg" v-show="this.errorMsg.opinion">필수항목입니다</p>
      </div>
      <!-- textarea -->

      <!-- captchar -->
      <div class="subbox captchar">
        <div class="captchar_contents"></div>
      </div>
      <!-- captchar -->

      <!-- checkbox -->
      <div class="subbox checkbox">
        <input type="checkbox" id="cb1" v-model="params.isCheckedInfo" />
        <label for="cb1"></label>
        <span>개인정보 수집 및 이용 동의(필수)</span>
        <span class="detail">[자세히보기]</span>
        <span class="errorMsg" v-show="this.errorMsg.isCheckedInfo">필수항목입니다</span>
      </div>
      <!-- checkbox -->
    </div>
    <!-- contents -->

    <div class="footer">
      <div class="button send" @click="clickSendButton">
        <span>보내기</span>
      </div>
      <div class="button cancel">
        <span>닫기</span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data: () => ({
    errorMsg: {
      name: false,
      email: false,
      opinion: false,
      isCheckedInfo: false
    },
    params: {
      name: null,
      email: null,
      selected: null,
      opinion: null,
      isCheckedInfo: false
    }
  }),

  props: {
    selects: {
      type: Array,
      required: true,
      default: () => [{ value: "input the value" }]
      //   validator(value) {}
    }
  },

  computed: {},
  methods: {
    validNameLimitTen: (name = "") =>
      name && name.length <= 10 ? true : false,
    validName: (name = "") => (name ? true : false),
    validEmail(email) {
      const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      return re.test(email);
    },
    validOpinion: (opinion = "") =>
      opinion && opinion.length > 0 ? true : false,

    clickSendButton() {
      const data = this.$data.params;
      let isInvalid = false;

      if (!this.validNameLimitTen(data["name"])) {
        this.errorMsg.name = true;
        isInvalid = true;
      } else {
        this.errorMsg.name = false;
      }

      if (!this.validEmail(data["email"])) {
        this.errorMsg.email = true;
        isInvalid = true;
      } else {
        this.errorMsg.email = false;
      }

      if (!this.validOpinion(data["opinion"])) {
        this.errorMsg.opinion = true;
        isInvalid = true;
      } else {
        this.errorMsg.opinion = false;
      }

      if (!data["isCheckedInfo"]) {
        this.errorMsg.isCheckedInfo = true;
        isInvalid = true;
      } else {
        this.errorMsg.isCheckedInfo = false;
      }

      if (isInvalid) return;
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
/* input 기본 스타일 초기화 */
input,
select {
  width: calc(100% - 165px);
  height: 100%;
  border-width: 0px;
  border: none;
  color: #919294;
  font: normal normal normal 16px/20px Noto Sans CJK KR;
}

select {
  width: 100%;
  background: transparent;
  background-image: url("data:image/svg+xml;utf8,<svg fill='black' height='24' viewBox='0 0 24 24' width='24' xmlns='http://www.w3.org/2000/svg'><path d='M7 10l5 5 5-5z'/><path d='M0 0h24v24H0z' fill='none'/></svg>");
  background-repeat: no-repeat;
  background-position-x: 100%;
  background-position-y: bottom;
  -webkit-appearance: none;
  -moz-appearance: none;
  cursor: pointer;
}

textarea {
  width: 100%;
  height: 120px;
  overflow-y: scroll;
  border: 1px solid #707070;
  font: normal normal normal 14px/18px Noto Sans CJK KR;
  color: #919294;
  margin: 0px;
  padding: 10px;
  box-sizing: border-box;
  resize: none;
}

input[id="cb1"] + label {
  display: inline-block;
  width: 20px;
  height: 20px;
  border: 2px solid #bcbcbc;
  cursor: pointer;
}

input[id="cb1"]:checked + label {
  background-color: #666666;
}

input[id="cb1"] {
  display: none;
}

.contact {
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  position: relative;
  width: 443px;
  height: 604px;
  box-shadow: 6px 6px 10px #00000029;
  border: 2px solid #008bd9;
  border-radius: 10px;
}

.header {
  background: #0075c1;
  align-items: revert;
  width: 100%;
  line-height: 51px;
  text-align: center;
}

.header span {
  vertical-align: middle;
  color: white;
  font: normal normal bold 22px/20px Noto Sans CJK KR;
}

.contents {
  width: 100%;
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
  width: 100px;
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
  background: #f3f3f3;
  width: 100%;
  height: 100%;
}

.subbox.checkbox {
  padding: 19px 31px 0 31px;
}

.subbox.checkbox span {
  vertical-align: super;
  padding-left: 11px;
  color: #656565;
  font: normal normal normal 10px/18px Noto Sans CJK KR;
}

.subbox.checkbox span.detail {
  font: normal normal normal 12px/18px Noto Sans CJK KR;
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
  background-color: white;
}

.footer .button span {
  font: normal normal bold 14px/20px Noto Sans CJK KR;
  color: white;
  vertical-align: middle;
}

.footer .button.cancel span {
  color: #0091e1;
}

.errorMsg {
  /* visibility: hidden; */
  font: normal normal normal 10px/20px Noto Sans CJK KR;
  color: #ff2121;
  position: absolute;
  left: 135px;
}

.subbox.textarea .errorMsg,
.subbox.checkbox .errorMsg {
  color: #ff2121;
  position: static;
}
</style>