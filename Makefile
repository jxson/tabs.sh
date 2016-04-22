MAKEFLAGS += --warn-undefined-variables
PATH := node_modules/.bin:$(PATH)
SHELL := /bin/bash

.SHELLFLAGS := -eu -o pipefail -c
.DEFAULT_GOAL := all
.DELETE_ON_ERROR:
.SUFFIXES:

.PHONY: all
all: chrome/tabs.js
	@true

chrome/tabs.js: lib/main.js node_modules
	browserify --debug $< 1> $@

node_modules: package.json
	@npm prune
	@npm install
	@touch node_modules

.PHONY: clean
clean:
	@$(RM) -fr node_modules
	@$(RM) -fr npm-debug.log
	@$(RM) -fr coverage
	@$(RM) -fr chrome/tabs.js

.PHONY: fmt
fmt: node_modules
	@standard-format -w

.PHONY: lint
lint: node_modules
	@standard

.PHONY: test
test: lint
	tape test/index.js

.PHONY: coverage
coverage: node_modules index.js test/index.js node_modules
	@istanbul cover --report html --print detail ./test/index.js
	@touch coverage
