.PHONY: package install

package: install
	./node_modules/.bin/browserify -t [ reactify --es6 ] js/*.jsx -o bundle.js

install:
	npm install
