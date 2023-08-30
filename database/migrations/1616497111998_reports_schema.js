'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class ReportsSchema extends Schema {
  up() {
    this.create('reports', (table) => {
      table.increments()
      table
        .integer('reporter_id')
        .notNullable()
        .unsigned()
        .references('id')
        .inTable('accounts')
        .onDelete('CASCADE')
        .onUpdate('CASCADE')
        .comment('Who reported')
      table
        .integer('reportee_id')
        .notNullable()
        .unsigned()
        .references('id')
        .inTable('accounts')
        .onDelete('CASCADE')
        .onUpdate('CASCADE')
        .comment('Against whom reported')
      table
        .integer('report_category_id')
        .notNullable()
        .unsigned()
        .references('id')
        .inTable('report_categories')
        .onDelete('CASCADE')
        .onUpdate('CASCADE')
      table.text('comment').nullable()
      table
        .integer('status', 1)
        .default(1)
        .notNullable()
        .comment('0 for Inactive, 1 for Active')
      table.timestamps()
    })
  }

  down() {
    this.drop('reports')
  }
}

module.exports = ReportsSchema
