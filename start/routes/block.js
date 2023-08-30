'use strict'
/**
 ** File Name: block.js
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

/** Getting All Block */
Route.get('/blocks/all', 'BlockController.getBlocks')
/** Add new Block */
Route.post('/block/create', 'BlockController.postCreateBlock')
/** Delete Block */
Route.post('/block/delete', 'BlockController.postDeleteBlock')
