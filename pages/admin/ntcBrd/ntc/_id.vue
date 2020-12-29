<template>
  <div>
    <el-row>
      <el-col>
        <h2 class="u-tit01">공지사항 보기&수정</h2>
      </el-col>
    </el-row>

    <el-form :model="form" class="mg10t pad40a form-row">
      <el-row>
        <el-col>
          <label class="pad20r label" for="title">제목</label>
          <el-input class="w70p" id="title" maxlength="200" v-model="form.title" />
          <label class="pad30l pad10r" @click="form.notice_yn = !form.notice_yn">공지등록</label>

          <el-checkbox v-model="form.notice_yn" label="true">
            <span></span>
          </el-checkbox>
        </el-col>
      </el-row>

      <el-row class="mg40t">
        <editor :model.sync="form.content" />
      </el-row>

      <el-row class="mg40t">
        <el-col>
          <label class="label" for="upload">첨부파일</label>
        </el-col>
      </el-row>

      <el-row class="mg10t">
        <el-col>
          <el-upload
            class="upload-demo"
            action=""
            :autoUpload="false"
            :on-change="handleChange"
            :on-remove="handleRemove"
            :before-remove="beforeRemove"
            multiple
            :limit="2"
            :on-exceed="handleExceed"
            :file-list="getDetailAdminResult(name).tbattachFiles">
            <el-button id="upload" size="small">업로드</el-button>
          </el-upload>
        </el-col>
      </el-row>
    </el-form>

    <el-row class="mg20t tr">
      <el-col>
        <el-button v-if="is_wrt" @click="onSubmit">등록</el-button>
        <el-button v-if="!is_wrt" @click="onSubmit">수정</el-button>
        <el-button v-if="!is_wrt" @click="onDelete">삭제</el-button>

        <NuxtLink :to="{ path: '/admin/ntcBrd/ntc', query: listParam }">
          <el-button><i class="el-icon-document-copy" /> 목록</el-button>
        </NuxtLink>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'

export default {
  layout: 'admin',
  computed: {
    ...mapGetters('board', [
      'getDetailParam', // 각 게시판 상세내용의 param 세팅 가져오기
      'getDetailURL', // 각 게시판 상세내용의 url 가져오기
      'getDetailAdminResult' // element library 사용으로 file 정보 key 추가
    ]),
    ...mapGetters('auth', [
      'getAuth'
    ])
  },
  data() {
    return {
      name: 'notice', // 페이지 네임
      posts: { // 데이터 가져올때 필요한 파라미터
        url: '',
        storeName: ''
      },
      listParam: {}, // 페이지 사용 param
      is_wrt: true,
      form: {
        title: '',
        notice_yn: false,
        content: '',
        use_yn: true,
        filename: null
      }
    }
  },
  mounted() {
    const route = this.$route
    const id = route.params.id

    // 게시판 상세내용 가져오기
    if (id && id !== 'wrt') {
      // 게시판 상세내용 가져오기
      this.fetchData(id)
      this.listParam = route.query
      this.is_wrt = false
    }
  },
  methods: {
    ...mapActions('board', ['getDetailData']),
    ...mapActions(['setPost', 'setPatch']),
    /**
     * 초기 데이터 가져오기
     */
    fetchData: async function(id) {
      this.posts.url = this.getDetailURL(this.name) + id
      this.posts.storeName = this.name
      await this.getDetailData(this.posts)
      this.form = this.getDetailAdminResult(this.name)
    },
    handleChange(files, fileList) {
      this.form.filename = fileList
    },
    handleRemove(files) {
      const id = this.form.id

      // 초기화
      if (!this.form.delete_list) {
        this.form.delete_list = []
      }

      this.form.delete_list.push({
        'attachFile_id': files.id,
        'board_id': id,
        'new_name': files.name
      })
    },
    handleExceed(files) {
      this.$message.warning(`제한은 2 개입니다. 이번에는 ${ files.length } 개의 파일을 선택했습니다.`)
    },
    beforeRemove(file) {
      return this.$confirm(`${file.origin_nm} 전송을 취소하시겠습니까?`, '취소')
    },
    onSubmit: async function() {
      const form = this.form

      if (!form.title) {
        this.$alert('제목을 입력하세요.')
      } else if (!form.content) {
        this.$alert('내용을 입력하세요.')
      } else {
        const formData = new FormData()

        // form data 변환
        for (const key in form) {
          if (typeof(form[key]) === 'object') {
            formData.append(key, JSON.stringify(form[key]))
          } else {
            formData.append(key, form[key])
          }
        }

        // 파일 별도 처리
        if (form.filename && form.filename.length > 0) {
          for (let i=0; i<form.filename.length; i++) {
            formData.append('filename', form.filename[i].raw)
          }
        }

        const posts = {
            'url': this.getDetailURL(this.name),
            'param': formData,
            'config': {
              headers: {
                'Authorization': 'Token ' + this.getAuth.token,
                'Content-Type': 'multipart/form-data'
              }
            }
          },
          id = this.form.id

        let result = null,
          okText = '등록됐습니다.'

        // 수정
        if (id) {
          posts.url = posts.url + id + '/'
          okText = '수정됐습니다.'

          result = await this.setPatch(posts)
        } else { // 등록
          result = await this.setPost(posts)
        }

        if (result) {
          const this2 = this

          this.$alert(result.statusText === 'OK' ? okText : '오류입니다.', {
            callback: function() {
              if ([201, 200].includes(result.status)) {
                this2.$router.push('/admin/ntcBrd/ntc')
              }
            }
          })
        }
      }
    },
    onDelete: function() {
      const this2 = this

      this.$confirm(`정말로 삭제하시겠습니까?`, {
        title: '삭제',
        callback: async function(is_cancel) {
          if (is_cancel === 'confirm') {
            const posts = {
              'url': this2.getDetailURL(this2.name) + this2.form.id + '/',
              'param': {
                'use_yn': false
              },
              'config': {
                headers: {
                  'Authorization': 'Token ' + this2.getAuth.token
                }
              }
            }

            const result = await this2.setPatch(posts)

            if (result) {
              this2.$alert(result.statusText === 'OK' ? '삭제됐습니다.' : '오류입니다.', {
                callback: function() {
                  if ([201, 200].includes(result.status)) {
                    this2.$router.push('/admin/ntcBrd/ntc')
                  }
                }
              })
            }
          }
        }
      })
    }
  }
}
</script>
