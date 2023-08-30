'use strict'
/**
 ** File Name: image.js
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

/** Getting All Images */
Route.get('/recipe/images/all', 'RecipeImageController.getImages')
/** Add new Image */
Route.post('/recipe/image/create', 'RecipeImageController.postCreateImage').validator('RecipeImage/CreateRecipeImage')
/** Update Image */
Route.post('/recipe/image/update', 'RecipeImageController.postUpdateImage').validator('RecipeImage/CreateRecipeImage')
/** Delete Image */
Route.post('/recipe/image/delete', 'RecipeImageController.postDeleteImage')
