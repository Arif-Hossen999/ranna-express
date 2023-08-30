'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class LikesSchema extends Schema {
  up() {
    this.create('likes', (table) => {
      table.increments()
      table
        .integer('account_id')
        .notNullable()
        .unsigned()
        .references('id')
        .inTable('accounts')
        .onDelete('CASCADE')
        .onUpdate('CASCADE')
      table
        .integer('recipe_id')
        .notNullable()
        .unsigned()
        .references('id')
        .inTable('recipes')
        .onDelete('CASCADE')
        .onUpdate('CASCADE')
      table
        .string('like_type', 30)
        .default('like')
        .comment('like/love/wow/haha/yummy/angry..')
      table
        .integer('status', 1)
        .default(1)
        .notNullable()
        .comment('0 for Inactive, 1 for Active')
      table.timestamps()
    })
  }

  down() {
    this.drop('likes')
  }
}

module.exports = LikesSchema
