'use strict'
/**
 ** File Name: CreateComment.js
 ** Validating Comment Info for adding new Comment
 ** Namespace: App/Validators/Comment
 ** Developed By: Devech Ltd.
 ** Company Website: https://www.devech.com
 ** Maintained By: Devech Ltd.
 ** Email: info@devech.com
 ** Skype: team_devech,
 ** License: Devech Ltd.
 **/
class CreateComment {
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
    const { id } = this.ctx.request.input('commentInfo')
    return {
      // validation rules
      'commentInfo.comment': `required`,
    }
  }
  /**
   * Custom Validation Message
   */
   get messages() {
    var antl = this.ctx.antl
    return {
      'commentInfo.comment.required': antl.formatMessage('validations.required', {
        field: antl.formatMessage('keys.comment'),
      }),
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
      comment: '',
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

module.exports = CreateComment
