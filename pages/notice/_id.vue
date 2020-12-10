<template>
    <div id="contents">
        <!-- s: page-start//-->
        <div class="board-wrap detail">
            <h2 class="u-tit01">공지사항</h2>
            <div class="detail">
                <div class="info">
                    <h3>{{getDetailResult(name).title}}</h3>
                    <ul>
                        <li>
                            <p class="btxt">No.</p>
                            <p class="stxt">{{getDetailResult(name).id}}</p>
                        </li>
                        <li>
                            <p class="btxt">작성자</p>
                            <p class="stxt">{{getDetailResult(name).user_nm}}</p>
                        </li>
                        <li>
                            <p class="btxt">등록일</p>
                            <p class="stxt" v-if="getDetailResult(name) && getDetailResult(name).reg_date">
                                {{$dateFormat(getDetailResult(name).reg_date,'-')}}
                            </p>
                        </li>
                        <li>
                            <p class="btxt">첨부파일</p>
                            <p class="stxt" 
                               v-if="getDetailResult(name) && getDetailResult(name)['tbattachFiles']">
                                <a  v-for="(item, index) in getDetailResult(name)['tbattachFiles']" 
                                    :key="index"
                                    href="javascript:void(0);" 
                                    class="stxt file"
                                    @click="$downloadFile(item, downCallback)"
                                >
                                        {{item['origin_nm']}}
                                </a>
                            </p>
                        </li>
                    </ul>
                </div>
                <div class="txt">
                    <p v-html="chngHtml(getDetailResult(name).content)"></p>
                    <!-- <p>
                    {{getDetailResult(name).content}}
                    </p> -->
                    <div class="mobile-con">
                        <div class="ex">
                            <a href="#n"><span>데이터 다운로드는 PC웹버전에서만 가능합니다.</span></a>			
                        </div>
                    </div>
                </div>
            </div>
            <div class="mobile-con">
                <div class="files">
                    <!-- <a href="#none">{{getDetailResult(name)['tbattachFiles'][0].origin_nm}}</a> -->
                </div>
            </div>
            <div class="lower">
                <nuxt-link :to="{ path: '/notice/', query: listParam}" class="list-btn"><span>목록</span></nuxt-link>
                <!-- <a href="#none" :click="goList" class="list-btn"><span>목록</span></a> -->
            </div>
        </div>
        <!-- e: page-end //-->
    </div>
</template>

<script>
import { mapState, mapMutations, mapGetters, mapActions } from "vuex";
export default {
    computed: {
		...mapGetters('board',[
			'getDetailParam', 			 // 각 게시판 상세내용의 param 세팅 가져오기
			'getDetailURL', 			 // 각 게시판 상세내용의 url 가져오기
			'getDetailResult', 		 	 // 각 게시판 상세내용 가져오기
		]),
	},
    data() {
		return {
            clicknum : 1,
            name: 'notice',         // 페이지 네임
            posts:{                 //데이터 가져올때 필요한 파라미터
				url: '',
				storeName: ''
            },
            listParam: {}           // 페이지 사용 param
		}
	},
	mounted(){
	    // 게시판 상세내용 가져오기
        this.fetchData(this.$route.params.id);
        this.listParam = this.$route.query;
	},
	methods: {
        ...mapActions("board", ["getDetailData"]),
        ...mapActions("search", ["addDownCnt"]),
		/**
		 * 초기 데이터 가져오기
		 */
		fetchData: function(id){
			this.posts.url = this.getDetailURL(this.name) + id;
			this.posts.storeName = this.name;
			this.getDetailData(this.posts);
        },
        /**
         * 리스트로 이동
         */
        goList: function(){
            this.$router.push('/notice');
        },
        /**
         * markdown to html 변환
         */
        chngHtml: function(text){
            var html = text;

            marked.setOptions({
                renderer: new marked.Renderer(),
                gfm: true,
                headerIds: false,
                tables: true,
                breaks: true,
                pedantic: false,
                smartLists: true,
                smartypants: false
            });
            if( typeof html !== 'undefined' && html !== null) html = marked(html);
            
            return html;
        },
        downCallback: function(file){
            // 구글 애널리틱스 추가
            this.$sendGA(this,'공지사항 다운로드','다운로드', file.origin_nm);

            // 다운로드 수 증가
            this.addDownCnt(file.id);
        }
	}
}
</script> 
<style scoped src="../../assets/css/content.css"></style>
<style scoped>
.txt >>> img {max-width: 100%; height:auto;}
</style>
