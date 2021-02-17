import Vue from 'vue'

export const state = () => ({
  cumulative_wordranks: {
    url: '/api/datalists/cumulativeWordranks/',
    result: []
  },
  wordranks: {
    url: '/api/datalists/wordranks/',
    result: []
  }
});

export const getters = {
  getUrl: (state) => (id) => {
    return state[id].url
  },
  getData: (state) => (id) => {
    let dataResult = state[id].result

    if (dataResult && dataResult.result) {
      dataResult = dataResult.result
    }

    return dataResult
  }
}

export const mutations = {
  setData: (state, result) => {
    if (result) {
      state[result.id].result = result.data
    }
  }
}

export const actions = {
  async setData({ commit }, posts) {
    const result = await this.dispatch('setData', posts)
    result.id = posts.id

    commit('setData', result)
  }
}
