'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class City extends Model {
  /** Table name */
  static get table() {
    return 'cities'
  }
  /**
   * Account Table
   * @param null
   */
  accounts() {
    return this.hasMany('App/Models/Account', 'id', 'city_id')
  }
}

module.exports = City
