'use strict'
/**
 ** File Name: recipe.js
 ** This is the entry point for the Account of the Application. All the required routes related to
 ** account will be defined here.
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

/** Getting All Recipes */
Route.get('/recipes/all', 'RecipeController.getRecipes')
/** Add new Recipe */
Route.post(
  '/recipe/create',
  'RecipeController.postCreateRecipe'
).validator('Recipe/CreateRecipe')
/** Update Recipe */
Route.post(
  '/recipe/update',
  'RecipeController.postUpdateRecipe'
).validator('Recipe/CreateRecipe')
/** Delete Recipe */
Route.post('/recipe/delete', 'RecipeController.postDeleteRecipe')
