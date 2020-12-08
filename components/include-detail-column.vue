<template lang="html">
    <div class="subms">
        <p class="btxt">데이터 요약</p>
        <div class="txt">
            <table>
                <colgroup>
                    <col width="*"/>
                    <col width="13%"/>
                    <col width="13%"/>
                    <col width="13%"/>
                    <col width="13%"/>
                    <col width="13%"/>
                    <col width="13%"/>
                </colgroup>
                <thead>
                    <tr>
                        <th>컬럼명</th>
                        <th>타입</th>
                        <th>최소</th>
                        <th>최대</th>
                        <th>평균</th>
                        <th>중앙값</th>
                        <th>Null값</th>
                    </tr>
                </thead>
            </table>
            <div class="nscrolls">
                <table>
                    <colgroup>
                        <col width="*"/>
                        <col width="13%"/>
                        <col width="13%"/>
                        <col width="13%"/>
                        <col width="13%"/>
                        <col width="13%"/>
                        <col width="13%"/>
                    </colgroup>
                    <tbody v-if="info.length > 0">
                        <template  v-for="colItem in info" >
                            <tr v-if="colItem.id !== undefined" :key="colItem.id">
                                <td 
                                    :class="{onPointer: getCategory =='column'}"
                                    v-html="$regExpText(colItem.col_nm,getKeyword)">
                                </td>
                                <td>{{colItem.col_type}}</td>
                                <td>{{colItem.col_min}}</td>
                                <td>{{colItem.col_max}}</td>
                                <td>{{colItem.col_avg}}</td>
                                <td>{{colItem.col_mid}}</td>
                                <td>{{colItem.col_null?'있음':'없음'}}</td>
                            </tr>
                        </template>
                    </tbody>
                    <tbody v-else>
                        <tr>
                            <td colspan="7" style="text-align:center;">
                                데이터가 없습니다.
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    </div>
</template>

<script>
    import { mapGetters } from "vuex";
    export default {
        computed: {
            ...mapGetters('search',[
                'getKeyword', 	 // 키워드 가져오기
                'getCategory',				// 선택한 카테고리 가져오기 ('title', 'detail', 'column')
            ]),
        },
        props:{
            info: Array
        },
        methods: {
        }
    }
</script>

<style scoped src="../assets/css/content.css"></style>
<style scoped>
.search-wrap .list .subms >>> .onPointer span{background:#fffab7; padding:0 1px;}
</style>
