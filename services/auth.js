import authenticateUserGql from '../apollo/mutations/authenticateUser'
import me from '../apollo/queries/me'

export default class Auth {
  constructor(apollo, apolloHelpers, router) {
    this.apollo = apollo
    this.apolloHelpers = apolloHelpers
    this.router = router
  }

  async login(username, password) {
    try {
      const { login } = await this.apollo.mutate(authenticateUserGql, {
        username,
        password
      })
      if (login && login.token) {
        await this.apolloHelpers.onLogin(login.token)
      } else {
        throw new Error('Something is wrong')
      }
      return login
    } catch (e) {
      throw new Error(e.message)
    }
  }
  async logout() {
    await this.apolloHelpers.onLogout()
    window.location.href = '/'
  }

  async me() {
    await this.apollo.query(me)
  }
}
