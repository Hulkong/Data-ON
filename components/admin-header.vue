<template>
  <el-row class="pad20tf">
    <el-col :span="12" id="logo">
      <NuxtLink to="/admin">
        <img src="/images/slogo.png" />
      </NuxtLink>

      <span id="text">관리자 페이지</span>
    </el-col>

    <el-col :span="12" class="pad10t" id="right">
      <NuxtLink to="/">데이터온으로 가기</NuxtLink>
      <span>&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;</span>
      <a v-if="getAuth" href="javascript:" @click="logout">로그아웃</a>
      <NuxtLink v-if="!getAuth" to="/admin/login">로그인</NuxtLink>
    </el-col>
  </el-row>
</template>

<script>
  import { mapActions, mapGetters } from 'vuex'

  export default {
    computed: {
      ...mapGetters('auth', [
        'getAuth'
      ])
    },
    methods: {
      ...mapActions('auth', [
        'postLogout',
      ]),
      async logout() {
        await this.postLogout()

        if (this.getAuth) {
          this.$alert('error')
        } else {
          this.$router.push('/admin/login')
        }
      }
    }
  }
</script>

<style scoped>
  #logo {
    padding-top: 6px;
    padding-left: 15px;
  }

  #text {
    padding-left: 47px;
    font-size: 18px;
    color: #fff;
    font-weight: 500;
  }

  #right {
    color: #fff;
    text-align:right;
  }

  #right>a {
    color: #fff;
  }
  @media only screen and (max-width: 999px) {
    #logo #text {display: none}
  }
</style>
