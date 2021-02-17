<template>
    <!-- s: layer-wrap.allview -->
    <div class="layer-wrap allview active setCenter">
        <div class="is-top" ref="top_handler2">
            <h2>전체보기</h2>
            <a href="javascript:void(0);" class="close allview-close" @click="closePopAllFilter"><span class="blind">닫기</span></a>
        </div>
        <div class="is-con" v-if="getFilterList(getAllFilterListId).length > 0">
            <div class="total">
                <h3>{{getAllFilterListNm}} ({{getFilterList(getAllFilterListId).length}})</h3>
                <a href="javascript:void(0);" class="refresh-btn" @click="refreshFilter(false)"><span>초기화</span></a>
            </div>
            <div class="list nscrolls">
                <ul>
                    <!-- s: 선택된 리스트 -->
                    <li v-for="(item,index) in selectList"
                        :key="'s_'+index"
                        :class="{'active':chkSelAllFilter(item)}"
                    >
                        <a  href="javascript:void(0);" 
                            @click="toggleFilter(item)"
                        >
                            <span>{{item["dt_"+getAllFilterItemId+"_nm"]}} ({{item["max_count"]}})</span>
                        </a>
                    </li>
                    <!-- e: 선택된 리스트 -->
                    <!-- s: 선택 안된 리스트 -->
                    <li v-for="(item,index) in filterList"
                        :key="'u_'+index"
                        :class="{'active':chkSelAllFilter(item)}"
                    >
                        <a  href="javascript:void(0);" 
                            @click="toggleFilter(item)"
                        >
                            <span>{{item["dt_"+getAllFilterItemId+"_nm"]}} ({{item["max_count"]}})</span>
                        </a>
                    </li>
                    <!-- e: 선택 안된 리스트 -->
                </ul>
            </div>
        </div>
        <div class="is-btm">
            <a href="javascript:void(0);" class="enter-btn allview-close"
                @click="addParamFilter"
            ><span>적 용</span></a>
        </div>
    </div>
    <!-- e: layer-wrap allview -->
</template>
<script>
import { mapState, mapMutations, mapGetters, mapActions } from "vuex";
export default {
    computed:{
        ...mapGetters('search',[
            'getAllFilterOn',      // allfilter popup on/off
            'getFilterList',         // 필터 리스트 가져오기
            'getSelectFilter',       // 선택한 필터 리스트 가져오기
            'getAllFilterListId',    // 필터 리스트 id 가져오기
            'getAllFilterItemId',    // 필터 리스트 아이템 id 
            'getAllFilterListNm',    // 필터 리스트 명    
        ]),
        makeParam: function(){
            var allParam = _.cloneDeep(this.$store.getters['search/getParam']);
			return this.$makeParam(allParam);
		},
        // chkSelAllFilter: function(id){ // 선택리스트 확인
        //     console.log(id, this.selectList);
        // },       
    },
    data(){
        return {
            selectList:[],  // 선택한 필터
            filterList:[]   // 선택되지 않은 필터
        }
    },
    mounted: function(){
        // 드래그
        this.$dragElement(this.$el,this.$refs['top_handler2']);
        this.initFilter();
        // this.refreshFilter(true);
    },
    updated: function(){
        // niceScroll
        let that = this.$el;
        this.$setNiceScrolls($(that).find('.nscrolls'));
    },
    methods: {
		...mapMutations("search", [				
            "setAllFilter",						// 전체보기 팝업 on/off
            "addFilter",                         // param에 필터 추가
            'removeFilterListId',    // 필터 리스트 초기화
        ]),	
        /**
		 * 필터 전체보기 팝업 close
		 */
		closePopAllFilter: function(){
            this.selectList = [];
            this.filterList = [];
			this.setAllFilter({'open':false, 'list_id': ''});
			$nuxt.$emit('default-fog', false, 'pop');
        },
        /**
         * 팝업 open전에 선택했던 필터 보여주기
         */
        initFilter: function(){
             // 전체 필터 리스트
            this.filterList = _.cloneDeep(this.getFilterList(this.getAllFilterListId));
            // 팝업 open전에 선택했던 필터 리스트
            this.selectList = _.cloneDeep(this.getSelectFilter(this.getAllFilterItemId));
            
            
            // 중복제거
            if(this.filterList && this.filterList.length > 0){
                let sortedArr = this.$twoArrSort(  this.filterList, 
                                                    "dt_"+this.getAllFilterItemId, 
                                                    this.selectList
                                                );

                this.filterList = sortedArr.otherArr;
                this.selectList = sortedArr.selArr;
            }
        },



        /**
         * 초기화
         * @param {*} opt   
         */
        refreshFilter: function(opt){
            // (팝업내에서) 선택한 필터 리스트 초기화
            this.selectList = [];
            // 전체 필터 리스트
            this.filterList = this.getFilterList(this.getAllFilterListId);
            
        },
        /**
         * 선택한 필터들 적용 ( "적용" 버튼 클릭시 )
         */
        addParamFilter: function(){
            let that = this;
            
            // 초기화
            this.removeFilterListId(that.getAllFilterItemId);    
            //실제 검색 param에 적용
            if(this.selectList.length > 0){
                this.selectList.map(elmn =>{
                    that.addFilter({'name': that.getAllFilterItemId, 'item': elmn});
                });
            }
            
            // 팝업 닫기
            this.$router.push( {path: '/search', query:this.makeParam});
            this.closePopAllFilter();
        },
        /**
         * 선택한 필터인지 확인! ( 하이라이트 )
         */
        chkSelAllFilter: function(obj){
            let searchFilter = this.selectList.filter((item) => {
               if(item['dt_'+this.getAllFilterItemId] == obj['dt_'+this.getAllFilterItemId])
                    return item;
            });
            if(searchFilter && searchFilter.length > 0) return true;
            else return false;
        },
        /**
         * 필터 적용 or 해제
         */
        toggleFilter: function(item){
            if(this.chkSelAllFilter(item)){ // 해제
                // 비선택 리스트에 추가
                this.filterList.push(item);
                // 선택 리스트에서 삭제
                this.selectList = this.selectList.filter(
                    obj => obj['dt_'+this.getAllFilterItemId] != item['dt_'+this.getAllFilterItemId]
                )
            } else {                        // 적용
                // 선택 리스트에 추가
                this.selectList.push(item);
                // 비선택 리스트에서 삭제
                this.filterList = this.filterList.filter(
                    obj => obj['dt_'+this.getAllFilterItemId] != item['dt_'+this.getAllFilterItemId]
                )
            }

        }
    }
}
</script>
<style scoped src="../assets/css/content.css"></style>
<style scoped>
.layer-wrap.allview.active.setCenter {top:0;left: 50%; transform: translateX(-50%);z-index:3601;}
.layer-wrap.allview.active.setCenter .is-top{cursor: move;}
</style>