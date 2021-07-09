default: build

.PHONY: setup-build-env
setup-build-env:
	$(MAKE) -C gomodule setup-build-env

.PHONY: build
build:
	$(MAKE) -C gomodule build
