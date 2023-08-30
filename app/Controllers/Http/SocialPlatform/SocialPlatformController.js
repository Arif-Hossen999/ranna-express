'use strict'
/**
 ** File Name: SocialPlatformController.js
 ** Handling all types of request/tasks related to Category Section
 ** Namespace: App/Controllers/Http/SocilaPlatform
 ** Developed By: Devech Ltd.
 ** Company Website: https://www.devech.com
 ** Maintained By: Devech Ltd.
 ** Email: info@devech.com
 ** Skype: team_devech,
 ** License: Devech Ltd.
 **/
/** Models */
const SocialPlatform = use('App/Models/SocialPlatform')
/** Modules Sections */
/** Services */
/** Exceptions */
class SocialPlatformController {
  /**
   * Getting All Social Platform
   * @params null
   */
  async getSocialPlatform({ auth, request, response, antl }) {
    try {
      const socialPlatforms = await SocialPlatform.query()
        .where('status', 1)
        .select('id', 'name', 'pretty_name', 'created_at', 'status')
        .fetch()
      return socialPlatforms
    } catch (getSocialPlatformError) {
      console.log(getSocialPlatformError)
    }
  }
  /**
   * Creating a New Social PlatformInfo
   * @param {object} socialPlatformInfo
   */
  async postSocialPlatform({ auth, request, response, antl }) {
    try {
      // console.log(request.all())
      // Getting the socialPlatformInfo
      const { name, pretty_name, logo_url } = request.input(
        'socialPlatformInfo'
      )
      //  Adding New Social Platform
      const social_platform = new SocialPlatform()
      social_platform.name = name
      social_platform.pretty_name = pretty_name
      social_platform.logo_url = logo_url
      social_platform.status = 1 // Active
      await social_platform.save()
      // returning success response
      return response.json({
        CODE: antl.formatMessage('exceptions.code_200'),
        STATUS: antl.formatMessage('exceptions.status_200'),
        TYPE: antl.formatMessage('exceptions.type_200'),
        MESSAGE: antl.formatMessage('exceptions.message_200', {
          resourceName: antl.formatMessage('keys.socialPlatform'),
        }),
        DATA: social_platform,
      })
    } catch (createCategoryError) {
      console.log(createCategoryError)
      // returning error response
      return response.json({
        CODE: antl.formatMessage('exceptions.code_201'),
        STATUS: antl.formatMessage('exceptions.status_201'),
        TYPE: antl.formatMessage('exceptions.type_201'),
        MESSAGE: antl.formatMessage('exceptions.message_201', {
          resourceName: antl.formatMessage('keys.socialPlatform'),
        }),
      })
    }
  }
  /**
   * Update Social Platform
   * @param {object} socialPlatformInfo
   */
  async postUpdateSocialPlatform({ request, response, antl }) {
    try {
      // console.log(request.all())
      // Getting the socialPlatformInfo
      const { id, name, pretty_name, logo_url } = request.input(
        'socialPlatformInfo'
      )
      // finding the SocialPlatform
      const findSocialPlatform = await SocialPlatform.query()
        .where('id', id)
        .select('id', 'name', 'pretty_name', 'logo_url')
        .first()
      // checking the Social Platform is exist or not
      if (!findSocialPlatform) {
        return response.json({
          CODE: antl.formatMessage('exceptions.code_405'),
          STATUS: antl.formatMessage('exceptions.status_405'),
          TYPE: antl.formatMessage('exceptions.type_405'),
          MESSAGE: antl.formatMessage('exceptions.message_405', {
            resourceName: antl.formatMessage('keys.socialName'),
          }),
        })
      }
      // Updating Social Platform
      findSocialPlatform.name = name
      findSocialPlatform.pretty_name = pretty_name
      findSocialPlatform.logo_url = logo_url
      await findSocialPlatform.save()
      // returning success response
      return response.json({
        CODE: antl.formatMessage('exceptions.code_202'),
        STATUS: antl.formatMessage('exceptions.status_202'),
        TYPE: antl.formatMessage('exceptions.type_202'),
        MESSAGE: antl.formatMessage('exceptions.message_202', {
          resourceName: antl.formatMessage('keys.socialPlatform'),
        }),
      })
    } catch (updateSocialPlatformError) {
      console.log(updateSocialPlatformError)
      // returning error response
      return response.json({
        CODE: antl.formatMessage('exceptions.code_203'),
        STATUS: antl.formatMessage('exceptions.status_203'),
        TYPE: antl.formatMessage('exceptions.type_203'),
        MESSAGE: antl.formatMessage('exceptions.message_203', {
          resourceName: antl.formatMessage('keys.socialPlatform'),
        }),
      })
    }
  }
  /**
   * Instead of Deleting from Table, we just change the Status of the Social Platform
   * @param {Integer} id
   */
  async postDeleteSocialPlatform({ request, response, antl }) {
    try {
      // console.log(request.all())
      // Getting the id for destroy social platform
      const { id } = request.all()
      // finding the social platform
      const findSocialPlatform = await SocialPlatform.query()
        .where('id', id)
        .select('id', 'status')
        .first()
      // checking the social platform is exist or not
      if (!findSocialPlatform) {
        return response.json({
          CODE: antl.formatMessage('exceptions.code_405'),
          STATUS: antl.formatMessage('exceptions.status_405'),
          TYPE: antl.formatMessage('exceptions.type_405'),
          MESSAGE: antl.formatMessage('exceptions.message_405', {
            resourceName: antl.formatMessage('keys.socialName'),
          }),
        })
      }
      // changing the status
      findSocialPlatform.status = 0 // 0 means inactive
      await findSocialPlatform.save()
      // returning success response
      return response.json({
        CODE: antl.formatMessage('exceptions.code_204'),
        STATUS: antl.formatMessage('exceptions.status_204'),
        TYPE: antl.formatMessage('exceptions.type_204'),
        MESSAGE: antl.formatMessage('exceptions.message_204', {
          resourceName: antl.formatMessage('keys.socialPlatform'),
        }),
      })
    } catch (deleteSocialPlatformError) {
      console.log(deleteSocialPlatformError)
      // returning error response
      return response.json({
        CODE: antl.formatMessage('exceptions.code_205'),
        STATUS: antl.formatMessage('exceptions.status_205'),
        TYPE: antl.formatMessage('exceptions.type_205'),
        MESSAGE: antl.formatMessage('exceptions.message_205', {
          resourceName: antl.formatMessage('keys.socialPlatform'),
        }),
      })
    }
  }
}

module.exports = SocialPlatformController
