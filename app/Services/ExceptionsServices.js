'use strict'
/**
 ** File Name: ExceptionsServices.js
 ** Services to help the task related to Exceptions
 ** Namespace: App/Services/Exceptions
 ** Developed By: Devech Ltd.
 ** Company Website: http://www.devech.com
 ** Maintained By: Devech Ltd.
 ** Email: info@devech.com
 ** Skype: team_devech,
 ** License: Devech Ltd.
 **/
/** Models Sections */
/** Modules Sections */
const Logger = use('Logger')
const moment = use('moment')
const antl = use('Antl')
class ExceptionsServices {
  constructor() {}
  /** IMPORTANT
   * HERE WE CAN NOT ACCESS THE DEFAULT antl OBJECT. * THATS WHY WE HAVE IMPORTED THE BIG ANTL AND
   * TRANSLATED THE TEXT USING FORLOCALE()
   * END OF IMPORTANT */
  /**
   * Returning Resource Added Successful Response
   * @param {String} currentLocale
   * @param {String} resourceName
   * @param {Object} data
   */
  resourceAddSuccessful(currentLocale, resourceName, data = null) {
    // returning success response
    return {
      CODE: antl.forLocale(currentLocale).formatMessage('exceptions.code_200'),
      STATUS: antl.formatMessage('exceptions.status_200'),
      TYPE: antl.formatMessage('exceptions.type_200'),
      MESSAGE: antl
        .forLocale(currentLocale)
        .formatMessage('exceptions.message_200', {
          resourceName: antl
            .forLocale(currentLocale)
            .formatMessage(`keys.${resourceName}`),
        }),
      DATA: data && data != null && data != undefined ? data : null,
    }
  }
  /**
   * Returning Resource Added Failed Response
   * @param {String} currentLocale
   * @param {String} resourceName
   */
  resourceAddFailed(currentLocale, resourceName) {
    // returning success response
    return {
      CODE: antl.forLocale(currentLocale).formatMessage('exceptions.code_201'),
      STATUS: antl.formatMessage('exceptions.status_201'),
      TYPE: antl.formatMessage('exceptions.type_201'),
      MESSAGE: antl
        .forLocale(currentLocale)
        .formatMessage('exceptions.message_201', {
          resourceName: antl
            .forLocale(currentLocale)
            .formatMessage(`keys.${resourceName}`),
        }),
    }
  }
  /**
   * Returning Resource Updated Successful Response
   * @param {String} currentLocale
   * @param {String} resourceName
   * @param {Object} data
   */
  resourceUpdateSuccessful(currentLocale, resourceName, data = null) {
    // returning success response
    return {
      CODE: antl.forLocale(currentLocale).formatMessage('exceptions.code_202'),
      STATUS: antl.formatMessage('exceptions.status_202'),
      TYPE: antl.formatMessage('exceptions.type_202'),
      MESSAGE: antl
        .forLocale(currentLocale)
        .formatMessage('exceptions.message_202', {
          resourceName: antl
            .forLocale(currentLocale)
            .formatMessage(`keys.${resourceName}`),
        }),
      DATA: data && data != null && data != undefined ? data : null,
    }
  }
  /**
   * Returning Resource Updated Failed Response
   * @param {String} currentLocale
   * @param {String} resourceName
   */
  resourceUpdateFailed(currentLocale, resourceName) {
    // returning success response
    return {
      CODE: antl.forLocale(currentLocale).formatMessage('exceptions.code_203'),
      STATUS: antl.formatMessage('exceptions.status_203'),
      TYPE: antl.formatMessage('exceptions.type_203'),
      MESSAGE: antl
        .forLocale(currentLocale)
        .formatMessage('exceptions.message_203', {
          resourceName: antl
            .forLocale(currentLocale)
            .formatMessage(`keys.${resourceName}`),
        }),
    }
  }
  /**
   * Returning Resource Deletd Successful Response
   * @param {String} currentLocale
   * @param {String} resourceName
   */
  resourceDeleteSuccessful(currentLocale, resourceName) {
    // returning success response
    return {
      CODE: antl.forLocale(currentLocale).formatMessage('exceptions.code_204'),
      STATUS: antl.formatMessage('exceptions.status_204'),
      TYPE: antl.formatMessage('exceptions.type_204'),
      MESSAGE: antl
        .forLocale(currentLocale)
        .formatMessage('exceptions.message_204', {
          resourceName: antl
            .forLocale(currentLocale)
            .formatMessage(`keys.${resourceName}`),
        }),
    }
  }
  /**
   * Returning Resource Deleted Failed Response
   * @param {String} currentLocale
   * @param {String} resourceName
   */
  resourceDeleteFailed(currentLocale, resourceName) {
    // returning success response
    return {
      CODE: antl.forLocale(currentLocale).formatMessage('exceptions.code_205'),
      STATUS: antl.formatMessage('exceptions.status_205'),
      TYPE: antl.formatMessage('exceptions.type_205'),
      MESSAGE: antl
        .forLocale(currentLocale)
        .formatMessage('exceptions.message_205', {
          resourceName: antl
            .forLocale(currentLocale)
            .formatMessage(`keys.${resourceName}`),
        }),
    }
  }
  /**
   * Returning Resource Missing Response
   * @param {String} currentLocale
   * @param {String} resourceName
   */
  resourceMissing(currentLocale, resourceName) {
    // returning error response
    return {
      CODE: antl.forLocale(currentLocale).formatMessage('exceptions.code_405'),
      STATUS: antl.formatMessage('exceptions.status_405'),
      TYPE: antl.formatMessage('exceptions.type_405'),
      MESSAGE: antl
        .forLocale(currentLocale)
        .formatMessage('exceptions.message_405', {
          resourceName: antl
            .forLocale(currentLocale)
            .formatMessage(`keys.${resourceName}`),
        }),
    }
  }
  /**
   * Returning Duplicate Resource Response
   * @param {String} currentLocale
   * @param {String} resourceName
   */
  duplicateResource(currentLocale, resourceName) {
    // returning error response
    return {
      CODE: antl.forLocale(currentLocale).formatMessage('exceptions.code_206'),
      STATUS: antl.formatMessage('exceptions.status_206'),
      TYPE: antl.formatMessage('exceptions.type_206'),
      MESSAGE: antl
        .forLocale(currentLocale)
        .formatMessage('exceptions.message_206', {
          dataName: antl
            .forLocale(currentLocale)
            .formatMessage(`keys.${resourceName}`),
        }),
    }
  }
  /**
   * Returning Server Error Response
   * @param {String} currentLocale
   * @param {String} resourceName
   */
  serverError(currentLocale) {
    // returning error response
    return {
      CODE: antl.forLocale(currentLocale).formatMessage('exceptions.code_500'),
      STATUS: antl.formatMessage('exceptions.status_500'),
      TYPE: antl.formatMessage('exceptions.type_500'),
      MESSAGE: antl
        .forLocale(currentLocale)
        .formatMessage('exceptions.message_500'),
    }
  }
  /**
   * Returning Invalid File Extension Error Response
   * @param {String} currentLocale
   * @param {String} resourceName
   */
   resourceInvalidFile(currentLocale, resourceName) {
    // returning error response
    return {
      CODE: antl.forLocale(currentLocale).formatMessage('exceptions.code_406'),
      STATUS: antl.formatMessage('exceptions.status_406'),
      TYPE: antl.formatMessage('exceptions.type_406'),
      MESSAGE: antl
        .forLocale(currentLocale)
        .formatMessage('exceptions.message_406', {
          resourceName: antl
            .forLocale(currentLocale)
            .formatMessage(`keys.${resourceName}`),
        }),
    }
  }
  /**
   * Returning Max File Size Error Response
   * @param {String} currentLocale
   * @param {String} resourceName
   */
   resourceMaxFileSize(currentLocale, resourceName) {
    // returning error response
    return {
      CODE: antl.forLocale(currentLocale).formatMessage('exceptions.code_407'),
      STATUS: antl.formatMessage('exceptions.status_407'),
      TYPE: antl.formatMessage('exceptions.type_407'),
      MESSAGE: antl
        .forLocale(currentLocale)
        .formatMessage('exceptions.message_407', {
          resourceName: antl
            .forLocale(currentLocale)
            .formatMessage(`keys.${resourceName}`),
        }),
    }
  }
}

module.exports = ExceptionsServices
