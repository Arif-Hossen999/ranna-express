'use strict'
/**
 ** File Name: CreateVideo.js
 ** Validating Video Info for adding new Video
 ** Namespace: App/Validators/Video
 ** Developed By: Devech Ltd.
 ** Company Website: https://www.devech.com
 ** Maintained By: Devech Ltd.
 ** Email: info@devech.com
 ** Skype: team_devech,
 ** License: Devech Ltd.
 **/
class CreateVideo {
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
    const { id } = this.ctx.request.input('videoInfo')
    return {
      // validation rules
      'videoInfo.video_url': `required`,
    }
  }
  /**
   * Custom Validation Message
   */
   get messages() {
    var antl = this.ctx.antl
    return {
      'videoInfo.video_url.required': antl.formatMessage(
        'validations.required',
        {
          field: antl.formatMessage('keys.video_url'),
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

module.exports = CreateVideo
