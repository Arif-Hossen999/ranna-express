'use strict'
/**
 ** File Name: share.js
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

/** Getting All Share */
Route.get('/shares/all', 'ShareController.getShares')
/** Add new Share */
Route.post(
  '/share/create',
  'ShareController.postCreateShare'
)
/** Delete Share */
Route.post('/share/delete', 'ShareController.postDeleteShare')