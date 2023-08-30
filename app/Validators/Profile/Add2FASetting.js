'use strict'
/**
 ** File Name: Add2FASetting.js
 ** Validating Category Info for adding new Setting (Email/Phone) for 2FA
 ** Namespace: App/Validators/Profile
 ** Developed By: Devech Ltd.
 ** Company Website: http://www.devech.com
 ** Maintained By: Devech Ltd.
 ** Email: info@devech.com
 ** Skype: team_devech,
 ** License: Devech Ltd.
 **/
class Add2FASetting {
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
    return {
      // validation rules
      'settingsInfo.email_mobile': `required|unique:two_factor_settings,email_mobile`,
    }
  }
  /**
   * Custom Validation Message
   */
  get messages() {
    var antl = this.ctx.antl
    return {
      'settingsInfo.email_mobile.required': antl.formatMessage(
        'validations.required',
        {
          field: antl.formatMessage('keys.email'),
        }
      ),
      'settingsInfo.email_mobile.unique': antl.formatMessage(
        'validations.unique',
        {
          field: antl.formatMessage('keys.email'),
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

module.exports = Add2FASetting
