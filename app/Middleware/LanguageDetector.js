'use strict'
/**
 ** File Name: LanguageDetector.js
 ** This file will automatically set the local/language after every request
 ** Namespace: App/Middleware
 ** Developed By: Devech Ltd.
 ** Company Website: https://www.devech.com
 ** Maintained By: Devech Ltd.
 ** Email: info@devech.com
 ** Skype: team_devech,
 ** License: Devech Ltd.
 **/
/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */

class LanguageDetector {
  /**
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Function} next
   */
  async handle({ request, antl }, next) {
    // console.log(request.headers())
    // console.log(request.header('ip-address', null))
    // switching the language
    antl.switchLocale(request.header('accept-language', 'en'))
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

module.exports = LanguageDetector
