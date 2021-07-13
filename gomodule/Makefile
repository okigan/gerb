default: build

detected_OS :=$(shell uname)
GOPATH :=/root/go

setup-build-env:
	echo $(detected_OS)
ifeq ($(detected_OS),Darwin)
	brew install protobuf
	brew install protoc-gen-go
	brew install protoc-gen-grpc-web
endif
ifeq ($(detected_OS),Linux)
	apt update
	apt install -y protobuf-compiler
endif

generated/service.pb.go:
	mkdir -p ./generated
	PATH=$${PATH}:$$(go env GOPATH)/bin go get -u google.golang.org/protobuf/cmd/protoc-gen-go
	PATH=$${PATH}:$$(go env GOPATH)/bin go install google.golang.org/protobuf/cmd/protoc-gen-go

	PATH=$${PATH}:$$(go env GOPATH)/bin go get -u google.golang.org/grpc/cmd/protoc-gen-go-grpc
	PATH=$${PATH}:$$(go env GOPATH)/bin go install google.golang.org/grpc/cmd/protoc-gen-go-grpc

	PATH=$${PATH}:$$(go env GOPATH)/bin go generate
	cp -r ./generated ../src/

compile-go:
	go build -buildmode=c-archive -o ./build/gomodule.so

build: compile-go
