import mongoose, { Schema } from "mongoose";
import { IJkaServer } from '../interfaces/JkaServer';

const JkaServerSchema = new Schema({
  hostname: { type: String },
  port: { type: Number },
  label: { type: String },
  rconPassword: { type: String },
  isPolling: { type: Boolean },
  parserType: { enum: ['japro', 'ybeproxy', 'base'] },
  online: [{
    datetime: { type: Date, default: Date.now() },
    amount: { type: Number },
  }],
  note: { type: String },
});

export const JkaServer = mongoose.model<IJkaServer>('JkaServer', JkaServerSchema);