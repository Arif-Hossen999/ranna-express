'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class Follower extends Model {
  /** Table name */
  static get table() {
    return 'followers'
  }
  /**
   * Account Table
   * @param null
   */
  followers() {
    return this.belongsTo('App/Models/Account', 'follower_id', 'id')
  }
  /**
   * Account Table
   * @param null
   */
  followings() {
    return this.belongsTo('App/Models/Account', 'following_id', 'id')
  }
}

module.exports = Follower
