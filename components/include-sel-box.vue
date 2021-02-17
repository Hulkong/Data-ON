<template>
	<div 
		id="select-box" class="layer-wrap selBox"
		v-if="getMobileOrderBoxOn"
	> 
		<div class="is-top">
			<a  href="javascript:void(0);" class="close"
				@click="selClose"
			><span>완료</span></a>
		</div>
		<div class="is-con">
			<ul v-if="orderList.length > 0">
				<li v-for="item in orderList"
					:key="item.id"
					:class="{active:(getOrderby == item.id)}"
				>
					<a href="javascript:void(0);" @click="selOrder(item.id, item.name)">
						<span>{{item.name}}</span>
					</a>
				</li>
			</ul>
		</div>
	</div>
</template>
<script>
import { mapState, mapMutations, mapGetters, mapActions } from "vuex";
export default {
	computed: {
		...mapGetters('search',[
			'getMobileOrderBoxOn', 			 // on/off
			'getOrderby',				// 선택한 정렬순 가져오기 ('accuracy', 'dt_down', 'dt_date', 'dt_byte')
		]),
		makeParam: function(){
			var allParam = _.cloneDeep(this.$store.getters['search/getParam']);
			return this.$makeParam(allParam);
		},
		
	},
	data: function(){
		return {
			orderList:[					// 정렬순 리스트
				{'id':'accuracy', 'name':'정확도'},
				{'id':'dt_down', 'name':'다운로드'},
				{'id':'dt_date', 'name':'최신순'},
				{'id':'dt_byte', 'name':'용량순'}
			],
		}
	},
	methods:{
		...mapMutations("search", [
			"setMobileOrderBoxOn",	// (모바일) 정렬순서 리스트 on/off
			"setOrderby"			//	선택한 정렬순서 검색 param에 저장
		]),

		selOrder: function(id, name){
			// 구글 애널리틱스 추가
			this.$sendGA(this, '리스트 정렬_mobile', '클릭', name);

			// 정렬 저장
			this.setOrderby({'id':id, 'name':name});
		},

		/**
		 * 정렬리스트 닫기
		 */
		selClose: function(){
			this.setMobileOrderBoxOn(false);
			$nuxt.$emit('default-fog', false, 'pop');
			
			this.$router.push( {path: '/search', query:this.makeParam});
		}
	}
}
</script>
<style scoped src="../assets/css/content.css"></style>
