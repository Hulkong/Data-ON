export default function ({ store, redirect }) {
  const auth = store.state.auth.auth

  if (auth && new Date(auth.expiry.substring(0, 19)) > new Date()) {
    try {
      const posts = {
        'url': '/api/users/auth/user/',
        'headers': {
          'Authorization': 'Token ' + auth.token
        }
      }

      // 유효한 토큰인지 확인 후 아니면 리다이렉트 처리
      if (!store.dispatch('setData', posts)) {
        return redirect('/admin/login')
      }
    } catch (err) {
      console.log(err)
    }
  } else {
    return redirect('/admin/login')
  }
}
