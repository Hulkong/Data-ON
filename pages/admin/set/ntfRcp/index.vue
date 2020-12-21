<template>
  <div>
    <el-row>
      <el-col>
        <h2 class="u-tit01">알림 수신자</h2>
      </el-col>
    </el-row>
  </div>
</template>

<script>
export default {
  layout: 'admin',
  data() {
    return {
      posts: { // 데이터 가져올때 필요한  파라미터들
        param: {},
        url: '',
        storeName: ''
      }
    }
  }
}
</script>
