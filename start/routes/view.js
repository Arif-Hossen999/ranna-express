'use strict'
/**
 ** File Name: view.js
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

/** Getting All View */
Route.get('/views/all', 'ViewController.getViews')
/** Add new View */
Route.post(
  '/view/create',
  'ViewController.postCreateView'
)
