'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class AccountSocialPlatformsSchema extends Schema {
  up() {
    this.create('account_social_platforms', (table) => {
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
        .integer('social_platform_id')
        .notNullable()
        .unsigned()
        .references('id')
        .inTable('social_platforms')
        .onDelete('CASCADE')
        .onUpdate('CASCADE')
      table.string('social_network_link', 500).notNullable()
      table
        .integer('status', 1)
        .default(1)
        .notNullable()
        .comment('0 for Inactive, 1 for Active')
      table.timestamps()
    })
  }

  down() {
    this.drop('account_social_platforms')
  }
}

module.exports = AccountSocialPlatformsSchema
