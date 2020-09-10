# GENERATOR-SYSTEMIC

> A generator for a systemic microservice.


### Systemic microservice

An easy and unopinionated implementation of a microservice fostering an inner [Hexagonal Architecture (Ports and Adapters)](https://en.wikipedia.org/wiki/Hexagonal_architecture_(software)).

#### Main concepts
- [__Systemic__](https://www.npmjs.com/package/systemic): dependecy injection orchestrator in charge of correctly start and stop the different components of the microservice.
- __Systemic microservice__: a system composed of different sub-systems --> _components_ and _sub-components_.
- __Components__ and __sub-components__: minimal responsability elements (Adapters) of the system in charge of dealing with a given Port (generally speaking).


# INSTALLATION

First, install [Yeoman](http://yeoman.io) and generator-systemic using [npm](https://www.npmjs.com/) (we assume you have pre-installed [node.js](https://nodejs.org/)).

```bash
npm install -g yo
npm install -g generator-systemic
```

### Getting To Know Yeoman

 * Yeoman has a heart of gold.
 * Yeoman is a person with feelings and opinions, but is very easy to work with.
 * Yeoman can be too opinionated at times but is easily convinced not to be.
 * Feel free to [learn more about Yeoman](http://yeoman.io/).


# USAGE

Generate your new systemic project: a white canvas into which creating the components you do prefer according to your specifi business logic.

[More info](generators/app/templates/root/_README.md)

```bash
mkdir my-service
cd my-service
yo systemic
```

## White canvas VS showcase
There is an option that can be passed to the generator at execution time using the flag `--showcase`. 

### `--showcase` flag NOT used
Generates your new systemic project: a white canvas into which creating the components you do prefer according to your specific business logic. 

More info in the generated ReadMe.

### `--showcase` flag used
Generates your new systemic project with extra components: a not so white canvas with a given business logic already in place to help you better understand how to handle components (and sub-components):
- versioning.
- workflows.
- testing.
- systemic ecosystem npm handy modules (e.g. [systemic-rabbitmq](https://www.npmjs.com/package/systemic-rabbitmq) - [systemic-mongdb](https://www.npmjs.com/package/systemic-mongodb)).

More info in the generated ReadMe.

# CONTRIBUTING
Consider following these guidelines if you want to contribute:

- Feature: [https://github.com/guidesmiths/generator-systemic/issues/new](https://github.com/guidesmiths/generator-systemic/issues/new?assignees=&labels=&template=feature_request.md&title=My%20Awesome%20Feature)
- Bug: [https://github.com/guidesmiths/generator-systemic/issues/new](https://github.com/guidesmiths/generator-systemic/issues/new?assignees=&labels=&template=bug_report.md&title=My%20Awesome%20Bug)

- Pull Request: [https://github.com/guidesmiths/generator-systemic/blob/master/.github/pull_request_template.md](https://github.com/guidesmiths/generator-systemic/blob/master/.github/pull_request_template.md)


# LICENSE

ISC © [Guidesmiths Ltd]()
