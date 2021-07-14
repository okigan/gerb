/**
 * @fileoverview gRPC-Web generated client stub for main
 * @enhanceable
 * @public
 */

// GENERATED CODE -- DO NOT EDIT!


/* eslint-disable */
// @ts-nocheck



const grpc = {};
grpc.web = require('grpc-web');

const proto = {};
proto.main = require('./service_pb.js');

/**
 * @param {string} hostname
 * @param {?Object} credentials
 * @param {?Object} options
 * @constructor
 * @struct
 * @final
 */
proto.main.CounterClient =
    function(hostname, credentials, options) {
  if (!options) options = {};
  options['format'] = 'text';

  /**
   * @private @const {!grpc.web.GrpcWebClientBase} The client
   */
  this.client_ = new grpc.web.GrpcWebClientBase(options);

  /**
   * @private @const {string} The hostname
   */
  this.hostname_ = hostname;

};


/**
 * @param {string} hostname
 * @param {?Object} credentials
 * @param {?Object} options
 * @constructor
 * @struct
 * @final
 */
proto.main.CounterPromiseClient =
    function(hostname, credentials, options) {
  if (!options) options = {};
  options['format'] = 'text';

  /**
   * @private @const {!grpc.web.GrpcWebClientBase} The client
   */
  this.client_ = new grpc.web.GrpcWebClientBase(options);

  /**
   * @private @const {string} The hostname
   */
  this.hostname_ = hostname;

};


/**
 * @const
 * @type {!grpc.web.MethodDescriptor<
 *   !proto.main.EmptyRequest,
 *   !proto.main.CounterInfo>}
 */
const methodDescriptor_Counter_GetCounterStream = new grpc.web.MethodDescriptor(
  '/main.Counter/GetCounterStream',
  grpc.web.MethodType.SERVER_STREAMING,
  proto.main.EmptyRequest,
  proto.main.CounterInfo,
  /**
   * @param {!proto.main.EmptyRequest} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.main.CounterInfo.deserializeBinary
);


/**
 * @const
 * @type {!grpc.web.AbstractClientBase.MethodInfo<
 *   !proto.main.EmptyRequest,
 *   !proto.main.CounterInfo>}
 */
const methodInfo_Counter_GetCounterStream = new grpc.web.AbstractClientBase.MethodInfo(
  proto.main.CounterInfo,
  /**
   * @param {!proto.main.EmptyRequest} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.main.CounterInfo.deserializeBinary
);


/**
 * @param {!proto.main.EmptyRequest} request The request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @return {!grpc.web.ClientReadableStream<!proto.main.CounterInfo>}
 *     The XHR Node Readable Stream
 */
proto.main.CounterClient.prototype.getCounterStream =
    function(request, metadata) {
  return this.client_.serverStreaming(this.hostname_ +
      '/main.Counter/GetCounterStream',
      request,
      metadata || {},
      methodDescriptor_Counter_GetCounterStream);
};


/**
 * @param {!proto.main.EmptyRequest} request The request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @return {!grpc.web.ClientReadableStream<!proto.main.CounterInfo>}
 *     The XHR Node Readable Stream
 */
proto.main.CounterPromiseClient.prototype.getCounterStream =
    function(request, metadata) {
  return this.client_.serverStreaming(this.hostname_ +
      '/main.Counter/GetCounterStream',
      request,
      metadata || {},
      methodDescriptor_Counter_GetCounterStream);
};


/**
 * @const
 * @type {!grpc.web.MethodDescriptor<
 *   !proto.main.EmptyRequest,
 *   !proto.main.CounterInfo>}
 */
const methodDescriptor_Counter_GetCounter = new grpc.web.MethodDescriptor(
  '/main.Counter/GetCounter',
  grpc.web.MethodType.UNARY,
  proto.main.EmptyRequest,
  proto.main.CounterInfo,
  /**
   * @param {!proto.main.EmptyRequest} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.main.CounterInfo.deserializeBinary
);


/**
 * @const
 * @type {!grpc.web.AbstractClientBase.MethodInfo<
 *   !proto.main.EmptyRequest,
 *   !proto.main.CounterInfo>}
 */
const methodInfo_Counter_GetCounter = new grpc.web.AbstractClientBase.MethodInfo(
  proto.main.CounterInfo,
  /**
   * @param {!proto.main.EmptyRequest} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.main.CounterInfo.deserializeBinary
);


/**
 * @param {!proto.main.EmptyRequest} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @param {function(?grpc.web.Error, ?proto.main.CounterInfo)}
 *     callback The callback function(error, response)
 * @return {!grpc.web.ClientReadableStream<!proto.main.CounterInfo>|undefined}
 *     The XHR Node Readable Stream
 */
proto.main.CounterClient.prototype.getCounter =
    function(request, metadata, callback) {
  return this.client_.rpcCall(this.hostname_ +
      '/main.Counter/GetCounter',
      request,
      metadata || {},
      methodDescriptor_Counter_GetCounter,
      callback);
};


/**
 * @param {!proto.main.EmptyRequest} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @return {!Promise<!proto.main.CounterInfo>}
 *     Promise that resolves to the response
 */
proto.main.CounterPromiseClient.prototype.getCounter =
    function(request, metadata) {
  return this.client_.unaryCall(this.hostname_ +
      '/main.Counter/GetCounter',
      request,
      metadata || {},
      methodDescriptor_Counter_GetCounter);
};


module.exports = proto.main;

