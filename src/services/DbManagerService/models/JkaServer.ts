import mongoose, { Schema } from "mongoose";
import { IJkaServer } from '../interfaces/JkaServer';

const JkaServerSchema = new Schema({
  hostname: { type: String },
  label: { type: String },
  rconPassword: { type: String },
  online: [{
    datetime: { type: Date, default: Date.now() },
    amount: { type: Number },
  }],
  note: { type: String },
});

export const JkaServer = mongoose.model<IJkaServer>('JkaServer', JkaServerSchema);