'use strict'
/**
 ** File Name: CreateRecipe.js
 ** Validating Recipe Info for adding new Recipe
 ** Namespace: App/Validators/Recipe
 ** Developed By: Devech Ltd.
 ** Company Website: https://www.devech.com
 ** Maintained By: Devech Ltd.
 ** Email: info@devech.com
 ** Skype: team_devech,
 ** License: Devech Ltd.
 **/
class CreateRecipe {
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
    const { id } = this.ctx.request.input('recipeInfo')
    return {
      // validation rules
      'recipeInfo.title': `required`,
      'recipeInfo.short_description': `required`,
      'recipeInfo.materials': `required`,
      'recipeInfo.procedure': `required`,
    }
  }
  /**
   * Custom Validation Message
   */
   get messages() {
    var antl = this.ctx.antl
    return {
      'recipeInfo.title.required': antl.formatMessage(
        'validations.required',
        {
          field: antl.formatMessage('keys.title'),
        }
      ),
      'recipeInfo.short_description.required': antl.formatMessage(
        'validations.required',
        {
          field: antl.formatMessage('keys.short_description'),
        }
      ),
      'recipeInfo.materials.required': antl.formatMessage(
        'validations.required',
        {
          field: antl.formatMessage('keys.materials'),
        }
      ),
      'recipeInfo.procedure.required': antl.formatMessage(
        'validations.required',
        {
          field: antl.formatMessage('keys.procedure'),
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
      category_name: '',
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

module.exports = CreateRecipe
