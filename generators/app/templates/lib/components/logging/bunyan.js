const bunyan = require('bunyan');
const R = require('ramda');

module.exports = () => {
  let log;

  const onMessage = (event) => {
    log[event.level](R.omit(['level', 'message'], event), event.message);
  };

  const start = ({ pkg }, cb) => {
    log = bunyan.createLogger({ name: pkg.name });
    return cb(null, onMessage);
  };

  return { start };
};
