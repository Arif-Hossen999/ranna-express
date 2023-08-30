'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class AccountSocialPlatform extends Model {
  /** Table name */
  static get table() {
    return 'account_social_platforms'
  }
  /**
   * SocialPlatform Table
   * Belongs To Social Platform
   * @param null
   */
  socialplatforms() {
    return this.belongsTo(
      'App/Models/SocialPlatform',
      'social_platform_id',
      'id'
    )
  }
  /**
   * Account Table
   * Belongs To Account
   * @param null
   */
  accounts() {
    return this.belongsTo('App/Models/Account', 'account_id', 'id')
  }
}

module.exports = AccountSocialPlatform
