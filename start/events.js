/**
 ** File Name: events.js
 ** To handle all the Event emitted from different controller/** Functions
 ** Namespace: start/
 ** Developed By: Devech Ltd.
 ** Company Website: http://www.devech.com
 ** Maintained By: Devech Ltd.
 ** Email: info@devech.com
 ** Skype: team_devech,
 ** License: Devech Ltd.s
 **/

const ZeroEvent = use('Event')

/** Listeners */
const AuthenticationListener = use('App/Listeners/Authentication')
const ProfileListener = use('App/Listeners/Profile')
/**
 * Firing the Listener when an account is created
 * Sending Verification Code
 */
ZeroEvent.on('create::CreateAccount', AuthenticationListener.createAccount)
/**
 * Firing the Listener when an account requests verification Code
 * Sending Verification Code
 */
ZeroEvent.on(
  'send::ResendAccountVerificationCode',
  AuthenticationListener.resendAccountVerificationCode
)
/**
 * Firing the Listener when an account has Two Factor Authentication Enabled
 */
ZeroEvent.on(
  'twofactorauthentication::SendVerificationCode',
  AuthenticationListener.send2FAVerificationCode
)
/**
 * Firing the Listener when an account requests verification Code for verifying 2FA Setting
 * Sending Verification Code
 */
ZeroEvent.on(
  'send::Send2FASettingVerificationCode',
  ProfileListener.send2FASettingVerificationCode
)
