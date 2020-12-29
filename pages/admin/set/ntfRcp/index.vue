<template>
  <div>
    <el-row>
      <el-col>
        <h2 class="u-tit01">알림 수신자</h2>
      </el-col>
    </el-row>

    <transfer :options="options" :datas="datas" :values.sync="values" :update="updateDate" />
  </div>
</template>

<script>
export default {
  layout: 'admin',
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
          { text: '이름', keyName: 'key1', width: '20%', isKey: true },
          { text: '이메일', keyName: 'key2', width: '65%' }
        ],
        listArea: {
          title: '오픈메이트온 리스트',
          useUpDown: true,
          addButton1: {
            text: '+ 추가',
            method: 'add_user'
          },
          addButton2: {
            text: '- 삭제',
            method: 'remove_user'
          }
        },
        selectArea: {
          title: '수신자 지정',
          useUpDown: true,
          resetMethod: 'reset',
          saveMethod: 'save'
        },
        noListMessage: '검색어가 없습니다.'
      },
      datas: [
        { key1: '노서영', key2: 'nsy@openmate-on.co.kr', select: false },
        { key1: '이영빈', key2: 'nsy@openmate-on.co.kr', select: false },
        { key1: '함현진', key2: 'nsy@openmate-on.co.kr', select: false },
        { key1: '박장호', key2: 'nsy@openmate-on.co.kr', select: false },
        { key1: '박민혜', key2: 'nsy@openmate-on.co.kr', select: false },
        { key1: '이종덕', key2: 'nsy@openmate-on.co.kr', select: false },
        { key1: '김용현', key2: 'nsy@openmate-on.co.kr', select: false },
        { key1: '이경도', key2: 'nsy@openmate-on.co.kr', select: false },
        { key1: '한희원', key2: 'nsy@openmate-on.co.kr', select: false },
        { key1: '김동혁', key2: 'nsy@openmate-on.co.kr', select: false }
      ],
      values: ['노서영', '이영빈', '함현진', '박장호', '박민혜'],
      updateDate: '2020-12-09'
    }
  },
  beforeMount() {
    const this2 = this

    this.datas.forEach(function(value) {
      value.key2 = this2.$setComma(value.key2)
    })
  },
  methods: {
    reset() {
      console.log('reset')
    },
    save() {
      console.log(this.values)
    },
    add_user() {
      console.log('add_user')
    },
    remove_user() {
      console.log('remove_user')
    }
  }
}
</script>
