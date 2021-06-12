const {
  handleHttpError, tagError, errorFactory, CustomErrorTypes,
} = require('error-handler-module');

module.exports = () => {
  const start = async ({ app, logger, controller }) => {
    app.get('/v2/message/:id', async (req, res, next) => {
      try {
        const { id } = req.params;
        logger.info(`Message with id: ${id} requested via API V2`);
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
