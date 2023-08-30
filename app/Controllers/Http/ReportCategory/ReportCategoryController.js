'use strict'
/**
 ** File Name: ReportCategoryController.js
 ** Handling all types of request/tasks related to ReportCategory Section
 ** Namespace: App/Controllers/Http/ReportCategory
 ** Developed By: Devech Ltd.
 ** Company Website: https://www.devech.com
 ** Maintained By: Devech Ltd.
 ** Email: info@devech.com
 ** Skype: team_devech,
 ** License: Devech Ltd.
 **/
/** Models */
const ReportCategory = use('App/Models/ReportCategory')
/** Modules Sections */
/** Services */
const EServices = use('App/Services/ExceptionsServices')
const ExceptionsServices = new EServices()
/** Exceptions */
class ReportCategoryController {
  /**
   * Getting All Report Categories
   * @params null
   */
  async getReportCategorys({ auth, request, response, antl }) {
    try {
      // Fetching all the report categories
      const reportCategories = await ReportCategory.query()
        .where('status', 1)
        .select('id', 'category_name', 'status')
        .fetch()
      return reportCategories
    } catch (getReportCategorysError) {
      console.log(getReportCategorysError)
    }
  }
  /**
   * Creating a New Report Category
   * @param {Object} reportCategoryInfo
   */
   async postCreateReportCategory({ auth, request, response, antl }) {
    const account = await auth.getUser()
    try {
      // console.log(request.all())
      // Getting the reportCategoryInfo
      const { category_name } = request.input('reportCategoryInfo')
      // Adding New Report Category
      const reportCategory = new ReportCategory()
      reportCategory.category_name = category_name
      reportCategory.status = 1 // Active
      await reportCategory.save()
      // returning success response
      return ExceptionsServices.resourceAddSuccessful(
        antl.currentLocale(),
        'reportCategory',
        reportCategory
      )
    } catch (createReportCategoryError) {
      console.log(createReportCategoryError)
      // returning error response
      return ExceptionsServices.resourceAddFailed(
        antl.currentLocale(),
        'reportCategory'
      )
    }
  }

  /**
   * Update Report Category
   * @param {Object} reportCategoryInfo
   */
   async postUpdateReportCategory({ request, response, antl }) {
    try {
      // console.log(request.all())
      // Getting the reportCategoryInfo
      const { id, category_name } = request.input('reportCategoryInfo')
      // finding the reportCategory
      const findReportCategory = await ReportCategory.query()
        .where('id', id)
        .select('id', 'category_name')
        .first()
      // checking the report category is exist or not
      if (!findReportCategory) {
        return ExceptionsServices.resourceMissing(
          antl.currentLocale(),
          'reportCategory'
        )
      }
      // Updating report category
      findReportCategory.category_name = category_name
      await findReportCategory.save()
      // returning success response
      return ExceptionsServices.resourceUpdateSuccessful(
        antl.currentLocale(),
        'reportCategory'
      )
    } catch (updateReportCategoryError) {
      console.log(updateReportCategoryError)
      // returning error response
      return ExceptionsServices.resourceUpdateFailed(
        antl.currentLocale(),
        'reportCategory'
      )
    }
  }
  /**
   * Instead of Deleting from Table, we just change the Status of the category
   * @param {Integer} id
   */
   async postDeleteReportCategory({ request, response, antl }) {
    try {
      // console.log(request.all())
      // Getting the id for destroy report category
      const { id } = request.all()
      // finding the report category
      const findReportCategory = await ReportCategory.query()
        .where('id', id)
        .select('id', 'status')
        .first()
      // checking the report category is exist or not
      if (!findReportCategory) {
        return ExceptionsServices.resourceMissing(
          antl.currentLocale(),
          'reportCategory'
        )
      }
      // changing the status
      findReportCategory.status = 0 // 0 means inactive
      await findReportCategory.save()
      // returning success response
      return ExceptionsServices.resourceDeleteSuccessful(
        antl.currentLocale(),
        'reportCategory'
      )
    } catch (deleteReportCategoryError) {
      console.log(deleteReportCategoryError)
      // returning error response
      return ExceptionsServices.resourceDeleteFailed(
        antl.currentLocale(),
        'reportCategory'
      )
    }
  }
}

module.exports = ReportCategoryController
