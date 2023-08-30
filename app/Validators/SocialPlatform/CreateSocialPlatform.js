'use strict'
/**
 ** File Name: CreateSocialPlatform.js
 ** Validating Social Platform Info for adding new SocialPlatform
 ** Namespace: App/Validators/SocialPlatform
 ** Developed By: Devech Ltd.
 ** Company Website: https://www.devech.com
 ** Maintained By: Devech Ltd.
 ** Email: info@devech.com
 ** Skype: team_devech,
 ** License: Devech Ltd.
 **/
class CreateSocialPlatform {
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
    const { id } = this.ctx.request.input('socialPlatformInfo')
    return {
      // validation rules
      'socialPlatformInfo.name': `required`,
      'socialPlatformInfo.pretty_name': `required`,
    }
  }
  /**
   * Custom Validation Message
   */
  get messages() {
    var antl = this.ctx.antl
    return {
      'socialPlatformInfo.name.required': antl.formatMessage(
        'validations.required',
        {
          field: antl.formatMessage('keys.socialName'),
        }
      ),
      'socialPlatformInfo.pretty_name.required': antl.formatMessage(
        'validations.required',
        {
          field: antl.formatMessage('keys.prettyName'),
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
    let formedErrorMessages = {
      name: '',
      pretty_name: '',
    }
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

module.exports = CreateSocialPlatform
