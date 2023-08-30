'use strict'
/**
 ** File Name: AssignSocialPlatform.js
 ** Validating Category Info for adding new Social Platform to an Account
 ** Namespace: App/Validators/Profile
 ** Developed By: Devech Ltd.
 ** Company Website: https://www.devech.com
 ** Maintained By: Devech Ltd.
 ** Email: info@devech.com
 ** Skype: team_devech,
 ** License: Devech Ltd.
 **/
class AssignSocialPlatform {
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
    const { id } = this.ctx.request.input('socialPlatformInfo')
    // console.log(id)
    // adding the loggedIn account id. since this account_id is needed for compound unique field validation
    this.ctx.request.input(
      'socialPlatformInfo'
    ).account_id = this.ctx.auth.user.id
    return {
      // validation rules
      'socialPlatformInfo.social_platform_id': `required|uniqueCompoundFields:account_social_platforms,account_id/social_platform_id,id,${id}`,
      'socialPlatformInfo.social_network_link': 'required',
    }
  }
  /**
   * Custom Validation Message
   */
  get messages() {
    var antl = this.ctx.antl
    return {
      'socialPlatformInfo.social_platform_id.required': antl.formatMessage(
        'validations.required',
        {
          field: antl.formatMessage('keys.socialPlatform'),
        }
      ),
      'socialPlatformInfo.social_platform_id.uniqueCompoundFields': antl.formatMessage(
        'validations.unique',
        {
          field: antl.formatMessage('keys.socialPlatform'),
        }
      ),
      'socialPlatformInfo.social_network_link.required': antl.formatMessage(
        'validations.required',
        {
          field: antl.formatMessage('keys.socialPlatformLink'),
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

module.exports = AssignSocialPlatform
