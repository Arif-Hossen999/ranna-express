'use strict'
/**
 ** File Name: FollowerController.js
 ** Handling all types of request/tasks related to Follower Section
 ** Namespace: App/Controllers/Http/Follower
 ** Developed By: Devech Ltd.
 ** Company Website: https://www.devech.com
 ** Maintained By: Devech Ltd.
 ** Email: info@devech.com
 ** Skype: team_devech,
 ** License: Devech Ltd.
 **/
/** Models */
const Follower = use('App/Models/Follower')
const Account = use('App/Models/Account')
/** Modules Sections */
/** Services */
/** Exceptions */
class FollowerController {
  /**
   * Getting All Categories
   * @params null
   */
  async getFollowers({ auth, request, response, antl }) {
    try {
      // Fetching all the categories
      const followers = await Follower.query()
        .where('status', 1)
        .select('id', 'following_id', 'follower_id', 'created_at', 'status')
        .fetch()
      return followers
    } catch (getFollowersError) {
      console.log(getFollowersError)
    }
  }
  /**
   * Creating a New Follower
   * @param {object} followerInfo
   */
  async postCreateFollower({ auth, request, response, antl }) {
    try {
      // console.log(request.all())
      // Getting the followerInfo
      const { following_id, follower_id } = request.input('followerInfo')
      // finding the follower
      const findFollwing = await Account.query()
        .where('id', following_id)
        .select('id', 'name')
        .first()
      // checking the follower is exist or not
      if (!findFollwing) {
        return response.json({
          CODE: antl.formatMessage('exceptions.code_405'),
          STATUS: antl.formatMessage('exceptions.status_405'),
          TYPE: antl.formatMessage('exceptions.type_405'),
          MESSAGE: antl.formatMessage('exceptions.message_405', {
            resourceName: antl.formatMessage('keys.follower'),
          }),
        })
      }
      //Adding New Follower
      const follower = new Follower()
      follower.following_id = following_id
      follower.follower_id = follower_id
      follower.status = 1 // Active
      await follower.save()
      // finding the followers account
      const findFollowerAccount = await Account.query()
        .where('id', follower_id)
        .select('id', 'followings', 'name')
        .first()
      //Adding New Follower Number
      findFollowerAccount.followings += 1
      await findFollowerAccount.save()

      // finding the followers account
      const findFollowingAccount = await Account.query()
        .where('id', following_id)
        .select('id', 'followers', 'name')
        .first()
      //Adding New Following Number
      findFollowingAccount.followers += 1
      await findFollowingAccount.save()

      // returning success response
      return response.json({
        CODE: antl.formatMessage('exceptions.code_200'),
        STATUS: antl.formatMessage('exceptions.status_200'),
        TYPE: antl.formatMessage('exceptions.type_200'),
        MESSAGE: antl.formatMessage('exceptions.message_200', {
          resourceName: antl.formatMessage('keys.follower'),
        }),
        DATA: follower,
      })
    } catch (createFollowerError) {
      console.log(createFollowerError)
      // returning error response
      return response.json({
        CODE: antl.formatMessage('exceptions.code_201'),
        STATUS: antl.formatMessage('exceptions.status_201'),
        TYPE: antl.formatMessage('exceptions.type_201'),
        MESSAGE: antl.formatMessage('exceptions.message_201', {
          resourceName: antl.formatMessage('keys.follower'),
        }),
      })
    }
  }
  /**
   * Delete Follower
   * @param {Integer} id
   */
   async postDeleteFollower({ request, response, antl }) {
    try {
      // console.log(request.all())
      // Getting the id for destroy follower
      const { id } = request.all()
      // finding the follower
      const findFollower = await Follower.query()
        .where('id', id)
        .select('id', 'follower_id', 'following_id')
        .first()
      // checking the follower is exist or not
      if (!findFollower) {
        return response.json({
          CODE: antl.formatMessage('exceptions.code_405'),
          STATUS: antl.formatMessage('exceptions.status_405'),
          TYPE: antl.formatMessage('exceptions.type_405'),
          MESSAGE: antl.formatMessage('exceptions.message_405', {
            resourceName: antl.formatMessage('keys.follower'),
          }),
        })
      }
      // finding the followers account
      const findFollowerAccount = await Account.query()
        .where('id', findFollower.follower_id)
        .select('id', 'followings', 'name')
        .first()
      //Deleting Follower Number
      findFollowerAccount.followings -= 1
      await findFollowerAccount.save()

      // finding the followers account
      const findFollowingAccount = await Account.query()
        .where('id', findFollower.following_id)
        .select('id', 'followers', 'name')
        .first()
      //Deleting Following Number
      findFollowingAccount.followers -= 1
      await findFollowingAccount.save()
      // Delete the follower
      await findFollower.delete()
      // returning success response
      return response.json({
        CODE: antl.formatMessage('exceptions.code_204'),
        STATUS: antl.formatMessage('exceptions.status_204'),
        TYPE: antl.formatMessage('exceptions.type_204'),
        MESSAGE: antl.formatMessage('exceptions.message_204', {
          resourceName: antl.formatMessage('keys.follower'),
        }),
      })
    } catch (deleteFollowerError) {
      console.log(deleteFollowerError)
      // returning error response
      return response.json({
        CODE: antl.formatMessage('exceptions.code_205'),
        STATUS: antl.formatMessage('exceptions.status_205'),
        TYPE: antl.formatMessage('exceptions.type_205'),
        MESSAGE: antl.formatMessage('exceptions.message_205', {
          resourceName: antl.formatMessage('keys.follower'),
        }),
      })
    }
  }
}

module.exports = FollowerController
