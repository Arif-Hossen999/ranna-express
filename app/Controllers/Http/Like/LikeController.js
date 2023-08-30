'use strict'
/**
 ** File Name: LikeController.js
 ** Handling all types of request/tasks related to Like Section
 ** Namespace: App/Controllers/Http/Like
 ** Developed By: Devech Ltd.
 ** Company Website: https://www.devech.com
 ** Maintained By: Devech Ltd.
 ** Email: info@devech.com
 ** Skype: team_devech,
 ** License: Devech Ltd.
 **/
/** Models */
const Like = use('App/Models/Like')
const Recipe = use('App/Models/Recipe')
/** Modules Sections */
/** Services */
/** Exceptions */
class LikeController {
  /**
   * Getting All Likes
   * @params null
   */
  async getLikes({ auth, request, response, antl }) {
    try {
      // Fetching all the likes
      const likes = await Like.query()
        .where('status', 1)
        .select(
          'id',
          'account_id',
          'recipe_id',
          'like_type',
          'created_at',
          'status'
        )
        .fetch()
      return likes
    } catch (getLikesError) {
      console.log(getLikesError)
    }
  }
  /**
   * Creating a New Like
   * @param {object} likeInfo
   */
  async postCreateLike({ auth, request, response, antl }) {
    try {
      //  console.log(request.all())
      // Getting the likeInfo
      const { account_id, recipe_id, like_type } = request.input('likeInfo')

      //Adding New Like
      const like = new Like()
      like.account_id = account_id
      like.recipe_id = recipe_id
      like.like_type = like_type
      like.status = 1 // Active
      await like.save()
      // finding the recipe
      const findRecipe = await Recipe.query()
        .where('id', recipe_id)
        .select('id', 'likes')
        .first()
      //Adding New Like
      findRecipe.likes += 1
      await findRecipe.save()

      // returning success response
      return response.json({
        CODE: antl.formatMessage('exceptions.code_200'),
        STATUS: antl.formatMessage('exceptions.status_200'),
        TYPE: antl.formatMessage('exceptions.type_200'),
        MESSAGE: antl.formatMessage('exceptions.message_200', {
          resourceName: antl.formatMessage('keys.like'),
        }),
        DATA: like,
      })
    } catch (createLikeError) {
      console.log(createLikeError)
      // returning error response
      return response.json({
        CODE: antl.formatMessage('exceptions.code_201'),
        STATUS: antl.formatMessage('exceptions.status_201'),
        TYPE: antl.formatMessage('exceptions.type_201'),
        MESSAGE: antl.formatMessage('exceptions.message_201', {
          resourceName: antl.formatMessage('keys.like'),
        }),
      })
    }
  }
  /**
   * Update Like
   * @param {object} likeInfo
   */
  async postUpdateLike({ request, response, antl }) {
    try {
      // console.log(request.all())
      // Getting the likeInfo
      const { id, like_type } = request.input('likeInfo')
      // finding the Like
      const findLike = await Like.query()
        .where('id', id)
        .select('id', 'like_type')
        .first()
      // checking the like is exist or not
      if (!findLike) {
        return response.json({
          CODE: antl.formatMessage('exceptions.code_405'),
          STATUS: antl.formatMessage('exceptions.status_405'),
          TYPE: antl.formatMessage('exceptions.type_405'),
          MESSAGE: antl.formatMessage('exceptions.message_405', {
            resourceName: antl.formatMessage('keys.like'),
          }),
        })
      }
      // Updating like
      findLike.like_type = like_type
      await findLike.save()
      // returning success response
      return response.json({
        CODE: antl.formatMessage('exceptions.code_202'),
        STATUS: antl.formatMessage('exceptions.status_202'),
        TYPE: antl.formatMessage('exceptions.type_202'),
        MESSAGE: antl.formatMessage('exceptions.message_202', {
          resourceName: antl.formatMessage('keys.like'),
        }),
      })
    } catch (updateLikeError) {
      console.log(updateLikeError)
      // returning error response
      return response.json({
        CODE: antl.formatMessage('exceptions.code_203'),
        STATUS: antl.formatMessage('exceptions.status_203'),
        TYPE: antl.formatMessage('exceptions.type_203'),
        MESSAGE: antl.formatMessage('exceptions.message_203', {
          resourceName: antl.formatMessage('keys.like'),
        }),
      })
    }
  }
  /**
   * Delete Like
   * @param {Integer} id
   */
   async postDeleteLike({ request, response, antl }) {
    try {
      // console.log(request.all())
      // Getting the id for destroy like
      const { id } = request.all()
      // finding the like
      const findLike = await Like.query()
        .where('id', id)
        .select('id', 'recipe_id')
        .first()
      // checking the follower is exist or not
      if (!findLike) {
        return response.json({
          CODE: antl.formatMessage('exceptions.code_405'),
          STATUS: antl.formatMessage('exceptions.status_405'),
          TYPE: antl.formatMessage('exceptions.type_405'),
          MESSAGE: antl.formatMessage('exceptions.message_405', {
            resourceName: antl.formatMessage('keys.like'),
          }),
        })
      }
      // finding the recipe
      const findRecipe = await Recipe.query()
        .where('id', findLike.recipe_id)
        .select('id', 'likes')
        .first()
      // Deleting Like
      findRecipe.likes -= 1
      await findRecipe.save()
      // Delete the like
      await findLike.delete()
      // returning success response
      return response.json({
        CODE: antl.formatMessage('exceptions.code_204'),
        STATUS: antl.formatMessage('exceptions.status_204'),
        TYPE: antl.formatMessage('exceptions.type_204'),
        MESSAGE: antl.formatMessage('exceptions.message_204', {
          resourceName: antl.formatMessage('keys.like'),
        }),
      })
    } catch (deleteLikeError) {
      console.log(deleteLikeError)
      // returning error response
      return response.json({
        CODE: antl.formatMessage('exceptions.code_205'),
        STATUS: antl.formatMessage('exceptions.status_205'),
        TYPE: antl.formatMessage('exceptions.type_205'),
        MESSAGE: antl.formatMessage('exceptions.message_205', {
          resourceName: antl.formatMessage('keys.like'),
        }),
      })
    }
  }
}

module.exports = LikeController
