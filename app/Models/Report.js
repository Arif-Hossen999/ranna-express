'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class Report extends Model {
  /** Table name */
  static get table() {
    return 'reports'
  }
  /**
   * Account Table
   * @param null
   */
  reporters() {
    return this.belongsTo('App/Models/Account', 'reporter_id', 'id')
  }
  /**
   * Account Table
   * @param null
   */
  reportee() {
    return this.belongsTo('App/Models/Account', 'reportee_id', 'id')
  }
  /**
   * ReportCategory Table
   * @param null
   */
  reportcategories() {
    return this.belongsTo(
      'App/Models/ReportCategory',
      'report_category_id',
      'id'
    )
  }
}

module.exports = Report
