'use strict'
/**
 ** File Name: AddTagToRecipe.js
 ** Validating TagRecipe Info for adding Recipe to Album
 ** Namespace: App/Validators/Tag
 ** Developed By: Devech Ltd.
 ** Company Website: https://www.devech.com
 ** Maintained By: Devech Ltd.
 ** Email: info@devech.com
 ** Skype: team_devech,
 ** License: Devech Ltd.
 **/
class AddTagToRecipe {
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
    const { id } = this.ctx.request.input('tagRecipeInfo')
    // console.log(id)
    // adding the loggedIn account id. since this account_id is needed for compound unique field validation
    this.ctx.request.input('tagRecipeInfo').account_id = this.ctx.auth.user.id
    return {
      // validation rules
      'tagRecipeInfo.tag_id': `required|integer|exists:tags, id|uniqueCompoundFields:tag_recipes,tag_id/recipe_id,id,${id}`,
      'tagRecipeInfo.recipe_id': `required|exists:recipes,id|integer`,
    }
  }
  /**
   * Custom Validation Message
   */
  get messages() {
    var antl = this.ctx.antl
    return {
      'tagRecipeInfo.tag_id.required': antl.formatMessage(
        'validations.required',
        {
          field: antl.formatMessage('keys.tag'),
        }
      ),
      'tagRecipeInfo.tag_id.exists': antl.formatMessage('validations.exists', {
        field: antl.formatMessage('keys.tag'),
      }),
      'tagRecipeInfo.tag_id.integer': antl.formatMessage(
        'validations.integer',
        {
          field: antl.formatMessage('keys.tag'),
        }
      ),
      'tagRecipeInfo.tag_id.uniqueCompoundFields': antl.formatMessage(
        'validations.unique',
        {
          field: antl.formatMessage('keys.tag'),
        }
      ),
      'tagRecipeInfo.recipe_id.required': antl.formatMessage(
        'validations.required',
        {
          field: antl.formatMessage('keys.recipe'),
        }
      ),
      'tagRecipeInfo.recipe_id.exists': antl.formatMessage(
        'validations.exists',
        {
          field: antl.formatMessage('keys.recipe'),
        }
      ),
      'tagRecipeInfo.recipe_id.integer': antl.formatMessage(
        'validations.integer',
        {
          field: antl.formatMessage('keys.recipe'),
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

module.exports = AddTagToRecipe
