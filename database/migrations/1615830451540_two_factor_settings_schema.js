'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class TwoFactorSettingsSchema extends Schema {
  up() {
    this.create('two_factor_settings', (table) => {
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
        .string('email_mobile', 200)
        .notNullable()
        .unique()
        .comment('email or phone number')
      table.boolean('is_current').default(0).comment('set for 2fa handling')
      table.string('otp_code', 30).nullable()
      table.datetime('otp_code_time').nullable()
      table.boolean('is_verified').default(0).comment('0 for Not, 1 for Yes')
      table.string('type').notNullable().comment('email/mobile')
      table
        .integer('status', 1)
        .default(1)
        .notNullable()
        .comment('0 for Inactive, 1 for Active')
      table.timestamps()
    })
  }

  down() {
    this.drop('two_factor_settings')
  }
}

module.exports = TwoFactorSettingsSchema
