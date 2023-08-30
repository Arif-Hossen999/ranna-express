'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class AlbumsSchema extends Schema {
  up() {
    this.create('albums', (table) => {
      table.increments()
      table
        .integer('account_id')
        .notNullable()
        .unsigned()
        .references('id')
        .inTable('accounts')
        .onDelete('CASCADE')
        .onUpdate('CASCADE')
      table.string('album_name', 300).notNullable()
      table
        .integer('is_private', 1)
        .default(0)
        .notNullable()
        .comment('0 for Public, 1 for Private')
      table.string('type', 30).nullable().comment('own/favourite')
      table
        .integer('status', 1)
        .default(1)
        .notNullable()
        .comment('0 for Inactive, 1 for Active')
      table.timestamps()
    })
  }

  down() {
    this.drop('albums')
  }
}

module.exports = AlbumsSchema
