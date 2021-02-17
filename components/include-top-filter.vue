<template>
    <div class="sel-filter">
		<ul>
			<li v-if="getFilterCnt > 0">
				<a href="javascript:void(0);" class="all-delete" @click="allDelFilter">
					<span>전체삭제</span>
				</a>
			</li>
			<!-- s: filter 데이터 형식, 컬럼명, 공간단위, 분야, 제공기관 -->
			<template v-for="(fObj, fIdx) in getFilterNameList">
				<li 
					v-for="(dItem, dIdx) in getFilterNames[fObj.id]"
					:key = "fObj.id+'_'+dIdx"
					:class="'sel-data'+(fIdx+1)"
					:data-select="'data1'+(fIdx+1)"
				>
					<p>
						{{$cutText(dItem['dt_'+fObj.id+'_nm'], '...', 6)}}
						<button class="delete" @click="delFilter(fObj.id, dItem['dt_'+fObj.id+'_nm'])">
							<span class="blind">삭제</span>
						</button>
					</p>
				</li>
			</template>
			<!-- e: filter 데이터 형식, 컬럼명, 공간단위, 분야, 제공기관 -->
		</ul>
	</div>
</template>
<script>
import { mapState, mapMutations, mapGetters, mapActions } from "vuex";
export default {
	computed: {
		...mapGetters('search',[
			'getFilterCnt',				// 검색한 필터 수 가져오기
			'getSelectFilter',			// 검색한 필터 구분별 리스트 가져오기
			'getfilterList',				// 전체 필터 리스트 가져오기
			'getFilterNameList'		 // filter 이름 리스트 가져오기
		]),
		getFilterNames: function(){
			var list = _.cloneDeep(this.$store.getters['search/getFilterNameList']);
			var result = {};
			if(list.length > 0){
				list.map(item =>{
					var allList = _.cloneDeep(this.$store.getters['search/getFilterList'](item.list_id)); 
					if(item.more_id) allList = _.cloneDeep(this.$store.getters['search/getFilterList'](item.more_id)); 
					
					var selList = _.cloneDeep(this.$store.getters['search/getSelectFilter'](item.id));
					var resultArr = [];
					
					if(allList && allList.length > 0){
						let sortedArr = this.$twoArrSort(allList, 
														"dt_" + item.id, 
														selList
														);
						if(sortedArr.selArr.length > 0) resultArr = sortedArr.selArr;
					}
					result[item.id] = resultArr;
				});
			}
			return result;
		},
		makeParam: function(){
			var allParam = _.cloneDeep(this.$store.getters['search/getParam']);
			return this.$makeParam(allParam);
		},
	},
	mounted(){
		// 선택한 필터 리스트 효과 ( top )
		$('.sel-filter').sly({
			horizontal: 1,
			itemNav: 'centered',
			smart: 1,
			// activateOn: 'click',
			mouseDragging: 1,
			touchDragging: 1,
			releaseSwing: 1,
			// startAt: 4,
			scrollBy: 1,
			speed: 300,
			elasticBounds: 1,
			easing: 'easeOutExpo',
			dragHandle: 1,
			dynamicHandle: 1,
			clickBar: 1,
		});
	},
	beforeDestroy(){
		
	},
	updated(){
		$('.sel-filter').sly('reload');
	},
	methods:{
		...mapMutations("search", [				// 필터 추가, 삭제
			"removeFilter",
			"allRemoveFilter"
		]),	


		delFilter: function(nm, item){
			let obj = {};
			obj['dt_'+nm] = item;
			this.removeFilter({'name':nm, 'item': obj});
			this.$router.push( {path: '/search', query:this.makeParam});
		},
		allDelFilter: function(){
			this.allRemoveFilter();
			this.$router.push( {path: '/search', query:this.makeParam});
		}
	}
}
</script>
<style scoped src="../assets/css/content.css"></style>