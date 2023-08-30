'use strict'
/**
 ** File Name: tag.js
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

/** Getting All Tags */
Route.get('/tags/all', 'TagController.getTags')
/** Add New Tag */
Route.post('/tag/create', 'TagController.postCreateTag').validator(
  'Tag/CreateTag'
)
/** Update Tag */
Route.post('/tag/update', 'TagController.postUpdateTag').validator(
  'Tag/CreateTag'
)
/** Delete Tag*/
Route.post('/tag/delete', 'TagController.postDeleteTag')
