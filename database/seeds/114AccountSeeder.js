'use strict'

/*
|--------------------------------------------------------------------------
| AccountSeeder
|--------------------------------------------------------------------------
|
| Make use of the Factory instance to seed database with dummy data or
| make use of Lucid models directly.
|
*/

/** @type {import('@adonisjs/lucid/src/Factory')} */
const Factory = use('Factory')
const Account = use('App/Models/Account')
const Database = use('Database')
const Hash = use('Hash')
class AccountSeeder {
  async run() {
    const accs = [
      {
        name: 'Devech Ltd.',
        username: 'devech',
        dob: '1992-08-12',
        email: 'devech@gmail.com',
        password: await Hash.make('asdf123'),
        status: 1,
      },
    ]

    await Database.raw('SET FOREIGN_KEY_CHECKS=0;')
    await Database.truncate('accounts')
    await Database.raw('SET FOREIGN_KEY_CHECKS=1;')
    const accounts = await Account.createMany(accs)
  }
}

module.exports = AccountSeeder
