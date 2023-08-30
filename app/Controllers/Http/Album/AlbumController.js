'use strict'
/**
 ** File Name: AlbumController.js
 ** Handling all types of request/tasks related to Album Section
 ** Namespace: App/Controllers/Http/Album
 ** Developed By: Devech Ltd.
 ** Company Website: https://www.devech.com
 ** Maintained By: Devech Ltd.
 ** Email: info@devech.com
 ** Skype: team_devech,
 ** License: Devech Ltd.
 **/
/** Models */
const Album = use('App/Models/Album')
const Comment = use('App/Models/Comment')
const Recipe = use('App/Models/Recipe')
const RecipeAlbum = use('App/Models/RecipeAlbum')
/** Modules Sections */
/** Services */
const EServices = use('App/Services/ExceptionsServices')
const ExceptionsServices = new EServices()
/** Exceptions */
class AlbumController {
  /**
   * Getting All Albums
   * @params null
   */
  async getAlbums({ auth, request, response, antl }) {
    const account = await auth.getUser()
    try {
      // Fetching all the albums
      const albums = await Album.query()
        .where('account_id', account.id)
        .where('status', 1)
        .select(
          'id',
          'account_id',
          'album_name',
          'is_private',
          'type',
          'status',
          'created_at',
          'updated_at'
        )
        .fetch()
      return albums
    } catch (getAlbumError) {
      console.log(getAlbumError)
    }
  }
  /**
   * Creating a New Album
   * @param {Object} albumInfo
   */
  async postCreateAlbum({ auth, request, response, antl }) {
    const account = await auth.getUser()
    try {
      console.log(request.all())
      // Getting the albumInfo
      const { album_name, is_private } = request.input('albumInfo')
      // Storing New Album/ Adding New Album
      const album = new Album()
      album.account_id = account.id // logged in User
      album.album_name = album_name
      album.is_private = is_private // 0 or 1
      album.status = 1 // Active
      await album.save()
      // returning success response
      return response.json({
        CODE: antl.formatMessage('exceptions.code_200'),
        STATUS: antl.formatMessage('exceptions.status_200'),
        TYPE: antl.formatMessage('exceptions.type_200'),
        MESSAGE: antl.formatMessage('exceptions.message_200', {
          resourceName: antl.formatMessage('keys.album'),
        }),
        DATA: album,
      })
    } catch (createAlbumError) {
      console.log(createAlbumError)
      // returning error response
      return response.json({
        CODE: antl.formatMessage('exceptions.code_201'),
        STATUS: antl.formatMessage('exceptions.status_201'),
        TYPE: antl.formatMessage('exceptions.type_201'),
        MESSAGE: antl.formatMessage('exceptions.message_201', {
          resourceName: antl.formatMessage('keys.album'),
        }),
      })
    }
  }
  /**
   * Updating an Album
   * @param {Object} albumInfo
   */
  async postUpdateAlbum({ request, response, antl, auth }) {
    const account = await auth.getUser()
    try {
      console.log(request.all())
      // Getting the albumInfo
      const { id, album_name, is_private } = request.input('albumInfo')
      // finding the Album
      const findAlbum = await Album.query()
        .where('id', id)
        .where('account_id', account.id)
        .select('id', 'album_name', 'is_private', 'account_id')
        .first()
      // checking the category is exist or not
      if (!findAlbum) {
        return response.json({
          CODE: antl.formatMessage('exceptions.code_405'),
          STATUS: antl.formatMessage('exceptions.status_405'),
          TYPE: antl.formatMessage('exceptions.type_405'),
          MESSAGE: antl.formatMessage('exceptions.message_405', {
            resourceName: antl.formatMessage('keys.album'),
          }),
        })
      }
      // Updating Album
      findAlbum.album_name = album_name
      findAlbum.is_private = is_private
      await findAlbum.save()
      // returning success response
      return response.json({
        CODE: antl.formatMessage('exceptions.code_202'),
        STATUS: antl.formatMessage('exceptions.status_202'),
        TYPE: antl.formatMessage('exceptions.type_202'),
        MESSAGE: antl.formatMessage('exceptions.message_202', {
          resourceName: antl.formatMessage('keys.album'),
        }),
      })
    } catch (updateAlbumError) {
      console.log(updateAlbumError)
      // returning error response
      return response.json({
        CODE: antl.formatMessage('exceptions.code_203'),
        STATUS: antl.formatMessage('exceptions.status_203'),
        TYPE: antl.formatMessage('exceptions.type_203'),
        MESSAGE: antl.formatMessage('exceptions.message_203', {
          resourceName: antl.formatMessage('keys.album'),
        }),
      })
    }
  }
  /**
   * Deleting an Album
   * @param {Integer} id
   */
  async postDeleteAlbum({ request, response, antl, auth }) {
    const account = await auth.getUser()
    try {
      console.log(request.all())
      // Getting the id for destroy Album
      const { id } = request.all()
      // finding the Album
      const findAlbum = await Album.query()
        .where('id', id)
        .where('account_id', account.id)
        .select('id')
        .first()
      // checking the Album is exist or not
      if (!findAlbum) {
        return response.json({
          CODE: antl.formatMessage('exceptions.code_405'),
          STATUS: antl.formatMessage('exceptions.status_405'),
          TYPE: antl.formatMessage('exceptions.type_405'),
          MESSAGE: antl.formatMessage('exceptions.message_405', {
            resourceName: antl.formatMessage('keys.album'),
          }),
        })
      }
      // Deleting Album
      await findAlbum.delete()
      // returning success response
      return response.json({
        CODE: antl.formatMessage('exceptions.code_204'),
        STATUS: antl.formatMessage('exceptions.status_204'),
        TYPE: antl.formatMessage('exceptions.type_204'),
        MESSAGE: antl.formatMessage('exceptions.message_204', {
          resourceName: antl.formatMessage('keys.album'),
        }),
      })
    } catch (deleteAlbumError) {
      console.log(deleteAlbumError)
      // returning error response
      return response.json({
        CODE: antl.formatMessage('exceptions.code_205'),
        STATUS: antl.formatMessage('exceptions.status_205'),
        TYPE: antl.formatMessage('exceptions.type_205'),
        MESSAGE: antl.formatMessage('exceptions.message_205', {
          resourceName: antl.formatMessage('keys.album'),
        }),
      })
    }
  }
  /**
   * Getting All Albums with Recipes
   * @params null
   */
  async getAlbumsWithRecipes({ auth, request, response, antl }) {
    const account = await auth.getUser()
    try {
      // Fetching all the albums
      const albums = await Album.query()
        .with('albumrecipes')
        .where('account_id', account.id)
        .where('status', 1)
        .select(
          'id',
          'account_id',
          'album_name',
          'is_private',
          'status',
          'created_at',
          'updated_at'
        )
        .fetch()
      return albums
    } catch (getAlbumError) {
      console.log(getAlbumError)
    }
  }
  /**
   * Adding Recipe With Album
   * @param {Object} albumRecipeInfo
   */
  async postAddRecipeToAlbum({ auth, request, response, antl }) {
    const account = await auth.getUser()
    try {
      console.log(request.all())
      // Getting the albumRecipeInfo
      const { album_id, recipe_id } = request.input('albumRecipeInfo')
      // Adding recipe with album
      const albumRecipe = new RecipeAlbum()
      albumRecipe.album_id = album_id
      albumRecipe.recipe_id = recipe_id
      albumRecipe.status = 1 // Active
      await albumRecipe.save()
      // returning success response
      return ExceptionsServices.resourceAddSuccessful(
        antl.currentLocale(),
        'album',
        albumRecipe
      )
    } catch (createAlbumError) {
      console.log(createAlbumError)
      // returning error response
      return ExceptionsServices.resourceAddFailed(antl.currentLocale(), 'album')
    }
  }
  /**
   * Deleting Recipe from An Album
   * @param {Object} albumRecipeInfo
   */
  async postDeleteRecipeFromAlbum({ request, response, antl, auth }) {
    const account = await auth.getUser()
    try {
      console.log(request.all())
      // Getting the id for destroy Album
      const { album_id, recipe_id } = request.input('albumRecipeInfo')
      // finding the Recipe Album
      const findRecipeAlbum = await RecipeAlbum.query()
        .where('album_id', album_id)
        .where('recipe_id', recipe_id)
        .select('id')
        .first()
      // checking the Album is exist or not
      if (!findRecipeAlbum) {
        return ExceptionsServices.resourceMissing(
          antl.currentLocale(),
          'recipe'
        )
      }
      // Deleting Album
      await findRecipeAlbum.delete()
      // returning success response
      return ExceptionsServices.resourceDeleteSuccessful(
        antl.currentLocale(),
        'recipe'
      )
    } catch (deleteAlbumError) {
      console.log(deleteAlbumError)
      // returning error response
      return ExceptionsServices.resourceDeleteFailed(
        antl.currentLocale(),
        'recipe'
      )
    }
  }
}

module.exports = AlbumController
