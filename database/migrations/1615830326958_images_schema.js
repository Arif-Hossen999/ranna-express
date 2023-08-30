'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class ImagesSchema extends Schema {
  up() {
    this.create('images', (table) => {
      table.increments()
      table
        .integer('account_id')
        .nullable()
        .unsigned()
        .references('id')
        .inTable('accounts')
        .onDelete('CASCADE')
        .onUpdate('CASCADE')
      table
        .integer('recipe_id')
        .nullable()
        .unsigned()
        .references('id')
        .inTable('recipes')
        .onDelete('CASCADE')
        .onUpdate('CASCADE')
      table.text('image_url').notNullable()
      table
        .boolean('is_private')
        .default(0)
        .comment('0 for Public, 1 for Private')
      table
        .boolean('is_current_pro_pic')
        .default(0)
        .comment('0 for no, 1 for yes')
      table
        .string('type', 50)
        .default('recipe_image')
        .comment('recipe_image/profile_story/profile_picture')
      table
        .integer('status', 1)
        .default(1)
        .notNullable()
        .comment('0 for Inactive, 1 for Active')
      table.timestamps()
    })
  }

  down() {
    this.drop('images')
  }
}

module.exports = ImagesSchema
