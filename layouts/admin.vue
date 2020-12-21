<template>
  <el-container id="admin-container">
    <el-header height="80px" class="pad50lr">
      <admin-header />
    </el-header>

    <el-container>
      <el-aside width="250px" style="border-right: solid 1px #e6e6e6;">
        <admin-left />
      </el-aside>

      <el-main class="pad50a">
        <Nuxt />
      </el-main>
    </el-container>

    <el-footer height="178px">
      <admin-footer />
    </el-footer>
  </el-container>
</template>

<script>
  export default {
    middleware: 'auth',
    head: {
      title: 'Data-ON Admin'
    }
  }
</script>

<style scoped src="../assets/css/admin.css" ></style>
<style scoped>
#admin-container {
  min-height: 100px;
  min-width: 200px;
}
</style>