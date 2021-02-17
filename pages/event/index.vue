<template>
  <div id="container--event">
    <p class="container--event__title">데이터온 이벤트 소문내기!</p>
    <p class="container--event__subtitle">
      아래의 소문글과 이미지를 활용해, SNS와 커뮤니티에 널리 알려주세요.
    </p>
    <event-cardlist @copied="validate"></event-cardlist>
    <event-link
      @not-register="validate"
      @register="changePopupState({ willYouSeePrivacy: true })"
    ></event-link>
    <event-popup-notice
      :willYouSeeIt="willYouSeeIt.notice"
      :message="message"
      @close-popup-notice="willYouSeeIt.notice = false"
    ></event-popup-notice>
    <event-popup-privacy
      :willYouSeeIt="willYouSeeIt.privacy"
      @participate="validate"
      @close-popup-privacy="willYouSeeIt.privacy = false"
    ></event-popup-privacy>
  </div>
</template>

<script>
export default {
  layout(context) {
    return "event";
  },

  data() {
    return {
      willYouSeeIt: {
        notice: false,
        privacy: true,
      },

      message: undefined,
      messages: {
        copy: `
          소문글이 복사 되었습니다.​<br>
          붙이기 원하는 곳에 Ctrl + V 또는 ​​<br>
          마우스 오른쪽 버튼 클릭 후 붙여넣기 하세요​
          `,
        success: `
          참여가 완료되었습니다.<br>
          감사합니다.
          `,
        fail: `
          이름, 핸드폰번호 입력 및<br>
          개인정보 수집동의란 체크는 필수입니다.
          `,
        notRegister: `
          소문 낸 링크를 입력하신 후<br>
          등록하기 버튼을 눌러주세요.
          `,
      },
    };
  },

  methods: {
    changePopupState({
      willYouSeeNotice = false,
      willYouSeePrivacy = false,
      message = null,
    } = {}) {
      this.willYouSeeIt.notice = willYouSeeNotice;
      this.willYouSeeIt.privacy = willYouSeePrivacy;
      this.message = message;
    },

    validate(type = null) {
      if (!type) return;

      switch (type) {
        case "copy":
          this.changePopupState({
            willYouSeeNotice: true,
            message: this.messages.copy,
          });
          break;
        case "success":
          this.changePopupState({
            willYouSeeNotice: true,
            willYouSeePrivacy: true,
            message: this.messages.success,
          });
          break;
        case "fail":
          this.changePopupState({
            willYouSeeNotice: true,
            willYouSeePrivacy: true,
            message: this.messages.fail,
          });
          break;
        case "notRegister":
          this.changePopupState({
            willYouSeeNotice: true,
            message: this.messages.notRegister,
          });
          break;
      }
    },
  },
};
</script>

<style scoped>
#container--event {
  height: 100vh;
  min-width: 1025px;
  padding: 0 5rem;
  background: #0075c1;
  color: #ffffff;
}

.container--event__title {
  text-align: center;
  font: normal normal bold 90px/133px Noto Sans CJK KR;
  letter-spacing: -2.7px;
  padding-top: 5rem;
}

.container--event__subtitle {
  font: normal normal normal 40px/40px Noto Sans CJK KR;
  letter-spacing: -1.2px;
  color: #ffffff;
  margin-top: 2rem;
}
</style>