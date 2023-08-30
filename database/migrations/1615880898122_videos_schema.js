'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class VideosSchema extends Schema {
  up() {
    this.create('videos', (table) => {
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
      table.text('video_url').notNullable()
      table
        .boolean('is_private')
        .default(0)
        .comment('0 for Public, 1 for Private')
      table
        .string('type', 50)
        .default('recipe_video')
        .comment('recipe_video/profile_story')
      table
        .integer('status', 1)
        .default(1)
        .notNullable()
        .comment('0 for Inactive, 1 for Active')
      table.timestamps()
    })
  }

  down() {
    this.drop('videos')
  }
}

module.exports = VideosSchema
