'use strict'
/**
 ** File Name: ReportController.js
 ** Handling all types of request/tasks related to Report Section
 ** Namespace: App/Controllers/Http/Report
 ** Developed By: Devech Ltd.
 ** Company Website: https://www.devech.com
 ** Maintained By: Devech Ltd.
 ** Email: info@devech.com
 ** Skype: team_devech,
 ** License: Devech Ltd.
 **/
/** Models */
const Report = use('App/Models/Report')
/** Modules Sections */
/** Services */
const EServices = use('App/Services/ExceptionsServices')
const ExceptionsServices = new EServices()
/** Exceptions */
class ReportController {
  /**
   * Getting All Report
   * @params null
   */
  async getReports({ auth, request, response, antl }) {
    try {
      // Fetching all the categories
      const reports = await Report.query()
        .where('status', 1)
        .select(
          'id',
          'reporter_id',
          'reportee_id',
          'report_category_id',
          'comment',
          'created_at',
          'status'
        )
        .fetch()
      return reports
    } catch (getReportsError) {
      console.log(getReportsError)
    }
  }
  /**
   * Creating a New Report
   * @param {Object} reportInfo
   */
   async postCreateReport({ auth, request, response, antl }) {
    const account = await auth.getUser()
    try {
      // console.log(request.all())
      // Getting the reportInfo
      const { reportee_id, report_category_id, comment } = request.input('reportInfo')
      // Adding New Report
      const report = new Report()
      report.reporter_id = account.id
      report.reportee_id = reportee_id
      report.report_category_id = report_category_id
      report.comment = comment
      report.status = 1 // Active
      await report.save()
      // returning success response
      return ExceptionsServices.resourceAddSuccessful(
        antl.currentLocale(),
        'report',
        report
      )
    } catch (createReportError) {
      console.log(createReportError)
      // returning error response
      return ExceptionsServices.resourceAddFailed(
        antl.currentLocale(),
        'report'
      )
    }
  }
}

module.exports = ReportController
