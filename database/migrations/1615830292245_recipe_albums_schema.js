'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class RecipeAlbumsSchema extends Schema {
  up() {
    this.create('recipe_albums', (table) => {
      table.increments()
      // table
      //   .integer('account_id')
      //   .notNullable()
      //   .unsigned()
      //   .references('id')
      //   .inTable('accounts')
      //   .onDelete('CASCADE')
      //   .onUpdate('CASCADE')
      table
        .integer('recipe_id')
        .notNullable()
        .unsigned()
        .references('id')
        .inTable('recipes')
        .onDelete('CASCADE')
        .onUpdate('CASCADE')
      table
        .integer('album_id')
        .notNullable()
        .unsigned()
        .references('id')
        .inTable('albums')
        .onDelete('CASCADE')
        .onUpdate('CASCADE')
      // table.string('album_type', 30).nullable().comment('own/favourite')
      table
        .integer('status', 1)
        .default(1)
        .notNullable()
        .comment('0 for Inactive, 1 for Active')
      table.timestamps()
    })
  }

  down() {
    this.drop('recipe_albums')
  }
}

module.exports = RecipeAlbumsSchema
