<template>
    <div class="paging-wrap">
        <a  href="javascript:void(0);"
            v-if="totalCount > 5 && cpage > 5"
            @click="goPre"
            class="prev ctrl">
                <span class="blind">이전 페이지로</span>
        </a>
        <ul>
            <li v-for=" idx in pageListCnt "
                :key=idx
                :class="{'active':idx + (pListCount * (Math.floor((cpage-1)/pListCount))) == cpage}"
            >
                <a  href="javascript:void(0);"
                    v-if="idx + (pListCount*(Math.floor((cpage-1)/pListCount))) <= Math.ceil(totalCount/listsize)"
                    @click="goPage(idx + (pListCount*(Math.floor((cpage-1)/pListCount))))"
                >
                    {{ idx + (pListCount*(Math.floor((cpage-1)/pListCount))) }}
                </a>
            </li>
        </ul>
        <a  href="javascript:void(0);"
            v-if="totalCount > (listsize * pListCount * (Math.floor((cpage-1)/pListCount)+1))"
            @click="goNext"
            class="next ctrl">
            <span class="blind">다음페이지로</span>
        </a>
        
    </div>
</template>
<script>
import { mapState, mapMutations, mapGetters, mapActions } from "vuex";
export default {
    computed: {
        totalCount: function(){ // 각 게시판 list의 총 수
            return Number(this.$store.getters[this.page_type + '/getCount'](this.page_name));
        },
        cpage: function(){      // 현재 페이지
            return Number(this.$store.getters[this.page_type + '/getcPage'](this.page_name));
        },
        pListCount: function(){ // 한페이지에 보여지는 페이지 수
            return Number(this.$store.getters[this.page_type + '/getPageListSize'](this.page_name));
        },
        listsize: function(){   // 리스트 사이즈
            return Number(this.$store.getters[this.page_type + '/getListSize'](this.page_name));
        },
        pageListCnt: function(){
            // 현재 페이지 리스트의 마지막 페이지까지 포함된 리스트 개수
            var thisListCnt = Math.ceil(this.cpage/this.pListCount) * this.listsize * this.pListCount;
            
            if((this.totalCount/this.listsize) <= this.pListCount){
                // 전체 페이지리스트 수 와 한 페이지리스트에 몇개 표현되는 지 (전체 리스트 수가 3갠데 표현할 수 있는 페이지가 5개면)
                return Math.ceil(this.totalCount/this.listsize) ;
            } else if ( thisListCnt > this.totalCount ){
                // 22페이지를 보고 있었으면 25페이지( pListCount가 '5'라고 가졍 )까지 존재할 수 있는 리스트 수 와 전체 리스트 수 비교
                // 25페이지까지 안나오면 나올 수 있는 최대 수 계산
                return Math.ceil((this.totalCount-(thisListCnt-(this.listsize*this.pListCount)))/this.listsize)
            } else {
                return Number(this.pListCount);
            }
        },
        makeParam: function(){
            var allParam = _.cloneDeep(this.$store.getters['search/getParam']);
			return this.$makeParam(allParam);
		},
	},
    data: function(){
        return {
        }
    },
    props:{
        page_name: String,  // board name
        page_type: String   // store name
    },
    methods:{
        goPre: function(){
            let current_page = this.pListCount * Math.floor((this.cpage-1-this.pListCount) / this.pListCount) + 1;
            let obj = {
                'name': this.page_name,
                'page': current_page
            }

            this.$store.commit(this.page_type+'/setPage', obj)

            // 검색
            if(this.page_type == 'search' && obj.out === 'succeed'){
                this.$router.push( {path: '/search', query:this.makeParam});
            } else {
                this.$parent.fetchData();
            }
        },
        goNext: function(){
            let current_page = this.pListCount * Math.floor((this.cpage-1+this.pListCount) / this.pListCount) + 1;
            let obj = {
                'name': this.page_name,
                'page': current_page
            }

            this.$store.commit(this.page_type+'/setPage', obj)

            // 검색
            if(this.page_type == 'search' && obj.out === 'succeed'){
                this.$router.push( {path: '/search', query:this.makeParam});
            } else {
                this.$parent.fetchData();
            }
        },
        goPage: function(num=1){

            let obj = {
                'name': this.page_name,
                'page': num
            }
            this.$store.commit(this.page_type+'/setPage', obj);

            // 검색
            if(this.page_type == 'search' && obj.out === 'succeed'){
                this.$router.push( {path: '/search', query:this.makeParam});
            } else {
                this.$parent.fetchData();
            }
        },

    }
}
</script>
