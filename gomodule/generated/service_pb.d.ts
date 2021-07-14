import * as jspb from 'google-protobuf'



export class CounterInfo extends jspb.Message {
  getCount(): number;
  setCount(value: number): CounterInfo;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): CounterInfo.AsObject;
  static toObject(includeInstance: boolean, msg: CounterInfo): CounterInfo.AsObject;
  static serializeBinaryToWriter(message: CounterInfo, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): CounterInfo;
  static deserializeBinaryFromReader(message: CounterInfo, reader: jspb.BinaryReader): CounterInfo;
}

export namespace CounterInfo {
  export type AsObject = {
    count: number,
  }
}

export class EmptyRequest extends jspb.Message {
  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): EmptyRequest.AsObject;
  static toObject(includeInstance: boolean, msg: EmptyRequest): EmptyRequest.AsObject;
  static serializeBinaryToWriter(message: EmptyRequest, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): EmptyRequest;
  static deserializeBinaryFromReader(message: EmptyRequest, reader: jspb.BinaryReader): EmptyRequest;
}

export namespace EmptyRequest {
  export type AsObject = {
  }
}

