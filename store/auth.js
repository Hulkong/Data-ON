export const state = () => ({
  auth: null
})

export const getters = {
  getAuth(state) {
    return state.auth
  }
}

export const mutations = {
  setAuth(state, auth) {
    state.auth = auth
  }
}

export const actions = {
  async login({ commit }, posts) {
    const res = await this.dispatch('setPost', {
      'url': '/api/users/login/',
      'param': posts
    })

    if (res.status === 200) {
      const auth = res.data
      const Cookie = process.client ? require('js-cookie') : undefined

      Cookie.set('auth', auth, {
        expires: new Date(auth.expiry)
      }) // saving token in cookie for server rendering
      commit('setAuth', auth)
    }
  },
  async postLogout({ commit, state }) {
    const res = await this.dispatch('setPost', {
      'url': '/api/users/auth/logout/',
      'config': {
        headers: {
          'Authorization': 'Token ' + state.auth.token
        }
      }
    })

    if (res.status === 204) {
      const Cookie = process.client ? require('js-cookie') : undefined

      Cookie.remove('auth')
      commit('setAuth', null)
    }
  }
}
