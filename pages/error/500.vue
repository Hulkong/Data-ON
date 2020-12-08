<template>
    <div class=".page-not-found.container contents">
        <div class="display-500">
            <p>일부 서비스 지연현상 안내</p>
          <img src="/images/Content/img_notify_404_02.png" alt="error" />
        </div>
        <h1 class="error-title"> 
            현재 서비스 이용에 지연이 발생하고 있습니다. <br/>
            이용중 오류가 발생한 경우에는 잠시 후 다시 시도해주세요.<br/><br/>

            빨리 정상화할 수 있도록 최선을 다하겠습니다.<br/><br/>

            죄송합니다.   
        </h1>
    </div>
</template>

<style scoped>
.error-title {
  text-align: center;
  color: rgba(#000, 0.67);
  font-weight: 300;
  padding-top: 60px;
  font: normal 20px/1 'Noto Sans KR', "Apple SD Gothic Neo", "Malgun Gothic";
}
.display-500 {
  position: relative;
  text-align:center;
  padding-top:60px;
  font: bold 60px/1  'Noto Sans KR', "Apple SD Gothic Neo", "Malgun Gothic";
  letter-spacing: -0.05em;
  color: rgba(#000, 0.05);
}

.display-500 img{ margin-top: 50px; }
</style>