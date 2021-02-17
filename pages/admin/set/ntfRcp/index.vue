<template>
  <div>
    <el-row>
      <el-col>
        <h2 class="u-tit01">알림 수신자</h2>
      </el-col>
    </el-row>

    <transfer :options="options" :datas="datas" :values.sync="values" />

    <el-row v-if="is_add" class="mg30t">
      <el-col style="width: 45%;">
        <div class="t-row">
          <div class="t-col">
            <h2 class="u-tit02">오픈메이트온 추가</h2>
          </div>
        </div>

        <el-row>
          <el-col>
            <el-input type="text" class="w25p mg10r" v-model="add_params.add_value_username" maxlength="20" size="small" placeholder="이름" />
            <el-input type="text" class="w70p" v-model="add_params.add_value_email" maxlength="100" size="small" placeholder="이메일" />
          </el-col>
        </el-row>

        <el-row class="mg20t tr">
          <el-col>
            <el-button class="t-button" @click="add_value">추가</el-button>
            <el-button class="t-button" @click="cancel_add">취소</el-button>
          </el-col>
        </el-row>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'

export default {
  layout: 'admin',
  computed: {
    ...mapGetters('common', ['getUrl', 'getData']),
    ...mapGetters('auth', [
      'getAuth'
    ])
  },
  data() {
    return {
      posts: { // 데이터 가져올때 필요한  파라미터들
        param: {},
        url: '',
        storeName: ''
      },
      options: {
        headers: [
          { text: '번호', formatter: 'numbering' },
          { text: '이름', keyName: 'username', width: '20%' },
          { text: '이메일', keyName: 'email', width: '65%' },
          { keyName: 'id', isHidden: true, isKey: true }
        ],
        listArea: {
          title: '오픈메이트온 리스트',
          addButton1: {
            text: '+ 추가',
            method: 'add_user'
          },
          addButton2: {
            text: '- 삭제',
            method: 'remove_user'
          },
          isEdit: true,
          editMethod: 'update_value'
        },
        selectArea: {
          title: '수신자 지정'
        },
        noListMessage: '검색어가 없습니다.',
        changeMethod: 'change'
      },
      datas: [],
      values: [],
      is_add: false,
      add_params: {
        add_value_username: '',
        add_value_email: ''
      }
    }
  },
  async beforeMount() {
    await this.reset()
  },
  methods: {
    ...mapActions('common', ['setMailData']),
    ...mapActions(['setPatch', 'setPost', 'setDelete']),
    async reset() {
      const posts = {
        url: this.getUrl('mail_list'),
        headers: {
          'Authorization': 'Token ' + this.getAuth.token
        }
      }

      await this.setMailData(posts)
      this.datas = this.getData('mail_list') // 오픈메이트온 리스트
      this.values = this.getData('receive_list') // 수신자 지정
    },
    // 추가, 제거 시 저장 처리
    async change(values) {
      const datas = values[0],
        applys = values[1],
        type = values[2],
        posts = {
          'url': this.getUrl('mail_list'),
          'param': {
            'receive_yn': false
          },
          'config': {
            headers: {
              'Authorization': 'Token ' + this.getAuth.token
            }
          }
        },
        this2 = this

      // 추가
      if (type === 'add') {
        posts.param.receive_yn = true

        for (const data of datas) {
          posts.url = this.getUrl('mail_list') + data + '/'

          await this2.setPatch(posts)
        }
      } else if (type === 'remove') { // 제거
       posts.param.receive_yn = false

        for (const data of applys) {
          posts.url = this.getUrl('mail_list') + data + '/'

          await this2.setPatch(posts)
        }
      }

      if (datas.length > 0 || applys.length > 0) {
        // 재 조회
        await this.reset()
      }
    },
    // 추가 영역 출력
    add_user() {
      this.is_add = true
    },
    // 오픈메이트온 리스트 추가 처리
    async add_value() {
      const posts = {
        'url': this.getUrl('mail_list'),
        'param': {
          'receive_yn': false,
          'username': this.add_params.add_value_username,
          'email': this.add_params.add_value_email
        },
        'config': {
          headers: {
            'Authorization': 'Token ' + this.getAuth.token
          }
        }
      },
        mail_exp = /^[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*\.[a-zA-Z]{2,3}$/i

      let input_chk = true

      if (!this.add_params.add_value_username) {
        this.$alert('이름을 입력하세요.')

        input_chk = false
      } else if (!this.add_params.add_value_email) {
        this.$alert('이메일을 입력하세요.')

        input_chk = false
      } else if (!mail_exp.test(this.add_params.add_value_email)) {
        this.$alert('이메일 형식으로 입력하세요.')

        input_chk = false
      }

      if (!input_chk) {
        return false
      }

      if (typeof await this.setPost(posts) === 'object') {
        // 재 조회
        await this.reset()

        // 추가 영역 숨김
        this.cancel_add()
      }
    },
    // 추가 영역 숨김
    cancel_add() {
      this.is_add = false
      this.add_params.add_value_username = ''
      this.add_params.add_value_email = ''
    },
    // 오픈메이트온 리스트 삭제
    async remove_user(data_values) {
      const delete_values = data_values[0],
        posts = {
        'url': this.getUrl('mail_list'),
        'config': {
          headers: {
            'Authorization': 'Token ' + this.getAuth.token
          }
        }
      }

      for (const value of delete_values) {
        posts.url = this.getUrl('mail_list') + value + '/'

        await this.setDelete(posts)
      }

      if (delete_values.length > 0) {
        // 재 조회
        await this.reset()
      }
    },
    // 수정
    async update_value(values) {
      const id = values[0],
        key = values[1],
        value = values[2]

      if (id && key && value) {
        const posts = {
            'url': this.getUrl('mail_list') + id + '/',
            'param': {},
            'config': {
              headers: {
                'Authorization': 'Token ' + this.getAuth.token
              }
            }
          },
          this2 = this

        posts.param[key] = value

        const result = await this2.setPatch(posts)

        if (result) {
          // 재 조회
          await this.reset()
        }
      }
    }
  }
}
</script>
