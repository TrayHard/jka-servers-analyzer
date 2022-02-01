import mongoose, { Schema } from "mongoose";
import { EParserType, TJkaServer } from '../interfaces/JkaServer';

const JkaServerSchema = new Schema({
  hostname: { type: String },
  port: { type: Number },
  label: { type: String },
  gPassword: { type: String },
  rconPassword: { type: String },
  isPolling: { type: Boolean },
  parserType: { type: String, enum: [EParserType.JAPRO, EParserType.YBEPROXY, EParserType.BASE], required: true },
  online: [{
    datetime: { type: Date, default: Date.now() },
    amount: { type: Number },
  }],
  note: { type: String },
});

export const JkaServer = mongoose.model<TJkaServer>('JkaServer', JkaServerSchema);