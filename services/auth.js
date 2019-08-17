import authenticateUserGql from '../apollo/mutations/authenticateUser'
import me from '../apollo/queries/me'

export default class Auth {
  constructor(apolloClient, apolloHelpers, router) {
    this.apolloClient = apolloClient
    this.apolloHelpers = apolloHelpers
    this.router = router
  }

  async login(username, password) {
    try {
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
      } else {
        throw new Error('Something is wrong')
      }
      return data.login
    } catch (e) {
      throw new Error(e.message)
    }
  }
  async logout() {
    await this.apolloHelpers.onLogout()
    window.location.href = '/'
  }

  async me() {
    await this.apolloClient.query({
      query: me,
      fetchPolicy: 'no-cache',
      errorPolicy: 'all'
    })
  }
}
