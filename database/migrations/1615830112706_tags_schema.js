'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class TagsSchema extends Schema {
  up() {
    this.create('tags', (table) => {
      table.increments()
      table.string('name', 300).notNullable().unique()
      table
        .integer('status', 1)
        .default(1)
        .notNullable()
        .comment('0 for Inactive, 1 for Active')
      table.timestamps()
    })
  }

  down() {
    this.drop('tags')
  }
}

module.exports = TagsSchema
