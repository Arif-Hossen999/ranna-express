'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class RecipeAlbum extends Model {
  /** Table name */
  static get table() {
    return 'recipe_albums'
  }
  /**
   * Album Table
   * @param null
   */
  albums() {
    return this.belongsTo('App/Models/Album', 'album_id', 'id')
  }
  /**
   * Recipe Table
   * @param null
   */
  recipes() {
    return this.belongsTo('App/Models/Recipe', 'recipe_id', 'id')
  }
}

module.exports = RecipeAlbum
