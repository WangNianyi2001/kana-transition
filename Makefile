dev:
	npx vite dev

build:
	npx vite build

deploy:
	git add -A
	git commit -m 'Update'
	git push

.PHONY: dev build