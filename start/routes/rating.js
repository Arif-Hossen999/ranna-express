'use strict'
/**
 ** File Name: rating.js
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

/** Getting All Ratings */
Route.get('/ratings/all', 'RatingController.getRatings')
/** Add New Rating */
Route.post('/rating/create', 'RatingController.postCreateRating').validator('Rating/CreateRating')
/** Update Rating */
Route.post('/rating/update', 'RatingController.postUpdateRating').validator('Rating/CreateRating')
/** Add Rating Comment Reply*/
Route.post('/rating/reply/comment', 'RatingController.postCreateReplyRatingComment').validator('Rating/CreateRatingReplyComment')
/** Update Rating Comment Reply*/
Route.post('/rating/reply/comment/update', 'RatingController.postUpdateRatingReplyComment').validator('Rating/CreateRatingReplyComment')
