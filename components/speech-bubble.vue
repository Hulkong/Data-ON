<template>
  <div class="speech-bubble">
    <div class="header">
      <span>잠깐!</span>
      <img
        src="/images/ask/btn_no-result-popup_colse.png"
        alt=""
        @click="close"
      />
    </div>
    <div class="contents">
      필요한 <span class="empasis">데이터를</span> 알려주시면<br />
      빠른 시일 내에 찾아오겠습니다.
    </div>
    <div class="footer">
      <span>아래 아이콘을 클릭해주세요</span>
      <img src="/images/ask/ico_no-result-popup_down.png" alt="" />
    </div>
  </div>
</template>

<script>
export default {
  methods: {
    close() {
      this.$emit("speech-bubble-close");
    },
  },
};
</script>

<style>
.speech-bubble {
  position: fixed;
  right: 23px;
  bottom: 33px;
  width: 301px;
  height: 160px;
  background-color: rgb(249, 251, 252);
  border: 2px solid rgb(0, 98, 172);
  margin-bottom: 76px;
  -webkit-border-radius: 5px;
  box-shadow: 5px 5px 5px rgba(0, 0, 0, 0.1);
  -webkit-box-shadow: 5px 5px 5px rgba(0, 0, 0, 0.1);
  -moz-box-shadow: 5px 5px 5px rgba(0, 0, 0, 0.1);
  letter-spacing: 0px;
  text-align: center;
}

.speech-bubble::after {
  border-right: 2px solid #0062ac;
  border-bottom: 2px solid #0062ac;
  content: "";
  position: absolute;
  bottom: -7px;
  left: 267px;
  background-color: rgb(249, 251, 252);
  width: 10px;
  height: 10px;
  -webkit-transform: rotate(45deg);
  -moz-transform: rotate(45deg);
  -ms-transform: rotate(45deg);
  -o-transform: rotate(45deg);
  transform: rotate(45deg);
}

.speech-bubble .header {
  margin: 17px 0 12px 0;
  font: normal normal bold 22px/33px Noto Sans CJK KR;
  color: #454545;
}

.speech-bubble .header img {
  position: absolute;
  width: 14px;
  height: 14px;
  padding-right: 12px;
  right: 0;
  top: 12px;
  cursor: pointer;
}

.speech-bubble .contents {
  margin-bottom: 16px;
  font: normal normal normal 18px/22px Noto Sans CJK KR;
  color: #666666;
}

.speech-bubble .contents .empasis {
  font: normal normal bold 18px/22px Noto Sans CJK KR;
  color: #0091e1;
}

.speech-bubble .footer {
  text-align: right;
  font: normal normal normal 14px/15px Noto Sans CJK KR;
  color: #454545;
}

.speech-bubble .footer img {
  width: 10px;
  height: 15px;
  margin: 0 22px 0 2px;
  vertical-align: text-top;
}
</style>