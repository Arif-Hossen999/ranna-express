'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class TagRecipesSchema extends Schema {
  up() {
    this.create('tag_recipes', (table) => {
      table.increments()
      table
        .integer('recipe_id')
        .notNullable()
        .unsigned()
        .references('id')
        .inTable('recipes')
        .onDelete('CASCADE')
        .onUpdate('CASCADE')
      table
        .integer('tag_id')
        .nullable()
        .unsigned()
        .references('id')
        .inTable('tags')
        .onDelete('SET NULL')
        .onUpdate('SET NULL')
      table
        .integer('status', 1)
        .default(1)
        .notNullable()
        .comment('0 for Inactive, 1 for Active')
      table.timestamps()
    })
  }

  down() {
    this.drop('tag_recipes')
  }
}

module.exports = TagRecipesSchema
