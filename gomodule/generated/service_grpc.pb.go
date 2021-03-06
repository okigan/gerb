// Code generated by protoc-gen-go-grpc. DO NOT EDIT.

package gomoduleapi

import (
	context "context"
	grpc "google.golang.org/grpc"
	codes "google.golang.org/grpc/codes"
	status "google.golang.org/grpc/status"
)

// This is a compile-time assertion to ensure that this generated file
// is compatible with the grpc package it is being compiled against.
// Requires gRPC-Go v1.32.0 or later.
const _ = grpc.SupportPackageIsVersion7

// CounterClient is the client API for Counter service.
//
// For semantics around ctx use and closing/ending streaming RPCs, please refer to https://pkg.go.dev/google.golang.org/grpc/?tab=doc#ClientConn.NewStream.
type CounterClient interface {
	// Monitor will output stats about the hardware on the system host
	GetCounterStream(ctx context.Context, in *EmptyRequest, opts ...grpc.CallOption) (Counter_GetCounterStreamClient, error)
	GetCounter(ctx context.Context, in *EmptyRequest, opts ...grpc.CallOption) (*CounterInfo, error)
}

type counterClient struct {
	cc grpc.ClientConnInterface
}

func NewCounterClient(cc grpc.ClientConnInterface) CounterClient {
	return &counterClient{cc}
}

func (c *counterClient) GetCounterStream(ctx context.Context, in *EmptyRequest, opts ...grpc.CallOption) (Counter_GetCounterStreamClient, error) {
	stream, err := c.cc.NewStream(ctx, &Counter_ServiceDesc.Streams[0], "/main.Counter/GetCounterStream", opts...)
	if err != nil {
		return nil, err
	}
	x := &counterGetCounterStreamClient{stream}
	if err := x.ClientStream.SendMsg(in); err != nil {
		return nil, err
	}
	if err := x.ClientStream.CloseSend(); err != nil {
		return nil, err
	}
	return x, nil
}

type Counter_GetCounterStreamClient interface {
	Recv() (*CounterInfo, error)
	grpc.ClientStream
}

type counterGetCounterStreamClient struct {
	grpc.ClientStream
}

func (x *counterGetCounterStreamClient) Recv() (*CounterInfo, error) {
	m := new(CounterInfo)
	if err := x.ClientStream.RecvMsg(m); err != nil {
		return nil, err
	}
	return m, nil
}

func (c *counterClient) GetCounter(ctx context.Context, in *EmptyRequest, opts ...grpc.CallOption) (*CounterInfo, error) {
	out := new(CounterInfo)
	err := c.cc.Invoke(ctx, "/main.Counter/GetCounter", in, out, opts...)
	if err != nil {
		return nil, err
	}
	return out, nil
}

// CounterServer is the server API for Counter service.
// All implementations must embed UnimplementedCounterServer
// for forward compatibility
type CounterServer interface {
	// Monitor will output stats about the hardware on the system host
	GetCounterStream(*EmptyRequest, Counter_GetCounterStreamServer) error
	GetCounter(context.Context, *EmptyRequest) (*CounterInfo, error)
	mustEmbedUnimplementedCounterServer()
}

// UnimplementedCounterServer must be embedded to have forward compatible implementations.
type UnimplementedCounterServer struct {
}

func (UnimplementedCounterServer) GetCounterStream(*EmptyRequest, Counter_GetCounterStreamServer) error {
	return status.Errorf(codes.Unimplemented, "method GetCounterStream not implemented")
}
func (UnimplementedCounterServer) GetCounter(context.Context, *EmptyRequest) (*CounterInfo, error) {
	return nil, status.Errorf(codes.Unimplemented, "method GetCounter not implemented")
}
func (UnimplementedCounterServer) mustEmbedUnimplementedCounterServer() {}

// UnsafeCounterServer may be embedded to opt out of forward compatibility for this service.
// Use of this interface is not recommended, as added methods to CounterServer will
// result in compilation errors.
type UnsafeCounterServer interface {
	mustEmbedUnimplementedCounterServer()
}

func RegisterCounterServer(s grpc.ServiceRegistrar, srv CounterServer) {
	s.RegisterService(&Counter_ServiceDesc, srv)
}

func _Counter_GetCounterStream_Handler(srv interface{}, stream grpc.ServerStream) error {
	m := new(EmptyRequest)
	if err := stream.RecvMsg(m); err != nil {
		return err
	}
	return srv.(CounterServer).GetCounterStream(m, &counterGetCounterStreamServer{stream})
}

type Counter_GetCounterStreamServer interface {
	Send(*CounterInfo) error
	grpc.ServerStream
}

type counterGetCounterStreamServer struct {
	grpc.ServerStream
}

func (x *counterGetCounterStreamServer) Send(m *CounterInfo) error {
	return x.ServerStream.SendMsg(m)
}

func _Counter_GetCounter_Handler(srv interface{}, ctx context.Context, dec func(interface{}) error, interceptor grpc.UnaryServerInterceptor) (interface{}, error) {
	in := new(EmptyRequest)
	if err := dec(in); err != nil {
		return nil, err
	}
	if interceptor == nil {
		return srv.(CounterServer).GetCounter(ctx, in)
	}
	info := &grpc.UnaryServerInfo{
		Server:     srv,
		FullMethod: "/main.Counter/GetCounter",
	}
	handler := func(ctx context.Context, req interface{}) (interface{}, error) {
		return srv.(CounterServer).GetCounter(ctx, req.(*EmptyRequest))
	}
	return interceptor(ctx, in, info, handler)
}

// Counter_ServiceDesc is the grpc.ServiceDesc for Counter service.
// It's only intended for direct use with grpc.RegisterService,
// and not to be introspected or modified (even as a copy)
var Counter_ServiceDesc = grpc.ServiceDesc{
	ServiceName: "main.Counter",
	HandlerType: (*CounterServer)(nil),
	Methods: []grpc.MethodDesc{
		{
			MethodName: "GetCounter",
			Handler:    _Counter_GetCounter_Handler,
		},
	},
	Streams: []grpc.StreamDesc{
		{
			StreamName:    "GetCounterStream",
			Handler:       _Counter_GetCounterStream_Handler,
			ServerStreams: true,
		},
	},
	Metadata: "service.proto",
}
