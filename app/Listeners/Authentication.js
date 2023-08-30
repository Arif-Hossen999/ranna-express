'use strict'
/**
 ** File Name: Authentication.js
 ** Listener will listen all buzzes created by Account/Client
 ** Namespace: App/Listeners
 ** Developed By: Devech Ltd.
 ** Company Website: http://www.devech.com
 ** Maintained By: Devech Ltd.
 ** Email: info@devech.com
 ** Skype: team_devech,
 ** License: Devech Ltd.
 **/
const Authentication = (exports = module.exports = {})
/** Helper Modules */
const Mail = use('Mail')
const Config = use('Config')

/**
 * Sending Email when Account is Created
 * @param account
 */
Authentication.createAccount = async (account) => {
  try {
    // Sending mail
    await Mail.send(
      'emails.authentication.sendVerificationCode',
      account,
      (message) => {
        message
          .from(account.from_email, account.company_name)
          .to(account.email, account.name)
          .subject('Account Verification')
      }
    )
  } catch (error) {}
}
/**
 * Sending Email when Account is Requested for Resending OTP/Verification Code
 * @param account
 */
Authentication.resendAccountVerificationCode = async (account) => {
  try {
    // Sending mail
    await Mail.send(
      'emails.authentication.sendVerificationCode',
      account,
      (message) => {
        message
          .from(account.from_email, account.company_name)
          .to(account.email, account.name)
          .subject('Account Verification')
      }
    )
  } catch (error) {}
}
/**
 * Sending Email when Account Has Two Factor Authentication is Enabled
 * @param account
 */
Authentication.send2FAVerificationCode = async (account) => {
  try {
    // console.log(account)
    // Sending mail
    await Mail.send(
      'emails.authentication.send2FAVerificationPIN',
      account,
      (message) => {
        message
          .from(account.from_email, account.company_name)
          .to(account.email, account.name)
          .subject('Verification Code')
      }
    )
  } catch (error) {}
}
