import Vue from 'vue'

export const state = () => ({
  mail_list: {
    url: '/api/common/mailList/',
    result: [],

  },
  receive_list: {
    url: '/api/common/mailList/',
    result: []
  }
})

export const getters = {
  getUrl: (state) => (id) => {
    return state[id].url
  },
  getData: (state) => (id) => {
    let dataResult = state[id].result

    return dataResult
  }
}

export const mutations = {
  setMailData: (state, result) => {
    if (result) {
      // 오픈메이트온 리스트
      if (result.id === 'mail_list') {
        state[result.id].result = result.data.filter((d) => !d.receive_yn).sort(function(a, b) {
          if (a.id > b.id) {
            return 1
          } else if (a.id < b.id) {
            return -1
          } else {
            return 0
          }
        })
      } else if (result.id === 'receive_list') { // 수신자 리스트
        state[result.id].result = result.data.filter((d) => d.receive_yn).sort(function(a, b) {
          if (a.id > b.id) {
            return 1
          } else if (a.id < b.id) {
            return -1
          } else {
            return 0
          }
        })
      }
    }
  }
}

export const actions = {
  async setMailData({ commit }, posts) {
    const result = await this.dispatch('setData', posts)

    if (result) {
      result.id = 'mail_list'
      commit('setMailData', result)

      result.id = 'receive_list'
      commit('setMailData', result)
    }
  }
}
