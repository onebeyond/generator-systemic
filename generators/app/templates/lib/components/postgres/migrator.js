const marv = require('marv');
const pgDriver = require('marv-pg-driver');
const path = require('path');

module.exports = () => {

    const start = ({ config }, cb) => {
        const directory = path.join(process.cwd(), 'migrations', 'postgres' );
        const driver = pgDriver({ connection: config.postgres });
        marv.scan(directory, (err, migrations) => {
            if (err) return cb(err);
            marv.migrate(migrations, driver, cb);
        });
    };

    return {
        start
    };
};
