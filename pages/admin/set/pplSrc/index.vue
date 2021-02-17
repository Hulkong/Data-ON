<template>
  <div>
    <el-row>
      <el-col>
        <h2 class="u-tit01">인기 검색어</h2>
      </el-col>
    </el-row>

    <div class="search-container">
      <el-row>
        <el-col :span="4" class="header-col">
          <label for="start_date">기간설정</label>
        </el-col>

        <el-col :span="10">
          <el-date-picker type="date" placeholder="-- 시작일 --" v-model="start_date" style="width: 40%;" id="start_date" size="small" value-format="yyyyMMdd" @change="change_date" />
          <el-date-picker type="date" placeholder="-- 종료일 --" v-model="end_date" style="width: 40%;" size="small" value-format="yyyyMMdd" @change="change_date" />
          <span class="pad5l" style="color: #E96D00;">총 {{ search_day }}일간</span>
        </el-col>
      </el-row>
    </div>

    <el-row class="mg20t">
      <el-col class="tc">
        <el-button @click="search">검색</el-button>
      </el-col>
    </el-row>

    <transfer :options="options" :datas="getData('cumulative_wordranks')" :values.sync="values" :update="updateDate" />
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'

export default {
  layout: 'admin',
  computed: {
    ...mapGetters('datalists', ['getUrl', 'getData']),
    ...mapGetters('auth', [
      'getAuth'
    ]),
    // 기간설정 일 표시
    search_day: function() {
      let return_day = 0,
        date_start = null,
        date_end = null

      // 시작일, 종료일 모두 존재 시에만 계산
      if (this.start_date && this.end_date) {
        date_start = new Date(this.start_date.substring(0, 4), this.start_date.substring(4, 6)-1, this.start_date.substring(6, 8))
        date_end = new Date(this.end_date.substring(0, 4), this.end_date.substring(4, 6)-1, this.end_date.substring(6, 8))

        // 종료일 - 시작일
        return_day = ((date_end-date_start) / (1000*60*60*24)) + 1
      }

      return return_day
    }
  },
  data() {
    return {
      start_date: null,
      end_date: null,
      options: {
        headers: [
          { text: '순위', formatter: 'numbering' },
          { text: '검색어', keyName: 'search_word', width: '65%', isKey: true, isEdit: true },
          { text: '검색건수', keyName: 'word_count', width: '20%', type: 'number' }
        ],
        listArea: {
          title: '사용자 검색 순위'
        },
        selectArea: {
          title: '서비스 적용',
          useUpDown: true,
          resetMethod: 'reset_values',
          saveMethod: 'save',
          addButton: {
            text: '관리자 추가',
            icon: 'el-icon-user-solid',
            type: 'add_value'
          },
          maxLength: 5,
          isEdit: true,
          editMethod: 'update_value'
        },
        noListMessage: '검색어가 없습니다.'
      },
      values: [],
      updateDate: ''
    }
  },
  async beforeMount() {
    await this.reset_values()
    await this.search()
  },
  methods: {
    ...mapActions('datalists', ['setData']),
    ...mapActions(['setPost']),
    // 서비스 적용 목록 조회
    async reset_values() {
      const posts = {
        url: this.getUrl('wordranks'),
        id: 'wordranks'
      }

      await this.setData(posts)
      this.values = this.getData('wordranks')

      if (this.values && this.values.length > 0) {
        this.updateDate = this.values[this.values.length-1].reg_date.substring(0, 10)
      }
    },
    // 저장
    async save() {
      const posts = {
          'url': this.getUrl('wordranks'),
          'param': {
            'keyword': this.values
          },
          'config': {
            headers: {
              'Authorization': 'Token ' + this.getAuth.token
            }
          }
        },
        result = await this.setPost(posts)

      if (result) {
        const this2 = this,
          ok = result.status === 200

        this.$alert(ok ? '저장됐습니다.' : '오류입니다.', {
          callback: async function() {
            if (ok) {
              await this2.reset_values(true)
            }
          }
        })
      }
    },
    // 사용자 검색 순위 조회
    async search() {
      const posts = {
        param: {
          'start_date': this.start_date,
          'end_date': this.end_date
        },
        url: this.getUrl('cumulative_wordranks'),
        id: 'cumulative_wordranks'
      }

      await this.setData(posts)
    },
    // 기간 변경
    change_date(value) {
      const this2 = this,
        today_date = new Date(),
        today = ''+today_date.getFullYear()+(today_date.getMonth()+1)+today_date.getDate()

      if (this.end_date > today) {
        this.$alert('마지막일이 오늘보다 클 수 없습니다.', {
          callback: function() {
            this2.end_date = today
          }
        })
      } else if ((this.start_date && this.end_date) && this.start_date > this.end_date) {
        this.$alert('시작일이 마지막 일보다 클 수 없습니다.', {
          callback: function() {
            if (value === this2.start_date) {
              this2.start_date = this2.end_date
            } else {
              this2.end_date = this2.start_date
            }
          }
        })
      }
    },
    // 수정
    async update_value(values) {
      const value = values[2],
        index = values[3]

      if (index != null && value) {
        this.values[index] = value
        await this.save()
      }
    }
  }
}
</script>
