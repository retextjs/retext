make: lint complexity cover

test:
	@./node_modules/.bin/mocha --reporter spec --check-leaks -u exports spec/*.spec*.js

watch:
	@./node_modules/.bin/mocha --reporter min --check-leaks --watch spec/*.spec*.js

lint:
	# Lint (passes when empty):
	@./node_modules/.bin/jshint index.js spec/*.spec*.js
	@./node_modules/.bin/jscs ./index.js --reporter=inline
	

complexity:
	# Complexity (passes when empty):
	@./node_modules/.bin/cr -l --maxcyc 15 --format minimal --silent index.js

cover:
	# Cover (and test):
	@./node_modules/.bin/istanbul cover --report html ./node_modules/.bin/_mocha -- -- --reporter min --check-leaks -u exports spec/*.spec*.js
