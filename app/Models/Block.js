'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class Block extends Model {
  /** Table name */
  static get table() {
    return 'blocks'
  }
  /**
   * Account Table
   * @param null
   */
  blockers() {
    return this.belongsTo('App/Models/Account', 'account_id', 'id')
  }
  /**
   * Account Table
   * @param null
   */
  blockeds() {
    return this.belongsTo('App/Models/Account', 'blocked_id', 'id')
  }
}

module.exports = Block
