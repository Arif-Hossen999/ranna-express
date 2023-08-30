'use strict'
/**
 ** File Name: CategoryController.js
 ** Handling all types of request/tasks related to Category Section
 ** Namespace: App/Controllers/Http/Category
 ** Developed By: Devech Ltd.
 ** Company Website: https://www.devech.com
 ** Maintained By: Devech Ltd.
 ** Email: info@devech.com
 ** Skype: team_devech,
 ** License: Devech Ltd.
 **/
/** Models */
const Category = use('App/Models/Category')
/** Modules Sections */
/** Services */
const EServices = use('App/Services/ExceptionsServices')
const ExceptionsServices = new EServices()
/** Exceptions */
class CategoryController {
  /**
   * Getting All Categories
   * @params null
   */
  async getCategories({ auth, request, response, antl }) {
    try {
      // Fetching all the categories
      const categories = await Category.query()
        .where('status', 1)
        .select('id', 'category_name', 'parent_id', 'created_at', 'status')
        .fetch()
      return categories
    } catch (getCategoryError) {
      console.log(getCategoryError)
    }
  }

  /**
   * Creating a New Category
   * @param {Object} categoryInfo
   */
  async postCreateCategory({ auth, request, response, antl }) {
    const account = await auth.getUser()
    try {
      // console.log(request.all())
      // Getting the categoryInfo
      const { category_name, parent_id } = request.input('categoryInfo')
      // Storing New Category/ Adding New Category
      const category = new Category()
      category.category_name = category_name
      category.parent_id = parent_id
      category.status = 1 // Active
      await category.save()
      // returning success response
      return ExceptionsServices.resourceAddSuccessful(
        antl.currentLocale(),
        'category',
        category
      )
    } catch (createCategoryError) {
      console.log(createCategoryError)
      // returning error response
      return ExceptionsServices.resourceAddFailed(
        antl.currentLocale(),
        'category'
      )
    }
  }

  /**
   * Update Category
   * @param {Object} categoryInfo
   */
  async postUpdateCategory({ request, response, antl }) {
    try {
      // console.log(request.all())
      // Getting the categoryInfo
      const { id, category_name, parent_id } = request.input('categoryInfo')
      // finding the category
      const findCategory = await Category.query()
        .where('id', id)
        .select('id', 'category_name', 'parent_id')
        .first()
      // checking the category is exist or not
      if (!findCategory) {
        return ExceptionsServices.resourceMissing(
          antl.currentLocale(),
          'category'
        )
      }
      // Updating category
      findCategory.category_name = category_name
      findCategory.parent_id = parent_id
      await findCategory.save()
      // returning success response
      return ExceptionsServices.resourceUpdateSuccessful(
        antl.currentLocale(),
        'category'
      )
    } catch (updateCategoryError) {
      console.log(updateCategoryError)
      // returning error response
      return ExceptionsServices.resourceUpdateFailed(
        antl.currentLocale(),
        'category'
      )
    }
  }
  /**
   * Instead of Deleting from Table, we just change the Status of the category
   * @param {Integer} id
   */
  async postDeleteCategory({ request, response, antl }) {
    try {
      // console.log(request.all())
      // Getting the id for destroy category
      const { id } = request.all()
      // finding the category
      const findCategory = await Category.query()
        .where('id', id)
        .select('id', 'status')
        .first()
      // checking the category is exist or not
      if (!findCategory) {
        return ExceptionsServices.resourceMissing(
          antl.currentLocale(),
          'category'
        )
      }
      // changing the status
      findCategory.status = 0 // 0 means inactive
      await findCategory.save()
      // returning success response
      return ExceptionsServices.resourceDeleteSuccessful(
        antl.currentLocale(),
        'category'
      )
    } catch (deleteCategoryError) {
      console.log(deleteCategoryError)
      // returning error response
      return ExceptionsServices.resourceDeleteFailed(
        antl.currentLocale(),
        'category'
      )
    }
  }
}

module.exports = CategoryController
