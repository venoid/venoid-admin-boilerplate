import { SnackbarProgrammatic as Snackbar } from 'buefy'

export default (ctx, inject) => {
  function createNotification(message, type) {
    Snackbar.open({
      duration: 4000,
      message,
      type,
      position: 'is-bottom-right',
      actionText: null,
      queue: false
    })
  }
  inject('notification', {
    info(message) {
      createNotification(message, 'is-info')
    },

    danger(message) {
      createNotification(message, 'is-danger')
    },

    success(message) {
      createNotification(message, 'is-success')
    },

    warning(message) {
      createNotification(message, 'is-warning')
    }
  })
}
