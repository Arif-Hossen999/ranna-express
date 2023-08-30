'use strict'
/**
 ** File Name: video.js
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

/** Getting All Videos */
Route.get('/videos/all', 'VideoController.getVideos')
/** Add new Video */
Route.post('/video/create', 'VideoController.postCreateVideo').validator('Video/CreateVideo')
/** Update Video */
Route.post('/video/update', 'VideoController.postUpdateVideo').validator('Video/CreateVideo')
/** Delete Video */
Route.post('/video/delete', 'VideoController.postDeleteVideo')
