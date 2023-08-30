'use strict'
/**
 ** File Name: like.js
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

/** Getting All Likes */
Route.get('/likes/all', 'LikeController.getLikes')
/** Add New Like */
Route.post('/like/create', 'LikeController.postCreateLike')
/** Update Like */
Route.post('/like/update', 'LikeController.postUpdateLike')
/** Delete Like*/
Route.post('/like/delete', 'LikeController.postDeleteLike')
