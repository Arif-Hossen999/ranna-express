'use strict'
/**
 ** File Name: albumRecipe.js
 ** This is the entry point for the Account of the Application.
 ** All the required routes related to album & recipe relation will be defined here.
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

/** Getting All Albums for Specific Recipe */
Route.get('/albums/recipes/all', 'AlbumController.getAlbumsWithRecipes')
/** Add Recipe with Album */
Route.post(
  '/albums/recipes/add',
  'AlbumController.postAddRecipeToAlbum'
).validator('Album/AddRecipeToAlbum')
/** Update Album */
// Route.post('/album/update', 'AlbumController.postUpdateAlbum').validator(
//   'Album/CreateAlbum'
// )
/** Delete Recipe from Album */
Route.post(
  '/albums/recipes/delete',
  'AlbumController.postDeleteRecipeFromAlbum'
)
