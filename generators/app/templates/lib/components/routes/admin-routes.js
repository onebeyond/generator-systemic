const {
	handleHttpError, tagError, errorFactory, CustomErrorTypes,
} = require('error-handler-module');
const bodyParser = require('body-parser');
const validator = require('swagger-endpoint-validator');

module.exports = () => {
	const start = async ({ manifest = {}, app, config }) => {
		app.use(bodyParser.urlencoded({ extended: true }));
		app.use(bodyParser.json());

		await validator.init(app, config.swaggerValidator);

		app.get('/__/manifest', (req, res) => res.json(manifest));

		/**
		 * This is an example endpoint of error handling module usage you can remove it
		 * @route GET /__/manifest
		 * @group Admin - Everything about admin routes
		 * @returns 200 - Sucessful response
		*/
		app.get('/__/error', async (req, res, next) => {
			try {
				const badRequestError = errorFactory(CustomErrorTypes.BAD_REQUEST);
				throw badRequestError('Bad request error example', 'extra info');
			} catch (err) {
				return next(tagError(err));
			}
		});

		app.use(handleHttpError(logger));

		return Promise.resolve();
	};

	return { start };
};