const chalk = require('chalk');
const hogan = require('hogan.js');
const R = require('ramda');

const response = hogan.compile(
	'{{{timestamp}}} | {{{displayLevel}}} [{{package.name}}] {{{displayTracer}}} {{{request.method}}} {{{response.statusCode}}} {{{request.url}}}',
);
const error = hogan.compile(
	'{{{timestamp}}} | {{{displayLevel}}} [{{package.name}}] {{{displayTracer}}} {{{errorMessage}}} {{{code}}}\n{{{error.stack}}} {{{details}}}',
);
const info = hogan.compile(
	'{{{timestamp}}} | {{{displayLevel}}} [{{package.name}}] {{{displayTracer}}} {{{message}}} {{{details}}}',
);

const colours = {
	debug: chalk.gray,
	info: chalk.white,
	warn: chalk.yellow,
	error: chalk.red,
	default: chalk.white,
};

module.exports = () => {
	const onMessage = event => {
		const details = R.pluck(event, []);
		const data = R.merge(event, {
			displayTracer: R.has('tracer', event) ? event.tracer.substr(0, 6) : '|',
			displayLevel: event.level.toUpperCase(),
			details: Object.keys(details).length ? `\n ${JSON.stringify(details, null, 2)}` : '',
			errorMessage:
				event.error &&
				(event.error.message instanceof Object ? JSON.stringify(event.error.message) : event.error.message),
			timestamp: event.timestamp.toISOString(),
		});
		const colour = colours[event.level] || colours.default;
		const log = console[event.level] || console.info; // eslint-disable-line no-console
		if (R.has('response.statusCode', event)) log(colour(response.render(data)));
		else if (data.errorMessage) log(colour(error.render(data)));
		else log(colour(info.render(data)));
	};


	const start = async () => onMessage;

	return { start };
};
