'use strict'
/**
 ** File Name: RatingController.js
 ** Handling all types of request/tasks related to Rating Section
 ** Namespace: App/Controllers/Http/Rating
 ** Developed By: Devech Ltd.
 ** Company Website: https://www.devech.com
 ** Maintained By: Devech Ltd.
 ** Email: info@devech.com
 ** Skype: team_devech,
 ** License: Devech Ltd.
 **/
/** Models */
const Rating = use('App/Models/Rating')
const Recipe = use('App/Models/Recipe')
/** Modules Sections */
/** Services */
const EServices = use('App/Services/ExceptionsServices')
const ExceptionsServices = new EServices()
/** Exceptions */
class RatingController {
  /**
   * Getting All Rating
   * @params null
   */
  async getRatings({ auth, request, response, antl }) {
    try {
      // Fetching all the Rating
      const ratings = await Rating.query()
        .where('status', 1)
        .select(
          'id',
          'account_id',
          'recipe_id',
          'ratings',
          'comment',
          'created_at',
          'status'
        )
        .fetch()
      return ratings
    } catch (getRatingsError) {
      console.log(getRatingsError)
    }
  }
  /**
   * Creating a New Rating
   * @param {Object} ratingInfo
   */
  async postCreateRating({ auth, request, response, antl }) {
    const account = await auth.getUser()
    try {
      // console.log(request.all())
      // Getting the ratingInfo
      const { recipe_id, ratings, comment } = request.input('ratingInfo')
      //Adding New Rating
      const rating = new Rating()
      rating.account_id = account.id
      rating.recipe_id = recipe_id
      rating.ratings = ratings
      rating.comment = comment
      rating.status = 1 // Active
      await rating.save()
      // Calculating Average Rating for this recipe
      const averageRating = await Rating.query()
        .where('recipe_id', recipe_id)
        .getAvg('ratings')
      // console.log(averageRating)
      // finding the recipe
      const findRecipe = await Recipe.query()
        .where('id', recipe_id)
        .select('id', 'ratings')
        .first()
      //Updating Rating
      findRecipe.ratings = averageRating
      await findRecipe.save()

      // returning success response
      return ExceptionsServices.resourceAddSuccessful(
        antl.currentLocale(),
        'rating',
        rating
      )
    } catch (createRatingError) {
      console.log(createRatingError)
      // returning error response
      return ExceptionsServices.resourceAddFailed(
        antl.currentLocale(),
        'rating'
      )
    }
  }
  /**
   * Update Rating
   * @param {Object} ratingInfo
   */
  async postUpdateRating({ request, response, antl }) {
    try {
      // console.log(request.all())
      // Getting the ratingInfo
      const { id, ratings, comment } = request.input('ratingInfo')
      // finding the Rating
      const findRating = await Rating.query()
        .where('id', id)
        .select('id', 'ratings', 'comment', 'recipe_id')
        .first()
      // checking the Rating is exist or not
      if (!findRating) {
        return ExceptionsServices.resourceMissing(
          antl.currentLocale(),
          'rating'
        )
      }
      // Updating Rating
      findRating.ratings = ratings
      findRating.comment = comment
      await findRating.save()
      // Calculating Average Rating for this recipe
      const averageRating = await Rating.query()
        .where('recipe_id', findRating.recipe_id)
        .getAvg('ratings')
      // finding the recipe
      const findRecipe = await Recipe.query()
        .where('id', findRating.recipe_id)
        .select('id', 'ratings')
        .first()
      //Updating Rating
      findRecipe.ratings = averageRating
      await findRecipe.save()
      // returning success response
      return ExceptionsServices.resourceUpdateSuccessful(
        antl.currentLocale(),
        'rating'
      )
    } catch (updateRatingError) {
      console.log(updateRatingError)
      // returning error response
      return ExceptionsServices.resourceUpdateFailed(
        antl.currentLocale(),
        'rating'
      )
    }
  }
  /**
   * Added Rating Comment Reply
   * @param {Object} ratingReplyInfo
   */
  async postCreateReplyRatingComment({ request, response, antl }) {
    try {
      // console.log(request.all())
      // Getting the ratingReplyInfo
      const { id, comment_reply } = request.input('ratingReplyInfo')
      // finding the Rating
      const findRating = await Rating.query()
        .where('id', id)
        .select('id', 'comment_reply')
        .first()
      // checking the Rating is exist or not
      if (!findRating) {
        return ExceptionsServices.resourceMissing(
          antl.currentLocale(),
          'rating'
        )
      }
      // Add Rating Reply Comment
      findRating.comment_reply = comment_reply
      await findRating.save()
      // returning success response
      return ExceptionsServices.resourceAddSuccessful(
        antl.currentLocale(),
        'reply_comment'
      )
    } catch (postCreateReplyRatingCommentError) {
      console.log(postCreateReplyRatingCommentError)
      // returning error response
      return ExceptionsServices.resourceAddFailed(
        antl.currentLocale(),
        'reply_comment'
      )
    }
  }
  /**
   * Update Rating Comment Reply
   * @param {Object} ratingReplyInfo
   */
  async postUpdateRatingReplyComment({ request, response, antl }) {
    try {
      // console.log(request.all())
      // Getting the ratingReplyInfo
      const { id, comment_reply } = request.input('ratingReplyInfo')
      // finding the Rating
      const findRating = await Rating.query()
        .where('id', id)
        .select('id', 'comment_reply')
        .first()
      // checking the Rating is exist or not
      if (!findRating) {
        return ExceptionsServices.resourceMissing(
          antl.currentLocale(),
          'rating'
        )
      }
      // Add Rating Reply Comment
      findRating.comment_reply = comment_reply
      await findRating.save()
      // returning success response
      return ExceptionsServices.resourceUpdateSuccessful(
        antl.currentLocale(),
        'reply_comment'
      )
    } catch (updateRatingReplyCommentError) {
      console.log(updateRatingReplyCommentError)
      // returning error response
      return ExceptionsServices.resourceUpdateFailed(
        antl.currentLocale(),
        'reply_comment'
      )
    }
  }
}

module.exports = RatingController
