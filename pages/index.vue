<template>
	<div id="contents">
		<!-- s: page-start//-->
		<!-- s: msec-01  -->
		<div class="msec-01">
			<div class="div-cont">
				<div class="minit">
					<h1 class="logo"><a href="/"><span class="blind">Data-on</span></a></h1>
					<nuxt-link to="/notice" class="bt-notice"><span>공지사항</span></nuxt-link> 
				</div>
				<h3><span class="typing-txt">누구나 쉽게 찾고 <br />활용하는 데이터플랫폼</span></h3>
				<div class="search">
					<p class="chk-input">
						<input type="text" 
							   :placeholder="docW < 1000 ? '데이터를 검색 해보세요' : '대한민국의 모든 데이터를 한곳에서 검색 해보세요'" 
							   v-model="keyword" 
							   @keyup.enter="goSearch"/>
						<button class="enter" @click="goSearch"><span class="blind">검색</span></button>
					</p>
				</div>
				<like-slider></like-slider>
			</div>
		</div>
		<!-- e: msec-01  -->
		<!-- s: msec-02  -->
		<div class="msec-02">
			<div class="div-cont">
				<h3><span>Data-ON</span>에서는 데이터통합의 기준이 되는 행정경계, 표준코드체계 파일을 제공합니다.</h3>
				<div class="con">
					<div class="item areas">
						<div class="tit read over">
							<h4>행정경계 영역 <br />다운로드</h4>
							<a href="#none" class="help" 
								@mouseover="regionPop = !regionPop" 
								@mouseout="regionPop = !regionPop"
							><span class="blind">도움말</span></a>

							<div class="tooltip" v-show="regionPop">
								<p>
									행정안전부에서 공개하는 도로명주소 전자지도 정보(www.juso.go.kr)와 통계청 통계지리정보서비스(sgis.kostat.go.kr)에서 제공하는 행정동 경계 파일을 기반으로 변경 이력을 반영한 파일(github.com/vuski/admdongkor)을 제공합니다.
								</p>
							</div>
						</div>
						<div class="txt" v-if="getResult('region') && getResult('region').length > 0">
							<ul>
								<template v-for="(item, index) in getResult('region')">
									<a  v-if="index == 0" 
										href="javascript:void(0);" 
										class="all-down" 
										:key="index"
										@click="$downloadFile(item.tbattachFiles, downCallback)"
									>
										<span>{{item.data_nm}}</span>
									</a>
									<li v-else :key="index">
										<a  href="javascript:void(0);" 
											@click="$downloadFile(item.tbattachFiles, downCallback)"
										>
											<span>{{item.data_nm}}</span>
										</a>
									</li>
								</template>
							</ul>
						</div>
						<div class="txt" v-else>
							<ul>
								<li><span class="noData">등록된 표준코드 체계가 없습니다.</span></li>
							</ul>
						</div>
						<p class="ex" v-if="getStdrDate('region') != ''">
							{{getStdrDate("region")}}
						</p>
					</div>
					<div class="item codes">
						<div class="tit read over">
							<h4>표준코드 체계 <br />다운로드</h4>
							<a href="#none" class="help"
								@mouseover="stdrPop = !stdrPop" 
								@mouseout="stdrPop = !stdrPop"
							><span class="blind">도움말</span></a>
							<div class="tooltip over" v-show="stdrPop">
								<p>
									통계분류포털(kssc.kostat.go.kr)에서 제공하는 행정구역분류 총괄표에 제시된 행정구역별 코드와 표준 명칭을 엑셀파일로 제공합니다. 행정구역 수준에 따라 시트(sheet)로 분리하여 코드를 제공하며, 결합할 수 있는 가장 높은 수준의 행정구역코드까지 제공합니다.
								</p>
							</div>
						</div>
						<div class="txt"  v-if="getResult('stdr') && getResult('stdr').length > 0">
							<ul>
								<template v-for="(item, index) in getResult('stdr')">
									<a  v-if="index == 0" 
										href="javascript:void(0);" 
										class="all-down" 
										:key="index"
										@click="$downloadFile(item.tbattachFiles, downCallback)"
									>
										<span>{{item.data_nm}}</span>
									</a>
									<li v-else :key="index">
										<a  href="javascript:void(0);"
											@click="$downloadFile(item.tbattachFiles, downCallback)"
										>
											<span>{{item.data_nm}}</span>
										</a>
									</li>
								</template>
							</ul>
						</div>
						<div class="txt" v-else>
							<ul>
								<li><span class="noData">등록된 표준코드 체계가 없습니다.</span></li>
							</ul>
						</div>
						<p class="ex" v-if="getStdrDate('stdr') != ''">
							{{getStdrDate("stdr")}}
						</p>
					</div>
					<div class="item notice">
						<div class="tit">
							<h4>공지사항</h4>
							<nuxt-link to="/notice" class="more"><span>+ 더 보기</span></nuxt-link>
						</div>
						<div class="list">
							<ul v-if="getNoticeList.length > 0">
								<li v-for="(item, index) in getNoticeList" :key="index">
									<nuxt-link :to="'/notice/'+item.id">
										{{$cutText(item.title, '...', 16)}}
										<span>{{$dateFormat(item.reg_date,'-')}}</span>
									</nuxt-link>
								</li>
							</ul>
							<ul v-if="getNoticeList.length === 0">
								<li>
									<span class="noData">등록된 공지사항이 없습니다.</span>
								</li>
							</ul>
						</div>
					</div>
				</div>
			</div>
		</div>
		<!-- e: msec-02  -->
		<!-- s: msec-03  -->
		<div class="msec-03">
			<div class="div-cont">
				<h3><span>Data-ON</span><i>,</i> 왜 필요한가요?</h3>
				<div class="con">
					<ul>
						<li>
							<div>
								<div class="ico">
									<p class="desktop"><img src="/images/Main/why-ico01.png" alt=""/></p>
									<p class="mobile"><img src="/images/Main/why-ico01m.png" alt=""/></p>
								</div>
								<div class="utxt">
									<p><span>한 곳</span>에서<br />검색하세요</p>
								</div>
								<div class="btxt desktop">
									<p>AA빅데이터 플랫폼, <br />OO빅데이터 센터,<br />XX빅데이터 거래소 … </p>
									<p class="mg30t">내가 원하는 데이터를 <br />한곳에서 검색 할 순 없을까?</p>
								</div>
								<div class="btxt mobile">
									<p>AA빅데이터 플랫폼, OO빅데이터 센터..<br />내가 원하는 데이터를<br />한곳에서 검색 할 순 없을까?</p>
								</div>
							</div>
						</li>
						<li>
							<div>
								<div class="ico">
									<p class="desktop"><img src="/images/Main/why-ico02.png" alt=""/></p>
									<p class="mobile"><img src="/images/Main/why-ico02m.png" alt=""/></p>
								</div>
								<div class="utxt">
									<p><span>손품</span>을<br />덜어드립니다</p>
								</div>
								<div class="btxt desktop">
									<p>찾았다! 하면 링크로 연결… <br />다운로드! 하면  <br />포멧도 단위도 시점도 제각각</p>
									<p class="mg30t">데이터 전처리에만 80%의 <br />시간을 쓰게 됩니다.</p>
								</div>
								<div class="btxt mobile">
									<p>찾았다! 하면 링크로 연결… <br />다운로드! 하면  포멧도 단위도 시점도 제각각<br />데이터 전처리에만 80%의 시간을 쓰게 됩니다.</p>
								</div>
							</div>
						</li>
						<li>
							<div>
								<div class="ico">
									<p class="desktop"><img src="/images/Main/why-ico03.png" alt=""/></p>
									<p class="mobile"><img src="/images/Main/why-ico03m.png" alt=""/></p>
								</div>
								<div class="utxt">
									<p>쉽게 <br /><span>사용</span>하세요</p>
								</div>
								<div class="btxt desktop">
									<p>라떼는 말이야…</p>
									<p class="mg30t">‘경험’과  ‘직관’을 넘어 <br />데이터로 미래를 예측하고 <br />변화를 분석하는 것은  <br />‘선택이 아닌 필수’가 되었습니다.</p>
								</div>
								<div class="btxt mobile">
									<p>라떼는 말이야…‘경험’과  ‘직관’을 넘어 <br />데이터로 미래를 예측하고 변화를 분석 하는 것은 <br /> ‘선택이 아닌 필수’가 되었습니다.</p>
								</div>
							</div>
						</li>
					</ul>
				</div>
			</div>
		</div>
		<!-- e: msec-03  -->
		<!-- e: page-end //-->
	</div>
</template>
<script>
import { mapState, mapMutations, mapGetters, mapActions } from "vuex";
export default {
	computed: {
		...mapGetters('mainList',[
			'getParam', 			 // 각 store list의 param 세팅 가져오기
			'getUrl', 				 // 각 store list의 url 가져오기
			'getStdrDate', 	 // 행정경계, 표준체계 리스트의 기준 년월 가져오기
			'getResult', 		 // 각 store list의 결과값 자겨오기
			'getNoticeList', // 공지사항 리스트 가져오기(구조가 다름)
		]),
	},
	data: function(){
		return {
			docW: 1000,												// 전체 화면 width 
			initDataNames: ['region', 'stdr', 'notice'],			// 초기 데이터 가져올 store list
			keyword: "",												// 키워드
			regionPop: false,											// 행정경계 영역 tooltip on/off
			stdrPop: false												// 표준코드 체계 tooltip on/off
		}
	},
	beforeDestroy(){
		window.removeEventListener('resize', this.onResize);
		window.removeEventListener('load', this.onResize);
	},
	mounted(){

		var that = this;

		// 사이즈 조절에 따른 스타일 적용
		this.$nextTick(function() {
			this.sizeControlMain(that.$el.clientWidth);
			window.addEventListener('load', this.onResize);
			window.addEventListener('resize', this.onResize);
		});

		// 메인에서 사용할 데이터 가져오기
		this.fetchData();
	},
	methods: {
		...mapActions("mainList", ["getData"]),
		...mapActions("search", ["addDownCnt"]),
		...mapMutations("search", ["setKeyword"]),
		/**
		 * 화면 resize
		 */
		sizeControlMain : function (width) {
			width = parseInt(width);
			var bodyHeight = document.documentElement.clientHeight; 
			var bodyWidth = document.documentElement.clientWidth; 
			this.docW = $('#doc').outerWidth();
		},
		/**
		 * 초기 데이터 가져오기
		 */
		fetchData: function(){
			this.initDataNames.map((name)=>{
				var posts = {};
				posts.param = this.getParam(name);
				posts.url = this.getUrl(name);
				posts.storeName = name;
				this.getData(posts);
			});
		},
		/**
		 * 검색
		 */
		goSearch: function(){
			var searchKey = this.$trim(this.keyword);
			var valids = this.$validateLen(searchKey, 2, 50);

			// 구글 애널리틱스 추가
			if(this.$deviceChk()) this.$sendGA(this,'메인검색_mobile','검색', searchKey);
			else this.$sendGA(this,'메인검색_pc','검색', searchKey);

			// 검색
			if(valids.status){
				this.setKeyword(searchKey);
				this.$router.push( '/search?keyword='+ searchKey );
			}else{
				alert(valids.message);
			}
			
		},
		/**
		 * 파일 다운로드 콜백함수
		 */
		downCallback: function(file){
            // 구글 애널리틱스 추가
            this.$sendGA(this,'메인 다운로드','다운로드', file.origin_nm);

            // 다운로드 수 증가
            this.addDownCnt(file.id);
        }
	}
}
</script>
<style scoped src="../assets/css/main.css"></style>
<style scoped>
.msec-02 .div-cont .con .item ul li span.noData {
    line-height: 1.25em;
    font-size: 18px;
    color: #666666;
    display: block;
    position: relative;
    padding: 25px 30px 0 27px;
    display: block;
    -webkit-box-sizing: border-box;
    box-sizing: border-box;
    letter-spacing: -0.02em;
    word-break: keep-all;
    max-height: 46px;
	overflow: hidden;
}
#contents >>> .msec-01 .minit .logo a{ 
	display:block;width:166px;background:url(/images/logo.png) no-repeat left center;  background-size:100% auto; -webkit-transition: all 0s ease-in-out;-moz-transition: all 0s ease-in-out;-o-transition: all 0s ease-in-out;transition: all 0s ease-in-out;
}
#contents >>> .msec-02 .con .tit .tooltip {
	height:140px;
}

@media only screen and (max-width:999px) {
	#contents >>> .msec-01 h3 span{display:inline-block;vertical-align:top;text-align:center; line-height:1.5em;}
	#contents >>> .msec-01 .minit .logo a{display:inline-block;vertical-align:top;background-size:100% auto; min-width:169px; min-height:45px; max-width:249px; max-height:66px;}
}
</style>
