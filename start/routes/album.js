'use strict'
/**
 ** File Name: album.js
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

/** Getting All Albums */
Route.get('/albums/all', 'AlbumController.getAlbums')
/** Add new Album */
Route.post('/album/create', 'AlbumController.postCreateAlbum').validator(
  'Album/CreateAlbum'
)
/** Update Album */
Route.post('/album/update', 'AlbumController.postUpdateAlbum').validator(
  'Album/CreateAlbum'
)
/** Delete Album */
Route.post('/album/delete', 'AlbumController.postDeleteAlbum')
