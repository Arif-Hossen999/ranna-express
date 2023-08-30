'use strict'
/**
 ** File Name: ExistsProvider.js
 ** Custom Provider for Validating Fields Exists
 ** Namespace: App/Providers/Validations
 ** Developed By: Devech Ltd.
 ** Company Website: https://www.devech.com
 ** Maintained By: Devech Ltd.
 ** Email: info@devech.com
 ** Skype: team_devech,
 ** License: Devech Ltd.
 **/
const { ServiceProvider } = require('@adonisjs/fold')

class ExistsProvider extends ServiceProvider {
  /**
   * Defining the custom rule for validating composite fields as unique key
   * @param {Object} data
   * @param {String} field
   * @param {String} message
   * @param {Array} args
   * @param {Function} get
   */
  async _existsFn(data, field, message, args, get) {
    const Database = use('Database')
    const value = get(data, field)
    if (!value) {
      /**
       * skip validation if value is not defined. `required` rule
       * should take care of it.
       */
      return
    }
    const [table, column] = args
    const row = await Database.table(table).where(column, value).first()
    if (!row) {
      throw message
    }
  }

  /**
   * Attach context getter when all providers have
   * been registered
   *
   * @method boot
   *
   * @return {void}
   */
  boot() {
    const Validator = use('Validator')
    // extending validator
    Validator.extend('exists', this._existsFn, 'Not Found')
  }
}

module.exports = ExistsProvider
