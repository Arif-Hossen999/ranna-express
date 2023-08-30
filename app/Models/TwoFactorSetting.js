'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class TwoFactorSetting extends Model {
  /** Table name */
  static get table() {
    return 'two_factor_settings'
  }
  /**
   * Account Table
   * @param null
   */
  accounts() {
    return this.belongsTo('App/Models/Account', 'account_id', 'id')
  }
}

module.exports = TwoFactorSetting
