/* eslint-disable no-multi-assign, no-console */

const sleepFunction = ms => new Promise(resolve => setTimeout(resolve, ms));

const defaultFunction = async () => {
	const delay = process.argv[2] ? process.argv[2] : 20000;
	console.log(`sleeping ${delay} milliseconds`);
	await sleepFunction(delay);
};

const sleepModule = module.exports = defaultFunction();
sleepModule.sleep = sleepFunction;
