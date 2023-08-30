'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class TagRecipe extends Model {
  /** Table name */
  static get table() {
    return 'tag_recipes'
  }
  /**
   * Tag Table
   * @param null
   */
  tags() {
    return this.belongsTo('App/Models/Tag', 'tag_id', 'id')
  }
}

module.exports = TagRecipe
