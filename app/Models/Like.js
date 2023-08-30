'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class Like extends Model {
  /** Table name */
  static get table() {
    return 'likes'
  }
  /**
   * Account Table
   * @param null
   */
  accounts() {
    return this.belongsTo('App/Models/Account', 'account_id', 'id')
  }
  /**
   * Recipe Table
   * @param null
   */
  recipes() {
    return this.belongsTo('App/Models/Recipe', 'recipe_id', 'id')
  }
}

module.exports = Like
