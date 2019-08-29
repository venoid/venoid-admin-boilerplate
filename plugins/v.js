import Notification from '../services/notification'
import Validator from '../services/Validator'
import Auth from '../services/Auth'
import Pokemon from '../services/pokemon'
import Dialog from '../services/dialog'
import Apollo from '../services/apollo'

export default ({ app }, inject) => {
  const apolloClient = process.client
    ? app.apolloProvider.clients.defaultClient
    : app.apolloProvider.clients.server
  const apolloHelpers = app.$apolloHelpers
  const apollo = new Apollo(apolloClient)
  const router = app.router

  const notification = new Notification()
  const validator = new Validator()
  const auth = new Auth(apolloClient, apolloHelpers, router)
  const pokemon = new Pokemon(apollo)
  const dialog = new Dialog()

  inject('v', {
    notification,
    validator,
    auth,
    pokemon,
    dialog
  })
}
