'use strict'
/**
 ** File Name: RecipeController.js
 ** Handling all types of request/tasks related to Recipe Section
 ** Namespace: App/Controllers/Http/Recipe
 ** Developed By: Devech Ltd.
 ** Company Website: https://www.devech.com
 ** Maintained By: Devech Ltd.
 ** Email: info@devech.com
 ** Skype: team_devech,
 ** License: Devech Ltd.
 **/
/** Models */
const Recipe = use('App/Models/Recipe')
/** Modules Sections */
/** Services */
const EServices = use('App/Services/ExceptionsServices')
const ExceptionsServices = new EServices()
/** Exceptions */
class RecipeController {
  /**
   * Getting All Recipes
   * @params null
   */
  async getRecipes({ auth, request, response, antl }) {
    try {
      // Fetching all the recipes
      const recipes = await Recipe.query()
        .where('status', 1)
        .select(
          'id',
          'category_id',
          'account_id',
          'title',
          'short_description',
          'materials',
          'procedure',
          'is_private',
          'is_comment_off',
          'ratings',
          'likes',
          'shares',
          'comments',
          'views',
          'created_at',
          'status'
        )
        .fetch()
      return recipes
    } catch (getRecipesError) {
      console.log(getRecipesError)
    }
  }
  /**
   * Creating a New Recipe
   * @param {Object} recipeInfo
   */
  async postCreateRecipe({ auth, request, response, antl }) {
    const account = await auth.getUser()
    try {
      //   console.log(request.all())
      // Getting the recipeInfo
      const {
        category_id,
        title,
        short_description,
        materials,
        procedure,
        is_private,
        is_comment_off,
      } = request.input('recipeInfo')
      // Adding New Recipe
      const recipe = new Recipe()
      recipe.category_id = category_id
      recipe.account_id = account.id
      recipe.title = title
      recipe.short_description = short_description
      recipe.materials = materials
      recipe.procedure = procedure
      recipe.is_private = is_private
      recipe.is_comment_off = is_comment_off
      recipe.status = 1 // Active
      await recipe.save()
      // returning success response
      return ExceptionsServices.resourceAddSuccessful(
        antl.currentLocale(),
        'recipe',
        recipe
      )
    } catch (createRecipeError) {
      console.log(createRecipeError)
      // returning error response
      return ExceptionsServices.resourceAddFailed(
        antl.currentLocale(),
        'recipe'
      )
    }
  }
  /**
   * Update Recipe
   * @param {Object} recipeInfo
   */
  async postUpdateRecipe({ request, response, antl }) {
    try {
    //   console.log(request.all())
      // Getting the recipeInfo
      const {
        id,
        title,
        short_description,
        materials,
        procedure,
        is_private,
        is_comment_off,
      } = request.input('recipeInfo')
      // finding the recipe
      const findRecipe = await Recipe.query()
        .where('id', id)
        .select(
          'id',
          'title',
          'short_description',
          'materials',
          'procedure',
          'is_private',
          'is_comment_off'
        )
        .first()
      // checking the recipe is exist or not
      if (!findRecipe) {
        return ExceptionsServices.resourceMissing(
          antl.currentLocale(),
          'recipe'
        )
      }
      // Updating recipe
      findRecipe.title = title
      findRecipe.short_description = short_description
      findRecipe.materials = materials
      findRecipe.procedure = procedure
      findRecipe.is_private = is_private
      findRecipe.is_comment_off = is_comment_off
      await findRecipe.save()
      // returning success response
      return ExceptionsServices.resourceUpdateSuccessful(
        antl.currentLocale(),
        'recipe'
      )//
    } catch (updateRecipeError) {
      console.log(updateRecipeError)
      // returning error response
      return ExceptionsServices.resourceUpdateFailed(
        antl.currentLocale(),
        'recipe'
      )
    }
  }
  /**
   * Instead of Deleting from Table, we just change the Status of the recipe
   * @param {Integer} id
   */
   async postDeleteRecipe({ request, response, antl }) {
    try {
    //   console.log(request.all())
      // Getting the id for destroy recipe
      const { id } = request.all()
      // finding the recipe
      const findRecipe = await Recipe.query()
        .where('id', id)
        .select('id', 'status')
        .first()
      // checking the recipe is exist or not
      if (!findRecipe) {
        return ExceptionsServices.resourceMissing(
          antl.currentLocale(),
          'recipe'
        )
      }
      // changing the status
      findRecipe.status = 0 // 0 means inactive
      await findRecipe.save()
      // returning success response
      return ExceptionsServices.resourceDeleteSuccessful(
        antl.currentLocale(),
        'recipe'
      )
    } catch (deleteRecipeError) {
      console.log(deleteRecipeError)
      // returning error response
      return ExceptionsServices.resourceDeleteFailed(
        antl.currentLocale(),
        'recipe'
      )
    }
  }
}

module.exports = RecipeController
