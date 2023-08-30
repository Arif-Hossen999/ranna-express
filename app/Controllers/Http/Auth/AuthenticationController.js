'use strict'
/**
 ** File Name: AuthenticationController.js
 ** Handling all types of request/tasks related to Authentication, Registration, Verification
 ** Namespace: App/Controllers/Http/Auth
 ** Developed By: Devech Ltd.
 ** Company Website: https://www.devech.com
 ** Maintained By: Devech Ltd.
 ** Email: info@devech.com
 ** Skype: team_devech,
 ** License: Devech Ltd.
 **/
/** Models */
const Account = use('App/Models/Account')
const TwoFactorSetting = use('App/Models/TwoFactorSetting')
/** Modules Sections */
const Hash = use('Hash')
const Mail = use('Mail')
const ZeroEvent = use('Event')
const RandomData = use('randomatic')
const moment = use('moment')
/** Services */
/** Exceptions */
class AuthenticationController {
  /**
   * Function to Register a new Account
   * Account will be validated from Validator
   * After validation Account will be created
   * @param {object} registrationInfo
   */
  async postRegistration({ request, response, antl, emailInfo }) {
    try {
      console.log(request.all())
      // getting the registrationInfo
      const { name, email, mobile, password, registrationType } = request.input(
        'registrationInfo'
      )
      if (
        !registrationType ||
        !['email', 'mobile'].includes(registrationType)
      ) {
        return 'error'
      }
      // getting maximum id from accounts table
      const maxId = await Account.query().getMax('id')
      // random PIN Generation of 6 Digit
      const pin = RandomData('0', 6)
      // Creating Account
      const slugifyingName = name
        .toString() // Converting To String
        .toLowerCase() // Converting To Lowercase
        .replace(/(\w)\'/g, '$1') // Replacing Special case for apostrophes
        .replace(/[^a-z0-9_\-]+/g, '') // Replacing all non-word chars with not space
        // .replace(/\-\-+/g, '-') // Replacing multiple - with single -
        .replace(/^-+/, '') // Trimming - from start of text
        .replace(/-+$/, '') // Trimming - from end of text
      const account = new Account()
      account.name = name
      account.password = password
      // slugifying the name as username
      account.username = `${slugifyingName}${maxId}`
      if (registrationType == 'email') {
        account.email = email.toLowerCase()
      } else if (registrationType == 'mobile') {
        account.mobile = mobile
      }
      account.otp_code = pin
      account.otp_code_time = moment().format('YYYY-MM-DD HH:mm:ss')
      await account.save()

      // sending the verification email to the user email
      if (registrationType == 'email') {
        /** Sending Mail for Confirmation Link tp confirm Email */
        const clientInfo = {
          name: `${name}`,
          email: email.toLowerCase(),
          password: password,
          from_email: emailInfo ? emailInfo.mailFromEmail : 'info@devech.com',
          company_name: emailInfo ? emailInfo.companyName : 'ForexSolver, Inc.',
          pin: pin,
        }
        ZeroEvent.fire('create::CreateAccount', clientInfo)
        /** End of Mail Send */
      } else if (registrationType == 'mobile') {
        // verification code will be sent to mobile number here
      }
      return 'success'
    } catch (registrationError) {
      console.log(registrationError)
    }
  }
  /**
   * Function Re-send Verification Code/OTP for Account
   * Info will be validated from Validator
   * After validation Code/OTP will be Sent through email/mobile
   * @param {object} verifyInfo
   */
  async postResendVerificationCode({ request, response, antl, emailInfo }) {
    try {
      console.log(request.all())
      // getting the verifyInfo
      const { email_mobile, type } = request.input('verifyInfo')
      if (!type || !['email', 'mobile'].includes(type)) {
        return 'error'
      }

      // random PIN Generation of 6 Digit
      const pin = RandomData('0', 6)
      // finding the account based on email/mobile
      const checkAccount = await Account.query()
        .where('email', email_mobile)
        .orWhere('mobile', 'email_mobile')
        .select('id', 'otp_code', 'otp_code_time', 'email', 'mobile')
        .first()
      if (!checkAccount) {
        // return not found exceptions
        return 'error'
      }
      checkAccount.otp_code = pin
      checkAccount.otp_code_time = moment().format('YYYY-MM-DD HH:mm:ss')
      await checkAccount.save()

      // sending the verification email to the user email
      if (type == 'email') {
        /** Sending Mail for Confirmation Link tp confirm Email */
        const clientInfo = {
          name: `${checkAccount.toJSON().name}`,
          email: checkAccount.toJSON().email,
          from_email: emailInfo ? emailInfo.mailFromEmail : 'info@devech.com',
          company_name: emailInfo ? emailInfo.companyName : 'ForexSolver, Inc.',
          pin: pin,
        }
        ZeroEvent.fire('send::ResendAccountVerificationCode', clientInfo)
        /** End of Mail Send */
      } else if (type == 'mobile') {
        // verification code will be sent to mobile number here
      }
    } catch (codeResendError) {
      console.log(codeResendError)
    }
  }
  /**
   * Email/Phone Confirmation after registration
   * Using Verification Code
   * @param {Object} verifyInfo
   */
  async postConfirmVerification({ request, response, antl }) {
    try {
      console.log(request.all())
      const { email_mobile, code, type } = request.input('verifyInfo')
      const existingEmailVerified = await Account.query()
        .where(function () {
          this.where('email', email_mobile).orWhere('mobile', email_mobile)
        })
        .where('otp_code', code)
        .select(
          'id',
          'name',
          'email',
          'mobile',
          'otp_code',
          'otp_code_time',
          'is_verified'
        )
        .first()
      // checking the verification code and code time
      if (existingEmailVerified) {
        // Updating in database
        existingEmailVerified.is_verified = 1
        existingEmailVerified.otp_code = null
        existingEmailVerified.otp_code_time = null
        await existingEmailVerified.save()
        // Adding this information to two_factor_settings table
        const _2FASettings = new TwoFactorSetting()
        _2FASettings.account_id = existingEmailVerified.id
        _2FASettings.email_mobile = email_mobile
        _2FASettings.is_current = 1 // since this is the first verification. Thats why adding to this table. But 2FA is not activated yet, when activated this will be the current one untill changed
        _2FASettings.is_verified = 1
        _2FASettings.type = type
        await _2FASettings.save()
        // end of adding 2FA settings

        // returning success response
        return response.json({
          CODE: antl.formatMessage('exceptions.code_105'),
          STATUS: antl.formatMessage('exceptions.status_105'),
          TYPE: antl.formatMessage('exceptions.type_105'),
          MESSAGE: antl.formatMessage('exceptions.message_105'),
        })
      } else {
        return response.json({
          CODE: antl.formatMessage('exceptions.code_106'),
          STATUS: antl.formatMessage('exceptions.status_106'),
          TYPE: antl.formatMessage('exceptions.type_106'),
          MESSAGE: antl.formatMessage('exceptions.message_106'),
        })
      }
    } catch (verificationError) {
      console.log(verificationError)
      return response.json({
        CODE: antl.formatMessage('exceptions.code_500'),
        STATUS: antl.formatMessage('exceptions.status_500'),
        TYPE: antl.formatMessage('exceptions.type_500'),
        MESSAGE: antl.formatMessage('exceptions.message_500'),
      })
    }
  }
  /**
   * Function to Login an Account
   * Ingo will be validated from Validator
   * After validation Account will be LoggedIn
   * @param {object} loginInfo
   */
  async postLogin({ request, response, antl, auth, emailInfo }) {
    try {
      console.log(request.all())
      const { email_mobile, password, loginType } = request.input('loginInfo')
      // finding the Account based on the provided loginInfo
      let findAccount = await Account.query()
        .with('countries', (builder) => {
          builder.select('id', 'name')
        })
        .with('states', (builder) => {
          builder.select('id', 'name')
        })
        .with('cities', (builder) => {
          builder.select('id', 'name')
        })
        .where('email', email_mobile)
        .orWhere('mobile', email_mobile)
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
          'password',
          'status',
          'is_verified',
          'country_id',
          'state_id',
          'city_id',
          'is_private'
        )
        .first()
      // console.log(findAccount.toJSON())
      // checking account exists or not
      if (
        findAccount &&
        (await Hash.verify(password, findAccount.toJSON().password))
      ) {
        // checking the status is active or blocked for the client || Two Factor Authentication is activated or not
        if (findAccount.toJSON().is_verified === 0) {
          // Account email and phone is not verified
          return response.json({
            CODE: antl.formatMessage('exceptions.code_103'),
            STATUS: antl.formatMessage('exceptions.status_103'),
            TYPE: antl.formatMessage('exceptions.type_103'),
            MESSAGE: antl.formatMessage('exceptions.message_103'),
          })
        } else if (findAccount.toJSON().status === 0) {
          // Account is blocked
          return response.json({
            CODE: antl.formatMessage('exceptions.code_104'),
            STATUS: antl.formatMessage('exceptions.status_104'),
            TYPE: antl.formatMessage('exceptions.type_104'),
            MESSAGE: antl.formatMessage('exceptions.message_104'),
          })
        } else if (findAccount.toJSON().two_factor_status == 1) {
          // Two Factor Authentication Is Activated
          // random PIN Generation of 6 Digit
          const pin = RandomData('0', 6)
          findAccount.otp_code = pin
          findAccount.otp_code_time = moment().format('YYYY-MM-DD HH:mm:ss')
          await findAccount.save()
          // Sending Verification Code Based on 2FA Settings
          const current2FASettings = await TwoFactorSetting.query()
            .where('account_id', findAccount.id) // loggedIn Account
            .where('is_verified', 1) // only verified
            .where('is_current', 1) // Only Current
            .where('type', loginType) // email/phone
            .select('id', 'account_id', 'email_phone')
            .first()
          // console.log(current2FASettings.toJSON())
          // return current2FASettings
          if (loginType && loginType == 'email') {
            const clientInfo = {
              name: `${findAccount.name}`,
              email: current2FASettings.email_phone,
              from_email: emailInfo
                ? emailInfo.mailFromEmail
                : 'no-reply@forexsolver.com',
              company_name: emailInfo
                ? emailInfo.companyName
                : 'ForexSolver, Inc.',
              pin: pin,
            }
            // Sending Verification Code to Email
            ZeroEvent.fire(
              'twofactorauthentication::SendVerificationCode',
              clientInfo
            )
          } else if (loginType && loginType == 'mobile') {
            // sending verification code to mobile
          }
          // returning response
          return 'Code Send Successfully'
        } else {
          // attempting to login the client
          const client = await auth.withRefreshToken().generate(findAccount)
          // changing the language in the data base for client
          findAccount.language = request.header('accept-language', 'en')
          await findAccount.save()

          findAccount = findAccount.toJSON()
          // removing the password field from the object
          delete findAccount.password

          // returning login successful response
          return response.json({
            CODE: antl.formatMessage('exceptions.code_101'),
            STATUS: antl.formatMessage('exceptions.status_101'),
            TYPE: antl.formatMessage('exceptions.type_101'),
            MESSAGE: antl.formatMessage('exceptions.message_101'),
            data: client,
            user: findAccount,
          })
        }
      } else {
        return 'error'
      }
    } catch (loginError) {
      console.log(loginError)
      if (loginError && loginError.name === 'PasswordMisMatchException') {
        return 'error'
      }
    }
  }
  /**
   * Function to check the Authentication of a Client/Account
   * 2FA Activated
   * @param loginInfo
   */
  async postLoginWith2FA({ auth, request, response, antl }) {
    try {
      console.log(request.all())
      const { code } = request.input('loginInfo')
      // Checking Verification PIN
      if (!code || isNaN(code)) {
        return 'code error'
      }
      // finding the Account based on the provided loginInfo
      let findAccount = await Account.query()
        .with('countries', (builder) => {
          builder.select('id', 'name')
        })
        .with('states', (builder) => {
          builder.select('id', 'name')
        })
        .with('cities', (builder) => {
          builder.select('id', 'name')
        })
        .where('otp_code', code)
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
          'password',
          'status',
          'is_verified',
          'country_id',
          'state_id',
          'city_id',
          'is_private'
        )
        .first()
      // checking account exists or not
      if (findAccount) {
        // checking the status is active or blocked for the client || Two Factor Authentication is activated or not
        // console.log(
        //   moment().subtract('3000', 'seconds').format('YYYY-MM-DD HH:mm:ss'),
        //     findAccount.toJSON().p_code_time
        // )
        if (findAccount.toJSON().status == 0) {
          return response.json({
            CODE: antl.formatMessage('exceptions.code_103'),
            STATUS: antl.formatMessage('exceptions.status_103'),
            TYPE: antl.formatMessage('exceptions.type_103'),
            MESSAGE: antl.formatMessage('exceptions.message_103'),
          })
        } else if (findAccount.toJSON().status == 0) {
          // Account is blocked
          return response.json({
            CODE: antl.formatMessage('exceptions.code_104'),
            STATUS: antl.formatMessage('exceptions.status_104'),
            TYPE: antl.formatMessage('exceptions.type_104'),
            MESSAGE: antl.formatMessage('exceptions.message_104'),
          })
        } else if (
          code == findAccount.toJSON().otp_code &&
          moment().subtract('300', 'seconds').format('YYYY-MM-DD HH:mm:ss') <=
            moment(findAccount.toJSON().otp_code_time).format(
              'YYYY-MM-DD HH:mm:ss'
            )
        ) {
          // attempting to login the client via ID with refresh token generating
          const client = await auth.withRefreshToken().generate(findAccount)

          findAccount.otp_code = null
          findAccount.otp_code_time = null
          await findAccount.save()
          // returning login successful response
          // returning login successful response
          return response.json({
            CODE: antl.formatMessage('exceptions.code_101'),
            STATUS: antl.formatMessage('exceptions.status_101'),
            TYPE: antl.formatMessage('exceptions.type_101'),
            MESSAGE: antl.formatMessage('exceptions.message_101'),
            data: client,
            user: findAccount,
          })
        } else {
          return 'code time error'
        }
      } else {
        return 'code not found error'
      }
    } catch (loginError) {
      // console.log(loginError)
      if (loginError && loginError.name === 'PasswordMisMatchException') {
        return 'server error'
      }
    }
  }
}

module.exports = AuthenticationController
