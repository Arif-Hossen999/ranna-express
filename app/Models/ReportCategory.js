'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class ReportCategory extends Model {
  /** Table name */
  static get table() {
    return 'report_categories'
  }
  /**
   * Report Table
   * @param null
   */
  reports() {
    return this.hasMany('App/Models/Report', 'id', 'report_category_id')
  }
}

module.exports = ReportCategory
