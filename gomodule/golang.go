// go get -u google.golang.org/protobuf/cmd/protoc-gen-go
// go install google.golang.org/protobuf/cmd/protoc-gen-go

// go get -u google.golang.org/grpc/cmd/protoc-gen-go-grpc
// go install google.golang.org/grpc/cmd/protoc-gen-go-grpc

//go:generate protoc -I=./proto service.proto --go_out=./gen --go_opt=paths=source_relative
//go:generate protoc -I=./proto service.proto --go-grpc_out=./gen
//go:generate protoc -I=./proto service.proto --js_out=import_style=commonjs,binary:./gen
//xxgo:generate protoc -I=./proto service.proto --grpc-web_out=import_style=commonjs,mode=grpcwebtext:./gen
//go:generate protoc -I=./proto service.proto --grpc-web_out=import_style=typescript,mode=grpcwebtext:./gen

package main

import "C"

import (
	"context"
	"embed"
	"fmt"
	hardwaremonitoring "golangmodule/gen"
	"io/fs"
	"log"
	"net"
	"net/http"
	"time"

	"github.com/improbable-eng/grpc-web/go/grpcweb"
	"google.golang.org/grpc"
)

//go:embed protonappui/dist/index.html
var content embed.FS

//export Hello
func Hello() *C.char {
	go func() {
		run_server()
	}()
	time.Sleep(1000)
	return C.CString("Hello world!")
}

// required to build
func run_server() {

	fmt.Println("Welcome to streaming HW monitoring3")
	lis, err := net.Listen("tcp", "localhost:7777")
	if err != nil {
		panic(err)
	}
	gRPCserver := grpc.NewServer()

	// Create a server object of the type we created in server.go
	hardwaremonitoring.RegisterHardwareMonitorServer(gRPCserver, &Server{})

	go func() {
		fmt.Println("Starting server")
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
	var dist, _ = fs.Sub(content, "protonappui/dist")

	// webapp := http.FileServer(http.FS(content))
	// Host the web app at / and wrap it in a multiplexer
	mux.Handle("/", multiplex.Handler(http.FileServer(http.FS(dist))))

	// create a http server with some defaults
	srv := &http.Server{
		Handler:      mux,
		Addr:         "localhost:8080",
		WriteTimeout: 150 * time.Second,
		ReadTimeout:  150 * time.Second,
	}

	// host it
	// go func() {
	// log.Fatal(srv.ListenAndServe())

	log.Fatal(srv.ListenAndServeTLS(
		"/Users/iokulist/Github/okigan/electron_go_sidecar/src/app/native/gomodule/localhost.crt",
		"/Users/iokulist/Github/okigan/electron_go_sidecar/src/app/native/gomodule/localhost.key"))
	// }()

	//gRPCserver.GracefulStop()
}

// required to build
func main() {
	run_server()
}

// https://github.com/charlieduong94/node-golang-native-addon-experiment
// maybe switch to https://www.electronjs.org/docs/tutorial/using-native-node-modules
// http://blog.cinan.sk/2018/02/22/integrate-native-node-dot-js-modules-into-an-electron-app-1-slash-2/

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
	hardwaremonitoring.UnimplementedHardwareMonitorServer
}

func (s *Server) Monitor(req *hardwaremonitoring.EmptyRequest,
	stream hardwaremonitoring.HardwareMonitor_MonitorServer) error {
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
			hwStats := &hardwaremonitoring.HardwareStats{
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

func (s *Server) MonitorSingle(context.Context, *hardwaremonitoring.EmptyRequest) (*hardwaremonitoring.HardwareStats, error) {
	log.Println("in MonitorSingle")

	hwStats := hardwaremonitoring.HardwareStats{
		Cpu:        counter,
		MemoryFree: counter,
		MemoryUsed: counter,
	}
	counter++

	return &hwStats, nil
}
