<template>
  <div id="admin-login">
    <el-row>
      <el-col>
        <h2 class="u-tit01 tc">관리자 페이지 로그인</h2>
      </el-col>
    </el-row>

    <el-row class="mg20t tc">
      <el-col>
        <div class="w50p el-input">
          <input type="text" autocomplete="off" placeholder="사용자 이름을 입력하십시오." maxlength="150" class="el-input__inner" v-model="posts.username" @keypress.enter="postLogin">
        </div>
      </el-col>
    </el-row>

    <el-row class="mg20t tc">
      <el-col>
        <div class="w50p el-input el-input--suffix">
          <input type="password" autocomplete="off" placeholder="비밀번호를 입력하세요." maxlength="128" class="el-input__inner" v-model="posts.password" @keypress.enter="postLogin">
        </div>
      </el-col>
    </el-row>

    <el-row class="mg40t tc">
      <el-col>
        <el-button @click="postLogin">로그인</el-button>
      </el-col>
    </el-row>
  </div>
</template>

<style scoped>
  #admin-login {
    margin: 35px auto;
    padding: 150px 0 100px 0;
    width: 474px;
    background: #f9fafc;
  }
</style>

<script>
  import { mapGetters, mapActions } from 'vuex'

  export default {
    layout: 'admin-login',
    computed: {
      ...mapGetters('auth', [
        'getAuth'
      ]),
    },
    data() {
      return {
        posts: {
          username: '',
          password: ''
        }
      }
    },
    methods: {
      ...mapActions('auth', [
        'login',
      ]),
      async postLogin() {
        const posts = this.posts

        if (!posts.username) {
          this.$alert('사용자 이름을 입력하십시오.')
        } else if (!posts.password) {
          this.$alert('비밀번호를 입력하세요.')
        } else {
          await this.login(this.posts)

          if (this.getAuth) {
            this.$router.push('/admin')
          } else {
            this.$alert('제공된 자격 증명으로 로그인 할 수 없습니다.')
          }
        }
      }
    }
  }
</script>
