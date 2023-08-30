'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class ReportCategoriesSchema extends Schema {
  up() {
    this.create('report_categories', (table) => {
      table.increments()
      table.string('category_name', 300).notNullable()
      table
        .integer('status', 1)
        .default(1)
        .notNullable()
        .comment('0 for Inactive, 1 for Active')
      table.timestamps()
    })
  }

  down() {
    this.drop('report_categories')
  }
}

module.exports = ReportCategoriesSchema
