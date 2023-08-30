'use strict'
/**
 ** File Name: VerificationCode.js
 ** Validating Verification Code for Verifying Profile/Account
 ** Namespace: App/Validators/Auth
 ** Developed By: Devech Ltd.
 ** Company Website: http://www.devech.com
 ** Maintained By: Devech Ltd.
 ** Email: info@devech.com
 ** Skype: team_devech,
 ** License: Devech Ltd.
 **/
class VerificationCode {
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
    // getting the registration type
    const { type } = this.ctx.request.input('verifyInfo')
    // checking the verification type
    if (type && type == 'email') {
      return {
        // validation rules
        'verifyInfo.email_mobile': `required|email`,
      }
    } else if (type && type == 'mobile') {
      return {
        // validation rules
        'verifyInfo.email_mobile': `required`,
      }
    } else {
      return {
        // validation rules
        'verifyInfo.email_mobile': `required|email`,
      }
    }
  }
  /**
   * Custom Validation Message
   */
  get messages() {
    var antl = this.ctx.antl
    const { type } = this.ctx.request.input('verifyInfo')
    if (type && type == 'email') {
      return {
        'verifyInfo.email_mobile.required': antl.formatMessage(
          'validations.required',
          {
            field: antl.formatMessage('keys.email'),
          }
        ),
        'verifyInfo.email_mobile.email': antl.formatMessage(
          'validations.email',
          {
            field: antl.formatMessage('keys.email'),
          }
        ),
      }
    } else if (type && type == 'mobile') {
      return {
        'verifyInfo.email_mobile.required': antl.formatMessage(
          'validations.required',
          {
            field: antl.formatMessage('keys.mobile'),
          }
        ),
      }
    } else {
      return {
        'verifyInfo.email_mobile.required': antl.formatMessage(
          'validations.required',
          {
            field: antl.formatMessage('keys.email'),
          }
        ),
        'verifyInfo.email_mobile.email': antl.formatMessage(
          'validations.email',
          {
            field: antl.formatMessage('keys.email'),
          }
        ),
      }
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
        if (error && error.message) {
          // adding the field iff error message found
          formedErrorMessages[field] = error.message
        }
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

module.exports = VerificationCode
