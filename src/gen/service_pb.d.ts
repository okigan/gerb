import * as jspb from 'google-protobuf'



export class HardwareStats extends jspb.Message {
  getCpu(): number;
  setCpu(value: number): HardwareStats;

  getMemoryFree(): number;
  setMemoryFree(value: number): HardwareStats;

  getMemoryUsed(): number;
  setMemoryUsed(value: number): HardwareStats;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): HardwareStats.AsObject;
  static toObject(includeInstance: boolean, msg: HardwareStats): HardwareStats.AsObject;
  static serializeBinaryToWriter(message: HardwareStats, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): HardwareStats;
  static deserializeBinaryFromReader(message: HardwareStats, reader: jspb.BinaryReader): HardwareStats;
}

export namespace HardwareStats {
  export type AsObject = {
    cpu: number,
    memoryFree: number,
    memoryUsed: number,
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

