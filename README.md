# Contacts List

This sample project will give you simple login with username-password and social platforms

## Pre-requisites

To get started, you'll need to have the following requirements installed

- Git
- Node.js<sup>1</sup>
- npm
- Redis<sup>2</sup>

<sup>1</sup>See https://nodejs.org/

<sup>2</sup>See http://redis.io/ for installation guides

## Getting started
	
	# Ensure `redis` is running, either as a service or in another shell
	git clone <this repo>
	# Ensure config/config.json is updated
	cp config/config.sample.json config/config.json
	# Install npm dependencies
	npm install
	# Install bower dependencies
	bower install
	# Compile assets
	gulp
	# Run
	npm start

## Running tests

`npm test`

## Running coverage report

`npm run coverage-ui`

