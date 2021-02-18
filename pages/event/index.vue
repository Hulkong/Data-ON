<template>
  <div id="container--event">
    <div class="container--event__description">
      <p class="container--event__title">데이터온 이벤트 소문내기!</p>
      <p class="container--event__subtitle">
        아래의 소문글과 이미지를 활용해, SNS와 커뮤니티에 널리 알려주세요.
      </p>
      <div class="container--event__arrow"></div>
      <event-cardlist @copied="validate"></event-cardlist>
    </div>

    <div class="container--event__link">
      <event-link
        @not-register="validate"
        @register="changePopupState({ willYouSeePrivacy: true })"
      ></event-link>
    </div>
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
    <div class="container--event__footer">
      <p class="container--event__footer__title">유의사항</p>
      <p class="container--event__footer__subtitle">
        - 참여여부를 확인할 수 있게 게시글은 참여기간 동안 전체공개 필수
      </p>
      <p class="container--event__footer__subtitle">
        - 비로그인 상태에서도 확인 가능한 게시글만 인정
      </p>
      <p class="container--event__footer__subtitle">
        - 중복 참여 가능하나, 동일한 URL로 중복 참여 불가
      </p>
      <p class="container--event__footer__subtitle">
        - 이벤트 경품은 내부 사정에 의해 동일한 가격대의 다른 상품으로 대체될 수
        있음
      </p>
      <p class="container--event__footer__subtitle">
        - 경품발송 시 입력한 핸드폰 번호로 발송되며, 번호 변경 및 재발송 불가
      </p>
      <p class="container--event__footer__subtitle">
        - 기프티콘은 유효기간 연장 불가, 타상품으로 변경 요청 불가
      </p>
    </div>
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
        privacy: false,
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
  min-width: 1025px;
  text-align: center;
  color: #fff;
  /* padding: 0 5rem; */
}

.container--event__description {
  background: #0075c1;
  height: 80vh;
  max-height: 613px;
  min-height: 613px;
  padding: 0 14%;
}

.container--event__link {
  height: 20vh;
  max-height: 153px;
  min-height: 153px;
  background: #ffffff;
}

.container--event__footer {
  background: #eeeeee;
  color: #333333;
}

.container--event__title {
  margin-top: 7rem;
  display: inline-block;
  font-size: 4rem;
  line-height: 4rem;
}

.container--event__subtitle {
  margin: 2rem 0 5rem 0;
  font-size: 1.25rem;
}
</style>