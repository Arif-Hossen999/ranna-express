'use strict'
/**
 ** File Name: CreateAlbum.js
 ** Validating Category Info for adding new Album
 ** Namespace: App/Validators/Album
 ** Developed By: Devech Ltd.
 ** Company Website: https://www.devech.com
 ** Maintained By: Devech Ltd.
 ** Email: info@devech.com
 ** Skype: team_devech,
 ** License: Devech Ltd.
 **/
class CreateAlbum {
  /**
   * Validating all fields
   * @param null
   */
  get validateAll() {
    return true
  }
  /**
   * Custom Validation Rules
   */
  get rules() {
    // console.log(this.ctx.auth.user.id)
    const { id } = this.ctx.request.input('albumInfo')
    // console.log(id)
    // adding the loggedIn account id. since this account_id is needed for compound unique field validation
    this.ctx.request.input('albumInfo').account_id = this.ctx.auth.user.id
    return {
      // validation rules
      'albumInfo.album_name': `required|uniqueCompoundFields:albums,account_id/album_name,id,${id}`,
    }
  }
  /**
   * Custom Validation Message
   */
  get messages() {
    var antl = this.ctx.antl
    return {
      'albumInfo.album_name.required': antl.formatMessage(
        'validations.required',
        {
          field: antl.formatMessage('keys.album'),
        }
      ),
      'albumInfo.album_name.uniqueCompoundFields': antl.formatMessage(
        'validations.unique',
        {
          field: antl.formatMessage('keys.album'),
        }
      ),
    }
  }
  /**
   * Custom Validation Messages
   * Returned to Front End
   * @param {Object} errorMessages
   */
  async fails(errorMessages) {
    // formatting the error messages for vee-validate (client side)
    let formedErrorMessages = {}
    if (errorMessages) {
      errorMessages.forEach((error) => {
        let field = error.field.substring(
          error.field.indexOf('.') + 1,
          error.field.length
        )
        formedErrorMessages[field] = error.message
      })
    }
    return this.ctx.response.send({
      STATUS: 400,
      CODE: 'Z_VALIDATION_FAILED',
      MESSAGES: formedErrorMessages,
      TYPE: 'error',
    })
  }
}

module.exports = CreateAlbum
