<template>
  <div class="t-row mg60t">
    <div class="t-col" style="width: 45%;">
      <div class="t-row">
        <div class="t-col">
          <h2 class="u-tit02">{{ options.listArea.title }}</h2>
        </div>
      </div>

      <div class="t-row">
        <div :class="{ 't-col': true, 'w100p': !options.listArea.useUpDown, 'w90p': options.listArea.useUpDown }">
          <div class="search-container">
            <div class="t-row h-row">
              <div v-for="(header, index) in options.headers" :key="index" class="t-col" :style="{ width: header.formatter === 'numbering' ? '15%' : header.width, display: header.isHidden ? 'none' : false }">{{ header.text }}</div>
            </div>

            <div class="t-row l-row" @dragover.prevent @drop="drop_drag('applys')">
              <label v-for="(data, index) in datas" class="t-label" :key="index" :for="'datas'+index">
                <div :class="{ 't-row': true, 'select': data.select }" draggable="true" @dragstart="start_drag(data[key_name], 'datas')" @dragend="end_drag">
                  <div v-for="(header, index2) in options.headers" :key="index2" class="t-col" :style="{ width: header.formatter === 'numbering' ? '15%' : header.width, display: header.isHidden ? 'none' : false }">
                    <span v-if="header.formatter === 'numbering'">{{ index + 1 }}</span>
                    <span v-if="!header.formatter && header.type !== 'number'" @click="update_value(data[key_name], header.keyName, 'listArea', header.isEdit)" :ref="'listArea.'+data[key_name]+'.'+header.keyName">{{ data[header.keyName] }}</span>
                    <div v-if="!header.formatter && header.type === 'number'" class="w50 tr" style="margin: auto;" @click="update_value(data[key_name], header.keyName, 'listArea', header.isEdit)" :ref="'listArea.'+data[key_name]+'.'+header.keyName">{{ $setComma(data[header.keyName]) }}</div>
                    <input v-if="!header.formatter && !header.isHidden" type="text" :value="data[header.keyName]" maxlength="100" style="display: none;" :ref="'listArea.'+data[key_name]+'.'+header.keyName+'.i'" class="edit_input" @focusout="call_parent_update_method(data[key_name], header.keyName, 'listArea', data[header.keyName], index)" @keypress.enter="call_parent_update_method(data[key_name], header.keyName, 'listArea', data[header.keyName], index)">
                    <input v-if="header.isKey" type="checkbox" v-model="datas_values" :value="data[header.keyName]" @change="select_label('datas')" :id="'datas'+index" style="display: none;" />
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
        <div v-if="options.listArea.addButton1" class="t-col tc" :style="{ width: !options.listArea.useUpDown ? '50%' : '45%' }">
          <button class="t-button t-button-white w90p" @click="call_parent_method(options.listArea.addButton1.method, true)">
            <span><i :class="options.listArea.addButton1.icon" /> {{ options.listArea.addButton1.text }}</span>
          </button>
        </div>

        <div v-if="options.listArea.addButton2" class="t-col tc" :style="{ width: !options.listArea.useUpDown ? '50%' : '45%' }">
          <button class="t-button t-button-white w90p" @click="call_parent_method(options.listArea.addButton2.method, true)">
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
              <div v-for="(header, index) in options.headers" :key="index" class="t-col" :style="{ width: header.formatter === 'numbering' ? '15%' : header.width, display: header.isHidden ? 'none' : false }">{{ header.text }}</div>
            </div>

            <div class="t-row l-row" @dragover.prevent @drop="drop_drag('datas')">
              <label v-for="(apply, index) in applys" class="t-label" :key="index" :for="'applys'+index">
                <div :class="{ 't-row': true, 'select': apply.select }" :draggable="true" @dragstart="start_drag(apply[key_name], 'applys')" @dragend="end_drag">
                  <div v-for="(header, index2) in options.headers" :key="index2" class="t-col" :style="{ width: header.formatter === 'numbering' ? '15%' : header.width, display: header.isHidden ? 'none' : false }">
                    <span v-if="header.formatter === 'numbering'">{{ index + 1 }}</span>
                    <span v-if="!header.formatter && header.type !== 'number'" @click="update_value(apply[key_name], header.keyName, 'selectArea', header.isEdit)" :ref="'selectArea.'+apply[key_name]+'.'+header.keyName">{{ apply[header.keyName] }}</span>
                    <div v-if="!header.formatter && header.type === 'number'" class="w50 tr" style="margin: auto;" @click="update_value(apply[key_name], header.keyName, 'selectArea', header.isEdit)" :ref="'selectArea.'+apply[key_name]+'.'+header.keyName">{{ $setComma(apply[header.keyName]) }}</div>
                    <input v-if="!header.formatter && !header.isHidden" type="text" :value="apply[header.keyName]" maxlength="100" style="display: none;" :ref="'selectArea.'+apply[key_name]+'.'+header.keyName+'.i'" class="edit_input" @focusout="call_parent_update_method(apply[key_name], header.keyName, 'selectArea', apply[header.keyName], index)" @keypress.enter="call_parent_update_method(apply[key_name], header.keyName, 'selectArea', apply[header.keyName], index)">
                    <input v-if="header.isKey" type="checkbox" v-model="applys_values" :value="apply[header.keyName]" @change="select_label('applys')" :id="'applys'+index" style="display: none;" />
                  </div>
                </div>
              </label>

              <label v-show="is_add" class="no-list-label">
                <div class="t-row add-div">
                  <div class="t-col tc w100p">
                    <input type="text" class="t-input mg5r" v-model="add_value_text" maxlength="20" />
                    <button class="t-button" @click="add_value">추가</button>
                    <button class="t-button" @click="cancel_add">취소</button>
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
        <div v-if="options.selectArea.addButton" class="t-col tc" :style="{ width: !options.selectArea.useUpDown ? '50%' : '45%' }">
          <button class="t-button t-button-white w90p" @click="options.selectArea.addButton.method ? call_parent_method(options.selectArea.addButton.method) : call_transfer_method(options.selectArea.addButton.type)">
            <span><i :class="options.selectArea.addButton.icon" /> {{ options.selectArea.addButton.text }}</span>
          </button>
        </div>

        <div v-if="!options.selectArea.addButton" class="t-col" :style="{ width: !options.selectArea.useUpDown ? '50%' : '45%' }">&nbsp;</div>

        <div v-if="options.selectArea.resetMethod" class="t-col tc" :style="{ width: !options.selectArea.useUpDown ? '50%' : '45%' }">
          <button class="t-button t-button-white w90p" @click="call_parent_method(options.selectArea.resetMethod, true)">
            <span><i class="el-icon-refresh-right" /> 원래대로</span>
          </button>
        </div>
      </div>

      <div class="t-row mg20t">
        <div v-if="options.selectArea.saveMethod" class="t-col tc" :style="{ width: !options.selectArea.useUpDown ? '100%' : '90%' }">
          <button class="t-button" style="width: 95%;" @click="call_parent_method(options.selectArea.saveMethod, true)">
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
      applys: [], // 좌측 목록 가공
      datas_values: [], // 좌측 목록 선택 값
      applys_values: [], // 우측 목록 선택 값
      key_name: '', // key column
      is_emit: false, // 부모 값 update 확인
      is_add: false, // 추가 영역
      add_value_text: '', // 추가 text
      drag_value: ''
    }
  },
  watch: {
    values: function() {
      const this2 = this

      // 비 동기 처리 감안 별도 처리 (watch)
      if (!this.is_emit) {
        if (this.values && this.values[0]) {
          // 객체 형태 별도 처리
          if (typeof this.values[0] === 'object') {
            this.applys = this.values
          } else {
            // 비 객체 형태 datas 값 참조 복사
            this.values.forEach(function(value) {
              this2.datas.forEach(function(value2) {
                if (value === value2[this2.key_name]) {
                  this2.applys.push(JSON.parse(JSON.stringify(value2)))
                }
              })
            })
          }
        }
      }

      this.is_emit = false
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

    // key 정보 없을 시 첫번째 column 설정
    if (this.options.headers && this.options.headers.length > 0 && !this.key_name) {
      this.key_name = this.options.headers[0].keyName
    }

    if (this.values && this.values[0]) {
      // 객체 형태 별도 처리
      if (typeof this.values[0] === 'object') {
        this.applys = this.values
      } else {
        // 비 객체 형태 datas 값 참조 복사
        this.values.forEach(function(value) {
          this2.datas.forEach(function(value2) {
            if (value === value2[this2.key_name]) {
              this2.applys.push(JSON.parse(JSON.stringify(value2)))
            }
          })
        })
      }
    }
  },
  methods: {
    // 검색어 선택
    select_label: function(type) {
      if (type === 'datas') {
        for (const data of this.datas) {
          if (this.datas_values.includes(data[this.key_name])) {
            data.select = true
          } else {
            data.select = false
          }
        }
      } else {
        for (const apply of this.applys) {
          if (this.applys_values.includes(apply[this.key_name])) {
            apply.select = true
          } else {
            apply.select = false
          }
        }
      }
    },
    // 추가
    add: function() {
      const this2 = this,
        max_length = this2.options.selectArea.maxLength

      // 추가 제한
      if (max_length && this2.values.length+this2.datas_values.length > max_length) {
        this.$alert(max_length + '개 이상 추가할 수 없습니다.')

        return false
      }

      // 추가 시 바로 저장 처리
      if (this.options.changeMethod) {
        this.call_parent_method(this.options.changeMethod, true, 'add')

        return false
      }

      this.datas.forEach(function(value, index) {
        // 선택 확인
        if (value.select) {
          const key = value[this2.key_name]
          let is_duplicate = false

          this2.datas[index].select = false

          this2.applys.forEach(function(value) {
            // 중복 확인
            if (value[this2.key_name] === key) {
              is_duplicate = true
            }
          })

          if (!is_duplicate) {
            this2.applys.push(JSON.parse(JSON.stringify(this2.datas[index])))
          }
        }
      })

      // 선택 초기화
      this.datas_values = []

      // 부모 values 값 업데이트
      this.set_values()
    },
    // 제거
    remove: function() {
      const this2 = this,
        spread_applys = [ ...this2.applys ]
      let splice_count = 0

      // 제거 시 바로 저장 처리
      if (this.options.changeMethod) {
        this.call_parent_method(this.options.changeMethod, true, 'remove')
      }

      spread_applys.forEach(function(value, index) {
        // 선택 확인
        if (value.select) {
          this2.applys.splice(index-splice_count, 1)
          splice_count++
        }
      })

      // 선택 초기화
      this.applys_values = []

      // 부모 values 값 업데이트
      this.set_values()
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
    call_parent_method: function(name, reset, type) {
      const temp_data_values = this.datas_values,
        temp_applys_values = this.applys_values

      // 초기화
      if (reset) {
        this.datas_values = []
        this.select_label('datas')
      }

      // 부모 values 값 업데이트
      this.set_values()

      if (name) {
        this.$parent.$options.methods[name].call(this.$parent, [temp_data_values, temp_applys_values, type])
      }
    },
    // 수정 처리
    update_value: function(id, key, type, isEdit) {
      if (this.options[type].isEdit && isEdit) {
        const ref = this.$refs[type+'.'+id+'.'+key],
          refi = this.$refs[type+'.'+id+'.'+key+'.i']

        if (ref && ref[0] && refi && refi[0]) {
          ref[0].style.display = 'none'
          refi[0].style.display = 'block'
          refi[0].focus()
        }
      }
    },
    // 부모 method 실행 (수정)
    call_parent_update_method: async function(id, key, type, value, index) {
      const method_name = this.options[type].editMethod,
        ref = this.$refs[type+'.'+id+'.'+key],
        refi = this.$refs[type+'.'+id+'.'+key+'.i']

      if (method_name && refi && refi[0] && refi[0].style.display == 'block') {
        if (type === 'listArea') {
          this.datas_values = []
          this.select_label('datas')
        } else {
          this.applys_values = []
          this.select_label('applys')
        }

        refi[0].style.display = 'none'

        // 부모 values 값 업데이트
        this.set_values()

        if (value !== refi[0].value) {
          await this.$parent.$options.methods[method_name].call(this.$parent, [id, key, refi[0].value, index])
        }

        if (ref[0] && ref[0].style) {
          ref[0].style.display = 'block'
        }
      }
    },
    // transfer 타입별 method 실행
    call_transfer_method: function(type) {
      // 목록에 값 직접 추가
      if (type === 'add_value') {
        const max_length = this.options.selectArea.maxLength

        if (max_length && this.values.length >= max_length) {
          this.$alert(max_length + '개 이상 추가할 수 없습니다.')

          return false
        }

        this.is_add = true
      }
    },
    // 값 추가
    add_value: function() {
      const this2 = this,
        key = this2.add_value_text
      let is_duplicate = false

      this2.applys.forEach(function(value) {
        // 중복 확인
        if (value[this2.key_name] === key) {
          is_duplicate = true
        }
      })

      if (!is_duplicate) {
        const new_value = new Object()

        new_value[this2.key_name] = key
        this2.applys.push(new_value)
      }

      // 부모 values 값 업데이트
      this2.set_values()

      // 추가 영역 초기화
      this2.cancel_add()
    },
    // 추가 영역 초기화
    cancel_add: function() {
      this.add_value_text = ''
      this.is_add = false
    },
    // 부모 values 값 업데이트
    set_values: function() {
      const new_values = new Array(),
        this2 = this

      // 새로 업데이트 할 값 배열
      this.applys.forEach(function(value, index) {
        new_values[index] = value[this2.key_name]
      })

      // 업데이트
      this.is_emit = true // watch 방지
      this.$emit('update:values', new_values)
    },
    start_drag: function(value, type) {
      this.datas_values = []
      this.select_label(type)
      this.drag_value = value
    },
    end_drag: function() {
      this.drag_value = ''
    },
    drop_drag: function(type) {
      this[type+'_values'] = [this.drag_value]
      this.select_label(type)

      if (type === 'datas') {
        this.add()
      } else if (type === 'applys') {
        this.remove()
      }
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
.no-list > .t-col {
  padding: 5px;
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
.add-div {
  padding: 5px;
}
.t-input {
  border: 1px solid #0075c1;
}
.edit_input {
  width: 90%;
}
</style>
