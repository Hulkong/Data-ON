<template>
    <div class="other">
        <h4 v-if="isOtherData">전국데이터는 아니지만...<br />이런 데이터도 있어요!</h4>
        <div class="other-slide in-data">
            <!-- 링크리스트 시작 -->
            <div class="item" v-for="item in otherList" :key="item.id">
				<p class="tit" v-html="item.lnk_title"></p>
                <a href="javascript:void(0);" @click="sendLink(item)" class="txt">
                    <ul>
                        <li>기관: {{item.lnk_organ}}</li>
                        <li>범위: {{item.lnk_range}}</li>
                        <li>형태: {{item.lnk_type}}</li>
                        <li>활용성: {{item.lnk_use}}</li>
                        <li>비용: {{item.lnk_fee}}</li>
                    </ul>
                    <p class="over">링크로 연결</p>
                </a>
                <div class="tag">
                    <a href="#n">#{{item.lnk_range}}</a>
                    <a href="#n">#{{item.lnk_use}}</a>  
                    <a href="#n">#{{item.lnk_fee}}</a>
                </div>
            </div>
            <!-- 링크리스트 끝 -->
        </div>
       
    </div>
</template>

<script>
import { mapState, mapMutations, mapGetters, mapActions } from "vuex";
export default {
	computed: {
		...mapGetters('search',[
			'getOtherList',				 // 외부 검색 결과 리스트 가져오기
			'getLoading'
		]),	
		otherList: function(){
			this.destroySilder();
			return this.$store.getters['search/getOtherList'];
		},
		isOtherData: function(){
			let that = this;
			let data = this.$store.getters['search/getOtherList'];
			return true;
		}
	},
	props:{
		cnt: Number
	},
	mounted(){
		// 첫 검색시
		this.setSilder();
	},
	updated(){
		// 검색결과페이지내의 검색시
		this.setSilder();
	},
	methods:{
		/**
		 * 슬라이더 기능 삭제
		 */
		destroySilder: function(){
			var otherSlide = $('.other-slide.in-data');
			otherSlide.trigger('destroy.owl.carousel');
		},
		/**
		 * 슬라이더 기능 추가
		 */
		setSilder: function(){
			//링크 데이터 슬라이드
			var otherSlide = $('.other-slide.in-data');
			this.$setSlider(otherSlide, {
				items: 4,      
				responsive:{  
					0:{
						margin: 10,
						items:1,
						slideBy: 1,
					},
					480:{
						margin: 10,
						items:2,
						slideBy: 2,
					},
					680:{
						margin: 10,
						items:3,
						slideBy: 3,
					},
					1000:{
						margin: 10,
						items:3,
						slideBy: 3,
					},
					1200:{
						margin: 10,
						items:4,
						slideBy: 4,
					}
				}
			})	
		},
		sendLink: function(info){
			// 구글 애널리틱스 추가
			this.$sendGA(this, '전국데이터는 아니지만', '링크연결', info['lnk_title']);

			// 링크 이동
			if(info.lnk_url) window.open('about:tab').location.href=info.lnk_url;
            else return false;
		}
	}
}
</script>
<style scoped src="../assets/css/content.css"></style>
<style scoped>
.other-slide.in-data .item .txt{position:relative;border-top:1px solid #a1a1a1;padding-top:15px; margin-top:15px; }
.other >>> .other-slide.in-data .item .txt:after{width:100%;height:100%;background:rgba(255,255,255,0.8);opacity:0;  display:block;content:"";position:absolute; left:0; top:0; box-sizing:border-box;-webkit-transition: opacity 0.3s ease-in-out;-moz-transition: opacity 0.3s ease-in-out;-o-transition: opacity 0.3s ease-in-out;transition: opacity 0.3s ease-in-out;}
.other >>> .other-slide.in-data .item .over{min-width:70%; top:35%;left:50%; background:url(/images/Sub/link-arrow.png) no-repeat left center; opacity:0;line-height:30px; background-size:20px auto; padding-left:30px; box-sizing:border-box; font-size:24px; color:#666;letter-spacing:-0.03em;position:absolute; -webkit-transform: translateX(-50%); -moz-transform: translateX(-50%);-ms-transform: translateX(-50%); -o-transform:  translateX(-50%);transform: translateX(-50%); z-index:99;-webkit-transition: opacity 0.3s ease-in-out;-moz-transition: opacity 0.3s ease-in-out;-o-transition: opacity 0.3s ease-in-out;transition: opacity 0.3s ease-in-out;}
.other >>> .other-slide.in-data .item .txt:hover:after{opacity:1}
.other >>> .other-slide.in-data .item .txt:hover .over{transition-delay: 0.15s;opacity:1}

.other >>> .other-slide.in-data .item .tag{display:none;border-top:1px solid #a1a1a1;padding-top:12px; margin-top:15px; }
.other >>> .other-slide.in-data .item .tag a{display:inline-block;vertical-align:top; font-size:14px; color:#919294; letter-spacing:-0.02em;margin-right:10px;}

.other >>> .other-slide.no-data .item {height:235px;display:flex;align-items: center; justify-content: center;}
.other >>> .other-slide.no-data .item .txt p{ width:100%; color:#000; font-size:20px; letter-spacing:-0.03em;}

.other >>> .other-slide.in-data .item .tit span {background:#fffab7; padding:0 1px;}
</style>
