<template>
    <div class="sel-filter">
		<ul>
			<li v-if="getFilterCnt > 0">
				<a href="javascript:void(0);" class="all-delete" @click="allDelFilter">
					<span>전체삭제</span>
				</a>
			</li>
			<!-- s: filter 데이터 형식 -->
			<li 
				v-for="(dtype, dIdx) in getSelectFilter('type')"
				:key = "'type_'+dIdx"
				class="sel-data1"
				data-select="data1"
			>
				<p>
					{{$cutText(dtype.nm, '...', 6)}}
					<button class="delete" @click="delFilter('type', dtype)">
						<span class="blind">삭제</span>
					</button>
				</p>
			</li>
			<!-- e: filter 데이터 형식 -->
			<!-- s: filter 공간단위 -->
			<li 
				v-for="(drange, dIdx) in getSelectFilter('range')"
				:key = "'range_'+dIdx"
				class="sel-data2"
				data-select="data2"
			>
				<p>
					{{$cutText(drange.nm, '...', 6)}}
					<button class="delete" @click="delFilter('range', drange)">
						<span class="blind">삭제</span>
					</button>
				</p>
			</li>
			<!-- e: filter 공간단위 -->
			<!-- s: filter 분야 -->
			<li 
				v-for="(dcategory, dIdx) in getSelectFilter('category')"
				:key = "'cate_'+dIdx"
				class="sel-data3"
				data-select="data3"
			>
				<p>
					{{$cutText(dcategory.nm, '...', 6)}}
					<!-- {{dcategory.nm}} -->
					<button class="delete" @click="delFilter('category', dcategory)">
						<span class="blind">삭제</span>
					</button>
				</p>
			</li>
			<!-- e: filter 분야 -->
			<!-- s: filter 제공기관 -->
			<li 
				v-for="(dorgan, dIdx) in getSelectFilter('organ')"
				:key = "'organ_'+dIdx"
				class="sel-data4"
				data-select="data4"
			>
				<p>
					{{$cutText(dorgan.nm, '...', 6)}}
					<!-- {{dorgan.nm}} -->
					<button class="delete" @click="delFilter('organ', dorgan)">
						<span class="blind">삭제</span>
					</button>
				</p>
			</li>
			<!-- e: filter 제공기관 -->
			<!-- s: filter 컬럼 -->
			<li 
				v-for="(dcolumn, dIdx) in getSelectFilter('col')"
				:key = "'col_'+dIdx"
				class="sel-data5"
				data-select="data5"
			>
				<p>
					{{$cutText(dcolumn.nm, '...', 6)}}
					<!-- {{dcolumn.nm}} -->
					<button class="delete" @click="delFilter('col', dcolumn)">
						<span class="blind">삭제</span>
					</button>
				</p>
			</li>
			<!-- e: filter 컬럼 -->
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
		]),
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
			obj['dt_'+nm] = item.id;
			this.removeFilter({'name':nm, 'item': obj});
			$nuxt.$emit('search-search');
		},
		allDelFilter: function(){
			this.allRemoveFilter();
			$nuxt.$emit('search-search');
		}
	}
}
</script>
<style scoped src="../assets/css/content.css"></style>