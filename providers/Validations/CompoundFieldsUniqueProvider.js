'use strict'
/**
 ** File Name: CompoundFieldsUniqueProvider.js
 ** Custom Provider for Validating Compound Fields as Unique
 ** Namespace: App/Providers/Validations
 ** Developed By: Devech Ltd.
 ** Company Website: https://www.devech.com
 ** Maintained By: Devech Ltd.
 ** Email: info@devech.com
 ** Skype: team_devech,
 ** License: Devech Ltd.
 **/
const { ServiceProvider } = require('@adonisjs/fold')

class CompoundFieldsUniqueProvider extends ServiceProvider {
  /**
   * Defining the custom rule for validating composite fields as unique key
   * @param {Object} data
   * @param {String} field
   * @param {String} message
   * @param {Array} args
   * @param {Function} get
   */
  async _uniqueFn(data, field, message, args, get) {
    // console.log(data, args)
    // console.log(data[Object.keys(data)])
    // data = {sakil: { key1: 'val1', 'key2':'val2 }}
    // but we need the format data = { key1: 'val1', 'key2':'val2 }
    // so extrating inner level value
    data = data ? data[Object.keys(data)] : []
    const Database = use('Database')
    let ignoreId = null
    let ignoreIdValue = null
    const fields = args[1].split('/')
    const table = args[0]
    if (args[2]) {
      ignoreId = args[2]
      ignoreIdValue = args[3] ? args[3] : null
    }
    // console.log(ignoreId)
    const rows = await Database.table(table)
      .where((builder) => {
        for (const f of fields) {
          let value = get(data, f)
          builder.where(f, '=', value)
        }
        if (ignoreId) {
          builder.whereNot('id', '=', ignoreIdValue)
        }
      })
      .count('* as total')
    // console.log(
    //   await Database.table(table)
    //     .where((builder) => {
    //       for (const f of fields) {
    //         let value = get(data, f)
    //         builder.where(f, '=', value)
    //       }
    //       if (ignoreId) {
    //         builder.whereNot('id', '=', ignoreIdValue)
    //       }
    //     })
    //     .toString()
    // )
    // console.log(rows)
    if (rows[0].total) {
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
    Validator.extend('uniqueCompoundFields', this._uniqueFn, 'Must be unique')
  }
}

module.exports = CompoundFieldsUniqueProvider
