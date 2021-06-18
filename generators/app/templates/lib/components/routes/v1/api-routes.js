const {
  handleHttpError, tagError, errorFactory, CustomErrorTypes,
} = require('error-handler-module');

module.exports = () => {
  const start = async ({ app, logger, controller }) => {
    /**
     * GET /v1/message/{id}
     * @summary Endpoint to retrieve a message
     * @tags Api V1
     * @param {string} id.path.required - message Id
     * @return {MessageV1} 200 - Successful response
     * @return {Error} 404 - Not Found Error
     * @return {Error} 500 - Internal Server error
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
