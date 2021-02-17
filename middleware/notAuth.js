export default function ({ store, redirect }) {
  const auth = store.state.auth.auth

  if (auth && new Date(auth.expiry.substring(0, 19)) > new Date()) {
    return redirect('/admin')
  }
}
