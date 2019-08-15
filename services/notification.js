import { SnackbarProgrammatic as Snackbar } from 'buefy'

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

export default class NotificationService {
  info(message) {
    createNotification(message, 'is-info')
  }

  error(message) {
    createNotification(message, 'is-danger')
  }

  success(message) {
    createNotification(message, 'is-success')
  }

  warning(message) {
    createNotification(message, 'is-warning')
  }
}
