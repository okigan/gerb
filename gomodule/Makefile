default: build

detected_OS :=$(shell uname)

setup-build-env:
ifeq ($(detected_OS),Darwin)
	brew install protobuf
	brew install protoc-gen-go
	brew install protoc-gen-grpc-web
endif
ifeq ($(detected_OS),Linux)
	apt update
	apt install -y protobuf-compiler
endif

gen/service.pb.go: proto/service.proto
	mkdir -p ./gen
	PATH=$${PATH}:$$(go env GOPATH)/bin go generate
	cp -r ./gen ../src/

compile-go: gen/service.pb.go
	go build -buildmode=c-archive -o ./build/gomodule.so

build: compile-go
