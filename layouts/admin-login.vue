<template>
  <el-container id="admin-container">
    <el-header height="80px" class="pad50lr">
      <admin-header />
    </el-header>

    <el-container>
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
    middleware: 'notAuth',
    head: {
      title: 'Data-ON Admin'
    }
  }
</script>

<style scoped src="../assets/css/admin.css" ></style>
