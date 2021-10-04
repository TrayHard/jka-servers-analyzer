import { Document } from "mongoose";

export enum EParserType {
  JAPRO = 'japro',
  YBEPROXY = 'ybeproxy',
  BASE = 'base',
}

export interface IJkaServer extends Document {
  hostname: string,
  port: number,
  label: string,
  rconPassword: string,
  isPolling: boolean,
  parserType: EParserType,
  online: TOnlineStamp[],
  note: string,
}

export type TOnlineStamp = {
  datetime: Date,
  amount: number,
}
