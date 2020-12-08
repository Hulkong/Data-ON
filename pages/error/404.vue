<template>
    <div class=".page-not-found.container contents">
        <!-- <h1 class="error-title"> 요청한 페이지를 찾을 수 없습니다.</h1>
        <div class="display-404">404</div> -->
        
        <div class="display-404">
          <p>페이지를 찾을 수 없습니다.</p>
          <img src="/images/Content/img_notify_404.png" alt="404error" />
        </div>
        
        <h1 class="error-title"> 
            존재하지 않는 주소를 입력하셨거나, <br/>
            요청하신 페이지의 주소가 변경, 삭제되어 찾을 수 없습니다.<br/><br/>

            궁금한 점이 있으시면 언제든 문의해주세요.<br/><br/>

            감사합니다.   
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
.display-404 {
  position: relative;
  text-align:center;
  padding-top:60px;
  font: bold 60px/1  'Noto Sans KR', "Apple SD Gothic Neo", "Malgun Gothic";
  letter-spacing: -0.05em;
  color: rgba(#000, 0.05);
}
.display-404 img {margin-top:50px;}
</style>