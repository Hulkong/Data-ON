<template lang="html">
    <div class="metas" >
        <!-- <p class="btxt">메타정보</p>
        <p class="stxt">
            <span>데이터 행 <i>{{$setComma(info.dt_row)}}개</i></span>
            <span class="abr">데이터 컬럼 <i>{{$setComma(info.dt_column)}}개</i></span>
        </p>
        <a  :href="info.tbresultMeta.info_url !== undefined && info.tbresultMeta.info_url != '' ? info.tbresultMeta.info_url : 'javascript:void(0);'" 
            target="_tab"
            class="link-btn"
        >
            <span>제공페이지로 이동</span>
        </a>
        <div class="txt">
            <table>
                <colgroup>
                    <col width="35%"/>
                    <col width="*"/>
                </colgroup>
                <thead>
                    <tr>
                        <th>구분</th>
                        <th class="c">내용</th>
                    </tr>
                </thead>
                <tbody>
                    <template v-for="idx in 6" >
                    <tr v-if="
                                info.tbresultMeta['info0'+(idx)+'_key'] !== undefined 
                                && info.tbresultMeta['info0'+(idx)+'_key'] != '' 
                                && info.tbresultMeta['info0'+(idx)+'_val'] !== undefined 
                                && info.tbresultMeta['info0'+(idx)+'_val'] != ''
                                " 
                        :key="idx"
                    >
                        <td>
                            {{info.tbresultMeta['info0'+(idx)+'_key']}}
                        </td>
                        <td>
                            {{info.tbresultMeta['info0'+(idx)+'_val']}}
                        </td>
                    </tr>
                    </template>
                </tbody>
            </table>
        </div>  -->

        <p class="btxt">데이터 차원</p>
        <p class="stxt">
            <span>데이터 행 <i>{{$setComma(info.dt_row)||0}}개</i></span>
            <span class="abr">데이터 컬럼 <i class="txtrgt">{{$setComma(info.dt_column)||0}}개</i></span>
        </p>
        <a  v-if="info.tbresultMeta"
            href="javascript:void(0);"
            @click="sendLink(info.tbresultMeta)"
            target="_tab"
            class="link-btn"
        >
            <span>제공페이지로 이동</span>
        </a>
    </div> 
</template>

<script>
    // 페이지 이동시 로딩 화면 
  export default {
    props:{
        info: Object
    },
    methods: {
        sendLink: function(meta){
            // 구글 애널리틱스 추가
			this.$sendGA(this,'검색결과 자세히보기','링크연결', meta.info_url);

            // 페이지 이동
            if(meta.info_url) window.open('about:tab').location.href=meta.info_url;
            else return false;
        }
    }
  }
</script>

<style scoped src="../assets/css/content.css"></style>
<style scoped>
.search-wrap .list .metas{float:left; width:15%; margin-left:4%;position:relative;min-height: 120px;}
.search-wrap .list .metas .link-btn{width:100%;height:30px; text-align:left;  box-sizing:border-box; padding-left:26px; line-height:29px; font-size:12px; border:1px solid #0075c1; position:absolute; left:0px; top:73px; color:#0075c1; letter-spacing:-0.03em; margin:14px 10px 10px 0px;}
.search-wrap .list .metas .link-btn:after{width:10px;height:10px; right:5px;background:url(/images/Sub/ico-nwin.jpg) no-repeat center center; margin-top:3px; display:block;content:""; top:50%;margin-top:-5px; position:absolute;}
.search-wrap .list .metas .stxt{position:relative;margin-top:11px;}
.search-wrap .list .metas .stxt span i{font-weight:700; font-size:20px; color:#0075c1; line-height:1em;margin-top:6px ; display:block;}
.search-wrap .list .metas .stxt span i.txtrgt{text-align: right;}
@media only screen and (max-width:1300px) {
        .search-wrap .list .metas .link-btn{height:30px; line-height:29px; top:70px; padding-left:19px;}
}
@media only screen and (max-width:1160px) {
    .search-wrap .list .metas .link-btn{top:70px;padding-left: 8px;text-indent:0px;} 
}
</style>