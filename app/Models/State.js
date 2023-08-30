'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class State extends Model {
  /** Table name */
  static get table() {
    return 'states'
  }
  /**
   * Account Table
   * @param null
   */
  accounts() {
    return this.hasMany('App/Models/Account', 'id', 'state_id')
  }
}

module.exports = State
