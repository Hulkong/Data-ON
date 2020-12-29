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
                params: posts.param
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
  nuxtServerInit({ commit }, { req }) {
    let auth = null

    if (req.headers.cookie) {
      const parsed = cookieparser.parse(req.headers.cookie)

      try {
        auth = JSON.parse(parsed.auth)
      } catch (err) {
        // No valid cookie found
      }
    }

    commit('auth/setAuth', auth)
  }
};


