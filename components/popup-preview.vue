<template>
    <!-- s: layer-wrap.allview -->
    <div class="layer-wrap preview active setCenter">
        <div class="is-top" ref="top_handler">
            <h2>미리보기</h2>
            <a href="javascript:void(0);" class="close preview-close" @click="closePop"><span class="blind">닫기</span></a>
        </div>
        <div class="is-con">
            <div class="info" v-if="getPreviewInfoLen > 0">
                <h3>{{getPreviewInfo.dt_title}}</h3> 
                <ul>
                    <li>
                        <p class="btxt">용량</p>
                        <p class="stxt">{{$setByteUnit(getPreviewInfo.dt_byte)}}</p>
                    </li>
                    <li>
                        <p class="btxt">전처리 수준</p>
                        <p class="stxt">{{getPreviewInfo.dt_level}}</p>
                    </li>
                    <li>
                        <p class="btxt">최소단위</p>
                        <p class="stxt">{{getPreviewInfo.dt_range}}</p>
                    </li>
                    <li>
                        <p class="btxt">갱신주기</p>
                        <p class="stxt">{{getPreviewInfo.dt_update}}</p>
                    </li>
                    <li>
                        <p class="btxt">다운로드</p>
                        <p class="stxt">{{$setComma(getPreviewInfo.dt_down)}}건</p>
                    </li>
                    <li>
                        <p class="btxt">등록일</p>
                        <p class="stxt">{{getPreviewInfo.dt_date}}</p>
                    </li>
                </ul>
            </div>
            <h4>※ 샘플데이터 최대 100개 행 </h4>
            <div class="list nscrolls">
                <table v-if="getPreviewSampleHeader !== undefined">
                    <colgroup>
                        <col v-for="(item, index) in getPreviewSampleHeader" 
                             :key="index" 
                             :width="(100/(getPreviewSampleHeader.length))+'%'"
                        />
                    </colgroup>
                    <thead>
                        <tr>
                            <th v-for="(item, index) in getPreviewSampleHeader" :key="index">
                                {{item}}
                            </th>
                        </tr>
                    </thead>
                    <tbody v-if="getPreviewSampleData.length > 1">
                        <tr v-for="(item, index) in getPreviewSampleData" :key="index">
                            <td v-for="(subItem, subIdx) in item" :key="subIdx">
                                {{subItem}}
                            </td>
                        </tr>
                    </tbody>
                </table>
                <table class="nodata" v-else >
                    <tbody>
                        <tr>
                            <td style="height:200px; text-align:center;">준비된 샘플 데이터가 없습니다.</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
        <div class="is-btm">
            <a  v-if="getPreviewInfoLen > 0 && getPreviewInfo.tbattachFiles.length > 0"
                href="javascript:void(0);" 
                @click="$downloadFile(getPreviewInfo.tbattachFiles,addDownCnt)"
                class="down-btn preview-close" 
                :class="(getPreviewInfo.dt_type?getPreviewInfo.dt_type.toLowerCase():'')"
            >
                <span>{{getPreviewInfo.dt_type.toUpperCase()}}</span>
            </a>
            <a href="javascript:void(0);" class="close-btn preview-close" @click="closePop"><span>닫기</span></a>
        </div>
    </div>
    <!-- e: layer-wrap allview -->
</template>
<script>
import { mapState, mapMutations, mapGetters, mapActions } from "vuex";
export default {
    computed:{
       ...mapGetters('search',[
           'getPreviewId',              // 선택한 데이터의 id
           'getPreviewUrl',             // 미리보기 데이터 가져올 url
           'getPreviewInfoLen',         // 데이터 요약정보 존재 유무
           'getPreviewInfo',            // 데이터 요약정보 
           'getPreviewSampleHeader',    // 샘플데이터(파일 내용) - header
           'getPreviewSampleData'           // 샘플데이터(파일 내용) - 내용
       ]) 
    },
    data() {
		return {
            name: 'preview',				    // 페이지 명 
		}
    },
    mounted: function(){
        // 드래그
        this.$dragElement(this.$el,this.$refs['top_handler']);
        this.fetchData();
    },
    updated: function(){
        // niceScroll
        let that = this.$el;
        this.$setNiceScrolls($(that).find('.nscrolls'));
    },
    methods:{
        ...mapMutations("search", ["setPreviewOff","addPreview"]),
        ...mapActions("search", ["getPreviewData", "addDownCnt"]),
        closePop: function(){
            // 데이터 초기화
            this.addPreview({data:{}});
            // 화면 닫기
            this.setPreviewOff(false);
            // 배경 원복
            $nuxt.$emit('default-fog', false, 'pop');
        },
        fetchData: function(){
            var posts = {};
            posts.url = this.getPreviewUrl + this.getPreviewId;
            this.getPreviewData(posts);
            
        },
    }
}
</script>

<style scoped src="../assets/css/content.css"></style>
<style scoped>
.layer-wrap.preview.active.setCenter {top:0;left: 50%; transform: translateX(-50%);z-index:3601;}
.layer-wrap.preview.active.setCenter .is-top{cursor: move;}

.layer-wrap.preview .nscrolls table.nodata {width:100% !important;}
.layer-wrap.preview .nscrolls table.nodata tbody tr td{ border-bottom: 1px solid #707070;}
</style>