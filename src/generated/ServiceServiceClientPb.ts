/**
 * @fileoverview gRPC-Web generated client stub for main
 * @enhanceable
 * @public
 */

// GENERATED CODE -- DO NOT EDIT!


/* eslint-disable */
// @ts-nocheck


import * as grpcWeb from 'grpc-web';

import * as service_pb from './service_pb';


export class CounterClient {
  client_: grpcWeb.AbstractClientBase;
  hostname_: string;
  credentials_: null | { [index: string]: string; };
  options_: null | { [index: string]: any; };

  constructor (hostname: string,
               credentials?: null | { [index: string]: string; },
               options?: null | { [index: string]: any; }) {
    if (!options) options = {};
    if (!credentials) credentials = {};
    options['format'] = 'text';

    this.client_ = new grpcWeb.GrpcWebClientBase(options);
    this.hostname_ = hostname;
    this.credentials_ = credentials;
    this.options_ = options;
  }

  methodInfoGetCounterStream = new grpcWeb.AbstractClientBase.MethodInfo(
    service_pb.CounterInfo,
    (request: service_pb.EmptyRequest) => {
      return request.serializeBinary();
    },
    service_pb.CounterInfo.deserializeBinary
  );

  getCounterStream(
    request: service_pb.EmptyRequest,
    metadata?: grpcWeb.Metadata) {
    return this.client_.serverStreaming(
      this.hostname_ +
        '/main.Counter/GetCounterStream',
      request,
      metadata || {},
      this.methodInfoGetCounterStream);
  }

  methodInfoGetCounter = new grpcWeb.AbstractClientBase.MethodInfo(
    service_pb.CounterInfo,
    (request: service_pb.EmptyRequest) => {
      return request.serializeBinary();
    },
    service_pb.CounterInfo.deserializeBinary
  );

  getCounter(
    request: service_pb.EmptyRequest,
    metadata: grpcWeb.Metadata | null): Promise<service_pb.CounterInfo>;

  getCounter(
    request: service_pb.EmptyRequest,
    metadata: grpcWeb.Metadata | null,
    callback: (err: grpcWeb.Error,
               response: service_pb.CounterInfo) => void): grpcWeb.ClientReadableStream<service_pb.CounterInfo>;

  getCounter(
    request: service_pb.EmptyRequest,
    metadata: grpcWeb.Metadata | null,
    callback?: (err: grpcWeb.Error,
               response: service_pb.CounterInfo) => void) {
    if (callback !== undefined) {
      return this.client_.rpcCall(
        this.hostname_ +
          '/main.Counter/GetCounter',
        request,
        metadata || {},
        this.methodInfoGetCounter,
        callback);
    }
    return this.client_.unaryCall(
    this.hostname_ +
      '/main.Counter/GetCounter',
    request,
    metadata || {},
    this.methodInfoGetCounter);
  }

}

