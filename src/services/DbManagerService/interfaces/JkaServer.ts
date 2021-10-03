import { Document } from "mongoose";

export interface IJkaServer extends Document {
  hostname: string,
  port: number,
  label: string,
  rconPassword: string,
  isPolling: boolean,
  online: TOnlineStamp[],
  note: string,
}

export type TOnlineStamp = {
  datetime: Date,
  amount: number,
}
