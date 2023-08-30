'use strict'
/**
 ** File Name: ShareController.js
 ** Handling all types of request/tasks related to Share Section
 ** Namespace: App/Controllers/Http/Share
 ** Developed By: Devech Ltd.
 ** Company Website: https://www.devech.com
 ** Maintained By: Devech Ltd.
 ** Email: info@devech.com
 ** Skype: team_devech,
 ** License: Devech Ltd.
 **/
/** Models */
const Share = use('App/Models/Share')
const Recipe = use('App/Models/Recipe')
/** Modules Sections */
/** Services */
/** Exceptions */
class ShareController {
  /**
   * Getting All Share
   * @params null
   */
  async getShares({ auth, request, response, antl }) {
    try {
      // Fetching all the Share
      const shares = await Share.query()
        .where('status', 1)
        .select('id', 'account_id', 'recipe_id', 'created_at', 'status')
        .fetch()
      return shares
    } catch (getSharesError) {
      console.log(getSharesError)
    }
  }
  /**
   * Creating a New Share
   * @param {object} shareInfo
   */
  async postCreateShare({ auth, request, response, antl }) {
    try {
      //  console.log(request.all())
      // Getting the shareInfo
      const { account_id, recipe_id } = request.input('shareInfo')

      //Adding New Share
      const share = new Share()
      share.account_id = account_id
      share.recipe_id = recipe_id
      share.status = 1 // Active
      await share.save()
      // finding the recipe
      const findRecipe = await Recipe.query()
        .where('id', recipe_id)
        .select('id', 'shares')
        .first()
      //Adding New Share
      findRecipe.shares += 1
      await findRecipe.save()

      // returning success response
      return response.json({
        CODE: antl.formatMessage('exceptions.code_200'),
        STATUS: antl.formatMessage('exceptions.status_200'),
        TYPE: antl.formatMessage('exceptions.type_200'),
        MESSAGE: antl.formatMessage('exceptions.message_200', {
          resourceName: antl.formatMessage('keys.share'),
        }),
        DATA: share,
      })
    } catch (createShareError) {
      console.log(createShareError)
      // returning error response
      return response.json({
        CODE: antl.formatMessage('exceptions.code_201'),
        STATUS: antl.formatMessage('exceptions.status_201'),
        TYPE: antl.formatMessage('exceptions.type_201'),
        MESSAGE: antl.formatMessage('exceptions.message_201', {
          resourceName: antl.formatMessage('keys.share'),
        }),
      })
    }
  }

  /**
   * Delete share
   * @param {Integer} id
   */
  async postDeleteShare({ request, response, antl }) {
    try {
      // console.log(request.all())
      // Getting the id for destroy share
      const { id } = request.all()
      // finding the like
      const findShare = await Share.query()
        .where('id', id)
        .select('id', 'recipe_id')
        .first()
      // checking the Share is exist or not
      if (!findShare) {
        return response.json({
          CODE: antl.formatMessage('exceptions.code_405'),
          STATUS: antl.formatMessage('exceptions.status_405'),
          TYPE: antl.formatMessage('exceptions.type_405'),
          MESSAGE: antl.formatMessage('exceptions.message_405', {
            resourceName: antl.formatMessage('keys.share'),
          }),
        })
      }
      // finding the recipe
      const findRecipe = await Recipe.query()
        .where('id', findShare.recipe_id)
        .select('id', 'shares')
        .first()
      // Deleting Share
      findRecipe.shares -= 1
      await findRecipe.save()
      // Delete the share
      await findShare.delete()
      // returning success response
      return response.json({
        CODE: antl.formatMessage('exceptions.code_204'),
        STATUS: antl.formatMessage('exceptions.status_204'),
        TYPE: antl.formatMessage('exceptions.type_204'),
        MESSAGE: antl.formatMessage('exceptions.message_204', {
          resourceName: antl.formatMessage('keys.share'),
        }),
      })
    } catch (deleteShareError) {
      console.log(deleteShareError)
      // returning error response
      return response.json({
        CODE: antl.formatMessage('exceptions.code_205'),
        STATUS: antl.formatMessage('exceptions.status_205'),
        TYPE: antl.formatMessage('exceptions.type_205'),
        MESSAGE: antl.formatMessage('exceptions.message_205', {
          resourceName: antl.formatMessage('keys.share'),
        }),
      })
    }
  }
}

module.exports = ShareController
