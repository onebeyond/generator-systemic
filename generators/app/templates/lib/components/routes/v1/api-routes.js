const {
  handleHttpError, tagError, errorFactory, CustomErrorTypes,
} = require('error-handler-module');

module.exports = () => {
  const start = async ({ app, logger, controller }) => {
    /**
     * @typedef {object} MessageV1
     * @property {string} id - message id
     * @property {string} text - message text
     */

    /**
     * @typedef {object} Error
     * @property {integer} code - error code - int32
     * @property {message} message - error message
     * @property {object} extra - error extra information
     */

    /**
     * GET /v1/message/{id}
     * @description endpoint to retrieve a message
     * @summary summary
     * @tag V1
     * @param {string} id.path.required - message Id
     * @return {MessageV1} 200 - message payload
     * @return {Error} 404 - Error when there isn't a message
     * @return {Error} 500 - internal server error
     */
    app.get('/v1/message/:id', async (req, res, next) => {
      try {
        const { id } = req.params;
        logger.info(`Message with id: ${id} requested via API V1`);
        const message = await controller.getMessage(id);

        if (message) {
          return res.send(message);
        }
        const badRequestError = errorFactory(CustomErrorTypes.NOT_FOUND);
        throw badRequestError('Not found request error', 'A message with the given id was not found');
      } catch (error) {
        return next(tagError(error));
      }
    });

    app.use(handleHttpError(logger));
    return Promise.resolve();
  };

  return { start };
};
