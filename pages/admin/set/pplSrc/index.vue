<template>
  <div>
    <el-row>
      <el-col>
        <h2 class="u-tit01">인기 검색어</h2>
      </el-col>
    </el-row>

    <div class="search-container">
      <el-row>
        <el-col :span="4" class="header-col">
          <label for="date1">기간설정</label>
        </el-col>

        <el-col :span="10">
          <el-date-picker type="date" placeholder="-- 시작일 --" v-model="date1" style="width: 40%;" id="date1" size="small" />
          <el-date-picker type="date" placeholder="-- 종료일 --" v-model="date2" style="width: 40%;" size="small" />
          <span class="pad5l" style="color: #E96D00;">총 17일간</span>
        </el-col>
      </el-row>
    </div>

    <el-row class="mg20t">
      <el-col class="tc">
        <el-button>검색</el-button>
      </el-col>
    </el-row>

    <transfer :options="options" :datas="datas" :values.sync="values" :update="updateDate" />
  </div>
</template>

<script>
export default {
  layout: 'admin',
  data() {
    return {
      date1: '',
      date2: '',
      posts: { // 데이터 가져올때 필요한  파라미터들
        param: {},
        url: '',
        storeName: ''
      },
      options: {
        headers: [
          { text: '순위', formatter: 'numbering' },
          { text: '검색어', keyName: 'key1', width: '65%', isKey: true },
          { text: '검색건수', keyName: 'key2', width: '20%', type: 'number' }
        ],
        listArea: {
          title: '사용자 검색 순위'
        },
        selectArea: {
          title: '서비스 적용',
          useUpDown: true,
          resetMethod: 'reset',
          saveMethod: 'save',
          addButton: {
            text: '관리자 추가',
            icon: 'el-icon-user-solid',
            method: 'add_admin'
          }
        },
        noListMessage: '검색어가 없습니다.'
      },
      datas: [
        { key1: '할머니', key2: 829929, select: false },
        { key1: '할아버지', key2: 49038, select: false },
        { key1: '어머니', key2: 32222, select: false },
        { key1: '아버지', key2: 10155, select: false },
        { key1: '누나', key2: 9783, select: false },
        { key1: '큰형', key2: 8453, select: false },
        { key1: '동생', key2: 7393, select: false },
        { key1: '막내', key2: 998, select: false },
        { key1: '이모', key2: 503, select: false },
        { key1: '삼촌', key2: 219, select: false }
      ],
      values: ['할머니', '할아버지', '어머니', '아버지', '누나'],
      updateDate: '2020-12-09'
    }
  },
  beforeMount() {
    const this2 = this

    this2.datas.forEach(function(value) {
      value.key2 = this2.$setComma(value.key2)
    })
  },
  methods: {
    reset() {
      console.log('reset')
    },
    save() {
      console.log(this.values)
    },
    add_admin() {
      console.log('add_admin')
    }
  }
}
</script>
