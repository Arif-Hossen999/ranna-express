'use strict'
/**
 ** File Name: CreateTag.js
 ** Validating Tag Info for adding new Tag
 ** Namespace: App/Validators/Tag
 ** Developed By: Devech Ltd.
 ** Company Website: https://www.devech.com
 ** Maintained By: Devech Ltd.
 ** Email: info@devech.com
 ** Skype: team_devech,
 ** License: Devech Ltd.
 **/
class CreateTag {
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
    const { id } = this.ctx.request.input('tagInfo')
    return {
      // validation rules
      'tagInfo.name': `required|unique: tags,name, id , ${id}`,
    }
  }

  /**
   * Custom Validation Message
   */
  get messages() {
    var antl = this.ctx.antl
    return {
      'tagInfo.name.required': antl.formatMessage('validations.required', {
        field: antl.formatMessage('keys.tagName'),
      }),
      'tagInfo.name.unique': antl.formatMessage('validations.unique', {
        field: antl.formatMessage('keys.tagName'),
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
      name: '',
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

module.exports = CreateTag
