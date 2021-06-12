const helmet = require('helmet');
const express = require('systemic-express/express');
const expressJsdocSwagger = require('express-jsdoc-swagger');

module.exports = () => {
  const start = async ({ manifest = {}, app, config }) => {
    app.use(express.json());
    app.use(express.urlencoded({
      extended: true,
    }));
    app.use(helmet());
    expressJsdocSwagger(app)(config.openAPIOptions);

    /**
     * GET /__/manifest
     * @summary Endpoint to retrieve the manifest info
     * @tags Admin
     * @return {object} 200 - success response - application/json
     */
    app.get('/__/manifest', (req, res) => res.json(manifest));

    return Promise.resolve();
  };

  return { start };
};
