/* global d3 */

export class FormOps {
  whichRadio (elementById) {
    let form = document.getElementById(elementById)
    for (let i = 0; i < form.length; i++) {
      if (form[i].checked) {
        return form[i].id
      }
    }
  }
}
