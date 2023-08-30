'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')
const Hash = use('Hash')
class Account extends Model {
  /** Table name */
  static get table() {
    return 'accounts'
  }
  /** Casting Dates */
  static get dates() {
    return super.dates.concat(['dob'])
  }
  static castDates(field, value) {
    if (['dob'].indexOf(field) > -1) {
      return value.format('YYYY-MM-DD')
    }
    return super.formatDates(field, value)
  }
  /**
   * Hidden Field
   */
  // static get hidden() {
  //   return ['password']
  // }

  /**
   * Album Table
   * @param null
   */
  albums() {
    return this.hasMany('App/Models/Album', 'id', 'account_id')
  }
  /**
   * TwoFactorSetting Table
   * @param null
   */
  twofactorsettings() {
    return this.hasMany('App/Models/TwoFactorSetting', 'id', 'account_id')
  }
  /**
   * AccountSocialPlatform Table
   * @param null
   */
  accountsocialplatforms() {
    return this.hasMany('App/Models/AccountSocialPlatform', 'id', 'account_id')
  }
  /**
   * Recipe Table
   * @param null
   */
  recipes() {
    return this.hasMany('App/Models/Recipe', 'id', 'account_id')
  }
  /**
   * Share Table
   * @param null
   */
  shares() {
    return this.hasMany('App/Models/Share', 'id', 'account_id')
  }
  /**
   * View Table
   * @param null
   */
  views() {
    return this.hasMany('App/Models/View', 'id', 'account_id')
  }
  /**
   * Like Table
   * @param null
   */
  likes() {
    return this.hasMany('App/Models/Like', 'id', 'account_id')
  }
  /**
   * Rating Table
   * @param null
   */
  ratings() {
    return this.hasMany('App/Models/Rating', 'id', 'account_id')
  }
  /**
   * Comment Table
   * @param null
   */
  comments() {
    return this.hasMany('App/Models/Comment', 'id', 'account_id')
  }
  /**
   * Image Table
   * @param null
   */
  images() {
    return this.hasMany('App/Models/Image', 'id', 'account_id')
  }
  /**
   * Video Table
   * @param null
   */
  videos() {
    return this.hasMany('App/Models/Video', 'id', 'account_id')
  }
  /**
   * Follower Table
   * @param null
   */
  followers() {
    return this.hasMany('App/Models/Follower', 'id', 'follower_id')
  }
  /**
   * Follower Table
   * @param null
   */
  followings() {
    return this.hasMany('App/Models/Follower', 'id', 'following_id')
  }
  /**
   * Report Table
   * @param null
   */
  reporters() {
    return this.hasMany('App/Models/Report', 'id', 'reporter_id')
  }
  /**
   * Report Table
   * @param null
   */
  reportees() {
    return this.hasMany('App/Models/Report', 'id', 'reportee_id')
  }
  /**
   * Block Table
   * @param null
   */
  blockers() {
    return this.hasMany('App/Models/Block', 'id', 'account_id')
  }
  /**
   * Block Table
   * @param null
   */
  blockeds() {
    return this.hasMany('App/Models/Block', 'id', 'blocked_id')
  }
  /**
   * Country Table
   * @param null
   */
  countries() {
    return this.belongsTo('App/Models/Country', 'country_id', 'id')
  }
  /**
   * State Table
   * @param null
   */
  states() {
    return this.belongsTo('App/Models/State', 'state_id', 'id')
  }
  /**
   * City Table
   * @param null
   */
  cities() {
    return this.belongsTo('App/Models/City', 'city_id', 'id')
  }
  static boot() {
    super.boot()
    /**
     * A hook to hash the user password before saving
     * it to the database.
     */
    this.addHook('beforeSave', async (userInstance) => {
      if (userInstance.dirty.password) {
        userInstance.password = await Hash.make(userInstance.password)
      }
    })
  }
  /**
   * A relationship on tokens is required for auth to
   * work. Since features like `refreshTokens` or
   * `rememberToken` will be saved inside the
   * tokens table.
   *
   * @method tokens
   * @return {Object}
   */
  tokens() {
    return this.hasMany('App/Models/AccountToken', 'id', 'account_id')
  }
}

module.exports = Account
