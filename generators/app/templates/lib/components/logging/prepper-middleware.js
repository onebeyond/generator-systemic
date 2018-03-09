const onHeaders = require('on-headers');
const R = require('ramda');

module.exports = ({ prepper } = {}) => {
  const { handlers } = (prepper || require('prepper'));

  const start = ({ app }, cb) => {
    app.use((req, res, next) => {
      const logger = req.app.locals.logger.child({
        handlers: [
          new handlers.Tracer(),
          new handlers.Merge(R.pick(['url', 'method', 'headers', 'params'], req), { key: 'request' }),
        ],
      });

      onHeaders(res, () => {
        const response = { response: { statusCode: res.statusCode, headers: res.headers } };
        if (res.statusCode === 400) logger.error(req.url, response);
        if (res.statusCode < 500) logger.info(req.url, response);
        else logger.error(req.url, response);
      });

      res.locals.logger = logger;

      next();
    });

    cb();
  };

  return { start };
};
