'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class Rating extends Model {
  /** Table name */
  static get table() {
    return 'ratings'
  }
  /**
   * Account Table
   * @param null
   */
  accounts() {
    return this.belongsTo('App/Models/Account', 'account_id', 'id')
  }
  /**
   * Reccipe Table
   * @param null
   */
  recipes() {
    return this.belongsTo('App/Models/Reccipe', 'recipe_id', 'id')
  }
}

module.exports = Rating
