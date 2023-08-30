'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class StatesSchema extends Schema {
  up() {
    this.create('states', (table) => {
      table.increments()
      table.string('name', 200)
      table
        .integer('country_id')
        .notNullable()
        .unsigned()
        .references('id')
        .inTable('countries')
        .onDelete('RESTRICT')
        .onUpdate('RESTRICT')
      table
        .integer('status')
        .notNullable()
        .default(1)
        .comment('0 for inactive, 1 for active')
      table.timestamps()
    })
  }

  down() {
    this.drop('states')
  }
}

module.exports = StatesSchema
