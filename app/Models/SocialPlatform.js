'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class SocialPlatform extends Model {
  /** Table name */
  static get table() {
    return 'social_platforms'
  }
  /**
   * AccountSocialPlatform Table
   * @param null
   */
  accountsocialplatforms() {
    return this.hasMany(
      'App/Models/AccountSocialPlatform',
      'id',
      'social_plarform_id'
    )
  }
}

module.exports = SocialPlatform
