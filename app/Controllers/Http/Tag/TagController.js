'use strict'
/**
 ** File Name: TagController.js
 ** Handling all types of request/tasks related to Tag Section
 ** Namespace: App/Controllers/Http/Tag
 ** Developed By: Devech Ltd.
 ** Company Website: https://www.devech.com
 ** Maintained By: Devech Ltd.
 ** Email: info@devech.com
 ** Skype: team_devech,
 ** License: Devech Ltd.
 **/
/** Models */
const Tag = use('App/Models/Tag')
const Recipe = use('App/Models/Recipe')
const TagRecipe = use('App/Models/TagRecipe')
/** Modules Section */
/** Services */
const EServices = use('App/Services/ExceptionsServices')
const ExceptionsServices = new EServices()
/** Exceptions */
class TagController {
  /**
   * Getting All Tags
   * @params null
   */
  async getTags({ auth, request, response, antl }) {
    try {
      // Fetching all the tags
      const tags = await Tag.query()
        .where('status', 1) // Only Approved
        .select('id', 'name', 'created_at', 'status')
        .fetch()
      return tags
    } catch (getTagError) {
      console.log(getTagError)
    }
  }

  /**
   * Creating a new Tag
   * @params {object} tagInfo
   */
  async postCreateTag({ auth, request, response, antl }) {
    try {
      // console.log(request.all())
      // Getting the tagInfo
      const { name } = request.input('tagInfo')
      // Adding New Tag
      const tag = new Tag()
      tag.name = name
      tag.status = 1
      await tag.save()
      // returning success response
      return response.json({
        CODE: antl.formatMessage('exceptions.code_200'),
        STATUS: antl.formatMessage('exceptions.status_200'),
        TYPE: antl.formatMessage('exceptions.type_200'),
        MESSAGE: antl.formatMessage('exceptions.message_200', {
          resourceName: antl.formatMessage('keys.tag'),
        }),
        DATA: tag,
      })
    } catch (createTagError) {
      console.log(createTagError)
      // returning error response
      return response.json({
        CODE: antl.formatMessage('exceptions.code_201'),
        STATUS: antl.formatMessage('exceptions.status_201'),
        TYPE: antl.formatMessage('exceptions.type_201'),
        MESSAGE: antl.formatMessage('exceptions.message_201', {
          resourceName: antl.formatMessage('keys.tag'),
        }),
      })
    }
  }
  /**
   * Update Tag
   * @param {object} tagInfo
   */
  async postUpdateTag({ auth, request, response, antl }) {
    try {
      // console.log(request.all());
      // Getting the tagInfo
      const { id, name } = request.input('tagInfo')
      // finging the tag
      const findTag = await Tag.query()
        .where('id', id)
        .select('id', 'name')
        .first()
      // checking the tag is exist or not
      if (!findTag) {
        return response.json({
          CODE: antl.formatMessage('exceptions.code_405'),
          STATUS: antl.formatMessage('exceptions.status_405'),
          TYPE: antl.formatMessage('exceptions.type_405'),
          MESSAGE: antl.formatMessage('exceptions.message_405', {
            resourceName: antl.formatMessage('keys.tagName'),
          }),
        })
      }
      // Updating tag
      findTag.name = name
      await findTag.save()
      // returning success response
      return response.json({
        CODE: antl.formatMessage('exceptions.code_202'),
        STATUS: antl.formatMessage('exceptions.status_202'),
        TYPE: antl.formatMessage('exceptions.type_202'),
        MESSAGE: antl.formatMessage('exceptions.message_202', {
          resourceName: antl.formatMessage('keys.tagName'),
        }),
      })
    } catch (updateTagError) {
      console.log(updateTagError)
      // returning error response
      return response.json({
        CODE: antl.formatMessage('exceptions.code_203'),
        STATUS: antl.formatMessage('exceptions.status_203'),
        TYPE: antl.formatMessage('exceptions.type_203'),
        MESSAGE: antl.formatMessage('exceptions.message_203', {
          resourceName: antl.formatMessage('keys.tagName'),
        }),
      })
    }
  }
  /**
   * Instead of Deleting from Table, we just change the Status of the tag
   * @param {Integer} id
   */
  async postDeleteTag({ auth, request, response, antl }) {
    try {
      // console.log(request.all());
      // Getting the id for destroy tag
      const { id } = request.all()
      // finding the tag
      const findTag = await Tag.query()
        .where('id', id)
        .select('id', 'status')
        .first()
      // checking the tag is exist or not
      if (!findTag) {
        return response.json({
          CODE: antl.formatMessage('exceptions.code_405'),
          STATUS: antl.formatMessage('exceptions.status_405'),
          TYPE: antl.formatMessage('exceptions.type_405'),
          MESSAGE: antl.formatMessage('exceptions.message_405', {
            resourceName: antl.formatMessage('keys.tagName'),
          }),
        })
      }
      // changing the status
      findTag.status = 0 // 0 means inactive
      await findTag.save()
      // returning success response
      return response.json({
        CODE: antl.formatMessage('exceptions.code_204'),
        STATUS: antl.formatMessage('exceptions.status_204'),
        TYPE: antl.formatMessage('exceptions.type_204'),
        MESSAGE: antl.formatMessage('exceptions.message_204', {
          resourceName: antl.formatMessage('keys.tag'),
        }),
      })
    } catch (deleteTagError) {
      console.log(deleteTagError)
      // returning error response
      return response.json({
        CODE: antl.formatMessage('exceptions.code_205'),
        STATUS: antl.formatMessage('exceptions.status_205'),
        TYPE: antl.formatMessage('exceptions.type_205'),
        MESSAGE: antl.formatMessage('exceptions.message_205', {
          resourceName: antl.formatMessage('keys.tag'),
        }),
      })
    }
  }
  /**
   * Getting All Tags with Recipes
   * @params null
   */
  async getRecipesWithTags({ auth, request, response, antl }) {
    const account = await auth.getUser()
    try {
      // Fetching all the albums
      const recipeTags = await Recipe.query()
        .with('recipetags', (builder) => {
          builder.select('id', 'tag_id', 'recipe_id')
        })
        .where('account_id', account.id)
        .where('status', 1)
        .select(
          'id',
          'account_id',
          'title',
          'is_private',
          'status',
          'created_at',
          'updated_at'
        )
        .fetch()
      return recipeTags
    } catch (tagRecipeError) {
      console.log(tagRecipeError)
    }
  }
  /**
   * Adding Tag With Recipe
   * @param {Object} tagRecipeInfo
   */
  async postAddTagToRecipe({ auth, request, response, antl }) {
    const account = await auth.getUser()
    try {
      console.log(request.all())
      // Getting the tagRecipeInfo
      const { tag_id, recipe_id } = request.input('tagRecipeInfo')
      // Adding Tag with Recipe
      const tagRecipe = new TagRecipe()
      tagRecipe.tag_id = tag_id
      tagRecipe.recipe_id = recipe_id
      tagRecipe.status = 1 // Active
      await tagRecipe.save()
      // returning success response
      return ExceptionsServices.resourceAddSuccessful(
        antl.currentLocale(),
        'tag',
        tagRecipe
      )
    } catch (createAlbumError) {
      console.log(createAlbumError)
      // returning error response
      return ExceptionsServices.resourceAddFailed(antl.currentLocale(), 'tag')
    }
  }
  /**
   * Deleting Recipe from An Album
   * @param {Object} tagRecipeInfo
   */
  async postDeleteTagFromRecipe({ request, response, antl, auth }) {
    const account = await auth.getUser()
    try {
      console.log(request.all())
      // Getting the id for destroy Tag Recipe
      const { tag_id, recipe_id } = request.input('tagRecipeInfo')
      // finding the Recipe Album
      const findTagRecipe = await TagRecipe.query()
        .where('tag_id', tag_id)
        .where('recipe_id', recipe_id)
        .select('id')
        .first()
      // checking the Album is exist or not
      if (!findTagRecipe) {
        return ExceptionsServices.resourceMissing(antl.currentLocale(), 'tag')
      }
      // Deleting TagRecipe
      await findTagRecipe.delete()
      // returning success response
      return ExceptionsServices.resourceDeleteSuccessful(
        antl.currentLocale(),
        'tag'
      )
    } catch (deleteTagError) {
      console.log(deleteTagError)
      // returning error response
      return ExceptionsServices.resourceDeleteFailed(
        antl.currentLocale(),
        'tag'
      )
    }
  }
}

module.exports = TagController
