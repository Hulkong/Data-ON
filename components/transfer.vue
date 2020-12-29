<template>
  <div class="t-row mg60t">
    <div class="t-col" style="width: 45%;">
      <div class="t-row">
        <div class="t-col">
          <h2 class="u-tit02">{{ options.listArea.title }}</h2>
        </div>
      </div>

      <div class="t-row">
        <div :class="{ 't-col': true,  'w100p': !options.listArea.useUpDown, 'w90p': options.listArea.useUpDown }">
          <div class="search-container">
            <div class="t-row h-row">
              <div v-for="(header, index) in options.headers" :key="index" class="t-col" :style="{ width: header.formatter === 'numbering' ? '15%' : header.width }">{{ header.text }}</div>
            </div>

            <div class="t-row l-row">
              <label v-for="(data, index) in datas" class="t-label" :key="index">
                <div :class="{ 't-row': true, 'select': data.select }">
                  <div v-for="(header, index2) in options.headers" :key="index2" class="t-col" :style="{ width: header.formatter === 'numbering' ? '15%' : header.width }">
                    <span v-if="header.formatter === 'numbering'">{{ index + 1 }}</span>
                    <span v-if="!header.formatter && header.type !== 'number'">{{ data[header.keyName] }}</span>

                    <div v-if="!header.formatter && header.type === 'number'" class="t-col" style="width: 20%;">
                      <div class="w50 tr" style="margin: auto;">{{ data[header.keyName] }}</div>
                    </div>

                    <input v-if="header.isKey" type="checkbox" v-model="datas_values" :value="data[header.keyName]" @change="select_label" />
                  </div>
                </div>
              </label>

              <label v-if="!datas || datas.length === 0" class="no-list-label">
                <div class="t-row no-list">
                  <div class="t-col tc w100p" v-text="options.noListMessage" />
                </div>
              </label>
            </div>
          </div>
        </div>

        <div v-if="options.listArea.useUpDown" class="t-col tc ud">
          <div class="t-row">
            <div class="t-col w100p">
              <button class="t-button t-button-white" style="width: 44px;" @click="up('list')">
                <span>▲</span>
              </button>
            </div>
          </div>

          <div class="t-row mg10t">
            <div class="t-col w100p">
              <button class="t-button t-button-white" style="width: 44px;" @click="down('list')">
                <span>▼</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      <div class="t-row mg20t">
        <div v-if="options.listArea.addButton1" class="t-col tc" style="width: 45%;">
          <button class="t-button t-button-white w90p" @click="call_parent_method(options.listArea.addButton1.method)">
            <span><i :class="options.listArea.addButton1.icon" /> {{ options.listArea.addButton1.text }}</span>
          </button>
        </div>

        <div v-if="options.listArea.addButton2" class="t-col tc" style="width: 45%;">
          <button class="t-button t-button-white w90p" @click="call_parent_method(options.listArea.addButton2.method)">
            <span><i :class="options.listArea.addButton2.icon" /> {{ options.listArea.addButton2.text }}</span>
          </button>
        </div>
      </div>
    </div>

    <div class="t-col b-col tc" style="width: 10%;">
      <div class="t-row" style="margin-top: 100px;">
        <div class="t-col w100p">
          <button class="t-button t-button-blue" style="width: 71.13px; height: 33px;" @click="add">
            <span>추가 >></span>
          </button>
        </div>
      </div>

      <div class="t-row mg20t">
        <div class="t-col w100p">
          <button class="t-button t-button-white" style="width: 71.13px;" @click="remove">
            <span><< 제거</span>
          </button>
        </div>
      </div>
    </div>

    <div class="t-col" style="width: 45%;">
      <div class="t-row">
        <div class="t-col" style="width: 50%;">
          <h2 class="u-tit02">{{ options.selectArea.title }}</h2>
        </div>

        <div v-if="update" class="t-col" style="width: 50%;">최근 수정 일자 : {{ update }}</div>
      </div>

      <div class="t-row">
        <div :class="{ 't-col': true,  'w100p': !options.selectArea.useUpDown, 'w90p': options.selectArea.useUpDown }">
          <div class="search-container">
            <div class="t-row h-row">
              <div v-for="(header, index) in options.headers" :key="index" class="t-col" :style="{ width: header.formatter === 'numbering' ? '15%' : header.width }">{{ header.text }}</div>
            </div>

            <div class="t-row l-row">
              <label v-for="(apply, index) in applys" class="t-label" :key="index">
                <div :class="{ 't-row': true, 'select': apply.select }">
                  <div v-for="(header, index2) in options.headers" :key="index2" class="t-col" :style="{ width: header.formatter === 'numbering' ? '15%' : header.width }">
                    <span v-if="header.formatter === 'numbering'">{{ index + 1 }}</span>
                    <span v-if="!header.formatter && header.type !== 'number'">{{ apply[header.keyName] }}</span>

                    <div v-if="!header.formatter && header.type === 'number'" class="t-col" style="width: 20%;">
                      <div class="w50 tr" style="margin: auto;">{{ apply[header.keyName] }}</div>
                    </div>

                    <input v-if="header.isKey" type="checkbox" v-model="applys_values" :value="apply[header.keyName]" @change="select_label" />
                  </div>
                </div>
              </label>

              <label v-if="!applys || applys.length === 0" class="no-list-label">
                <div class="t-row no-list">
                  <div class="t-col tc w100p">{{ options.noListMessage }}</div>
                </div>
              </label>
            </div>
          </div>
        </div>

        <div v-if="options.selectArea.useUpDown" class="t-col tc ud">
          <div class="t-row">
            <div class="t-col w100p">
              <button class="t-button t-button-white" style="width: 44px;" @click="up('select')">
                <span>▲</span>
              </button>
            </div>
          </div>

          <div class="t-row mg10t">
            <div class="t-col w100p">
              <button class="t-button t-button-white" style="width: 44px;" @click="down('select')">
                <span>▼</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      <div class="t-row mg20t">
        <div v-if="options.selectArea.addButton" class="t-col tc" style="width: 45%;">
          <button class="t-button t-button-white w90p" @click="call_parent_method(options.selectArea.addButton.method)">
            <span><i :class="options.selectArea.addButton.icon" /> {{ options.selectArea.addButton.text }}</span>
          </button>
        </div>

        <div v-if="!options.selectArea.addButton" class="t-col" style="width: 45%;">&nbsp;</div>

        <div class="t-col tc" style="width: 45%;">
          <button class="t-button t-button-white w90p" @click="call_parent_method(options.selectArea.resetMethod)">
            <span><i class="el-icon-refresh-right" /> 원래대로</span>
          </button>
        </div>
      </div>

      <div class="t-row mg20t">
        <div class="t-col tc" style="width: 90%;">
          <button class="t-button" style="width: 95%;" @click="call_parent_method(options.selectArea.saveMethod)">
            <span>저장하기</span>
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: ['options', 'datas', 'values', 'update'],
  data() {
    return {
      applys: [],
      datas_values: [],
      applys_values: [],
      key_name: ''
    }
  },
  created() {
    const this2 = this

    // 컬럼 목록 중 키 컬럼 네임 저장 (부모에게 리턴 해 줄 value 값 할당에 사용)
    this.options.headers.forEach(function(value) {
      // 키 확인 옵션
      if (value.isKey) {
        this2.key_name = value.keyName
      }
    })

    this2.datas.forEach(function(value) {
      if (this2.values.includes(value.key1)) {
        this2.applys.push(JSON.parse(JSON.stringify(value)))
      }
    })
  },
  methods: {
    // 검색어 선택
    select_label: function() {
      for (const data of this.datas) {
        if (this.datas_values.includes(data.key1)) {
          data.select = true
        } else {
          data.select = false
        }
      }

      for (const apply of this.applys) {
        if (this.applys_values.includes(apply.key1)) {
          apply.select = true
        } else {
          apply.select = false
        }
      }
    },
    // 추가
    add: function() {
      const this2 = this

      this2.datas.forEach(function(value, index) {
        // 선택 확인
        if (value.select) {
          const key = value.key1
          let is_duplicate = false

          this2.datas[index].select = false

          this2.applys.forEach(function(value) {
            // 중복 확인
            if (value.key1 === key) {
              is_duplicate = true
            }
          })

          if (!is_duplicate) {
            this2.applys.push(JSON.parse(JSON.stringify(this2.datas[index])))
          }
        }
      })

      this2.datas_values = []
      this2.select_label()

      // 부모 values 값 업데이트
      this2.set_values()
    },
    // 제거
    remove: function() {
      const this2 = this,
        spread_applys = [ ...this2.applys ]
      let splice_count = 0

      spread_applys.forEach(function(value, index) {
        // 선택 확인
        if (value.select) {
          this2.applys.splice(index-splice_count, 1)
          splice_count++
        }
      })

      // 부모 values 값 업데이트
      this2.set_values()
    },
    // 위
    up: function(area) {
      const list = area === 'list' ? this.datas : this.applys
      let is_break = false

      list.forEach(function(value, index) {
        // 선택 확인
        if (!is_break && value.select) {
          if (index === 0) {
            is_break = true
          } else {
            const spread_apply = list[index-1]

            list.splice(index-1, 1, list[index])
            list.splice(index, 1, spread_apply)
          }
        }
      })

      // 부모 values 값 업데이트
      this.set_values()
    },
    // 아래
    down: function(area) {
      const list = area === 'list' ? this.datas : this.applys,
        reverse_list = [ ...list ].reverse()
      let is_break = false

      reverse_list.forEach(function(value, index) {
        const reverse_index = list.length-index-1

        // 선택 확인
        if (!is_break && list[reverse_index].select) {
          if (index === 0) {
            is_break = true
          } else {
            const spread_data = list[reverse_index+1]

            list.splice(reverse_index+1, 1, list[reverse_index])
            list.splice(reverse_index, 1, spread_data)
          }
        }
      })

      // 부모 values 값 업데이트
      this.set_values()
    },
    // 부모 method 실행
    call_parent_method: function(name) {
      this.$parent.$options.methods[name].call(this)
    },
    // 부모 values 값 업데이트
    set_values: function() {
      const new_values = new Array(),
        this2 = this

      // 새로 업데이트 할 값 배열
      this2.applys.forEach(function(value, index) {
        new_values[index] = value[this2.key_name]
      })

      // 업데이트
      this2.$emit('update:values', new_values)
    }
  }
}
</script>

<style scoped>
.t-row::after, .t-row::before {
  content: "";
  display: table;
}
.t-row::after {
  clear: both;
}
.t-row {
  position: relative;
  box-sizing: border-box;
}
.l-row {
  max-height: 310px;
  overflow-y: auto;
}
.t-label .t-row:not(.no-list):hover, .select {
  background: #0075c1;
  color: #ffffff;
}
.t-col {
  float: left;
  box-sizing: border-box;
}
.h-row > .t-col, .t-label .t-col {
  padding: 5px;
  text-align: center;
}
.h-row > .t-col {
  background: #f9fafc;
  font-weight: 700;
  color: #333;
}
.no-list-label {
  cursor: default;
}
.ud {
  position: absolute;
  bottom: 0;
  right: 0;
  width: 10%;
}
.t-button {
  border: 0;
  padding: 6px 10px;
  background: url(/images/Sub/btn-bg.png);
  color: #FFF;
  box-sizing: border-box;
}
.t-button-blue {
  background: #0075c1;
}
.t-button-white {
  border: 1px solid #0075c1;
  background: #f9fafc;
  color: #0075c1;
}
</style>
