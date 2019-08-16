import authenticateUserGql from '../apollo/mutations/authenticateUser'

export default class Auth {
  constructor(apolloClient, apolloHelpers, router) {
    this.apolloClient = apolloClient
    this.apolloHelpers = apolloHelpers
    this.router = router
  }

  async login(username, password) {
    const { data, errors } = await this.apolloClient.mutate({
      mutation: authenticateUserGql,
      variables: { username, password },
      fetchPolicy: 'no-cache',
      errorPolicy: 'all'
    })

    if (errors) {
      throw new Error('Invalid credentials')
    }

    if (data.login && data.login.token) {
      await this.apolloHelpers.onLogin(data.login.token)
    }

    return data.login
  }
  async logout() {
    await this.apolloHelpers.onLogout()
    this.router.push({ name: 'login' })
  }
}
