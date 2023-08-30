'use strict'

/*
|--------------------------------------------------------------------------
| RecipeSeeder
|--------------------------------------------------------------------------
|
| Make use of the Factory instance to seed database with dummy data or
| make use of Lucid models directly.
|
*/

/** @type {import('@adonisjs/lucid/src/Factory')} */
const Factory = use('Factory')
const Recipe = use('App/Models/Recipe')
const Database = use('Database')

class RecipeSeeder {
  async run() {
    const recipes = [
      {
        category_id: 1,
        account_id: 1,
        title: 'My First Recipe',
        short_description:
          'Ullamco in duis proident excepteur ex mollit voluptate sunt occaecat. Minim deserunt incididunt occaecat consequat deserunt anim pariatur proident mollit reprehenderit aliquip ad magna. Enim et sit fugiat sit.',
        materials:
          'Irure in sit minim dolore excepteur irure anim elit proident proident magna. Ipsum ipsum elit commodo deserunt eu. Aute laboris irure fugiat duis duis ex culpa ipsum sit ut consequat. Consectetur nisi laborum officia excepteur officia ut ullamco ipsum. Enim nisi tempor pariatur occaecat fugiat enim eu. Ea dolor nisi cillum nisi veniam tempor incididunt.',
        procedure: `Occaecat nisi duis non adipisicing velit laboris eiusmod velit voluptate quis occaecat. Enim anim culpa duis excepteur consectetur adipisicing do est Lorem nulla pariatur ipsum. Ut incididunt voluptate labore Lorem. Anim est culpa dolor laborum ea deserunt id ullamco dolor exercitation. Consequat pariatur eiusmod occaecat laboris ipsum adipisicing non commodo magna laborum qui amet excepteur magna. Commodo culpa pariatur exercitation duis sint culpa non cillum. Et quis ad id officia duis qui.
        Sint in consectetur cupidatat ut.Deserunt duis sunt minim esse ex deserunt excepteur laboris.Nulla consectetur occaecat consectetur nulla ex.
        Nulla cillum officia nulla duis minim quis irure. Incididunt dolore duis aute laborum consequat dolor sunt. Est deserunt magna ut nulla aute incididunt mollit aute id fugiat proident magna est. Occaecat do velit ad nulla veniam enim magna elit.
        Deserunt eiusmod magna ex esse irure. Reprehenderit consectetur excepteur minim sint occaecat adipisicing proident. Deserunt duis deserunt eiusmod laborum in. Exercitation elit mollit magna ipsum velit incididunt nostrud officia culpa.`,
        status: 1,
      },
    ]
    await Database.raw('SET FOREIGN_KEY_CHECKS=0;')
    await Database.truncate('recipes')
    await Database.raw('SET FOREIGN_KEY_CHECKS=1;')
    await Recipe.createMany(recipes)
  }
}

module.exports = RecipeSeeder
