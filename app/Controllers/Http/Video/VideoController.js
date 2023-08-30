'use strict'
/**
 ** File Name: VideoController.js
 ** Handling all types of request/tasks related to Video Section
 ** Namespace: App/Controllers/Http/Video
 ** Developed By: Devech Ltd.
 ** Company Website: https://www.devech.com
 ** Maintained By: Devech Ltd.
 ** Email: info@devech.com
 ** Skype: team_devech,
 ** License: Devech Ltd.
 **/
/** Models */
const Video = use('App/Models/Video')
/** Modules Sections */
/** Services */
const EServices = use('App/Services/ExceptionsServices')
const ExceptionsServices = new EServices()
/** Exceptions */
class VideoController {
  /**
   * Getting All Videos
   * @param {Object} videoInfo
   */
  async getVideos({ auth, request, response, antl }) {
    try {
      // Getting the recipe id
      const { recipe_id } = request.input('videoInfo')
      // Fetching all the videos
      const videos = await Video.query()
        .where('status', 1)
        .where('recipe_id',recipe_id)
        .select(
          'id',
          'recipe_id',
          'video_url',
          'is_private',
          'type',
          'created_at',
          'status'
        )
        .fetch()
      return videos
    } catch (getVideosError) {
      console.log(getVideosError)
    }
  }
  /**
   * Creating a New Video
   * @param {Object} videoInfo
   */
   async postCreateVideo({ auth, request, response, antl }) {
    const account = await auth.getUser()
    try {
      // console.log(request.all())
      // Getting the videoInfo
      const { recipe_id, video_url, is_private, type } = request.input('videoInfo')
      // Adding New Video
      const video = new Video()
      video.recipe_id = recipe_id
      video.video_url = video_url
      video.is_private = is_private
      video.type = type
      video.status = 1 // Active
      await video.save()
      // returning success response
      return ExceptionsServices.resourceAddSuccessful(
        antl.currentLocale(),
        'video',
        video
      )
    } catch (createVideoError) {
      console.log(createVideoError)
      // returning error response
      return ExceptionsServices.resourceAddFailed(
        antl.currentLocale(),
        'video'
      )
    }
  }
  /**
   * Update Video
   * @param {Object} videoInfo
   */
   async postUpdateVideo({ request, response, antl }) {
    try {
      // console.log(request.all())
      // Getting the videoInfo
      const { id, recipe_id, video_url, is_private, type } = request.input('videoInfo')
      // finding the category
      const findVideo = await Video.query()
        .where('id', id)
        .select('id', 'recipe_id', 'video_url', 'is_private', 'type')
        .first()
      // checking the video is exist or not
      if (!findVideo) {
        return ExceptionsServices.resourceMissing(
          antl.currentLocale(),
          'video'
        )
      }
      // Updating video
      findVideo.recipe_id = recipe_id
      findVideo.video_url = video_url
      findVideo.is_private = is_private
      findVideo.type = type
      await findVideo.save()
      // returning success response
      return ExceptionsServices.resourceUpdateSuccessful(
        antl.currentLocale(),
        'video'
      )
    } catch (updateVideoError) {
      console.log(updateVideoError)
      // returning error response
      return ExceptionsServices.resourceUpdateFailed(
        antl.currentLocale(),
        'video'
      )
    }
  }
  /**
   * Instead of Deleting from Table, we just change the Status of the Video
   * @param {Integer} id
   */
   async postDeleteVideo({ request, response, antl }) {
    try {
      // console.log(request.all())
      // Getting the id for destroy video
      const { id } = request.all()
      // finding the video
      const findVideo = await Video.query()
        .where('id', id)
        .select('id', 'status')
        .first()
      // checking the video is exist or not
      if (!findVideo) {
        return ExceptionsServices.resourceMissing(
          antl.currentLocale(),
          'video'
        )
      }
      // changing the status
      findVideo.status = 0 // 0 means inactive
      await findVideo.save()
      // returning success response
      return ExceptionsServices.resourceDeleteSuccessful(
        antl.currentLocale(),
        'video'
      )
    } catch (deleteVideoError) {
      console.log(deleteVideoError)
      // returning error response
      return ExceptionsServices.resourceDeleteFailed(
        antl.currentLocale(),
        'video'
      )
    }
  }
}

module.exports = VideoController
