// install the prerequiste tool for proto generation as following:
// go get -u google.golang.org/protobuf/cmd/protoc-gen-go
// go install google.golang.org/protobuf/cmd/protoc-gen-go

// go get -u google.golang.org/grpc/cmd/protoc-gen-go-grpc
// go install google.golang.org/grpc/cmd/protoc-gen-go-grpc

//go:generate protoc -I=./proto service.proto --go_out=./generated --go_opt=paths=source_relative
//go:generate protoc -I=./proto service.proto --go-grpc_out=./generated
//go:generate protoc -I=./proto service.proto --js_out=import_style=commonjs,binary:./generated
//go:generate protoc -I=./proto service.proto --grpc-web_out=import_style=commonjs,mode=grpcwebtext:./generated
//go:generate protoc -I=./proto service.proto --grpc-web_out=import_style=typescript,mode=grpcwebtext:./generated

package main

import "C"

import (
	"context"
	"embed"
	gomoduleapi "golangmodule/generated"
	"io/fs"
	"log"
	"net"
	"net/http"
	"time"

	"github.com/improbable-eng/grpc-web/go/grpcweb"
	"google.golang.org/grpc"
)

//go:embed webapp/dist/index.html
var content embed.FS

//export startGoModule
func startGoModule() *C.char {
	go func() {
		run_server()
	}()

	time.Sleep(1000)

	return C.CString("gomodule started!")
}

// required to build
func run_server() {
	log.Println("Starting gomodule server")
	lis, err := net.Listen("tcp", "localhost:7777")
	if err != nil {
		panic(err)
	}
	gRPCserver := grpc.NewServer()

	// Create a server object of the type we created in server.go
	gomoduleapi.RegisterHardwareMonitorServer(gRPCserver, &Server{})

	go func() {
		log.Println("Starting grpc server")
		log.Fatal(gRPCserver.Serve(lis))
	}()

	// We need to wrap the gRPC server with a multiplexer to enable
	// the usage of http2 over http1
	grpcWebServer := grpcweb.WrapServer(gRPCserver)

	multiplex := grpcMultiplexer{
		grpcWebServer,
	}

	// a regular http router
	mux := http.NewServeMux()
	var dist, _ = fs.Sub(content, "webapp/dist")

	mux.Handle("/", multiplex.Handler(http.FileServer(http.FS(dist))))

	// create a http server with some defaults
	srv := &http.Server{
		Handler:      mux,
		Addr:         "localhost:8080",
		WriteTimeout: 150 * time.Second,
		ReadTimeout:  150 * time.Second,
	}

	log.Println("Starting mux server")
	log.Fatal(srv.ListenAndServeTLS(
		"/Users/iokulist/Github/okigan/electron_go_sidecar/src/app/native/gomodule/localhost.crt",
		"/Users/iokulist/Github/okigan/electron_go_sidecar/src/app/native/gomodule/localhost.key"))
}

// required to build
func main() {
	run_server()
}

// grpcMultiplexer enables HTTP requests and gRPC requests to multiple on the same channel
// this is needed since browsers dont fully support http2 yet
type grpcMultiplexer struct {
	*grpcweb.WrappedGrpcServer
}

// Handler is used to route requests to either grpc or to regular http
func (m *grpcMultiplexer) Handler(next http.Handler) http.Handler {
	return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		if m.IsGrpcWebRequest(r) {
			m.ServeHTTP(w, r)
			return
		}
		next.ServeHTTP(w, r)
	})
}

// Server is our struct that will handle the Hardware monitoring Logic
// It will fulfill the gRPC interface generated
type Server struct {
	gomoduleapi.UnimplementedHardwareMonitorServer
}

func (s *Server) Monitor(req *gomoduleapi.EmptyRequest,
	stream gomoduleapi.HardwareMonitor_MonitorServer) error {
	// Start a ticker that executes each 2 seconds
	timer := time.NewTicker(2 * time.Second)

	for {
		select {
		// Exit on stream context done
		case <-stream.Context().Done():
			log.Println("ending stream")
			return nil
		case <-timer.C:
			log.Println("sending stats")
			// Grab stats and output
			hwStats := &gomoduleapi.HardwareStats{
				Cpu:        counter,
				MemoryFree: counter,
				MemoryUsed: counter,
			}
			counter++

			// Send the Hardware stats on the stream
			err := stream.Send(hwStats)
			if err != nil {
				log.Println(err.Error())
			}
		}
	}
}

var counter int32 = 0

func (s *Server) MonitorSingle(context.Context, *gomoduleapi.EmptyRequest) (*gomoduleapi.HardwareStats, error) {
	log.Println("in MonitorSingle")

	hwStats := gomoduleapi.HardwareStats{
		Cpu:        counter,
		MemoryFree: counter,
		MemoryUsed: counter,
	}
	counter++

	return &hwStats, nil
}
