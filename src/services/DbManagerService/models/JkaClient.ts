import mongoose, { Schema } from "mongoose";
import { IJkaClient } from '../interfaces/JkaClient';

const JkaClientSchema = new Schema({
  name: { type: String, required: true, },
  pings: { type: [Number], required: true, },
  ip: { type: String, required: false, },
});

export const JkaClient = mongoose.model<IJkaClient>('JkaClient', JkaClientSchema);
