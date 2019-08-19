import Notification from '../services/notification'
import Validator from '../services/Validator'
import Auth from '../services/Auth'
import Book from '../services/book'
import Dialog from '../services/dialog'

export default (ctx, inject) => {
  const app = ctx.app
  const apolloClient = app.apolloProvider.defaultClient
  const apolloHelpers = app.$apolloHelpers
  const router = app.router

  const notification = new Notification()
  const validator = new Validator()
  const auth = new Auth(apolloClient, apolloHelpers, router)
  const book = new Book(apolloClient)
  const dialog = new Dialog()

  inject('v', {
    notification,
    validator,
    auth,
    book,
    dialog
  })
}
