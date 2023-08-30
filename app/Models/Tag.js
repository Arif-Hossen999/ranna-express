'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class Tag extends Model {
  /** Table name */
  static get table() {
    return 'tags'
  }
  /**
   * TagRecipe Table
   * @param null
   */
  tagrecipes() {
    return this.hasMany('App/Models/TagRecipe', 'id', 'tag_id')
  }
}

module.exports = Tag
