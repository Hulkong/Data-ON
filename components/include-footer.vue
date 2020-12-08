<template>
	<!-- s : #footer-wrap //-->
	<footer id="footer-wrap">
		<div id="footer" class="div-cont">
			<div class="f-link">
				<ul>
					<li><a href="javascript:void(0);" @click="goHomepage" title="새창으로 열림"><span>회사소개</span></a></li>
				</ul>
			</div>
			<div class="f-info">
				<p class="in-partner">사업제휴 및 홍보문의. <a href="mailto:sales@openmate-on.co.kr">sales@openmate-on.co.kr</a></p>
				<p class="in-company">
					<span>(주)오픈메이트온</span>
					<span>서울특별시 중구 청계천로 100, 시그니처타워 서관 11층</span>
				</p>
				<p class="in-num">
					<span>사업자번호. 763-88-01165  <i>대표 이은영</i></span>
					<span>TEL. 02-6956-7541</span>
					<span>FAX. 0505-055-7522</span>
				</p>
				<p class="in-copy">Copyright ⓒ OPENmate_ON All Rights Reserved.</p>
			</div>
		</div>
	</footer>
	<!-- e : #footer-wrap //-->
</template>

<script>
    // 페이지 이동시 로딩 화면 
  export default {
    methods: {
		goHomepage: function(){
			// 구글 애널리틱스 추가
			this.$sendGA('회사소개','클릭', '회사홈페이지로 이동');

			// 홈페이지로 이동
			window.open('about:blank').location.href='https://openmate-on.co.kr/';
		}
    }
  }
</script>