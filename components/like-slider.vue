<template>
    <div class="like">
        <h4>인기 검색어</h4>
        <!-- <div class="like-slide" > -->
        <div class="like-slide" v-if="listCount > 0">
            <div class="item" v-for="(item, index) in getResultKeyword" :key="index">
				<!-- <a href="#none" @click="goSearch(item.search_word)"> -->
				<nuxt-link :to="'/search?keyword='+ item.search_word">
					<span>{{index+1}}. {{$cutText(item.search_word,'...',6,0)}}</span>
				</nuxt-link>
				<!-- </a> -->
			</div>
        </div>
    </div>
</template>

<script>
import { mapState, mapMutations, mapGetters, mapActions } from "vuex";
export default {
    name:'likeSlide',
    data() {
		return {
			name: 'keyword',
			keyword: 'keyword',
		}
	},
	computed:{
		...mapGetters('mainList',[
			'getParam', 			 // keyword store list의 param 세팅 가져오기
			'getUrl', 				 // keyword store list의 url 가져오기
			'getResultKeyword', 	 // keyword store list의 결과값 자겨오기
		]),
		listCount: function(){
			var listCount = 0;
			if(this.getResultKeyword && this.getResultKeyword.length > 0){
				listCount = this.getResultKeyword.length;
			} 
			return listCount;
		}
	},
	mounted(){
		this.fetchData();
	},
	updated(){
		// 인기검색어 slick
		this.setSlick();
	},
	methods: {
		...mapActions("mainList", ["getData"]),
		/**
		 * 인기검색어 애니메이션 효과 setting
		 */
		setSlick: function(){
			$('.like-slide').slick({
				dots: true,
				infinite: false,
				speed: 300,
				autoplaySpeed: 1000,
				dots: false,
				arrows: false,
				slidesToShow: 3,
				slidesToScroll: 1,
				autoplay: false,
				responsive: [
					{
					breakpoint: 999,
					settings: {
						autoplay: true,
						infinite: true,
						slidesToShow: 1,
						verticalSwiping: true,
						vertical: true,
					}
					},
					
				]
			});
		},
		/**
		 * 초기 데이터 가져오기
		 */
		fetchData: function(){
			var posts = {};
			posts.param = this.getParam(this.name);
			posts.url = this.getUrl(this.name);
			posts.storeName = this.name;
			this.getData(posts);
		},
		goSearch: function(word){
			// this.setKeyword(word);
			// this.$router.push( '/search?keyword='+ searchKey );
			// this.$router.push( {path: '/search', query:{ 'keyword' : word}});
		}
	}
}
</script>
<style scoped src="../assets/css/main.css"></style>