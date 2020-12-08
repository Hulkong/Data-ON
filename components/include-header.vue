<template>
	<header id="header-wrap">
		<div id="header">
			<div class="inner">
				<h2><a href="/"><span class="blind">Data-on</span></a></h2>
				<p class="stit">누구나 쉽게 찾고 활용하는 데이터플랫폼</p>
				<!-- <h3 class="mtit">공지사항</h3> -->
				<div class="top-search">
					<p class="chk-input">
						<input type="text" 
								placeholder="데이터를 검색해보세요" 
								v-model="searchWord" 
								@keyup.enter="goSearch"
								autocomplete="off" />
						<button class="enter" @click="goSearch"><span class="blind">검색</span></button>
					</p>
				</div>
				<a  href="javascript:void(0);" 
					class="bt-filter" 
					:class="{
						'active': getMobileFilterOn,
						'selected': getFilterCnt
					}"
					@click="filerToggle"
				>
					<span class="blind">필터</span>
				</a> 
			</div>
		</div>
	</header>
</template>

<script>
import { mapState, mapMutations, mapGetters, mapActions } from "vuex";
export default {
	computed: {
		...mapGetters('search',[
			'getKeyword',			// 키워드 가져오기
			'getMobileFilterOn',		// [모바일] 필터 리스트 on/off
			'getFilterCnt',				// 검색한 필터 수 가져오기
		])
	},
	watch:{
		getKeyword: function(nk){
			this.searchWord = nk;
		},
	},
	data() {
		return {
			searchWord:'',
		}
	},
	mounted: function(){
		this.searchWord = this.getKeyword;
	},
	methods:{
		...mapMutations("search", [				// 필터 추가, 삭제
			"setMobileFilterOn",				// [모바일] 필터 on/off
		]),	
		/**
		 * 검색
		 */
		goSearch: function(){
			var valids = this.$validate(this.searchWord);
			if(valids.status){
				//url에 추가
				this.$router.push( '/search?keyword='+ this.searchWord );
				//검색어 등록
				$nuxt.$emit('search-search', this.searchWord);
			}else{
				alert(valids.message);
			}
		},
		/**
		 * [모바일] 필터 on/off
		 */
		filerToggle: function(){
			// 필터 모바일 용으로 on/off
			this.setMobileFilterOn(!this.getMobileFilterOn)
			$nuxt.$emit('default-fog', this.getMobileFilterOn);
		}
	}
}
</script>