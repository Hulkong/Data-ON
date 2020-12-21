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
          <label for="name">이름</label>
        </el-col>

        <el-col :span="9">
          <el-input maxlength="10" v-model="form.name" id="name" class="w90p" />
        </el-col>

        <el-col :span="3" class="header-col">
          <label for="email">연락처</label>
        </el-col>

        <el-col :span="9">
          <el-input maxlength="10" v-model="form.email" id="email" class="w90p" />
        </el-col>
      </el-row>

      <el-row class="mg20t">
        <el-col :span="3" class="header-col">
          <label for="selectbox">의견유형</label>
        </el-col>

        <el-col :span="9">
          <el-select v-model="form.type" id="selectbox" class="w90p">
            <el-option label="오류신고" value="1" />
            <el-option label="데이터문의" value="2" />
            <el-option label="기능개선" value="3" />
          </el-select>
        </el-col>
      </el-row>

      <el-row class="mg20t">
        <el-col :span="3" class="header-col2">
          <label>의견내용</label>
        </el-col>

        <el-col :span="20">
          <client-only>
            <ckeditor v-model="form.content" />
          </client-only>
        </el-col>
      </el-row>

      <el-row class="mg20t">
        <el-col :span="3" class="header-col">
          <label onclick="document.getElementById('radio1').click()">이메일 발송</label>
        </el-col>

        <el-col :span="9">
          <el-radio-group v-model="form.is_send_email">
            <el-radio :label="false" id="radio1">보내지 않기</el-radio>
            <el-radio :label="true">메일 보내기</el-radio>
          </el-radio-group>
        </el-col>

        <el-col :span="12"><i class="el-icon-warning" /> 답변 내용을 메일로 발송하려면 ‘메일 보내기’를 선택한 후 저장 해주세요</el-col>
      </el-row>

      <el-row class="mg20t">
        <el-col :span="3" class="header-col" style="padding-top: 100px;">
          <label>관리자 답변<br>(메모)</label>
        </el-col>

        <el-col :span="20">
          <client-only>
            <ckeditor v-model="form.textarea" />
          </client-only>
        </el-col>
      </el-row>
    </el-form>

    <el-row class="mg40t tr">
      <el-col>
        <!--        TODO: 1차 반영 주석-->
<!--        <el-button v-if="!is_wrt" @click="onSubmit">저장</el-button>-->

        <NuxtLink to="/admin/ntcBrd/usrCmn">
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
    ]),
  },
  data() {
    return {
      stateId: 'detail',
      posts: { // 데이터 가져올때 필요한 파라미터
        url: ''
      },
      listParam: {}, // 페이지 사용 param
      form: {
        type: '',
        name: '',
        email: '',
        content: '',
        is_send_email: false,
        textarea: ''
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
    /**
     * 초기 데이터 가져오기
     */
    fetchData: async function(id) {
      this.posts.url = this.getUrl(this.stateId) + id
      await this.getDetail(this.posts)
      this.form = this.getData(this.stateId)
    },
    onSubmit() {
      console.log(this.form)
    }
  }
}
</script>
