module.exports = () => {
	const start = async ({ manifest = {}, app }) => {
		app.get('/__/manifest', (req, res) => res.json(manifest));
		return Promise.resolve();
	};

	return { start };
};
