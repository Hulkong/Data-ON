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
          <el-input class="w80p" id="title" maxlength="10" v-model="form.title" />
          <label class="pad40l pad10r" @click="form.notice_yn = !form.notice_yn">공지등록</label>

          <el-checkbox v-model="form.notice_yn" label="true">
            <span></span>
          </el-checkbox>
        </el-col>
      </el-row>

      <el-row class="mg40t">
        <el-col>
          <client-only>
            <ckeditor v-model="form.content" />
          </client-only>
        </el-col>
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
            action="https://jsonplaceholder.typicode.com/posts/"
            :on-preview="handlePreview"
            :on-remove="handleRemove"
            :before-remove="beforeRemove"
            multiple
            :limit="1"
            :on-exceed="handleExceed"
            :file-list="form.tbattachFiles">
            <el-button id="upload" size="small">upload</el-button>
            <div slot="tip" class="el-upload__tip">jpg/png files with a size less than 500kb</div>
          </el-upload>
        </el-col>
      </el-row>
    </el-form>

    <el-row class="mg20t tr">
      <el-col>
<!--        TODO: 1차 반영 주석-->
<!--        <el-button v-if="is_wrt" @click="onSubmit">등록</el-button>
        <el-button v-if="!is_wrt" @click="onSubmit">수정</el-button>
        <el-button v-if="!is_wrt">삭제</el-button>-->

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
        tbattachFiles: []
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
    /**
     * 초기 데이터 가져오기
     */
    fetchData: async function(id) {
      this.posts.url = this.getDetailURL(this.name) + id
      this.posts.storeName = this.name
      await this.getDetailData(this.posts)
      this.form = this.getDetailAdminResult(this.name)
    },
    handleRemove(file, fileList) {
      console.log(file, fileList)
    },
    handlePreview(file) {
      console.log(file)
    },
    handleExceed(files, fileList) {
      this.$message.warning(`The limit is 3, you selected ${files.length} files this time, add up to ${files.length + fileList.length} totally`)
    },
    beforeRemove(file) {
      return this.$confirm(`Cancel the transfert of ${ file.origin_nm } ?`)
    },
    onSubmit() {
      console.log(this.form)
    }
  }
}
</script>
