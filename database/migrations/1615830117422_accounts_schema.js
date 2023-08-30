'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class AccountsSchema extends Schema {
  up() {
    this.create('accounts', (table) => {
      table.increments()
      table.string('name', 300).notNullable()
      table.string('username', 300).nullable()
      table.string('email', 300).nullable().unique()
      table.string('password', 300).notNullable()
      table.string('token', 255).nullable()
      table.string('mobile', 50).nullable().unique()
      table.string('address', 300).nullable()
      table.date('dob').nullable()
      table.string('otp_code', 30).nullable()
      table.datetime('otp_code_time').nullable()
      table
        .integer('country_id')
        .nullable()
        .unsigned()
        .references('id')
        .inTable('countries')
        .onDelete('SET NULL')
        .onUpdate('SET NULL')
      table
        .integer('state_id')
        .nullable()
        .unsigned()
        .references('id')
        .inTable('states')
        .onDelete('SET NULL')
        .onUpdate('SET NULL')
      table
        .integer('city_id')
        .nullable()
        .unsigned()
        .references('id')
        .inTable('cities')
        .onDelete('SET NULL')
        .onUpdate('SET NULL')
      table
        .boolean('is_verified')
        .default(0)
        .comment('Either Email or Phone Verified')
      table.string('religion', 50).nullable()
      table
        .string('language', 10)
        .nullable()
        .comment('Language Code, i.e en,zh..')
      table.string('gender', 10).nullable()
      table.boolean('two_factor_status').default(0)
      table
        .boolean('is_private')
        .default(0)
        .comment('0 for Public, 1 for Private')
      table.integer('followers', 10).default(0).comment('Total Followers')
      table.integer('followings', 10).default(0).comment('Total Followings')
      table
        .integer('status', 1)
        .default(1)
        .notNullable()
        .comment('0 for Inactive, 1 for Active')
      table.timestamps()
    })
  }

  down() {
    this.drop('accounts')
  }
}

module.exports = AccountsSchema
