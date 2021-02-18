<template>
  <div id="event-cardlist">
    <div class="event-cardlist__flex">
      <div class="event-cardlist__flex__header">
        <p class="event-cardlist__flex__header__text">Step 01</p>
      </div>
      <div class="event-cardlist__flex__contents">
        <p class="event-cardlist__flex__contents__text">
          아래 소문글을 <br />복사해주세요.
        </p>
      </div>
      <div
        class="event-cardlist__flex__button"
        v-clipboard:copy="message"
        v-clipboard:success="onCopy"
        v-clipboard:error="onError"
      >
        <p class="event-cardlist__flex__button__text __copy">
          <strong>소문글</strong> 복사하기
        </p>
      </div>
    </div>
    <div class="event-cardlist__flex">
      <div class="event-cardlist__flex__header">
        <p class="event-cardlist__flex__header__text">Step 02</p>
      </div>
      <div class="event-cardlist__flex__contents">
        <p class="event-cardlist__flex__contents__text">
          소문내기 이미지를<br />
          다운받기 해주세요
        </p>
      </div>
      <div class="event-cardlist__flex__button">
        <p class="event-cardlist__flex__button__text __download">
          <a href="/images/event/img_event_01.png" download="event_image.png">
            <strong>이미지</strong> 다운로드
          </a>
        </p>
      </div>
    </div>
    <div class="event-cardlist__flex">
      <div class="event-cardlist__flex__header">
        <p class="event-cardlist__flex__header__text">Step 03</p>
      </div>
      <div class="event-cardlist__flex__contents">
        <p class="event-cardlist__flex__contents__text">
          본인의 SNS나 카페 등<br />
          커뮤니티에 복사한 글과 이미지를<br />
          활용하여 소문내주세요.<br />
          <span class="event-cardlist__flex__contents__text__empasiz"
            >(*전체공개 필수)</span
          >
        </p>
      </div>
    </div>
    <div class="event-cardlist__flex">
      <div class="event-cardlist__flex__header">
        <p class="event-cardlist__flex__header__text">Step 04</p>
      </div>
      <div class="event-cardlist__flex__contents">
        <p class="event-cardlist__flex__contents__text">
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
a {
  color: inherit;
}

#event-cardlist {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  text-align: center;
  justify-content: space-between;
}

.event-cardlist__flex {
  position: relative;
  width: 15vw;
  height: 15vw;
      min-width: 200px;
    min-height: 200px;
  border-radius: 15vw;
  background: #ffffff;
  box-shadow: 3px 6px 6px #00000029;
}

.event-cardlist__flex__header {
  position: absolute;
  width: 100%;
  margin-top: -13px;
}

.event-cardlist__flex__header__text {
  padding: 3px 0;
  width: 82px;
  background: #0062ac;
  border: 2px solid #ffffff;
  border-radius: 28px;
  margin: 0 auto;
}

.event-cardlist__flex__contents {
  display: table;
  width: 100%;
  height: 100%;
  color: #333333;
}

.event-cardlist__flex__contents__text {
  display: table-cell;
  vertical-align: middle;
}

.event-cardlist__flex__contents__text__empasiz {
  color: #1982c7;
}

.event-cardlist__flex__button {
  padding-bottom: 12%;
  height: 33%;
  width: 78%;
  display: table;
  margin: 0 auto;
  margin-top: -25%;
  background: #0075c1;
  border-radius: 5px;
}

.event-cardlist__flex__button__text {
  border-radius: 5px;
  display: table-cell;
  vertical-align: middle;
  cursor: pointer;
}

.event-cardlist__flex__button__text.__copy {
  background: #2c3a68;
}

.event-cardlist__flex__button__text.__download {
  background: #9f4a00;
}
</style>