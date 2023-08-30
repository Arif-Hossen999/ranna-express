'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class CountriesSchema extends Schema {
  up() {
    this.create('countries', (table) => {
      table.increments()
      table.string('name', 200)
      table.string('iso_code', 50)
      table.integer('isd_code')
      table
        .integer('status')
        .notNullable()
        .default(1)
        .comment('0 for inactive, 1 for active')
      table.timestamps()
    })
  }

  down() {
    this.drop('countries')
  }
}

module.exports = CountriesSchema
