const path = require('path');
const Conf = require('confabulous');

module.exports = ({ confabulous } = {}) => {
	const Confabulous = confabulous || Conf;
	const { loaders } = Confabulous;

	const start = async () =>
		new Promise((resolve, reject) => {
			new Confabulous()
				.add(() => loaders.require({ path: path.join(process.cwd(), 'config', 'default.js'), watch: true }))
				.add(() =>
					loaders.require({
						path: path.join(process.cwd(), 'config', `${process.env.SERVICE_ENV}.js`),
						mandatory: false,
					})
				)
				.add(() =>
					loaders.require({ path: path.join(process.cwd(), 'secrets', 'secrets.json'), watch: true, mandatory: false })
				)
				.add(() => loaders.args())
				.on('loaded', resolve)
				.on('error', reject)
				.end(resolve);
		});

	return { start };
};
