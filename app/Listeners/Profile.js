'use strict'
/**
 ** File Name: Profile.js
 ** Listener will listen all buzzes created by Account/Client Profile
 ** Namespace: App/Listeners
 ** Developed By: Devech Ltd.
 ** Company Website: http://www.devech.com
 ** Maintained By: Devech Ltd.
 ** Email: info@devech.com
 ** Skype: team_devech,
 ** License: Devech Ltd.
 **/
const Profile = (exports = module.exports = {})
/** Helper Modules */
const Mail = use('Mail')
const Config = use('Config')
/**
 * Sending Email to verify 2FA Settings added by Account
 * @param account
 */
Profile.send2FASettingVerificationCode = async (account) => {
  try {
    // console.log(account)
    // Sending mail
    await Mail.send(
      'emails.profile.send2FASettingVerificationPIN',
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
