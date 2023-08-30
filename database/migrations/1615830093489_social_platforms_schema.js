'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class SocialPlatformsSchema extends Schema {
  up() {
    this.create('social_platforms', (table) => {
      table.increments()
      table.string('name', 255).notNullable()
      table.string('pretty_name', 300).notNullable()
      table.string('logo_url', 300).nullable()
      table
        .integer('status', 1)
        .default(1)
        .notNullable()
        .comment('0 for Inactive, 1 for Active')
      table.timestamps()
    })
  }

  down() {
    this.drop('social_platforms')
  }
}

module.exports = SocialPlatformsSchema
