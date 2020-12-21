<template>
  <div id="admin-login">
    <el-row>
      <el-col>
        <h2 class="u-tit01 tc">admin login</h2>
      </el-col>
    </el-row>

    <el-row class="mg20t tc">
      <el-col>
        <el-input placeholder="Please input username" v-model="posts.username" class="w50p" maxlength="20" />
      </el-col>
    </el-row>

    <el-row class="mg20t tc">
      <el-col>
        <el-input placeholder="Please input password" v-model="posts.password" show-password class="w50p" maxlength="20" />
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
    width: 30%;
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
          this.$alert('Please input username')
        } else if (!posts.password) {
          this.$alert('Please input password')
        } else {
          await this.login(this.posts)

          if (this.getAuth) {
            this.$router.push('/admin')
          } else {
            this.$alert('Unable to log in with provided credentials', 'error')
          }
        }
      }
    }
  }
</script>
