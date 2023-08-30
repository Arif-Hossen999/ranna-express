'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class Recipe extends Model {
  /** Table name */
  static get table() {
    return 'recipes'
  }
  /**
   * Category Table
   * @param null
   */
  categories() {
    return this.belongsTo('App/Models/Category', 'category_id', 'id')
  }
  /**
   * Account Table
   * @param null
   */
  accounts() {
    return this.belongsTo('App/Models/Account', 'account_id', 'id')
  }
  /**
   * Share Table
   * @param null
   */
  shares() {
    return this.hasMany('App/Models/Share', 'id', 'recipe_id')
  }
  /**
   * View Table
   * @param null
   */
  views() {
    return this.hasMany('App/Models/View', 'id', 'recipe_id')
  }
  /**
   * Like Table
   * @param null
   */
  likes() {
    return this.hasMany('App/Models/Like', 'id', 'recipe_id')
  }
  /**
   * Rating Table
   * @param null
   */
  ratings() {
    return this.hasMany('App/Models/Rating', 'id', 'recipe_id')
  }
  /**
   * Comment Table
   * @param null
   */
  comments() {
    return this.hasMany('App/Models/Comment', 'id', 'recipe_id')
  }
  /**
   * Image Table
   * @param null
   */
  images() {
    return this.hasMany('App/Models/Image', 'id', 'recipe_id')
  }
  /**
   * Video Table
   * @param null
   */
  videos() {
    return this.hasMany('App/Models/Video', 'id', 'recipe_id')
  }
  /**
   * RecipeAlbum Table
   * @param null
   */
  recipealbums() {
    return this.belongsTo('App/Models/RecipeAlbum', 'recipe_id', 'id')
  }
  /**
   * TagRecipe Table
   * @param null
   */
  recipetags() {
    return this.hasMany('App/Models/TagRecipe', 'id', 'recipe_id')
  }
}

module.exports = Recipe
