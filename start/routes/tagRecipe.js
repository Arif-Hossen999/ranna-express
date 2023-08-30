'use strict'
/**
 ** File Name: tagRecipe.js
 ** This is the entry point for the Account of the Application.
 ** All the required routes related to tag & recipe relation will be defined here.
 ** Namespace: start/routes
 ** Developed By: Devech Ltd.
 ** Company Website: https://www.devech.com
 ** Maintained By: Devech Ltd.
 ** Email: info@devech.com
 ** Skype: team_devech,
 ** License: Devech Ltd.
 **/

/** @type {typeof import('@adonisjs/framework/src/Route/Manager')} */

const Route = use('Route')

/** Getting All Tags for Specific Recipe */
Route.get('/tags/recipes/all', 'TagController.getRecipesWithTags')
/** Add Recipe with Tag */
Route.post('/tags/recipes/add', 'TagController.postAddTagToRecipe').validator(
  'Tag/AddTagToRecipe'
)
/** Delete Recipe from Tag */
Route.post('/tags/recipes/delete', 'TagController.postDeleteTagFromRecipe')
