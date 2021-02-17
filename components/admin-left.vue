<template>
  <el-row>
    <el-col>
      <el-menu style="border-right: 0;" default-active="" @open="handleOpen" @close="handleClose">
        <!--        TODO: 2차 반영 주석-->
<!--        <el-submenu index="1">
          <template slot="title">
            <span>회원정보</span>
          </template>

          <NuxtLink to="/admin/prf/lst">
            <el-menu-item index="1-1">리스트</el-menu-item>
          </NuxtLink>
        </el-submenu>-->

        <el-submenu index="2">
          <template slot="title">
            <span>게시판</span>
          </template>

          <NuxtLink to="/admin/ntcBrd/ntc">
            <el-menu-item index="2-1">공지사항</el-menu-item>
          </NuxtLink>

          <NuxtLink to="/admin/ntcBrd/usrCmn">
            <el-menu-item index="2-2">사용자 의견</el-menu-item>
          </NuxtLink>
        </el-submenu>

        <el-submenu index="3">
          <template slot="title">
            <span>설정</span>
          </template>

          <NuxtLink to="/admin/set/pplSrc">
            <el-menu-item index="3-1">인기 검색어</el-menu-item>
          </NuxtLink>

          <NuxtLink to="/admin/set/ntfRcp">
            <el-menu-item index="3-2">알림 수신자</el-menu-item>
          </NuxtLink>
        </el-submenu>
      </el-menu>
    </el-col>
  </el-row>
</template>

<script>
export default {
  methods: {
    handleOpen(key, keyPath) {

    },
    handleClose(key, keyPath) {

    }
  }
}
</script>
