export default function ({ $axios, store }) {
  $axios.onRequest(config => {
    store._vm.$nextTick(() => {
      //store._vm.$nuxt.$loading.start()

      return config
    })
  })

  $axios.onError(error => {
    console.log(error)
  })

  $axios.onResponse(response => {
    store._vm.$nextTick(() => {
      //store._vm.$nuxt.$loading.finish()

      return response
    })
  })
}
