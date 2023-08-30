'use strict'
/**
 ** File Name: reportCategory.js
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

/** Getting All Report Categories */
Route.get('/report/categories/all', 'ReportCategoryController.getReportCategorys')
/** Add New Report Category */
Route.post('/report/category/create', 'ReportCategoryController.postCreateReportCategory').validator('ReportCategory/CreateReportCategory')
/** Update Report Category */
Route.post('/report/category/update', 'ReportCategoryController.postUpdateReportCategory').validator('ReportCategory/CreateReportCategory')
/** Delete Report Category*/
Route.post('/report/category/delete', 'ReportCategoryController.postDeleteReportCategory')
