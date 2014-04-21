.PHONY: all docs pydeps jsdeps

ENV = venv

all: bundle.js docs

pydeps:
	test -d $(ENV) || virtualenv $(ENV)

jsdeps:
	npm install

docs: pydeps
	. $(ENV)/bin/activate && pip install -r requirements.txt  && ./make_template.py

bundle.js: jsdeps
	./node_modules/.bin/browserify -t [ reactify --es6 ] js/*.jsx -o bundle.js

test: jsdeps
	mocha --compilers jsx:test/compiler.js test/test-helper.js test/*test.jsx
