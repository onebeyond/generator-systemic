# <%= name %>

<%= description %>

# COMPONENTS

Stored into the _/components_ folder. Each one of them comes with an __*index.js*__ file that acts as a manifest telling systemic how to wire components but most important in which order starting and stopping them.

### Hierarchy
- __app__: <%= name %> root system (component).
- __logger__: logging utility component.
- __express__: express server component.
- __config__: configuration manager component.
- __routes__: express server routes component.
    - __routes.admin__: admin api routes sub-components.

### __app__
The root component defining the service system.

### __logger__
The logging component providing the following logs structure:
```bash
{TIMESTAMP} | {LOG_LEVEL} [{<%= name %>}] | {MESSAGE}
```

### __express__ 
An express server that always comes in handy to expose at least a set of admin endpoints for monitoring purposes.

### __config__ 
The component in charge of mixing and set up the configuration defined into the files of the folder _/config_ in order to come up with the correct configuration for the given run mode:
- default
- local
- test
- build
- prod

### __routes__
The component in charge of specifiyng the routes to be exposed by the express component.

### __routes.admin__
The admin api sub-component in charge of exposing the `/__/manifest` endpoint.


# CONFIG

The configuration is scattered across different files and mixed according to the service run mode as said above.
The intesting bit is the fact that is stored in js objects and is definable per-component and per-sub-component. 

E.g. __routes__ and __routes.admin__ [default configuration](config/default.js):
```js
{
    routes: {
		admin: {
			swaggerValidator: {
				apiDocEndpoint: '/__/docs/api',
				validateRequests: true,
				validateResponses: true,
				validationEndpoint: '/test',
				format: 'yaml',
				yaml: {
					file: './docs/syncapi.yaml',
				},
			},
		},
    },
}
```


# DOCS
The _/docs_ folder holds the synchronous api documentation for the endpoints exposed by the __routes__ component.
As defined in the above section the [_syncapi.yaml_](docs/syncapi.yaml) is used by the [swagger-endpoint-validator](https://www.npmjs.com/package/swagger-endpoint-validator) in order to:
- validate the requests and responses.
- expose the swagger api documentation at the `/__/docs/api` endpoint.


# DOCKER
The service is dockerized and ready to be shipped thanks to the Dockerfile.

# MAKE
The service comes whit an easy and lean makefile that can be used as a base for any CI/CD tool that need to manage the service.

# START
Starting the service means to start the system components and sub-components in the proper order. Something that the [index.js](index.js) and the [system.js](system.js) files are taking care of.


`npm run start`

# TEST
The service comes with a simple tests framework already in place in the _/test_ folder.

`npm run test`
