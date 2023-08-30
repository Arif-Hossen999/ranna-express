'use strict'
/**
 ** File Name: ViewController.js
 ** Handling all types of request/tasks related to View Section
 ** Namespace: App/Controllers/Http/View
 ** Developed By: Devech Ltd.
 ** Company Website: https://www.devech.com
 ** Maintained By: Devech Ltd.
 ** Email: info@devech.com
 ** Skype: team_devech,
 ** License: Devech Ltd.
 **/
/** Models */
const View = use('App/Models/View')
const Recipe = use('App/Models/Recipe')
/** Modules Sections */
/** Services */
/** Exceptions */
class ViewController {
    /**
   * Getting All Views
   * @params null
   */
  async getViews({ auth, request, response, antl }) {
    try {
      // Fetching all the views
      const views = await View.query()
        .where('status', 1)
        .select(
          'id',
          'account_id',
          'recipe_id',
          'created_at',
          'status'
        )
        .fetch()
      return views
    } catch (getViewsError) {
      console.log(getViewsError)
    }
  }
  /**
   * Creating a New View
   * @param {object} viewInfo
   */
   async postCreateView({ auth, request, response, antl }) {
    try {
      //  console.log(request.all())
      // Getting the viewInfo
      const { account_id, recipe_id } = request.input('viewInfo')

      //Adding New View
      const view = new View()
      view.account_id = account_id
      view.recipe_id = recipe_id
      view.status = 1 // Active
      await view.save()
      // finding the recipe
      const findRecipe = await Recipe.query()
        .where('id', recipe_id)
        .select('id', 'views')
        .first()
      //Adding New View
      findRecipe.views += 1
      await findRecipe.save()

      // returning success response
      return response.json({
        CODE: antl.formatMessage('exceptions.code_200'),
        STATUS: antl.formatMessage('exceptions.status_200'),
        TYPE: antl.formatMessage('exceptions.type_200'),
        MESSAGE: antl.formatMessage('exceptions.message_200', {
          resourceName: antl.formatMessage('keys.view'),
        }),
        DATA: view,
      })
    } catch (createViewError) {
      console.log(createViewError)
      // returning error response
      return response.json({
        CODE: antl.formatMessage('exceptions.code_201'),
        STATUS: antl.formatMessage('exceptions.status_201'),
        TYPE: antl.formatMessage('exceptions.type_201'),
        MESSAGE: antl.formatMessage('exceptions.message_201', {
          resourceName: antl.formatMessage('keys.view'),
        }),
      })
    }
  }
}

module.exports = ViewController
