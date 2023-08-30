'use strict'
/**
 ** File Name: social_platform.js
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

/** Getting All Social Platform */
Route.get('/social/platforms/all', 'SocialPlatformController.getSocialPlatform')
/** Add new Social Platform */
Route.post(
  '/social/platform/create',
  'SocialPlatformController.postSocialPlatform'
).validator('SocialPlatform/CreateSocialPlatform')
/** Update Social Platform */
Route.post(
  '/social/platform/update',
  'SocialPlatformController.postUpdateSocialPlatform'
).validator('SocialPlatform/CreateSocialPlatform')
/** Delete Social Platform */
Route.post(
  '/social/platform/delete',
  'SocialPlatformController.postDeleteSocialPlatform'
)
