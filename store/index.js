export const strict = false;

const cookieparser = process.server ? require('cookieparser') : undefined

/* ** STATES */
export const state = () => {};

/* ** GETTERS */
export const getters = { };

/* ** MUTATIONS(동기 처리) */
export const mutations = { };

/* ** ACTIONS (비동기처리) */
export const actions = {
    setData({ commit }, posts) {
      const axios = this.$axios

        return new Promise( function(resolve, reject){
            axios
            .get(posts.url,{
                params: posts.param,
                headers: posts.headers
            })
            .then(res => {
                // console.log(res);
                var result = {}
                result.data = res.data;
                resolve(result)
            })
            .catch(e => {
                // console.log(e);
                if (!e.response || !e.response.status) return;
                reject(({statusCode:e.response.status, message: ''}));
            })
        }).catch(e => {
            console.log(e);
            if (e.statusCode == 404 ){
                location.href="/error/500";
                // window.$nuxt.$router.push({path: '/error/500', params:{ 'message' : e.statusCode}})
            }
        })

    },
    setPost({ commit }, posts) {
      const axios = this.$axios

        return new Promise( function(resolve, reject){
            axios
            .post(
                posts.url,
                posts.param,
                posts.config
            )
            .then(res => {
                resolve(res)
            })
            .catch(e => {
                console.log(e);
                if (!e.response || !e.response.status) return;
                reject(({statusCode:e.response.status, message: ''}));
            })
        }).catch(e => {
            console.log(e);
            return [];
        })

    },
  setPatch({ commit }, posts) {
    const axios = this.$axios

    return new Promise( function(resolve, reject){
      axios
        .patch(
          posts.url,
          posts.param,
          posts.config
        )
        .then(res => {
          resolve(res)
        })
        .catch(e => {
          console.log(e)

          if (!e.response || !e.response.status) {
            return
          }

          reject(({ statusCode: e.response.status, message: '' }))
        })
    }).catch(e => {
      console.log(e)

      return []
    })
  },
  setDelete({ commit }, posts) {
    const axios = this.$axios

    return new Promise( function(resolve, reject){
      axios
        .delete(
          posts.url,
          posts.config
        )
        .then(res => {
          resolve(res)
        })
        .catch(e => {
          console.log(e)

          if (!e.response || !e.response.status) {
            return
          }

          reject(({ statusCode: e.response.status, message: '' }))
        })
    }).catch(e => {
      console.log(e)

      return []
    })
  },
  nuxtServerInit({ commit, dispatch }, { req }) {
    if (req.headers.cookie) {
      const parsed = cookieparser.parse(req.headers.cookie)

      if (parsed && parsed.auth) {
        const auth = JSON.parse(parsed.auth)

        if (new Date(auth.expiry.substring(0, 19)) > new Date()) {
          try {
            const posts = {
              'url': '/api/users/auth/user/',
              'headers': {
                'Authorization': 'Token ' + auth.token
              }
            }

            if (dispatch('setData', posts)) {
              commit('auth/setAuth', auth)
            }
          } catch (err) {
            console.log(err)
          }
        }
      }
    }
  }
};


