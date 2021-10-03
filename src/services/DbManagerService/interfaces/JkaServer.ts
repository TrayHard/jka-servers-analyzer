import { Document } from "mongoose";

export interface IJkaServer extends Document {
  hostname: string,
  label: string,
  rconpassword: string,
  online: TOnlineStamp[],
  note: string,
}

export type TOnlineStamp = {
  datetime: Date,
  amount: number,
}
