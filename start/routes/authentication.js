'use strict'
/**
 ** File Name: authentication.js
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

/** Registration Route */
Route.post(
  '/registration',
  'AuthenticationController.postRegistration'
).validator('Auth/Registration')
/** Account Verification Route */
Route.post(
  '/profile/verify',
  'AuthenticationController.postConfirmVerification'
)
/** Re-Send Account Verification Code Route */
Route.post(
  '/profile/code/resend',
  'AuthenticationController.postResendVerificationCode'
).validator('Auth/VerificationCode')
/** Login Route */
Route.post('/login', 'AuthenticationController.postLogin').validator(
  'Auth/Login'
)
/** Login Route With 2FA */
Route.post('/login/2fa', 'AuthenticationController.postLoginWith2FA')
