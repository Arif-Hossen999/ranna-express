'use strict'
/**
 ** File Name: ProfileController.js
 ** Handling all types of request/tasks related to Profile
 ** Namespace: App/Controllers/Http/Profile
 ** Developed By: Devech Ltd.
 ** Company Website: http://www.devech.com
 ** Maintained By: Devech Ltd.
 ** Email: info@devech.com
 ** Skype: team_devech,
 ** License: Devech Ltd.
 **/
/** Models */
const Account = use('App/Models/Account')
const TwoFactorSetting = use('App/Models/TwoFactorSetting')
const AccountSocialPlatform = use('App/Models/AccountSocialPlatform')
/** Modules Sections */
const Hash = use('Hash')
const Mail = use('Mail')
const ZeroEvent = use('Event')
const RandomData = use('randomatic')
const moment = use('moment')
/** Services */
/** Exceptions */
class ProfileController {
  /**
   * Getting Logged In user Info
   * @param null
   */
  async getUserInfo({ auth }) {
    const client = await auth.getUser()
    try {
      const account = await Account.query()
        .where('id', client.id)
        .with('countries', (builder) => {
          builder.select('id', 'name')
        })
        .with('states', (builder) => {
          builder.select('id', 'name')
        })
        .with('cities', (builder) => {
          builder.select('id', 'name')
        })
        .select(
          'id',
          'email',
          'status',
          'two_factor_status',
          'name',
          'dob',
          'otp_code',
          'otp_code_time',
          'username',
          'status',
          'is_verified',
          'country_id',
          'state_id',
          'city_id',
          'is_private'
        )
        .first()
      return account
    } catch (accountSummaryError) {
      console.log(accountSummaryError)
      return []
    }
  }
  /**
   * Getting all the 2FA Settings
   * @param null
   */
  async get2FASettings({ auth, response }) {
    const account = await auth.getUser()
    try {
      // getting all the settings
      const settings = await TwoFactorSetting.query()
        .where('account_id', account.id)
        .where('status', 1) // only active
        .select(
          'id',
          'email_mobile',
          'type',
          'status',
          'is_verified',
          'is_current',
          'created_at',
          'updated_at'
        )
        .fetch()
      return settings
    } catch (settingsError) {
      console.log(settingsError)
    }
  }
  /**
   * Updating Profile Two Factor Authentication
   * @param null
   */
  async postUpdateProfile2FA({ auth, antl }) {
    const account = await auth.getUser()
    try {
      // getting account detail
      const findAccount = await Account.query()
        .where('id', account.id)
        .select('id', 'two_factor_status')
        .first()
      // account missing
      if (!findAccount) {
        return 'error'
      }
      // updating Profile
      findAccount.two_factor_status = findAccount.two_factor_status == 0 ? 1 : 0
      await findAccount.save()
      // returning success message
      return 'success'
    } catch (updateError) {
      console.log(updateError)
      return 'error'
    }
  }
  /**
   * Updating Profile Two Factor Authentication Medium
   * Changing the email/phone
   * @param {Integer} settings_id
   */
  async postUpdateProfile2FAMedium({ auth, antl, request }) {
    const account = await auth.getUser()
    try {
      console.log(request.all())
      const { settings_id } = request.all()
      // getting 2FA Setting detail for account
      const findSetting = await TwoFactorSetting.query()
        .where('id', settings_id)
        .where('account_id', account.id)
        .where('status', 1)
        .select('id', 'is_current', 'is_verified')
        .first()
      // account missing
      if (!findSetting) {
        return 'not found error'
      } else if (findSetting.is_verified == 0) {
        return 'Please verify first to use this setting'
      }
      // updating Profile
      findSetting.is_current = 1
      await findSetting.save()
      // returning success message
      return 'medium update success'
    } catch (updateError) {
      console.log(updateError)
      return 'error'
    }
  }
  /**
   * Adding new 2FA Settings for an Account
   * @param {Object} settingsInfo
   */
  async postAdd2FASettings({ auth, request, response }) {
    const account = await auth.getUser()
    try {
      console.log(request.all())
      const { type, email_mobile } = request.input('settingsInfo')
      if (!type || !['email', 'mobile'].includes(type)) {
        return 'invalid type error'
      }
      // Adding new Settings
      const setting = new TwoFactorSetting()
      setting.account_id = account.id
      setting.email_mobile = email_mobile
      setting.is_current = 0
      setting.is_verified = 0
      setting.type = type
      setting.status = 1
      await setting.save()
      return setting
    } catch (settingsAddError) {
      console.log(settingsAddError)
    }
  }

  /**
   * Deleting new 2FA Settings for an Account
   * @param {Integer} settings_id
   */
  async postDelete2FASettings({ auth, request, response }) {
    const account = await auth.getUser()
    try {
      console.log(request.all())
      const { settings_id } = request.all()
      // getting 2FA Setting detail for account
      const findSetting = await TwoFactorSetting.query()
        .where('id', settings_id)
        .where('account_id', account.id)
        .where('status', 1)
        .select('id')
        .first()
      // account missing
      if (!findSetting) {
        return 'not found error'
      }
      // deleting settings
      await findSetting.delete()
      // returning success message
      return 'medium delete success'
    } catch (settingsDeleteError) {
      console.log(settingsDeleteError)
    }
  }

  /**
   * Function send Verification Code/OTP for Account 2FA Settings
   * Info will be validated from Validator
   * After validation Code/OTP will be Sent through email/mobile
   * @param {Integer} settings_id
   */
  async post2FASettingsVerificationCode({
    request,
    response,
    antl,
    emailInfo,
    auth,
  }) {
    const account = await auth.getUser()
    try {
      console.log(request.all())
      // getting the verifyInfo
      const { settings_id } = request.all()
      if (!settings_id || isNaN(settings_id)) {
        return 'settings_id invalid error'
      }

      // random PIN Generation of 6 Digit
      const pin = RandomData('0', 6)
      // getting 2FA Setting detail for account
      const findSetting = await TwoFactorSetting.query()
        .where('id', settings_id)
        .where('account_id', account.id)
        .where('is_verified', 0)
        .where('status', 1)
        .select('id', 'type', 'email_mobile')
        .first()
      // Setting missing
      if (!findSetting) {
        return 'not found error'
      }
      // updating setting
      findSetting.otp_code = pin
      findSetting.otp_code_time = moment().format('YYYY-MM-DD HH:mm:ss')
      await findSetting.save()

      // sending the verification email to the user email
      if (findSetting.type == 'email') {
        /** Sending Mail for Confirmation Link tp confirm Email */
        const clientInfo = {
          name: `${account.toJSON().name}`,
          email: findSetting.toJSON().email_mobile,
          from_email: emailInfo ? emailInfo.mailFromEmail : 'info@devech.com',
          company_name: emailInfo ? emailInfo.companyName : 'ForexSolver, Inc.',
          pin: pin,
        }
        ZeroEvent.fire('send::Send2FASettingVerificationCode', clientInfo)
        /** End of Mail Send */
      } else if (findSetting.type == 'mobile') {
        // verification code will be sent to mobile number here
      }
      return 'code sent successfully'
    } catch (codeResendError) {
      console.log(codeResendError)
    }
  }
  /**
   * 2FA Email/Phone Confirmation
   * Using Verification Code
   * @param {Object} verifyInfo
   */
  async postConfirm2FASettingsVerification({ request, response, antl, auth }) {
    const account = await auth.getUser()
    try {
      console.log(request.all())
      const { settings_id, code } = request.input('verifyInfo')
      // getting 2FA Setting detail for account
      const findSetting = await TwoFactorSetting.query()
        .where('id', settings_id)
        .where('account_id', account.id)
        .where('otp_code', code)
        .where('is_verified', 0)
        .where('status', 1)
        .select('id', 'type', 'email_mobile', 'otp_code', 'otp_code_time')
        .first()
      // Setting missing
      if (!findSetting) {
        return 'not found error'
      }
      // updating setting
      findSetting.is_verified = 1 // making verified
      findSetting.otp_code = null
      findSetting.otp_code_time = null
      await findSetting.save()
      // returning success response
      return 'verification successfull'
    } catch (verificationError) {
      console.log(verificationError)
      return 'verification error'
    }
  }
  /**
   * Getting All Social Platforms for LoggedIn Account
   * @params null
   */
  async getProfileSocialPlatforms({ auth, request, response, antl }) {
    const account = await auth.getUser()
    try {
      const socialPlatforms = await AccountSocialPlatform.query()
        .with('socialplatforms', (builder) => {
          builder.select(
            'id',
            'name',
            'pretty_name',
            'created_at',
            'status',
            'logo_url'
          )
        })
        .where('account_id', account.id)
        .where('status', 1)
        .select(
          'id',
          'account_id',
          'social_platform_id',
          'social_network_link',
          'status'
        )
        .fetch()
      return socialPlatforms
    } catch (getSocialPlatformError) {
      console.log(getSocialPlatformError)
    }
  }
  /**
   * Assigning a Social Platform to LoggedIn Account
   * @param {Object} socialPlatformInfo
   */
  async postCreateProfileSocialPlatforms({ auth, request, response, antl }) {
    const account = await auth.getUser()
    try {
      console.log(request.all())
      // Getting the socialPlatformInfo
      const { social_platform_id, social_network_link } = request.input(
        'socialPlatformInfo'
      )

      //  Assigning New Social Platform
      const socialPlatform = new AccountSocialPlatform()
      socialPlatform.account_id = account.id
      socialPlatform.social_platform_id = social_platform_id
      socialPlatform.social_network_link = social_network_link
      socialPlatform.status = 1 // Active
      await socialPlatform.save()
      // returning success response
      return response.json({
        CODE: antl.formatMessage('exceptions.code_200'),
        STATUS: antl.formatMessage('exceptions.status_200'),
        TYPE: antl.formatMessage('exceptions.type_200'),
        MESSAGE: antl.formatMessage('exceptions.message_200', {
          resourceName: antl.formatMessage('keys.socialPlatform'),
        }),
        DATA: socialPlatform,
      })
    } catch (createSocialPlatformError) {
      console.log(createSocialPlatformError)
      // returning error response
      return response.json({
        CODE: antl.formatMessage('exceptions.code_201'),
        STATUS: antl.formatMessage('exceptions.status_201'),
        TYPE: antl.formatMessage('exceptions.type_201'),
        MESSAGE: antl.formatMessage('exceptions.message_201', {
          resourceName: antl.formatMessage('keys.socialPlatform'),
        }),
      })
    }
  }
  /**
   * Deleting Social Platform for an Account
   * @param {Integer} id
   */
  async postDeleteProfileSocialPlatforms({ request, response, antl, auth }) {
    const account = await auth.getUser()
    try {
      console.log(request.all())
      // Getting the id for destroy Social Platform
      const { id } = request.all()
      // finding the Social Platform
      const findSocialPlatform = await AccountSocialPlatform.query()
        .where('id', id)
        .where('account_id', account.id)
        .select('id')
        .first()
      // checking the Social Platform is exist or not
      if (!findSocialPlatform) {
        return response.json({
          CODE: antl.formatMessage('exceptions.code_405'),
          STATUS: antl.formatMessage('exceptions.status_405'),
          TYPE: antl.formatMessage('exceptions.type_405'),
          MESSAGE: antl.formatMessage('exceptions.message_405', {
            resourceName: antl.formatMessage('keys.socialPlatform'),
          }),
        })
      }
      // Deleting/Unassigning Social Platform
      await findSocialPlatform.delete()
      // returning success response
      return response.json({
        CODE: antl.formatMessage('exceptions.code_204'),
        STATUS: antl.formatMessage('exceptions.status_204'),
        TYPE: antl.formatMessage('exceptions.type_204'),
        MESSAGE: antl.formatMessage('exceptions.message_204', {
          resourceName: antl.formatMessage('keys.socialPlatform'),
        }),
      })
    } catch (deleteSocialPlatformError) {
      console.log(deleteSocialPlatformError)
      // returning error response
      return response.json({
        CODE: antl.formatMessage('exceptions.code_205'),
        STATUS: antl.formatMessage('exceptions.status_205'),
        TYPE: antl.formatMessage('exceptions.type_205'),
        MESSAGE: antl.formatMessage('exceptions.message_205', {
          resourceName: antl.formatMessage('keys.socialPlatform'),
        }),
      })
    }
  }
}

module.exports = ProfileController
