'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class CategoriesSchema extends Schema {
  up() {
    this.create('categories', (table) => {
      table.increments()
      table.string('category_name', 255).notNullable().unique()
      table
        .integer('parent_id')
        .nullable()
        .unsigned()
        .default(null)
        .references('id')
        .inTable('categories')
        .onDelete('RESTRICT')
        .onUpdate('RESTRICT')
      table
        .integer('status', 1)
        .default(1)
        .notNullable()
        .comment('0 for Inactive, 1 for Active')
      table.timestamps()
    })
  }

  down() {
    this.drop('categories')
  }
}

module.exports = CategoriesSchema
