'use strict'
/**
 ** File Name: ApplicationEmail.js
 ** This file will get all the emails for application from broker_emails table and will share with everyone
 ** Namespace: App/Middleware
 ** Developed By: Devech Ltd.
 ** Company Website: https://www.devech.com
 ** Maintained By: Devech Ltd.
 ** Email: info@devech.com
 ** Skype: team_devech,
 ** License: MIT
 **/
/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */

/** Helpers */
const Env = use('Env')
class ApplicationEmail {
  /**
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Function} next
   */
  async handle(ctx, next) {
    try {
      // COMPANY INFORMATION FOR EMAIL TEMPLATES
      const emailInfo = {
        companyName: Env.get('COMPANY_NAME')
          ? Env.get('COMPANY_NAME')
          : 'Devech Ltd.',
        companyWebsite: Env.get('COMPANY_WEBSITE')
          ? Env.get('COMPANY_WEBSITE')
          : 'http://www.devech.com',
        companyAddress: Env.get('COMPANY_ADDRESS')
          ? Env.get('COMPANY_ADDRESS')
          : 'House#007, Road#09, Section#06, Mirpur, Dhaka-1216, Bangladesh',
        salesSupport: Env.get('SALES_SUPPORT')
          ? Env.get('SALES_SUPPORT')
          : '+1234567890',
        commonEmail: Env.get('COMMON_EMAIL')
          ? Env.get('COMMON_EMAIL')
          : 'support@devech.com',
        mailFromEmail: Env.get('MAIL_FROM_EMAIL')
          ? Env.get('MAIL_FROM_EMAIL')
          : 'info@devech.com',
      }
      ctx.emailInfo = emailInfo
    } catch (emailError) {
      console.log(emailError)
    }
    await next()
  }

  /**
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Function} next
   */
  async wsHandle({ request }, next) {
    // call next to advance the request
    await next()
  }
}

module.exports = ApplicationEmail
