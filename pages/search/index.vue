<template>
	<div id="contents" @click="closeOrder">
		<loading-data :loading=getLoading></loading-data>
		<!-- s: page-start//-->
		<div class="u-tab01">
			<ul>
				<li :class="{'active':(getCategory == 'title')}"><a href="javascript:void(0);" @click="changeCategory('title')" ><span>데이터 명 ({{getCount('title_count')}})</span></a></li>
				<li :class="{'active':(getCategory == 'detail')}"><a href="javascript:void(0);" @click="changeCategory('detail')"><span>데이터 설명 ({{getCount('detail_count')}})</span></a></li>
				<li :class="{'active':(getCategory == 'column')}"><a href="javascript:void(0);" @click="changeCategory('column')"><span>데이터 컬럼 ({{getCount('column_count')}})</span></a></li>
			</ul>
		</div>
		<div class="bd-line m-show"></div>
		<!-- s: sel-filter -->
		<include-top-filter></include-top-filter>
		<!-- e: sel-filter -->
		<div class="search-wrap">
			<div class="filter">
				<p class="total">총 {{getCount(getCategory+'_count')}}건</p>
				<!-- s: 정렬선택박스 -->
				<div class="abr" :class="{'active':order_active}">
					<p>리스트 정렬</p>
					<div class="sel">
						<a href="javascript:void(0);" class="sel-btn" @click="openSelBox"><span>{{getOrderbyNm}}</span></a>
						<ul v-if="orderList.length > 0">
							<li v-for="item in orderList" 
								:key="item.id"
								:class="{'active':(getOrderby == item.id)}" 
							>
								<a href="javascript:void(0);" @click="changeOrderby(item.id, item.name)">
									<span>{{item.name}}</span>
								</a>
							</li>
						</ul>
					</div>
				</div>
				<!-- s: 정렬선택박스 -->
				<p class="ex">※ PC 웹버전에서 다양한 검색결과 확인이 가능합니다.</p>
			</div>
			<!-- list 시작 -->
			<div class="list" v-if="getCount(getCategory+'_count') > 0">
				<!-- s : item -->
				<div class="item" 
					v-for="item in getList" 
					:key="item.id"
					:class="{'active':(detail_id.includes(item.id))}"
				>
					<!-- s : con -->
					<div class="con info">
						<!-- s: 평가 차트 -->
						<div class="graph" v-if="docW >= 840 && item.tbresultEvaluation !== undefined && item.tbresultEvaluation !== null">
							<chart-radar
								:radarId="item.id"
								:radarData="cleanData(item.tbresultEvaluation)"
								ref="radar2" 
							></chart-radar>
						</div>
						<!-- e: 평가 차트 -->
						<div class="inups" @click="openDetail(item.id, item.dt_type)">
							<a href="javascript:void(0);" class="ctrl" >
								<span class="blind">자세히보기</span>
							</a>
							<!-- 데이터명 -->
							<p  class="tit" 
								:class="{'lighton':(getCategory == 'title'), 'nolevel':(item.dt_level =='원본')}"
								v-html="'<strong>'+item.dt_level+'</strong>'+item.dt_title"></p>

							<!-- 키워드 -->
							<p class="hash">
								<span>#{{$stringToDate(item.dt_date)}}</span>
								<!-- <span>#{{$cutText(item.dt_date,'년',4,0)}} {{$cutText(item.dt_date,'월',2,4)}} {{$cutText(item.dt_date,'일',2,6)}}</span> -->
								<span>#{{item.dt_organ}}</span>
								<span>#{{item.dt_category}}</span>
							</p>

							<!-- 파일 정보 (모바일용1 & pc용) -->
							<div class="state" :class="{'mobile': (docW < 840)}">
								<dl>
									<dt v-if="item.dt_type">
										<span :class="(item.dt_type?item.dt_type.toLowerCase():'')">{{item.dt_type}}</span>
									</dt>
									<dd class="c01"><div>용량<span>{{$setByteUnit(item.dt_byte)}}</span></div></dd>
									<dd class="c02" v-if="docW > 840"><div>전처리 수준<span>{{item.dt_level}}</span></div></dd>
									<dd class="c03" v-if="docW > 840"><div>최소단위<span>{{item.dt_range}}</span></div></dd>
									<dd class="c04" v-if="docW > 840"><div>갱신주기<span>{{item.dt_update||' - '}}</span></div></dd>
									<dd class="c05"><div>다운로드<span>{{$setComma(item.dt_down)}}건</span></div></dd>
								</dl>
							</div>
							<a href="javascript:void(0);" @click="getCopyUrl(item.id)" class="ex">데이터 다운로드는 PC웹버전에서만 가능합니다.</a>
							
							
							<!-- 데이터 설명 -->
							<p  class="txt"
								:class="{'lighton':(getCategory == 'detail')}"
							    v-html="$cutText(item.dt_detail,'...',250)">
							</p>


						</div>
						<!-- 파일 정보 (모바일용2) -->
						<div class="state mobile">
							<dl>
								<dd class="c02"><div>전처리 수준<span>{{item.dt_level}}</span></div></dd>
								<dd class="c03"><div>최소단위<span>{{item.dt_range}}</span></div></dd>
								<dd class="c04"><div>갱신주기<span>{{item.dt_update||' - '}}</span></div></dd>
							</dl>
						</div>
						<!-- //파일 정보 (모바일용2) -->

						<div class="btns">
							<a href="javascript:void(0);" class="preview-btn" @click="openPopup('previewon',item.id, item.dt_type)"><span>미리보기</span></a>
							<a  v-if="item.tbattachFiles !== undefined && item.tbattachFiles.length > 0 && item.dt_type"
								href="javascript:void(0);" 
								@click="$downloadFile(item.tbattachFiles, downCallback)"
								:class="(item.dt_type? item.dt_type.toLowerCase():'')+'-btn'"
							>
								<span>{{item.dt_type.toUpperCase()}}</span>
							</a>
							<a href="javascript:void(0);"  class="detail-btn"  @click="openDetail(item.id, item.dt_type)" >
								<span v-if="detail_id.includes(item.id)">접기</span>
								<span v-else>자세히보기</span>
							</a>
						</div>
					</div>
					<!-- e : con -->
					<!-- s : con -->
					<!-- <transition name="slide"> -->
					<transition name="slide">
					<div class="con detail"  
						 v-show="chkDetail(item.id)"
						 :class="'detail_'+item.id"
					>
						<!-- s: 평가 -->
						<div class="apprs" v-if="item.tbresultEvaluation !== undefined && item.tbresultEvaluation !== null">
							<p class="btxt"><span>데이터 </span>품질평가</p>
							<div class="mgraph" v-if="item.tbresultEvaluation !== undefined && item.tbresultEvaluation !== null">
								<chart-radar
									v-if="docW < 840 && chkDetail(item.id)"
									:radarId="item.id"
									:radarData="cleanData(item.tbresultEvaluation)"
									ref="radar2" 
								></chart-radar>
							</div>
							<div class="txt">
								<p v-html="item.tbresultEvaluation.eval_detail"></p>
							</div>
						</div>
						<div class="apprs" v-else>
							<p class="btxt"><span>데이터 </span>품질평가</p>
							<!-- <div class="mgraph"></div> -->
							<div class="txt">
								<p style="text-align:center;">
									<img src="/images/Content/img_notify_wait_184h.png" :width="docw > 999 ? '100%' : '184px'"/>
								</p>
							</div>
						</div>
						<!-- e: 평가 -->
						<!-- s: 메타 -->
						<include-detail-meta
							:info = item
						></include-detail-meta>
						<!-- e: 메타 -->
						<!-- s: 컬럼설명 -->
						<include-detail-column
							:info = item.tblistColumns
						></include-detail-column>
						<!-- e: 컬럼설명 -->
					</div>
					</transition>
					<!-- e : con -->
				</div>
				<!-- e : item -->

			</div>
			<!-- list 끝 -->
			<!-- list 없을 때 시작 -->
			<div class="list no-mgt" v-else>
				<!-- s : no-item -->
				<div class="no-item">
					<h3>검색결과가 없습니다.</h3>
					<ul>
						<li>단어의 철자가 정확한지 확인해 보세요.</li>
						<li>검색어의 단어 수를 줄이거나, 보다 일반적인 검색어로 다시 검색해 보세요.</li>
						<li>두 단어 이상의 검색어인 경우, 띄어쓰기를 확인해 보세요.</li>
					</ul>
				</div>
				<!-- s : no-item -->
			</div>
			<!-- list 없을 때 끝 -->
			<!-- s : paging-wrap -->
			<list-page v-if="getCount(getCategory+'_count') > 0" :page_name="getCategory+'_count'" :page_type="name" ></list-page>
			<!-- e : paging-wrap -->
			<!-- s : link-list -->
			<slider-other-in v-if="isOtherData && this.docW > 999" :cnt="searchCnt"></slider-other-in>
			<slider-other-no v-if="!isOtherData && this.docW > 999"></slider-other-no>
			<!-- e : link-list -->
		</div>
		<!-- e: page-end //-->
	</div>
</template>

<script>
import { mapState, mapMutations, mapGetters, mapActions } from "vuex";
export default {
	computed: {
		...mapGetters('search',[
			'getSearchOption', 			 // 검색 option 가져오기
			'getLinkOption', 			 // 검색 링크 option 가져오기
			'getCategory',				// 선택한 카테고리 가져오기 ('title', 'detail', 'column')
			'getOrderby',				// 선택한 정렬순 가져오기 ('accuracy', 'dt_down', 'dt_date', 'dt_byte')
			'getOrderbyNm',				 // 선택한 정렬순 명칭 가져오기

			'getCount',				 // 리스트 개수 가져오기(id)
			'getList',				 // 검색 결과 리스트 가져오기
			'getOtherList',				 // 검색 결과 리스트 가져오기

			'getPageListSize',			// 페이지 리스트 크기 가져오기
			'getcPage',					// 현재 페이지 가져오기
			'getLoading',				// 로딩 on/off 가져오기

			'getPasteOption',			// 붙여놓기를 위한 param가져오기
		]),	
		isOtherData:function(){
			let data = this.$store.getters['search/getOtherList'];
			if(data.length > 0 ){
				return true;
			}else{
				return false;
			}
		}
	},
	data() {
		return {
			name: 'search',							// 페이지 명 
			orderList:[								// 정렬순 리스트
				{'id':'accuracy', 'name':'정확도'},
				{'id':'dt_down', 'name':'다운로드'},
				{'id':'dt_date', 'name':'최신순'},
				{'id':'dt_byte', 'name':'용량순'}
			],
			detail_id: [],							// 자세히 보기 - 보고있는 id
			order_active: false,					// 정렬 리스트 on/off
			category_name: 'title',					// 선택한 카테고리 명
			keyword: '',
			pop_id: '',								// 미리보기 팝업 클릭시 리스트 id
			docW: 0,								// 윈도우 size
			pastePage: false,						// 붙여넣기해서 들어온 페이지(true)
			searchCnt: 0,							// 검색 결과 페이지내의 검색수
			dateFormat: ['년', '월', '일'],			// 업뎃날짜 포맷
			contents_click: false,					// contents 영역 클릭 허용 여부

		}
	},
	created(){
		this.searchCnt = 0;
		this.$nuxt.$on('search-search',(keyword, nonScroll='up')=>{
			// 로딩 화면 on
			this.setLoading(true);
			
			// 키워드 업데이트
			if(keyword !== undefined){
				// 검색어 저장
				this.setKeyword(keyword);
				// 필터 초기화
				this.allRemoveFilter();
			} 
			
			console.log(">>>");
			// 검색
			this.setSearchData();
			this.searchCnt += 1;
			
			// 스크롤 up
			if(nonScroll !== 'none') this.$scrollToTop();
			
			// 차트 다시 그리기
			this.chartReload();
			
		});
		
	},
	beforeDestroy(){
		this.$nuxt.$off('search-search');
		window.removeEventListener('resize', this.onResize);
		window.removeEventListener('load', this.onResize);
	},
	mounted(){
		var that = this;

		// 검색
		// param에 키워드 있으면 적용
		this.keyword = this.$route.query.keyword;
		const pasteGbn = this.$route.query.id;
		
		if(pasteGbn !== undefined && pasteGbn > -1){
			this.setKeyword(this.keyword);
			// 복사한 url 붙여넣기한 거면 check	
			this.pastePage = true;
			// 검색
			this.setPasteData(pasteGbn);
		}else{
			// 일반 검색인 경우
			// 전달받은 paramter 저장
			if(Object.keys(this.$route.query).length > 1){
				// this.resetParam(this.$route.query);
				// $nuxt.$emit('search-search');
			}else{
			}
			$nuxt.$emit('search-search', this.keyword);
			

		}
		

		// 화면 사이즈 조절
		this.$nextTick(function() {
			this.onResize();
			window.addEventListener('load', this.onResize);
			window.addEventListener('resize', this.onResize);
		});
		

	},
	updated: function(){
	},
	methods:{
		...mapActions("search", [
			"getSearch",			// 검색
			"getPasteSearch",		// 붙여넣기일 경우, 검색
			"getLinkData", 			// 링크 데이터 리스트
			"addCounts", 			// 조회수, 복사수, 붙여넣기수 카운트
			"addDownCnt"			// 다운로드수 카운트
		]),
		...mapMutations("search", [
			"setPage",				// 페이지 저장
			"setKeyword",			// 검색 파라미터 추가 (검색어)
			"setCategory",			// 검색 파라미터 추가 (카테고리)
			"setOrderby", 			// 검색 파라미터 추가 (정렬)
			"setPreview",			// 미리보기 화면  on/off
			"setMobileOrderBoxOn",	// 검색 파라미터 추가
			"setLoading",			// 로딩 on/off 저장
			"allRemoveFilter",		// 전체 필터 삭제
			"resetParam",			// 새로고침시 param 초기화
		]),
		onResize: function(event){
			var that = this;
			setTimeout(function(){
				that.docW = $('#doc').outerWidth();
				that.chartReload();
			},10);
		},

		// 상세보기 on/off
		chkDetail: function(id){
			if(this.detail_id.includes(id)) return true;
			else return false;
		},
		/**
		 * 자세히 보기 버튼 클릭시
		 * @param {*} id   데이터 아이디
		 * @param {*} type 파일 형식
 		 */
		openDetail: function(id, type){
			// 구글 애널리틱스 추가
			this.$sendGA(this,'검색결과 자세히보기','자세히보기', id);

			if('ZIP,zip'.indexOf(type) != -1){
				alert("zip 형식의 데이터는 자세히보기를 제공하지않습니다.");
				return false;
			}

			//버튼변경, 상세페이지on/off
			if(this.detail_id.includes(id)){	// 닫기
				this.detail_id = this.detail_id.filter(d_id => d_id != id);
			}else{						// 열기
				this.detail_id.push(id);
				// console.log("1");
				// 영역 스크롤 생성
				var that = $('.detail_'+id);
				this.$setNiceScrolls(that.find('.nscrolls'));

				// 조회수 추가
				this.addCounts({'id': id, 'col_nm': 'dt_hit'});
			}
		},
		/**
		 * 키워드 검색하기
		 */
		setSearchData: function(){
			// 검색
			const posts = _.cloneDeep(this.getSearchOption);
			this.getSearch(posts);

			// 링크 검색
			const option = _.cloneDeep(this.getLinkOption);
			this.getLinkData(option);
		},
		/**
		 * 모바일에서 공유하기 버튼 클릭시 
		 */
		getCopyUrl: function(id){

			// 클립보드에 복사 
			this.$clipBoardCopy(id);

			// 공유 수 추가
			this.addCounts({'id': id, 'post':{'col_nm': 'dt_copy'}});
		},
		/**
		 * 복사한 url 붙여넣기했을때
		 */
		setPasteData: function(id){
			// 카운터 추가
			this.addCounts({'id': id, 'post':{'col_nm': 'dt_paste'}});

			// 데이터 검색
			let posts = _.cloneDeep(this.getPasteOption);
			posts.url = posts.url+id;
			this.getPasteSearch(posts);
			
			// 자세히 보기 버튼 클릭
			this.openDetail(id);
		},
		/**
		 * 카테고리 클릭
		 */
		changeCategory: function(value){

			// 구글 애널리틱스 추가
			this.$sendGA(this,'검색결과 카테고리','클릭', value);

			// 카테고리 저장
			this.setCategory(value);
			$nuxt.$emit('search-search');
		},
		/**
		 * 정렬 박스 open
		 */
		openSelBox: function(){
			var that = this;
			var bodyWidth = document.documentElement.clientWidth; 
			if(bodyWidth > 999){
				this.order_active = !this.order_active;
			}else{
				// include-selbox 컴포넌트 open 
				$nuxt.$emit('default-fog', true, 'pop');
				this.setMobileOrderBoxOn(true);
			}
			
		},
		/**
		 * 정렬 선택 
		 */
		changeOrderby: function(id, name){
			// 구글 애널리틱스 추가
			this.$sendGA(this, '리스트 정렬_pc', '클릭', name);

			// selectbox 닫기
			this.order_active = false;
			this.contents_click = false;
			// 정렬 변경 및 닫기
			this.setOrderby({'id':id, 'name':name});
			$nuxt.$emit('search-search');
		},
		/**
		 * 정렬 리스트 닫기
		 */
		closeOrder: function(){
			if(this.order_active && this.contents_click) {	// 정렬 리스트 open 클릭하고 빈화면 다시 클릭했을때
				this.order_active = false;
				this.contents_click = false;
			} else if (this.order_active){					// 정렬 리스트 open 클릭했을때
				this.contents_click = true;
			}
		},
		/**
		 * 팝업 open
		 * @param {*} popName  팝업명 ()
		 * @param {*} id	   데이터 아이디
		 * @param {*} type     파일 타입
		 */
		openPopup: function(popName, id, type){

			// 구글 애널리틱스 추가
			this.$sendGA(this,'검색결과 미리보기','미리보기', id);

			if('ZIP,zip'.indexOf(type) != -1){
				alert("zip 파일은 미리보기를 제공하지않습니다.");
			}else{
				$nuxt.$emit('default-fog', true, 'pop');
				this.setPreview({'open': true, 'pop_id': id});
			}
		},
		downCallback: function(file){
            // 구글 애널리틱스 추가
            this.$sendGA(this,'검색결과 다운로드','다운로드', file.origin_nm);

            // 다운로드 수 증가
            this.addDownCnt(file.id);
		},
		/**
		 * @description 방사차트 그림
		 * @param {String} name 레퍼런스 이름
		 * @param {Array} data 차트 데이터
		 * @param {Number} index 레퍼런스 배열 인덱스
		 */
		drawRadar(name = null, data = [], index = 0) {
			if (!name) return;

			if (data.length === 0) return;

			const component = this.$refs[name][index];

			// 컴포넌트가 없으면 리턴
			if (!component) return;

			const options = component.options;

			component.copyData = JSON.stringify(data); // 깊은 복사
			component.remove(); // 컴포넌트에 등록된 차트 제거하기
			component.draw(); // 컴포넌트에 등록된 차트그리기
		},
		/**
		 * radar차트 데이터 포멧
		 */
		cleanData: function(data){
			const cleanData = {
				chartData: [],
				axisData: []
			};
			const columns = [
				{ code: "eval01", name: "정확성" },
				{ code: "eval02", name: "활용성" },
				// { code: "eval03", name: "신뢰성" },
				{ code: "eval04", name: "확장성" },
				{ code: "eval05", name: "최신성" },
				{ code: "eval06", name: "포괄성" }
			];
			// const tmpArr = [];

			const tmpArr = columns.map((v, i) => {
				const obj = {
				name: v["name"],
				category: v["code"],
				value: data[v["code"]],
				text: ""
				};
				cleanData["axisData"].push(obj);
				return obj;
			});

			cleanData["chartData"].push(tmpArr);

			return cleanData;
		},
		chartReload: function(){
			const component = this.$refs["radar2"];
			if(component){
				component.map((chart)=>{
					const radarData =  _.cloneDeep(chart._props);
					chart.reload(radarData);
	
				})
			}
		}
	}
}
</script>

<style scoped src="../../assets/css/content.css"></style>
<style scoped>
.list >>> .inups p.tit.lighton span {
    background: #fffab7;
    padding: 0 2px;
}
.list >>> .inups p.txt.lighton span {
    background: #fffab7;
    padding: 0 2px;
}
.list >>> .inups p.tit strong{ background:#0075C1; padding:4px 8px; color:#fff; font-size:14px; margin-right:10px;}
.list >>> .inups p.tit.nolevel strong{ background:#fff; padding:4px 8px; color:#0075C1; border: 1px solid #0075C1; font-size:14px; margin-right:10px;}

.slide-enter-active {
   -moz-transition-duration: 0.3s;
   -webkit-transition-duration: 0.3s;
   -o-transition-duration: 0.3s;
   transition-duration: 0.3s;
   -moz-transition-timing-function: ease-in;
   -webkit-transition-timing-function: ease-in;
   -o-transition-timing-function: ease-in;
   transition-timing-function: ease-in;
}

.slide-leave-active {
   -moz-transition-duration: 0.3s;
   -webkit-transition-duration: 0.3s;
   -o-transition-duration: 0.3s;
   transition-duration: 0.3s;
   -moz-transition-timing-function: cubic-bezier(0, 1, 0.5, 1);
   -webkit-transition-timing-function: cubic-bezier(0, 1, 0.5, 1);
   -o-transition-timing-function: cubic-bezier(0, 1, 0.5, 1);
   transition-timing-function: cubic-bezier(0, 1, 0.5, 1);
}

.slide-enter-to, .slide-leave {
   max-height: 100px;
   overflow: hidden;
}

.slide-enter, .slide-leave-to {
   overflow: hidden;
   max-height: 0;
}

</style>
