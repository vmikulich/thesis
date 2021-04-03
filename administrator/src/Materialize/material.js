import M from 'materialize-css/dist/js/materialize.js'

const Material = {
  toast (message, error = false) {
    M.toast({ html: message, classes: error ? 'red lighten-1' : '' })
  },
  updateTextFields () {
    M.updateTextFields()
  },
  initModal (elem) {
    return M.Modal.init(elem)
  },
  initTooltip (elem) {
    return M.Tooltip.init(elem)
  }
}

export default Material