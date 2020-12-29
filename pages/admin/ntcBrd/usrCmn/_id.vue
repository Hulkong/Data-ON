<template>
  <div>
    <el-row>
      <el-col>
        <h2 class="u-tit01">사용자 의견 보기</h2>
      </el-col>
    </el-row>

    <el-form :model="form" class="mg10t pad40tf form-row">
      <el-row>
        <el-col :span="3" class="header-col">
          <label>이름</label>
        </el-col>

        <el-col :span="9" class="text-col">
          {{ getData(stateId).name }}
        </el-col>

        <el-col :span="3" class="header-col">
          <label>연락처</label>
        </el-col>

        <el-col :span="9" class="text-col">
          {{ getData(stateId).email }}
        </el-col>
      </el-row>

      <el-row class="mg20t">
        <el-col :span="3" class="header-col">
          <label>의견유형</label>
        </el-col>

        <el-col :span="9" class="text-col">
          {{ getData(stateId).type }}
        </el-col>
      </el-row>

      <el-row class="mg20t">
        <el-col :span="3" class="header-col2">
          <label>의견내용</label>
        </el-col>

        <el-col :span="20" class="text-col" v-html="getData(stateId).content" />
      </el-row>

      <el-row class="mg20t">
        <el-col :span="3" class="header-col">
          <label onclick="document.getElementById('radio1').click()">이메일 발송</label>
        </el-col>

        <el-col :span="21" class="text-col">
          <el-radio-group v-model="form.is_send_email" class="mg20r">
            <el-radio :label="false" id="radio1">보내지 않기</el-radio>
            <el-radio :label="true">메일 보내기</el-radio>
          </el-radio-group>

          <span>
            <i class="el-icon-warning" /> 답변 내용을 메일로 발송하려면 ‘메일 보내기’를 선택한 후 저장 해주세요
          </span>
        </el-col>
      </el-row>

      <el-row class="mg20t">
        <el-col :span="3" class="header-col" style="padding-top: 100px;">
          <label>관리자 답변<br>(메모)</label>
        </el-col>

        <el-col :span="20" class="text-col">
          <editor :model.sync="form.content" />
        </el-col>
      </el-row>
    </el-form>

    <el-row class="mg40t tr">
      <el-col>
        <el-button @click="onSubmit">저장</el-button>

        <NuxtLink :to="{ path: '/admin/ntcBrd/usrCmn', query: listParam }">
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
    ...mapGetters('inquires', [
      'getParam', // 상세내용의 param 세팅 가져오기
      'getUrl', // 상세내용의 url 가져오기
      'getData'
    ])
  },
  data() {
    return {
      stateId: 'detail',
      posts: { // 데이터 가져올때 필요한 파라미터
        url: ''
      },
      listParam: {}, // 페이지 사용 param
      form: {
        id: '',
        type: 3,
        name: '관리자',
        email: 'sales@openmate-on.co.kr',
        content: '',
        is_send_email: false,
        parent: '',
        is_answer: true
      }
    }
  },
  mounted() {
    const route = this.$route
    const id = route.params.id

    // 게시판 상세내용 가져오기
    if (id) {
      // 게시판 상세내용 가져오기
      this.fetchData(id)
      this.listParam = route.query
    }
  },
  methods: {
    ...mapActions('inquires', ['getDetail']),
    ...mapActions(['setPost', 'setPatch']),
    /**
     * 초기 데이터 가져오기
     */
    fetchData: async function(id) {
      this.posts.url = this.getUrl(this.stateId) + id
      await this.getDetail(this.posts)

      const data = this.getData(this.stateId)
      const childDataArray = data.child

      this.form.parent = data.id

      if (childDataArray.length > 0) {
        const childData = childDataArray[0]

        this.form.id = childData.id
        this.form.is_send_email = childData.is_send_email
        this.form.content = childData.content
      }
    },
    onSubmit: async function() {
      const form = this.form

      if (!form.content) {
        this.$alert('관리자 답변을 입력하세요.')
      } else {
        const posts = {
          'url': this.getUrl('detail'),
          'param': form
        },
          id = this.form.id

        let result = null

        // 수정
        if (id) {
          posts.url = posts.url + id + '/'

          result = await this.setPatch(posts)
        } else { // 등록
          result = await this.setPost(posts)
        }

        if (result) {
          const this2 = this,
            status = result.statusText === 'OK' || result.statusText === 'Created'

          this.$alert(status ? '저장됐습니다.' : '오류입니다.', {
            callback: function() {
              if ([201, 200].includes(result.status)) {
                this2.$router.push('/admin/ntcBrd/usrCmn')
              }
            }
          })
        }
      }
    }
  }
}
</script>
