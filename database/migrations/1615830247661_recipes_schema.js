'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class RecipesSchema extends Schema {
  up() {
    this.create('recipes', (table) => {
      table.increments()
      table
        .integer('category_id')
        .notNullable()
        .unsigned()
        .references('id')
        .inTable('categories')
        .onDelete('RESTRICT')
        .onUpdate('RESTRICT')
      table
        .integer('account_id')
        .notNullable()
        .unsigned()
        .references('id')
        .inTable('accounts')
        .onDelete('CASCADE')
        .onUpdate('CASCADE')
      table.string('title', 500).notNullable()
      table.text('short_description').notNullable()
      table.text('materials').notNullable()
      table.text('procedure').notNullable()
      table
        .boolean('is_private')
        .default(0)
        .comment('0 for Public, 1 for Private')
      table
        .boolean('is_comment_off')
        .default(0)
        .comment('0 for Comment Allowed, 1 for Comment Restrict')
      table.float('ratings').default(0).comment('Total Ratings till now')
      table
        .integer('likes')
        .default(0)
        .comment('Total Number of Likes till now')
      table
        .integer('shares')
        .default(0)
        .comment('Total Number of Shares till now')
      table
        .integer('comments')
        .default(0)
        .comment('Total Number of Comments till now')
      table
        .integer('views')
        .default(0)
        .comment('Total Number of Views till now')
      table
        .integer('status', 1)
        .default(1)
        .notNullable()
        .comment('0 for Inactive, 1 for Active')
      table.timestamps()
    })
  }

  down() {
    this.drop('recipes')
  }
}

module.exports = RecipesSchema
