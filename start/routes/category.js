'use strict'
/**
 ** File Name: category.js
 ** This is the entry point for the Account of the Application. All the required routes related to
 ** account will be defined here.
 ** Namespace: start/routes
 ** Developed By: Devech Ltd.
 ** Company Website: https://www.devech.com
 ** Maintained By: Devech Ltd.
 ** Email: info@devech.com
 ** Skype: team_devech,
 ** License: Devech Ltd.
 **/

/** @type {typeof import('@adonisjs/framework/src/Route/Manager')} */

const Route = use('Route')

/** Getting All Categories */
Route.get('/categories/all', 'CategoryController.getCategories')
/** Add new Category */
Route.post(
  '/category/create',
  'CategoryController.postCreateCategory'
).validator('Category/CreateCategory')
/** Update Category */
Route.post(
  '/category/update',
  'CategoryController.postUpdateCategory'
).validator('Category/CreateCategory')
/** Delete Category */
Route.post('/category/delete', 'CategoryController.postDeleteCategory')
