'use strict'
/**
 ** File Name: comment.js
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

/** Getting All Comment */
Route.get('/comments/all', 'CommentController.getComments')
/** Add new Comment */
Route.post(
  '/comment/create',
  'CommentController.postCreateComment'
).validator('Comment/CreateComment')
/** Update Comment */
Route.post(
  '/comment/update',
  'CommentController.postUpdateComment'
).validator('Comment/CreateComment')
/** Delete Comment */
Route.post('/comment/delete', 'CommentController.postDeleteComment')
