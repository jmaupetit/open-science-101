BUILD_DIR='dist'

default: build

serve:
	@npm run serve

build:
	@npm run build

publish: build
	@git checkout -b _build_staging_
	@git add -f $(BUILD_DIR)
	@git commit -am "Add build output"
	@git subtree split --prefix $(BUILD_DIR) -b gh-pages
	@git push origin gh-pages -f
	@git checkout -
	@git branch -D gh-pages _build_staging_

.PHONY: dev build publish
