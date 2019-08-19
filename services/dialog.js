import { DialogProgrammatic as Dialog } from 'buefy'

function createDialog(message, type, confirmText, onConfirm, icon) {
  Dialog.confirm({
    message,
    type,
    confirmText,
    onConfirm,
    hasIcon: true,
    icon,
    iconPack: 'mdi'
  })
}

export default class DialogService {
  confirm(message, onConfirm) {
    createDialog(message, 'is-info', 'Ok', onConfirm)
  }

  delete(message, onConfirm) {
    createDialog(message, 'is-danger', 'Delete', onConfirm, 'delete')
  }
}
