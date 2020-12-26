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

        <el-col :span="20">
          <el-date-picker type="date" placeholder="-- 시작일 --" v-model="date1" style="width: 45%;" id="date1" size="small" />
          <el-date-picker type="date" placeholder="-- 종료일 --" v-model="date2" style="width: 45%;" size="small" />
          <span class="pad5l">총 17일간</span>
        </el-col>
      </el-row>
    </div>

    <el-row class="mg20t">
      <el-col class="tc">
        <el-button>검색</el-button>
      </el-col>
    </el-row>
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
      }
    }
  }
}
</script>
