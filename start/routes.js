'use strict'

/**
 ** File Name: routes.js
 ** This is the entry point for the Application. All the required routes will be defined here.
 ** You can create a route file under start/routes directory and include that here if you need.
 ** Namespace: start/
 ** Developed By: Devech Ltd.
 ** Company Website: https://www.devech.com
 ** Maintained By: Devech Ltd.
 ** Email: info@devech.com
 ** Skype: team_devech,
 ** License: Devech Ltd.
 **/

/** @type {typeof import('@adonisjs/framework/src/Route/Manager')} */
const Route = use('Route')

Route.group(() => {
  // AUTHENTICATION ROUTES
  require('./routes/authentication')
})
  .prefix('api/v1')
  .namespace('Auth')
  .middleware(['LanguageDetector'])

Route.group(() => {
  // CATEGORIES ROUTES
  require('./routes/category')
})
  .prefix('api/v1')
  .namespace('Category')
  .middleware(['auth:jwt', 'LanguageDetector'])

Route.group(() => {
  // PROFILE ROUTES
  require('./routes/profile')
})
  .prefix('api/v1')
  .namespace('Profile')
  .middleware(['auth:jwt', 'LanguageDetector'])

Route.group(() => {
  // TAGS ROUTES
  require('./routes/tag')
})
  .prefix('api/v1')
  .namespace('Tag')
  .middleware(['auth:jwt', 'LanguageDetector'])

Route.group(() => {
  // SOCIAL_PLATFORM ROUTES
  require('./routes/socialplatform')
})
  .prefix('api/v1')
  .namespace('SocialPlatform')
  .middleware(['auth:jwt', 'LanguageDetector'])

Route.group(() => {
  // COMMENT ROUTES
  require('./routes/comment')
})
  .prefix('api/v1')
  .namespace('Comment')
  .middleware(['auth:jwt', 'LanguageDetector'])

Route.group(() => {
  // FOLLOWER ROUTES
  require('./routes/follower')
})
  .prefix('api/v1')
  .namespace('Follower')
  .middleware(['auth:jwt', 'LanguageDetector'])

Route.group(() => {
  // LIKE ROUTES
  require('./routes/like')
})
  .prefix('api/v1')
  .namespace('Like')
  .middleware(['auth:jwt', 'LanguageDetector'])

Route.group(() => {
  // SHARE ROUTES
  require('./routes/share')
})
  .prefix('api/v1')
  .namespace('Share')
  .middleware(['auth:jwt', 'LanguageDetector'])

Route.group(() => {
  // VIEW ROUTES
  require('./routes/view')
})
  .prefix('api/v1')
  .namespace('View')
  .middleware(['auth:jwt', 'LanguageDetector'])

Route.group(() => {
  // VIEW ROUTES
  require('./routes/rating')
})
  .prefix('api/v1')
  .namespace('Rating')
  .middleware(['LanguageDetector'])
  .middleware(['auth:jwt', 'LanguageDetector'])

Route.group(() => {
  // ALBUM ROUTES
  require('./routes/album')
})
  .prefix('api/v1')
  .namespace('Album')
  .middleware(['auth:jwt', 'LanguageDetector'])

Route.group(() => {
  // ALBUM-RECIPES ROUTES
  require('./routes/albumRecipe')
})
  .prefix('api/v1')
  .namespace('Album')
  .middleware(['auth:jwt', 'LanguageDetector'])

Route.group(() => {
  // TAG-RECIPES ROUTES
  require('./routes/tagRecipe')
})
  .prefix('api/v1')
  .namespace('Tag')
  .middleware(['auth:jwt', 'LanguageDetector'])

Route.group(() => {
  // RECIPE ROUTES
  require('./routes/recipe')
})
  .prefix('api/v1')
  .namespace('Recipe')
  .middleware(['auth:jwt', 'LanguageDetector'])

Route.group(() => {
  // RECIPE IMAGE ROUTES
  require('./routes/recipeimage')
})
  .prefix('api/v1')
  .namespace('Image')
  .middleware(['auth:jwt', 'LanguageDetector'])

Route.group(() => {
  // VIDEO ROUTES
  require('./routes/video')
})
  .prefix('api/v1')
  .namespace('Video')
  .middleware(['auth:jwt', 'LanguageDetector'])

Route.group(() => {
  // BLOCK ROUTES
  require('./routes/block')
})
  .prefix('api/v1')
  .namespace('Block')
  .middleware(['auth:jwt', 'LanguageDetector'])

Route.group(() => {
  // REPORT CATEGORY ROUTES
  require('./routes/reportCategory')
})
  .prefix('api/v1')
  .namespace('ReportCategory')
  .middleware(['auth:jwt', 'LanguageDetector'])

Route.group(() => {
  // REPORT ROUTES
  require('./routes/report')
})
  .prefix('api/v1')
  .namespace('Report')
  .middleware(['auth:jwt', 'LanguageDetector'])
