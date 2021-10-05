import { Document } from "mongoose";
import { OnlineStamp } from "../../ParserService/OnlineStamp";

export enum EParserType {
  JAPRO = 'JAPRO',
  YBEPROXY = 'YBEPROXY',
  BASE = 'BASE',
}

export interface IJkaServer extends Document {
  hostname: string,
  port: number,
  label: string,
  rconPassword: string,
  isPolling: boolean,
  parserType: EParserType
  online: OnlineStamp[],
  note: string,
}
