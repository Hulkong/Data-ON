<template>
		<div id="snb-wrap" :class="{'mn-open': getMobileFilterOn}">
			<!-- s: 모바일 필터 버튼들 -->
			<div class="mn-ctrl">
				<a href="javascript:void(0);" class="bt-close" @click="mFilterClose">
					<span class="blind">닫기</span>
				</a>
				<a href="javascript:void(0);" class="bt-refresh" @click="resetFilter">
					<span>초기화</span>
				</a>
			</div>
			<!-- e: 모바일 필터 버튼들 -->
			<!-- s: 웹의 인기검색어 -->
			<div class="like">
				<h4>인기 검색어</h4>
				<ul v-if="getResultKeyword.length > 0">
					<li v-for="(item,index) in getResultKeyword" :key="index">
						<a href="javascript:void(0);" @click="goSearch(item.search_word)">
							<span>{{index+1}}. {{item.search_word}}</span>
						</a>
					</li>
				</ul>
			</div>
			<!-- e: 웹의 인기검색어 -->
			<div class="leftmenu">
				<ul>
					<!-- s: 데이터 형식 (type) -->
					<li class="lm_l1" 
						v-for="(fobj, idx) in filterlist"
						:key="fobj.id+'_'+idx"
						:class="{
							'has-sub': (getMobileFilterOn && getFilterList(fobj.list_id).length > 0), 
							'is-open': (getMobileFilterOn && fobj.id == mOpenItem)
						}"
					>
						<a href="javascript:void(0);" class="lm_a1" @click="openSubMenu(fobj.id)"><span>{{fobj.name}}</span></a>
						<ul v-if="!getMobileFilterOn && getFilterList(fobj.list_id).length > 0">
							<li class="lm_l2" 
								v-for="(item, index) in sortFilterList(fobj.id, fobj.list_id)" 
								:key="index"
								:class="{'active': getChkSelFilter({'name': fobj.id, 'id': item['dt_'+fobj.id]})}"
							>
								<a  v-if="index < 7"
									href="javascript:void(0);" class="lm_a2" @click="clickFilter(fobj.id, item, index)">
									<span v-if="item['dt_'+fobj.id+'_nm'] !== undefined">
										{{$cutText(item['dt_'+fobj.id+'_nm'], '...', 6)}} ({{item.max_count}})
									</span>
									<span v-else>{{item['dt_'+fobj.id]}} ({{item.max_count}})</span>
								</a>
							</li>
							
							<li class="lm_l2" v-if="fobj.more_id !== undefined && getFilterList(fobj.more_id).length > 7">
								<a href="javascript:void(0);" class="more" @click="openPopAllCol(fobj)"><span>전체보기</span></a>
							</li>
						</ul>
						
						<transition name="slide">
							<ul v-if="getMobileFilterOn && fobj.id == mOpenItem">
								<li class="lm_l2" 
									v-for="(item, index) in sortFilterList(fobj.id, fobj.m_id)" 
									:key="index"
									:class="{'active': getChkSelFilter({'name': fobj.id, 'id': item['dt_'+fobj.id]})}"
								>
									<a href="javascript:void(0);" class="lm_a2" @click="clickFilter(fobj.id, item, index)">
										<span v-if="item['dt_'+fobj.id+'_nm'] !== undefined">{{item['dt_'+fobj.id+'_nm']}} ({{item.max_count}})</span>
										<span v-else>{{item['dt_'+fobj.id]}} ({{item.max_count}})</span>
									</a>
								</li>
							</ul>
						</transition>
					</li>
					<!-- e: 데이터 형식 (type) -->
					
				</ul>
			</div>
		</div>
</template>

<script>
import { mapState, mapMutations, mapGetters, mapActions } from "vuex";
export default {
	computed: {
		...mapGetters('mainList',[
			'getParam', 			 // keyword store list의 param 세팅 가져오기
			'getUrl', 				 // keyword store list의 url 가져오기
			'getResultKeyword', 	 // keyword store list의 결과값 자겨오기
		]),
		...mapGetters('search',[
			'getMobileFilterOn', 	 // [모바일] 필터 on/off
			'getFilterList', 	 	 // 필터 리스트 가져오기
			'getSelectFilter',		 // 선택한 필터 가져오기
			'getChkSelFilter',		 // 선택 여부 확인 
		]),
		makeParam: function(){
			var allParam = _.cloneDeep(this.$store.getters['search/getParam']);
			return this.$makeParam(allParam);
		},
	},
    data() {
		return {
			mobileopen: false,
			mOpenItem: '',
			filterlist: [
				{'id': 'type', 'list_id': 'file_type', 'name': '데이터 형식', 'm_id':'file_type'},
				{'id': 'col', 'list_id': 'column_list7', 'name':'컬럼명', 'more_id':'column_list', 'm_id':'column_list20'},
				{'id': 'range', 'list_id': 'range_type', 'name':'공간단위', 'm_id': 'range_type'},
				{'id': 'category', 'list_id': 'category_type7', 'name':'분야', 'more_id': 'category_type', 'm_id': 'category_type'},
				{'id': 'organ', 'list_id': 'dt_organ_column7', 'name':'제공기관', 'more_id':'dt_organ_column', 'm_id':'dt_organ_column20'}
			]
		}
	},
	created(){
		// 인기검색어 가져오기
		this.fetchData();
	},
	methods: {
		...mapActions("mainList", ["getData"]),	// 인기검색어 가져오기
		...mapMutations("search", [				
			"addFilter",						// 검색 필터 추가
			"removeFilter",						// 검색 필터 삭제
			"setMobileFilterOn",				// [모바일] 필터 on/off
			"allRemoveFilter",					// 검색 필터 초기화
			"setAllFilter",						// 전체보기 팝업 on/off
		]),	
		/**
		 * 초기 데이터 가져오기 (인기검색어)
		 */
		fetchData: function(){
			var posts = {};
			posts.param = this.getParam('keyword');
			posts.url = this.getUrl('keyword');
			posts.storeName = 'keyword';
			this.getData(posts);
		},
		/**
		 * 검색
		 */
		goSearch: function(word){
			// url에 추가
			this.$router.push( {path: '/search', query:{ 'keyword' : word }});
			
			// this.$router.push( {path: '/search', query:this.$route.query});
			// 검색
			$nuxt.$emit('search-search', word);
		},
		sortFilterList: function(id, list_id){
			var allList = this.getFilterList(list_id);
			var selList = this.getSelectFilter(id);
			var resultArr = [];
			// console.log(selList);
			if(selList && selList.length > 0){
				resultArr = selList.map(sItem => {
					let rsltObj = {};
					rsltObj['dt_'+ id] = sItem.id;
					rsltObj['dt_'+ id +'_nm'] = sItem.nm;
					rsltObj['max_count'] = sItem.cnt;
					return rsltObj;
				});
			}

			if(allList && allList.length > 0){
				let sortedArr = this.$twoArrSort(allList, 
												"dt_" + id, 
												selList, 
												"id"
												);
				// console.log(sortedArr);
				// if(sortedArr.selArr.length > 0) resultArr = sortedArr.selArr;
				resultArr = resultArr.concat(sortedArr.otherArr);
			}
			return resultArr;
		},
		/**
		 * 필터 리스트 요소 클릭
		 */
		clickFilter: function(nm, item, index){
			if(this.getChkSelFilter({'name': nm, 'id': item['dt_'+nm]})){	// 필터 제거
				this.removeFilter({'name':nm, 'item': item});
				$nuxt.$emit('search-search');
				// this.$router.push( {path: '/search', query:this.makeParam});
			}else{													// 필터 추가
				// 구글 애널리틱스 추가
				this.$sendGA(this,'검색결과 필터','클릭',nm, item['dt_'+nm]);

				// 필터추가
				this.addFilter({'name':nm, 'item': item});
				$nuxt.$emit('search-search');
				// this.$router.push( {path: '/search', query:this.makeParam});
			}
		},
		/**
		 * 필터 전체보기 팝업 open
		 */
		openPopAllCol: function(obj){
			this.setAllFilter({
				'open': true, 
				'list_id': obj.more_id, 
				'item_id': obj.id, 
				'list_nm': obj.name
			});
			$nuxt.$emit('default-fog', true, 'pop');
		},
		/**
		 * [모바일] 필터 리스트 창 닫기
		 */
		mFilterClose: function(){
			this.setMobileFilterOn(false);
			$nuxt.$emit('default-fog', false);
		},
		/**
		 * [모바일] 필터 리스트 초기화
		 */
		resetFilter: function(){
			this.allRemoveFilter();
			$nuxt.$emit('search-search');
		},
		/**
		 * [모바일] 필터 리스트 - 서브메뉴 on/off
		 */
		openSubMenu: function(type){
			if(this.getMobileFilterOn){
				if(this.mOpenItem == type){
					this.mOpenItem='';
				} else {
					this.mOpenItem = type;
				}
			}
		}

	}
}
</script> 
<style scoped src="../assets/css/content.css"></style>
<style scoped>
.italic {
	background:#fffab7; padding:0 2px;
}
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
