'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class Country extends Model {
  /** Table name */
  static get table() {
    return 'countries'
  }
  /**
   * Account Table
   * @param null
   */
  accounts() {
    return this.hasMany('App/Models/Account', 'id', 'country_id')
  }
}

module.exports = Country
