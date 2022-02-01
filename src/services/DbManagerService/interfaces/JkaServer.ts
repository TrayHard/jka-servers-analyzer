import { Document } from "mongoose";
import { TGetStatusDataParsed } from "../../../functions/getStatusParser";
import { OnlineStamp } from "../../ParserService/OnlineStamp";

export enum EParserType {
  JAPRO = 'JAPRO',
  YBEPROXY = 'YBEPROXY',
  BASE = 'BASE',
}

interface IJkaServer extends Document {
  hostname: string,
  port: number,
  label: string,
  gPassword: string,
  rconPassword: string,
  isPolling: boolean,
  parserType: EParserType
  online: OnlineStamp[],
  note: string,
}

export type TJkaServer = IJkaServer & TGetStatusDataParsed;