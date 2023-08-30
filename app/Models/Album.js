'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class Album extends Model {
  /** Table name */
  static get table() {
    return 'albums'
  }
  /**
   * Account Table
   * @param null
   */
  accounts() {
    return this.belongsTo('App/Models/Account', 'account_id', 'id')
  }
  /**
   * RecipeAlbum Table
   * @param null
   */
  albumrecipes() {
    return this.hasMany('App/Models/RecipeAlbum', 'id', 'album_id')
  }
}

module.exports = Album
