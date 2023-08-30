'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')
const Env = use('Env')
const s3_Url = Env.get('S3_BUCKET_URL')
class Image extends Model {
  static get table() {
    return 'images'
  }

  //   static get computed() {
  //     return ['fullurl']
  //   }

  //   getFullurl({ image_url, type }) {
  //     const folder =
  //       type == 'recipe_image'
  //         ? 'recipe/images'
  //         : type == 'profile_image'
  //         ? 'profile/images'
  //         : 'profile/stories'
  //     return `${s3_Url}/${folder}/${image_url}`
  //   }

  //   getImageUrl(image_url, type) {
  //     return `${s3_Url}/${type}/${image_url}`
  //   }

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

module.exports = Image
