<template>
  <div>
    <el-row>
      <el-col>
        <h2 class="u-tit01">공지사항</h2>
      </el-col>
    </el-row>

    <el-row class="tr">
      <el-col>
        <el-radio-group class="pad5f" v-model="searchCondition">
          <el-radio-button label="1">제목+내용</el-radio-button>
          <el-radio-button label="2">제목</el-radio-button>
          <el-radio-button label="3">내용</el-radio-button>
        </el-radio-group>

        <el-input class="w363" placeholder="검색어를 입력하세요." maxlength="200" v-model="keyword" />
        <el-button @click="goSearch">검색</el-button>
      </el-col>
    </el-row>

    <el-row class="mg20t">
      <el-col :span="12" class="pad20t">전체 <span class="data-length-span">{{ getCount(name) ? $setComma(getCount(name)) : 0 }}</span>건</el-col>

      <el-col :span="12" class="tr">
        <NuxtLink to="/admin/ntcBrd/ntc/wrt">
          <el-button class="white-el-button"><i class="el-icon-edit" /> 글쓰기</el-button>
        </NuxtLink>
      </el-col>
    </el-row>

    <el-row class="mg20t">
      <el-col>
        <el-table :data="getNoticeOneList(name)">
          <el-table-column label="번호" width="96" align="center">
            <template slot-scope="scope">
              <span v-if="scope.row.notice_yn" class="ntxt">공지</span>
              <span v-else>{{ scope.row.id }}</span>
            </template>
          </el-table-column>

          <el-table-column label="제목" headerAlign="center">
            <template slot-scope="scope">
              <nuxt-link :to="{ path: '/admin/ntcBrd/ntc/'+scope.row.id, query: posts.param }">
                {{ $cutText(scope.row.title, '...', 40) }} <img v-if="scope.row.tbattachFiles.length > 0" src="/images/Sub/ico-file.png" alt="file" />
              </nuxt-link>
            </template>
          </el-table-column>

          <el-table-column prop="reg_date" label="등록일" width="118" align="center">
            <template slot-scope="scope">{{ $dateFormat(scope.row.reg_date, '-') }}</template>
          </el-table-column>

          <el-table-column prop="hit" label="조회수" width="69" align="center">
            <template slot-scope="scope">{{ $setComma(scope.row.hit) }}</template>
          </el-table-column>
        </el-table>

        <div v-if="getCount(name) === 0" class="empty-block">등록된 공지사항이 없습니다.</div>
      </el-col>
    </el-row>

    <list-page v-if="getCount(name) > 0" :page_name="name" page_type="board" />
  </div>
</template>

<script>
import { mapMutations, mapGetters, mapActions } from 'vuex'

export default {
  layout: 'admin',
  computed: {
    ...mapGetters('board', [
      'getParam', // 각 게시판 list의 param 세팅 가져오기
      'getUrl', // 각 게시판 list의 url 가져오기
      'getNoticeOneList', // element library 사용으로 공지 글, 일반 글 함께 조회
      'getCount' // 각 게시판 list의 총 수
    ]),
  },
  data() {
    return {
      name: 'notice',
      searchCondition: '1',	// 검색조건 (1: 제목+내용, 2: 제목, 3: 내용)
      keyword: '', // 검색어
      posts: { // 데이터 가져올때 필요한  파라미터들
        param: {},
        url: '',
        storeName: ''
      }
    }
  },
  mounted() {
    // param에 키워드 있으면 적용
    this.keyword = this.$route.query.keyword

    if (this.$route.query.searchCondition) {
      this.searchCondition = this.$route.query.searchCondition
    }

    // 공지사항 리스트 가져오기
    this.fetchData()
  },
  methods: {
    ...mapActions('board', ['getData']),
    ...mapMutations('board', [
      'setSearchCondition',	// 검색 조건 선택 저장
      'setKeyword', // 검색어 저장
      'setPage', // 페이지 번호 수정 (초기화)
    ]),
    /**
     * 초기 데이터 가져오기
     */
    fetchData() {
      this.posts.param = this.getParam(this.name)
      this.posts.url = this.getUrl(this.name)
      this.posts.storeName = this.name

      this.getData(this.posts)
    },
    /**
     * 리스트 검색
     */
    goSearch() {
      const that = this

      if (that.keyword) {
        // 키워드 저장
        this.setKeyword({
          name: that.name,
          keyword: that.keyword
        })

        // 검색 조건 저장
        this.setSearchCondition({
          name: that.name,
          searchCondition: that.searchCondition
        })

        // 검색 조건 저장
        this.setPage({
          name: that.name,
          page: 1
        })

        // 검색 조건으로 리스트 다시가져오기
        this.fetchData()
      } else {
        this.$alert('검색어를 입력하세요.')
      }
    }
  }
}
</script>
