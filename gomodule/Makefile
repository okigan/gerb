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

	go get -u google.golang.org/protobuf/cmd/protoc-gen-go
	go install google.golang.org/protobuf/cmd/protoc-gen-go

	go get -u google.golang.org/grpc/cmd/protoc-gen-go-grpc
	go install google.golang.org/grpc/cmd/protoc-gen-go-grpc
	ls $(go env GOPATH)/bin

endif

generated/service.pb.go: proto/service.proto golang.go
	mkdir -p ./generated
	PATH=$${PATH}:$$(go env GOPATH)/bin go generate
	cp -r ./generated ../src/

compile-go: generated/service.pb.go
	go build -buildmode=c-archive -o ./build/gomodule.so

build: compile-go
