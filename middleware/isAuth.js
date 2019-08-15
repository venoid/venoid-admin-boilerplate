export default function({ app, redirect, route }) {
  const hasToken = !!app.$apolloHelpers.getToken()
  if (route.name !== 'login') {
    if (!hasToken) {
      // TODO: redirect by route name not string
      redirect('/login')
    }
  } else if (hasToken) redirect('/')
}
