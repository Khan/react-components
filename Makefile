.PHONY: package

package:
	./node_modules/.bin/browserify -t [ reactify --es6 ] js/*.jsx -o bundle.js
