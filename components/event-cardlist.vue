<template>
  <div id="event-cardlist">
    <div class="event-cardlist__flex">
      <div class="event-cardlist__flex__header">Step 01</div>
      <div class="event-cardlist__flex__contents">
        아래 소문글을 복사해주세요.
      </div>
      <div
        class="event-cardlist__flex__button--copy"
        v-clipboard:copy="message"
        v-clipboard:success="onCopy"
        v-clipboard:error="onError"
      >
        소문글 복사하기
      </div>
    </div>
    <div class="event-cardlist__flex">
      <div class="event-cardlist__flex__header">Step 02</div>
      <div class="event-cardlist__flex__contents">
        <p>
          소문내기 이미지를<br />
          다운받기 해주세요
        </p>
      </div>
      <div class="event-cardlist__flex__button--copy">
        <a href="/images/ask/bt-inquire.png" download>이미지 다운로드</a>
      </div>
    </div>
    <div class="event-cardlist__flex">
      <div class="event-cardlist__flex__header">Step 03</div>
      <div class="event-cardlist__flex__contents">
        <p>
          본인의 SNS나 카페 등<br />
          커뮤니티에 복사한 글과 이미지를<br />
          활용하여 소문내주세요.<br />
          (*전체공개 필수)
        </p>
      </div>
    </div>
    <div class="event-cardlist__flex">
      <div class="event-cardlist__flex__header">Step 04</div>
      <div class="event-cardlist__flex__contents">
        <p>
          업로드한 게시글의 URL을<br />
          아래 링크 입력란에<br />
          등록 해주세요.
        </p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      message: `
품질기반의 표준데이터 검색 플랫폼​

DATA-ON 을 소개합니다.​

​

① 흩어진 데이터를 한 곳에서 검색가능​

② 통합기준으로 표준화한 데이터 제공 ​

③ 데이터 다운받기 전 품질확인 가능​

④ 회원가입 없이 무료로 다운로드 가능​

​

데이터온 런칭 소식 소문내면​

스타벅스 아메리카노까지~!​

지금 바로 참여해 보세요!​

​

★DATA-ON 런칭기념★​

소문내기EVENT 진행 중(~3/7)​

​

커피쿠폰받으러가기▶  (링크)​
        `,
    };
  },

  methods: {
    onCopy: function (e) {
      this.$emit("copied", "copy");
    },
    onError: function (e) {
      alert("Failed to copy texts");
    },
  },
};
</script>

<style scoped>
#event-cardlist {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;

  margin-top: 6rem;
  text-align: center;
  font: normal normal normal 20px/40px Noto Sans CJK KR;
  letter-spacing: -0.9px;
  color: #333333;
}

.event-cardlist__flex {
  width: 25vh;
  height: 25vh;
  margin: 0 auto;
  border-radius: 15vh;
  background: #ffffff 0% 0% no-repeat padding-box;
  box-shadow: 3px 6px 6px #00000029;
}

.event-cardlist__flex__header {
  padding: 5px 0;
  width: 70px;
  background: #0062ac 0% 0% no-repeat padding-box;
  border: 3px solid #ffffff;
  border-radius: 28px;
  margin: 0 auto;
  margin-top: -13px;
  display: block;
}
</style>