import { Document } from "mongoose";

export interface IJkaClient extends Document {
  name: string,
  pings: number[],
  ip?: string,
}
