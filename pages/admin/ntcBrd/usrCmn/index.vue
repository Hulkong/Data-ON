<template>
  <div>
    <el-row>
      <el-col>
        <h2 class="u-tit01">사용자 의견 검색</h2>
      </el-col>
    </el-row>

    <div class="search-container">
      <el-row>
        <el-col :span="4" class="header-col">
          <label for="name">이름</label>
        </el-col>

        <el-col :span="8">
          <el-input maxlength="20" v-model="params.name" id="name" size="small" />
        </el-col>

        <el-col :span="4" class="header-col">
          <label for="email">연락처</label>
        </el-col>

        <el-col :span="8">
          <el-input maxlength="128" v-model="params.email" id="email" size="small" />
        </el-col>
      </el-row>

      <el-row>
        <el-col :span="4" class="header-col">
          <label for="is_send_email">답변상태</label>
        </el-col>

        <el-col :span="8">
          <el-select v-model="params.is_send_email" id="is_send_email" size="small" class="w100p">
            <el-option label="-- 전체 --" value="" />
            <el-option label="대기" value="False" />
            <el-option label="완료" value="True" />
          </el-select>
        </el-col>

        <el-col :span="4" class="header-col">
          <label for="type">의견유형</label>
        </el-col>

        <el-col :span="8">
          <el-select v-model="params.type" id="type" size="small" class="w100p">
            <el-option label="-- 전체 --" value="" />
            <el-option label="오류신고" value="0" />
            <el-option label="기능개선" value="1" />
            <el-option label="데이터문의" value="2" />
          </el-select>
        </el-col>
      </el-row>

      <el-row>
        <el-col :span="4" class="header-col">
          <label for="content">내용검색</label>
        </el-col>

        <el-col :span="8">
          <el-input maxlength="200" v-model="params.content" id="content" size="small" />
        </el-col>

        <el-col :span="4" class="header-col">
          <label for="start_date">등록일</label>
        </el-col>

        <el-col :span="8">
          <el-date-picker type="date" placeholder="-- 시작일 --" v-model="params.start_date" style="width: 45%;" id="start_date" size="small" value-format="yyyyMMdd" />
          <el-date-picker type="date" placeholder="-- 종료일 --" v-model="params.end_date" style="width: 45%;" size="small" value-format="yyyyMMdd" />
        </el-col>
      </el-row>
    </div>

    <el-row class="mg20t">
      <el-col class="tc">
        <el-button @click="goSearch">검색</el-button>
      </el-col>
    </el-row>

    <el-row class="mg20t">
      <el-col>전체 <span class="data-length-span">{{ getCount(stateId) ? $setComma(getCount(stateId)) : 0 }}</span>건</el-col>
    </el-row>

    <el-row class="mg20t">
      <el-col>
        <el-table :data="getData(stateId)">
          <el-table-column label="답변상태" width="96" align="center">
            <template slot-scope="scope">
              <span v-if="scope.row.is_send_email" class="ntxt">완료</span>
              <span v-else class="ntxt2">대기</span>
            </template>
          </el-table-column>

          <el-table-column prop="hit" label="의견유형" width="118" align="center">
            <template slot-scope="scope">{{ $setComma(scope.row.type) }}</template>
          </el-table-column>

          <el-table-column label="번호" width="63" align="center">
            <template slot-scope="scope">{{ scope.row.num }}</template>
          </el-table-column>

          <el-table-column label="이름" width="118" align="center">
            <template slot-scope="scope">
              <nuxt-link :to="{ path: '/admin/ntcBrd/usrCmn/'+scope.row.id, query: posts.param }">
                {{ $cutText(scope.row.name, '...', 40) }}
              </nuxt-link>
            </template>
          </el-table-column>

          <el-table-column prop="hit" label="연락처" align="center">
            <template slot-scope="scope">{{ scope.row.email }}</template>
          </el-table-column>

          <el-table-column prop="reg_date" label="등록일" width="118" align="center">
            <template slot-scope="scope">{{ $dateFormat(scope.row.reg_date, '-') }}</template>
          </el-table-column>
        </el-table>

        <div v-if="getCount(stateId) === 0" class="empty-block">등록된 사용자 의견이 없습니다.</div>
      </el-col>
    </el-row>

    <list-page v-if="getCount(stateId) > 0" :page_name="stateId" page_type="inquires" />
  </div>
</template>

<script>
import { mapActions, mapGetters, mapMutations } from 'vuex'

export default {
  layout: 'admin',
  computed: {
    ...mapGetters('inquires', [
      'getParam', // list의 param 세팅 가져오기
      'getUrl', // list의 url 가져오기
      'getData',
      'getCount' // 각 게시판 list의 총 수
    ]),
  },
  data() {
    return {
      stateId: 'list',
      params: {
        is_send_email: '',
        type: '',
        name: '',
        email: '',
        content: '',
        start_date: '',
        end_date: ''
      },
      posts: { // 데이터 가져올때 필요한  파라미터들
        param: {},
        url: ''
      }
    }
  },
  mounted() {
    const page = this.$route.query.page ? this.$route.query.page : 1

    // querystring key loop
    for (const param of Object.entries(this.$route.query)) {
      // params 내 값 확인
      if (param[0] in this.params) {
        // value 할당
        this.params[param[0]] = param[1]
      }
    }

    // 검색 조건 저장
    this.setParam({
      name: this.stateId,
      param: this.params
    })

    // 검색 조건 저장
    this.setPage({
      name: this.stateId,
      page: page
    })

    // 공지사항 리스트 가져오기
    this.fetchData()
  },
  methods: {
    ...mapActions('inquires', ['getList']),
    ...mapMutations('inquires', [
      'setParam',	// 검색 조건 선택 저장
      'setPage', // 페이지 번호 수정 (초기화)
    ]),
    /**
     * 초기 데이터 가져오기
     */
    fetchData() {
      this.posts.param = this.getParam(this.stateId)
      this.posts.url = this.getUrl(this.stateId)
      this.getList(this.posts)
    },
    /**
     * 리스트 검색
     */
    goSearch() {
      const that = this

      // 검색 조건 저장
      this.setParam({
        name: that.stateId,
        param: that.params
      })

      // 검색 조건 저장
      this.setPage({
        name: that.stateId,
        page: 1
      })

      // 검색 조건으로 리스트 다시가져오기
      this.fetchData()
    }
  }
}
</script>
