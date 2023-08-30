'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class Category extends Model {
  /** Table name */
  static get table() {
    return 'categories'
  }
  /**
   * Recipe Table
   * @param null
   */
  recipes() {
    return this.hasMany('App/Models/Recipe', 'id', 'category_id')
  }
  /**
   * Category Table
   * @param null
   */
  categories() {
    return this.hasMany('App/Models/Category', 'id', 'parent_id')
  }
}

module.exports = Category
