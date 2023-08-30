'use strict'
/**
 ** File Name: BlockController.js
 ** Handling all types of request/tasks related to Block Section
 ** Namespace: App/Controllers/Http/Block
 ** Developed By: Devech Ltd.
 ** Company Website: https://www.devech.com
 ** Maintained By: Devech Ltd.
 ** Email: info@devech.com
 ** Skype: team_devech,
 ** License: Devech Ltd.
 **/
/** Models */
const Block = use('App/Models/Block')
/** Modules Sections */
/** Services */
const EServices = use('App/Services/ExceptionsServices')
const ExceptionsServices = new EServices()
/** Exceptions */
class BlockController {
  /**
   * Getting All Categories
   * @params null
   */
  async getBlocks({ auth, request, response, antl }) {
    try {
        // console.log(request.all());
      // Fetching all the blocks
      const blocks = await Block.query()
        .where('status', 1)
        .select('id', 'account_id', 'blocked_id', 'comment', 'created_at', 'status')
        .fetch()
      return blocks
    } catch (getBlocksError) {
      console.log(getBlocksError)
    }
  }
  /**
   * Creating a New Block
   * @param {Object} blockInfo
   */
   async postCreateBlock({ auth, request, response, antl }) {
    const account = await auth.getUser()
    try {
      // console.log(request.all())
      // Getting the blockInfo
      const { blocked_id, comment } = request.input('blockInfo')
      //  Adding New Block
      const block = new Block()
      block.account_id = account.id
      block.blocked_id = blocked_id
      block.comment = comment
      block.status = 1 // Active
      await block.save()
      // returning success response
      return ExceptionsServices.resourceAddSuccessful(
        antl.currentLocale(),
        'block',
        block
      )
    } catch (createBlockError) {
      console.log(createBlockError)
      // returning error response
      return ExceptionsServices.resourceAddFailed(
        antl.currentLocale(),
        'block'
      )
    }
  }
  /**
   * Delete block
   * @param {Integer} id
   */
   async postDeleteBlock({ request, response, antl }) {
    try {
      // console.log(request.all())
      // Getting the id for destroy block
      const { id } = request.all()
      // finding the block
      const findBlock = await Block.query()
        .where('id', id)
        .select('id', 'status')
        .first()
      // checking the block is exist or not
      if (!findBlock) {
        return ExceptionsServices.resourceMissing(
          antl.currentLocale(),
          'block'
        )
      }
      // Delete the block
      await findBlock.delete()
      // returning success response
      return ExceptionsServices.resourceDeleteSuccessful(
        antl.currentLocale(),
        'block'
      )
    } catch (deleteBlockError) {
      console.log(deleteBlockError)
      // returning error response
      return ExceptionsServices.resourceDeleteFailed(
        antl.currentLocale(),
        'block'
      )
    }
  }
}

module.exports = BlockController
