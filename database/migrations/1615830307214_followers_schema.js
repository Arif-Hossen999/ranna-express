'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class FollowersSchema extends Schema {
  up() {
    this.create('followers', (table) => {
      table.increments()
      table
        .integer('following_id')
        .notNullable()
        .unsigned()
        .references('id')
        .inTable('accounts')
        .onDelete('CASCADE')
        .onUpdate('CASCADE')
      table
        .integer('follower_id')
        .notNullable()
        .unsigned()
        .references('id')
        .inTable('accounts')
        .onDelete('CASCADE')
        .onUpdate('CASCADE')
      table
        .integer('status', 1)
        .default(1)
        .notNullable()
        .comment('0 for Inactive, 1 for Active')
      table.timestamps()
    })
  }

  down() {
    this.drop('followers')
  }
}

module.exports = FollowersSchema
