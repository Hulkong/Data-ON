export const state = () => ({
  list: {
    url: '/api/inquires/',
    param: {
      page : 1, // 현재 페이지
      page_size : 10, // 현재 페이지 - 리스트 수
      page_list_size: 5 // 한페이지에 보여지는 페이지 리스트의 수
    },
    result: []
  },
  detail: {
    url: '/api/inquires/',
    param: {},
    result: {}
  }
});

export const getters = {
  getUrl: (state) => (id) => {
    return state[id].url
  },
  getParam: (state) => (id) => {
    return state[id].param
  },
  getcPage: (state) => (id) => {
    return state[id].param.page
  },
  getPageListSize: (state) => (id) => {
    return state[id].param.page_list_size
  },
  getListSize: (state) => (id) => {
    return state[id].param.page_size
  },
  getCount: (state) => (id) => {
    let result = 0

    if (state[id]) {
      result = state[id].result.count
    }

    return result
  },
  getData: (state) => (id) => {
    let dataResult = null

    if (state[id].result) {
      if (id === 'list') {
        if (state[id].result.results) {
          dataResult =  state[id].result.results.list
        }
      } else {
        return state[id].result
      }
    }

    return dataResult
  }
}

export const mutations = {
  addList: (state, result) => {
    if (result) {
      state['list'].result = result.data
    }
  },
  addDetail: (state, result) => {
    if (result) {
      state['detail'].result = result.data
    }
  },
  setParam: (state, obj) => {
    const setState = state[obj.name]

    setState.param = { ...setState.param, ...obj.param }
  },
  setPage: (state, obj) => {
    state[obj.name].param.page = obj.page
  }
}

export const actions = {
  async getList({ commit }, posts) {
    const result = await this.dispatch('setData', posts)
    commit('addList', result)
  },
  async getDetail({ commit }, posts) {
    const result = await this.dispatch('setData', posts)
    commit('addDetail', result)
  }
}
