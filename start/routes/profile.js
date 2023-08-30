'use strict'
/**
 ** File Name: profile.js
 ** This is the entry point for the Profile of the Application. ** All the required routes related to account will be defined here.
 ** Namespace: start/routes
 ** Developed By: Devech Ltd.
 ** Company Website: http://www.devech.com
 ** Maintained By: Devech Ltd.
 ** Email: info@devech.com
 ** Skype: team_devech,
 ** License: Devech Ltd.
 **/

/** @type {typeof import('@adonisjs/framework/src/Route/Manager')} */

const Route = use('Route')

/** Getting Authenticated User Info */
Route.get('/user/info', 'ProfileController.getUserInfo')

/** Getting the Two Factor Authentication (2FA) Settings */
Route.get('/profile/settings/2fa/all', 'ProfileController.get2FASettings')

/** Updating the Two Factor Authentication (2FA) */
Route.post(
  '/profile/settings/2fa/status/update',
  'ProfileController.postUpdateProfile2FA'
)

/** Updating the Two Factor Authentication (2FA) Medium email/phone etc */
Route.post(
  '/profile/settings/2fa/medium/update',
  'ProfileController.postUpdateProfile2FAMedium'
)

/** Adding new Two Factor Authentication (2FA) Medium email/phone etc */
Route.post(
  '/profile/settings/2fa/medium/add',
  'ProfileController.postAdd2FASettings'
).validator('Profile/Add2FASetting')
/** Deleting Two Factor Authentication (2FA) Medium email/phone etc */
Route.post(
  '/profile/settings/2fa/medium/delete',
  'ProfileController.postDelete2FASettings'
)

/** Verification Code for Two Factor Authentication (2FA) Medium email/phone etc */
Route.post(
  '/profile/settings/2fa/medium/verify/code',
  'ProfileController.post2FASettingsVerificationCode'
)

/** Verify Two Factor Authentication (2FA) Medium email/phone etc */
Route.post(
  '/profile/settings/2fa/medium/verify/confirm',
  'ProfileController.postConfirm2FASettingsVerification'
)

/** Profile & Social Platforms section */
/** Getting All Social Platforms for LoggedIn Account */
Route.get(
  '/profile/social/platforms/all',
  'ProfileController.getProfileSocialPlatforms'
)
/** Adding new Social Platforms for LoggedIn Account */
Route.post(
  '/profile/social/platforms/create',
  'ProfileController.postCreateProfileSocialPlatforms'
).validator('Profile/AssignSocialPlatform')
/** Deleting Social Platforms from LoggedIn Account */
Route.post(
  '/profile/social/platforms/delete',
  'ProfileController.postDeleteProfileSocialPlatforms'
)
