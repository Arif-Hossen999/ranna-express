'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class CitiesSchema extends Schema {
  up() {
    this.create('cities', (table) => {
      table.increments()
      table.string('name', 200)
      table
        .integer('state_id')
        .notNullable()
        .unsigned()
        .references('id')
        .inTable('states')
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
    this.drop('cities')
  }
}

module.exports = CitiesSchema
