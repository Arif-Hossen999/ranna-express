'use strict'
/**
 ** File Name: CommentController.js
 ** Handling all types of request/tasks related to Comment Section
 ** Namespace: App/Controllers/Http/Comment
 ** Developed By: Devech Ltd.
 ** Company Website: https://www.devech.com
 ** Maintained By: Devech Ltd.
 ** Email: info@devech.com
 ** Skype: team_devech,
 ** License: Devech Ltd.
 **/
/** Models */
const Comment = use('App/Models/Comment')
const Recipe = use('App/Models/Recipe')
/** Modules Sections */
/** Services */
const EServices = use('App/Services/ExceptionsServices')
const ExceptionsServices = new EServices()
/** Exceptions */
class CommentController {
  /**
   * Getting All Comments
   * @params null
   */
  async getComments({ auth, response, request, antl }) {
    const account = await auth.getUser()
    try {
      // Fetching all the comments
      const comments = await Comment.query()
        .with('accounts', (builder) => {
          builder.select('id', 'name', 'email')
        })
        .with('recipes', (builder) => {
          builder.select('id', 'title')
        })
        .where('status', 1)
        .select(
          'id',
          'comment',
          'account_id',
          'recipe_id',
          'parent_id',
          'created_at',
          'status'
        )
        .fetch()
      return comments
    } catch (getCommentsError) {
      console.log(getCommentsError)
    }
  }
  /**
   * Creating a New Comment
   * @param {object} commentInfo
   */
  async postCreateComment({ auth, request, response, antl }) {
    const account = await auth.getUser()
    try {
      console.log(request.all())
      // Getting the commentInfo
      const { recipe_id, parent_id, comment } = request.input('commentInfo')
      //  Adding New Comment
      const comments = new Comment()
      comments.account_id = account.id
      comments.recipe_id = recipe_id
      comments.parent_id = parent_id
      comments.comment = comment
      comments.status = 1 // Active
      await comments.save()
      // finding the recipe
      const findRecipe = await Recipe.query()
        .where('id', recipe_id)
        .select('id', 'comments')
        .first()
      //Adding New comment
      findRecipe.comments += 1
      await findRecipe.save()
      // returning success response
      return ExceptionsServices.resourceAddSuccessful(
        antl.currentLocale(),
        'comment',
        comments
      )
    } catch (createCommentError) {
      console.log(createCommentError)
      // returning error response
      return ExceptionsServices.resourceAddFailed(
        antl.currentLocale(),
        'comment'
      )
    }
  }
  /**
   * Update Comment
   * @param {object} commentInfo
   */
  async postUpdateComment({ request, response, antl }) {
    try {
      // console.log(request.all())
      // Getting the commentInfo
      const { id, comment } = request.input('commentInfo')
      // finding the comment
      const findComment = await Comment.query()
        .where('id', id)
        .select('id', 'comment')
        .first()
      // checking the comment is exist or not
      if (!findComment) {
        return response.json({
          CODE: antl.formatMessage('exceptions.code_405'),
          STATUS: antl.formatMessage('exceptions.status_405'),
          TYPE: antl.formatMessage('exceptions.type_405'),
          MESSAGE: antl.formatMessage('exceptions.message_405', {
            resourceName: antl.formatMessage('keys.comment'),
          }),
        })
      }
      // Updating comment
      findComment.comment = comment
      await findComment.save()
      // returning success response
      return response.json({
        CODE: antl.formatMessage('exceptions.code_202'),
        STATUS: antl.formatMessage('exceptions.status_202'),
        TYPE: antl.formatMessage('exceptions.type_202'),
        MESSAGE: antl.formatMessage('exceptions.message_202', {
          resourceName: antl.formatMessage('keys.comment'),
        }),
      })
    } catch (updateCommentError) {
      console.log(updateCommentError)
      // returning error response
      return response.json({
        CODE: antl.formatMessage('exceptions.code_203'),
        STATUS: antl.formatMessage('exceptions.status_203'),
        TYPE: antl.formatMessage('exceptions.type_203'),
        MESSAGE: antl.formatMessage('exceptions.message_203', {
          resourceName: antl.formatMessage('keys.comment'),
        }),
      })
    }
  }
  /**
   * Instead of Deleting from Table, we just change the Status of the Comment
   * @param {Integer} id
   */
  async postDeleteComment({ request, response, antl }) {
    try {
      // console.log(request.all())
      // Getting the id for destroy comment
      const { id } = request.all()
      // finding the comment
      const findComment = await Comment.query()
        .where('id', id)
        .select('id', 'status', 'recipe_id')
        .first()
      // checking the comment is exist or not
      if (!findComment) {
        return response.json({
          CODE: antl.formatMessage('exceptions.code_405'),
          STATUS: antl.formatMessage('exceptions.status_405'),
          TYPE: antl.formatMessage('exceptions.type_405'),
          MESSAGE: antl.formatMessage('exceptions.message_405', {
            resourceName: antl.formatMessage('keys.comment'),
          }),
        })
      }
      // changing the status
      findComment.status = 0 // 0 means inactive
      await findComment.save()
      // finding the recipe
      const findRecipe = await Recipe.query()
        .where('id', findComment.recipe_id)
        .select('id', 'comments')
        .first()
      //Deleting comment
      findRecipe.comments -= 1
      await findRecipe.save()
      // returning success response
      return response.json({
        CODE: antl.formatMessage('exceptions.code_204'),
        STATUS: antl.formatMessage('exceptions.status_204'),
        TYPE: antl.formatMessage('exceptions.type_204'),
        MESSAGE: antl.formatMessage('exceptions.message_204', {
          resourceName: antl.formatMessage('keys.comment'),
        }),
      })
    } catch (deleteCommentError) {
      console.log(deleteCommentError)
      // returning error response
      return response.json({
        CODE: antl.formatMessage('exceptions.code_205'),
        STATUS: antl.formatMessage('exceptions.status_205'),
        TYPE: antl.formatMessage('exceptions.type_205'),
        MESSAGE: antl.formatMessage('exceptions.message_205', {
          resourceName: antl.formatMessage('keys.comment'),
        }),
      })
    }
  }
}

module.exports = CommentController
