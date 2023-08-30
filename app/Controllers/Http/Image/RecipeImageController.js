'use strict'
/**
 ** File Name: RecipeImageController.js
 ** Handling all types of request/tasks related to Image Section
 ** Namespace: App/Controllers/Http/Image
 ** Developed By: Devech Ltd.
 ** Company Website: https://www.devech.com
 ** Maintained By: Devech Ltd.
 ** Email: info@devech.com
 ** Skype: team_devech,
 ** License: Devech Ltd.
 **/
/** Models */
const Image = use('App/Models/Image')
const Recipe = use('App/Models/Recipe')
/** Modules Sections */
const path = require('path')
const fs = require('fs')
const Env = use('Env')
const moment = require('moment')
const Helpers = use('Helpers')
/** Drive API */
const Drive = use('Drive')
// Random PIN generation
const RandomData = use('randomatic')
/** Services */
const EServices = use('App/Services/ExceptionsServices')
const ExceptionsServices = new EServices()
/** Exceptions */
class RecipeImageController {
  /**
   * Getting All Images
   * @param {Object} recipeImageInfo
   */
  async getImages({ auth, request, response, antl }) {
    try {
      //   console.log(request.all())
      const { recipe_id } = request.input('recipeImageInfo')
      // CHECKING THIS RECIPE IS EXIST
      const checkRecipe = await Recipe.query().where('id', recipe_id).getCount()
      if (checkRecipe == 0) {
        return ExceptionsServices.resourceMissing(
          antl.currentLocale(),
          'recipe'
        )
      }
      // Fetching all the recipe images
      const images = await Image.query()
        .where('status', 1)
        .where('recipe_id', recipe_id)
        .select('id', 'image_url', 'type')
        .fetch()
      // console.log(images.toJSON())
      return images
    } catch (getImagesError) {
      console.log(getImagesError)
    }
  }

  /**
   * Creating a New Image
   * @param {Object}
   */
  async postCreateImage({ auth, request, response, antl }) {
    const account = await auth.getUser()
    try {
      // console.log(request.all())
      // Getting the imageInfo
      const { recipe_id, is_private, is_current_pro_pic, type } = request.all()
      // get user image
      const image_url = request.file('image_url')
      // checking image validation
      const allowedTypes = ['png', 'PNG', 'jpg', 'jpeg', 'JPEG', 'JPG']

      const fileExt = image_url.extname

      if (!allowedTypes.includes(fileExt)) {
        return ExceptionsServices.resourceInvalidFile(
          antl.currentLocale(),
          'image'
        )
      }
      //checking image size
      if (image_url.size > 2000000) {
        return ExceptionsServices.resourceMaxFileSize(
          antl.currentLocale(),
          'image'
        )
      }
      // upload image in s3 bucket
      let uploadToS3I = await this.uploadToS3(image_url)
      //   console.log(uploadToS3I)
      // Adding New Image
      const image = new Image()
      image.recipe_id = recipe_id
      image.image_url = uploadToS3I.name
      image.is_private = is_private
      image.is_current_pro_pic = is_current_pro_pic
      image.type = type
      image.status = 1 // Active
      await image.save()
      // returning success response
      return ExceptionsServices.resourceAddSuccessful(
        antl.currentLocale(),
        'image',
        image
      )
    } catch (createImageError) {
      console.log(createImageError)
      // returning error response
      return ExceptionsServices.resourceAddFailed(antl.currentLocale(), 'image')
    }
  }
  /**
   * Upload image s3 bucket
   * @param {Object} file
   */
  async uploadToS3(file) {
    try {
      // creating folder for upload image in s3 bucket
      const folder = 'recipes/images'
      // Create a random name for file
      const randomName =
        Math.random().toString(36).substring(2, 15) + moment().utc()

      const fileName = `${Date.now()}${randomName}.${file.subtype}`

      // Sets the path and move the file
      const filePath = `${path.resolve(`./tmp/${folder}/`)}/${fileName}`
      // console.log(filePath, 'file path')
      await file.move(Helpers.tmpPath(folder), {
        name: fileName,
        overwrite: true,
      })

      const fileStream = await fs.createReadStream(filePath)
      const fileSize = await file.stream.byteCount

      // Uploads the file to Amazon S3 and stores the url
      const s3Path = `${folder}/${fileName}`
      // use Drive install npm and add file drive.js inside config folder
      await Drive.disk('s3').put(s3Path, fileStream, {
        ACL: 'public-read',
        ContentType: `${file.type}/${file.subtype}`,
      })
      const fileUrl = await Drive.disk('s3').getUrl(s3Path)

      // Destroy the readable stream and delete the file from tmp path
      await fileStream._destroy()
      await Drive.delete(filePath)
      return {
        name: fileName,
        path: s3Path,
        size: fileSize,
        url: fileUrl,
      }
      // return
    } catch (uploadToS3Error) {
      console.log(uploadToS3Error)
    }
  }
  /**
   * Update Recipe Image
   * @param {Object}
   */
  async postUpdateImage({ auth, request, response, antl }) {
    try {
      // console.log(request.all())
      // Getting the imageInfo
      const {
        id,
        recipe_id,
        is_private,
        is_current_pro_pic,
        type,
      } = request.all()
      // finding the image
      const findImage = await Image.query()
        .where('id', id)
        .select(
          'id',
          'recipe_id',
          'image_url',
          'is_private',
          'is_current_pro_pic',
          'type'
        )
        .first()
      // checking the category is exist or not
      if (!findImage) {
        return ExceptionsServices.resourceMissing(antl.currentLocale(), 'image')
      }
      const oldPath = findImage.image_url
      // get user image
      const image_url = request.file('image_url')
      // checking image validation
      const allowedTypes = ['png', 'PNG', 'jpg', 'jpeg', 'JPEG', 'JPG']

      const fileExt = image_url.extname

      if (!allowedTypes.includes(fileExt)) {
        return ExceptionsServices.resourceInvalidFile(
          antl.currentLocale(),
          'image'
        )
      }
      //checking image size
      if (image_url.size > 2000000) {
        return ExceptionsServices.resourceMaxFileSize(
          antl.currentLocale(),
          'image'
        )
      }
      // update image in s3 bucket
      let updateToS3I = await this.updateToS3(image_url, oldPath)
      // updating image
      findImage.recipe_id = recipe_id
      findImage.image_url = updateToS3I.name
      findImage.is_private = is_private
      findImage.is_current_pro_pic = is_current_pro_pic
      findImage.type = type
      await findImage.save()
      // returning success response
      return ExceptionsServices.resourceUpdateSuccessful(
        antl.currentLocale(),
        'image'
      )
    } catch (updateImageError) {
      console.log(updateImageError)
      // returning error response
      return ExceptionsServices.resourceUpdateFailed(
        antl.currentLocale(),
        'image'
      )
    }
  }
  /**
   * update image s3 bucket
   * @param {Object} file, oldPath
   */
  async updateToS3(file, oldPath) {
    try {
      // if old path exists then delete old path
      if (oldPath) {
        const exists = await Drive.disk('s3').exists(oldPath)
        if (exists) {
          await Drive.disk('s3').delete(oldPath)
        }
      }
      // creating folder for upload image in s3 bucket
      const folder = 'recipes/images'
      // Create a random name for file
      const randomName =
        Math.random().toString(36).substring(2, 15) + moment().utc()

      const fileName = `${Date.now()}${randomName}.${file.subtype}`

      // Sets the path and move the file
      const filePath = `${path.resolve(`./tmp/${folder}/`)}/${fileName}`
      // console.log(filePath, 'file path')
      await file.move(Helpers.tmpPath(folder), {
        name: fileName,
        overwrite: true,
      })

      const fileStream = await fs.createReadStream(filePath)
      const fileSize = await file.stream.byteCount

      // Uploads the file to Amazon S3 and stores the url
      const s3Path = `${folder}/${fileName}`
      // use Drive install npm and add file drive.js inside config folder
      await Drive.disk('s3').put(s3Path, fileStream, {
        ACL: 'public-read',
        ContentType: `${file.type}/${file.subtype}`,
      })
      const fileUrl = await Drive.disk('s3').getUrl(s3Path)

      // Destroy the readable stream and delete the file from tmp path
      await fileStream._destroy()
      await Drive.delete(filePath)
      return {
        name: fileName,
        path: s3Path,
        size: fileSize,
        url: fileUrl,
      }
      // return
    } catch (uploadToS3Error) {
      console.log(uploadToS3Error)
    }
  }
  /**
   * Delete Recipe Image
   * @param {Integer} id
   */
  async postDeleteImage({ auth, request, response, antl }) {
    try {
      // console.log(request.all())
      // Getting the id for destroy image
      const { id } = request.all()
      // finding the image
      const findImage = await Image.query()
        .where('id', id)
        .select('id', 'status', 'image_url')
        .first()
      // checking the image is exist or not
      if (!findImage) {
        return ExceptionsServices.resourceMissing(antl.currentLocale(), 'image')
      }
      // if old path exists then delete old path
      const oldPath = findImage.image_url
      if (oldPath) {
        const exists = await Drive.disk('s3').exists(oldPath)
        if (exists) {
          await Drive.disk('s3').delete(oldPath)
        }
      }
      // Delete recipe image
      await findImage.delete()
      // returning success response
      return ExceptionsServices.resourceDeleteSuccessful(
        antl.currentLocale(),
        'image'
      )
    } catch (deleteImageError) {
      console.log(deleteImageError)
      // returning error response
      return ExceptionsServices.resourceDeleteFailed(
        antl.currentLocale(),
        'image'
      )
    }
  }
}

module.exports = RecipeImageController
