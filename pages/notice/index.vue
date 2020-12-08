<template>
	<div id="contents">
		<!-- s: page-start//-->
		<div class="board-wrap list">
			<h2 class="u-tit01">공지사항</h2>
			<div class="filter">
				<div class="sel">
					<ul>
						<li :class="{'active':(searchCondition == '1')}">
							<a href="javascript:void(0);" @click="setCondition('1')" ><span>제목+내용</span></a>
						</li>
						<li :class="{'active':(searchCondition == '2')}">
							<a href="javascript:void(0);" @click="setCondition('2')" ><span>제목</span></a>
						</li>
						<li :class="{'active':(searchCondition == '3')}">
							<a href="javascript:void(0);" @click="setCondition('3')" ><span>내용</span></a>
						</li>
					</ul>
				</div>
				<div class="bd-line"></div>
				<div class="search">
					<p class="chk-input">
						<input type="text" placeholder="검색어를 입력하세요" autocomplete="off" v-model="keyword" v-on:keyup.enter="goSearch"/>
					</p>
					<button class="enter" @click="goSearch"><span>검색</span></button>
				</div>
			</div>
			<p class="total">
				전체
				 <span v-if="getCount(name) > 0">{{ $setComma(getCount(name)) }}</span>
				  <span v-else>0</span>
				건
			</p>
			<div class="list">
				<table>
					<colgroup>
						<col width="11%"/>
						<col width="*"/>
						<col width="12%"/>
						<col width="12%"/>
					</colgroup>
					<thead>
						<tr>
							<th>NO.</th>
							<th>제목</th>
							<th>작성자</th>
							<th>등록일</th>
						</tr>
					</thead>
					<tbody>
						<!-- s: 공지 리스트 -->
						<template v-if="getNotice && getNotice.length > 0">
							<tr
								v-for="(item) in getNotice(name)" 
								:key="item.id"	
							>
								<td v-if="item.notice_yn" class="notice"><span class="ntxt">공지</span></td>
								<td v-else>{{item.id}}</td>
								<td class="l">
									<nuxt-link :to="{ path: '/notice/'+item.id, query: posts.param}">
										{{$cutText(item.title,'...', 40)}} 
										<img src="/images/Sub/ico-file.png" alt="file" v-show="item.tbattachFiles.length > 0"/>
									</nuxt-link>
								</td>
								<td>{{item.user_nm}}</td>
								<td>{{$dateFormat(item.reg_date,'-')}}</td>
							</tr>
						</template>
						<!-- e: 공지 리스트 -->
						
						<!-- s: 일반 리스트 -->
						<template v-if="getCount(name) > 0">
							<tr
								v-for="(item) in getNoticeList(name)" 
								:key="item.id"	
							>
								<td v-if="item.notice_yn" class="notice"><span class="ntxt">공지</span></td>
								<td v-else>{{item.id}}</td>
								<td class="l">
									<nuxt-link :to="{ path: '/notice/'+item.id, query: posts.param}">
										{{$cutText(item.title,'...', 40)}} 
										<img src="/images/Sub/ico-file.png" alt="file" v-show="item.tbattachFiles.length > 0"/>
									</nuxt-link>
								</td>
								<td>{{item.user_nm}}</td>
								<td>{{$dateFormat(item.reg_date,'-')}}</td>
							</tr>
						</template>
						<template v-if="getCount(name) == 0">
							<tr>
								<td colspan="4">등록된 공지사항이 없습니다.</td>
							</tr>
						</template>
						<!-- e: 일반 리스트 -->
					</tbody>
				</table>
			</div>
			<!-- s : paging-wrap -->
			<list-page v-if="getCount(name) > 0" :page_name="name" page_type="board"></list-page>
			<!-- e : paging-wrap -->
		</div>
		<!-- e: page-end //-->
	</div>
</template>

<script>
import { mapState, mapMutations, mapGetters, mapActions } from "vuex";
export default {
	computed: {
		...mapGetters('board',[
			'getParam', 			 // 각 게시판 list의 param 세팅 가져오기
			'getUrl', 				 // 각 게시판 list의 url 가져오기
			'getNoticeList', 		 		 // 각 게시판 list의 결과값 가져오기
			'getNotice', 		 		 // 각 게시판 list의 결과값 가져오기
			'getCount', 		 	 // 각 게시판 list의 총 수
		]),
	},
    data() {
		return {
			name: 'notice',
			keyword: '',			// 검색어
			searchCondition: '1',	// 검색조건 (1: 제목+내용, 2: 제목, 3: 내용)
			posts: {				// 데이터 가져올때 필요한  파라미터들
				param: {},
				url: '',
				storeName: ''
			}
		}
	},
	mounted(){
		// param에 키워드 있으면 적용
		this.keyword = this.$route.query.keyword;
		if(this.$route.query.searchCondition) 
			this.searchCondition = this.$route.query.searchCondition;
			
		// 공지사항 리스트 가져오기
		this.fetchData();
	},
	methods: {
		...mapActions("board", ["getData"]),
		...mapMutations("board", [
			"setSearchCondition",	// 검색 조건 선택 저장
			"setKeyword",			// 검색어 저장
			"setPage",				// 페이지 번호 수정 (초기화)
		]),
		/**
		 * 초기 데이터 가져오기
		 */
		fetchData: function(){
			this.posts.param = this.getParam(this.name);
			this.posts.url = this.getUrl(this.name);
			this.posts.storeName = this.name;
			this.getData(this.posts);
		},
		/**
		 * 리스트 검색
		 */
		goSearch: function(){
			var that = this;
			// 키워드 저장
			this.setKeyword({
				name: that.name,
				keyword: that.keyword
			});
			// 검색 조건 저장
			this.setSearchCondition({
				name: that.name,
				searchCondition: that.searchCondition
			});
			// 검색 조건 저장
			this.setPage({
				name: that.name,
				page: 1
			});

			// 검색 조건으로 리스트 다시가져오기
			this.fetchData();
		},
		setCondition:function(type){
			this.searchCondition = type;
			if(this.keyword) this.goSearch();
		}
	}
}
</script> 
<style scoped src="../../assets/css/content.css"></style>
