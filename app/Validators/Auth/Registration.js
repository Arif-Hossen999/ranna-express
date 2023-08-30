'use strict'
/**
 ** File Name: Registration.js
 ** Validating Registration Info for creating new Account
 ** Namespace: App/Validators/Auth
 ** Developed By: Devech Ltd.
 ** Company Website: http://www.devech.com
 ** Maintained By: Devech Ltd.
 ** Email: info@devech.com
 ** Skype: team_devech,
 ** License: Devech Ltd.
 **/
class Registration {
  /**
   * Validating all fields
   * @param null
   */
  get validateAll() {
    return true
  }
  /**
   * Custom Validations Rules
   * @param {Object} registrationinfo
   */
  get rules() {
    // getting the registration type
    const { registrationType } = this.ctx.request.input('registrationInfo')
    // checking the regirtration type
    if (registrationType && registrationType == 'email') {
      return {
        // validation rules
        'registrationInfo.name': 'required',
        'registrationInfo.email': `required|email|unique:accounts,email`,
        'registrationInfo.password': 'required',
      }
    } else if (registrationType && registrationType == 'mobile') {
      return {
        // validation rules
        'registrationInfo.name': 'required',
        'registrationInfo.mobile': `required|unique:accounts,mobile`,
        'registrationInfo.password': 'required',
      }
    } else {
      return {
        'registrationInfo.name': 'required',
        'registrationInfo.email': `required|email|unique:accounts,email`,
        'registrationInfo.password': 'required',
      }
    }
  }
  /**
   * Custom Validation Message
   */
  get messages() {
    var antl = this.ctx.antl
    const { registrationType } = this.ctx.request.input('registrationInfo')
    if (registrationType && registrationType == 'email') {
      return {
        'registrationInfo.name.required': antl.formatMessage(
          'validations.required',
          {
            field: antl.formatMessage('keys.name'),
          }
        ),
        'registrationInfo.password.required': antl.formatMessage(
          'validations.required',
          {
            field: antl.formatMessage('keys.password'),
          }
        ),
        'registrationInfo.email.required': antl.formatMessage(
          'validations.required',
          {
            field: antl.formatMessage('keys.email'),
          }
        ),
        'registrationInfo.email.email': antl.formatMessage(
          'validations.email',
          {
            field: antl.formatMessage('keys.email'),
          }
        ),
        'registrationInfo.email.unique': antl.formatMessage(
          'validations.unique',
          {
            field: antl.formatMessage('keys.email'),
          }
        ),
      }
    } else if (registrationType && registrationType == 'mobile') {
      return {
        'registrationInfo.name.required': antl.formatMessage(
          'validations.required',
          {
            field: antl.formatMessage('keys.name'),
          }
        ),
        'registrationInfo.password.required': antl.formatMessage(
          'validations.required',
          {
            field: antl.formatMessage('keys.password'),
          }
        ),
        'registrationInfo.mobile.required': antl.formatMessage(
          'validations.required',
          {
            field: antl.formatMessage('keys.mobile'),
          }
        ),
        'registrationInfo.mobile.unique': antl.formatMessage(
          'validations.unique',
          {
            field: antl.formatMessage('keys.mobile'),
          }
        ),
      }
    } else {
      return {
        'registrationInfo.name.required': antl.formatMessage(
          'validations.required',
          {
            field: antl.formatMessage('keys.name'),
          }
        ),
        'registrationInfo.password.required': antl.formatMessage(
          'validations.required',
          {
            field: antl.formatMessage('keys.password'),
          }
        ),
        'registrationInfo.email.required': antl.formatMessage(
          'validations.required',
          {
            field: antl.formatMessage('keys.email'),
          }
        ),
        'registrationInfo.email.email': antl.formatMessage(
          'validations.email',
          {
            field: antl.formatMessage('keys.email'),
          }
        ),
        'registrationInfo.email.unique': antl.formatMessage(
          'validations.unique',
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

module.exports = Registration
