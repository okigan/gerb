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


export class HardwareMonitorClient {
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

  methodInfoMonitor = new grpcWeb.AbstractClientBase.MethodInfo(
    service_pb.HardwareStats,
    (request: service_pb.EmptyRequest) => {
      return request.serializeBinary();
    },
    service_pb.HardwareStats.deserializeBinary
  );

  monitor(
    request: service_pb.EmptyRequest,
    metadata?: grpcWeb.Metadata) {
    return this.client_.serverStreaming(
      this.hostname_ +
        '/main.HardwareMonitor/Monitor',
      request,
      metadata || {},
      this.methodInfoMonitor);
  }

}

