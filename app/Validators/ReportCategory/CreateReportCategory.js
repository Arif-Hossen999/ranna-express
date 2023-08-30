'use strict'
/**
 ** File Name: CreateReportCategory.js
 ** Validating Category Info for adding new Report Category
 ** Namespace: App/Validators/ReportCategory
 ** Developed By: Devech Ltd.
 ** Company Website: https://www.devech.com
 ** Maintained By: Devech Ltd.
 ** Email: info@devech.com
 ** Skype: team_devech,
 ** License: Devech Ltd.
 **/
class CreateReportCategory {
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
    const { id } = this.ctx.request.input('reportCategoryInfo')
    return {
      // validation rules
      'reportCategoryInfo.category_name': `required|unique:report_categories,category_name, id, ${id}`,
    }
  }
  /**
   * Custom Validation Message
   */
   get messages() {
    var antl = this.ctx.antl
    return {
      'reportCategoryInfo.category_name.required': antl.formatMessage(
        'validations.required',
        {
          field: antl.formatMessage('keys.categoryName'),
        }
      ),
      'reportCategoryInfo.category_name.unique': antl.formatMessage(
        'validations.unique',
        {
          field: antl.formatMessage('keys.categoryName'),
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

module.exports = CreateReportCategory
