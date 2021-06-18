/**
 * ERROR MODELS
 */

/**
 * Error Response
 * @typedef {object} Error
 * @property {integer} statusCode
 * @property {string} message
 * @property {string} extra
 */
 <%_ if (showcase) { -%>

/**
 * API ROUTES MODELS
 */

/**
 * @typedef {object} MessageV1
 * @property {string} id
 * @property {string} text
 */

/**
 * @typedef {object} MessageV2
 * @property {string} id
 * @property {string} text
 * @property {string} receptionTimestamp
 */<%_ } -%>

/**
 * ADMIN ROUTES MODELS
 */

/**
 * Source Code Management
 * @typedef {object} SourceControlManagement
 * @property {string} remote.required
 * @property {string} branch.required
 * @property {string} commit.required
 */

/**
 * Manifest
 * @typedef {object} Manifest
 * @property {string} name.required
 * @property {string} version.required
 * @property {string} timestamp.required
 * @property {SourceControlManagement} scm.required
 */
