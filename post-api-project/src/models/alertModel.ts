import mongoose, { Schema, Document } from 'mongoose';

interface IAlert extends Document {
  meter_id: string;
  device_type: string;
  meter_type: string;
  alert_id: string;
  alert_type: string;
  alert_severity: string;
  timestamp: Date;
  latitude: number;
  longitude: number;
}

const AlertSchema: Schema = new Schema({
  meter_id: { type: String, required: true },
  device_type: { type: String, required: true },
  meter_type: { type: String, required: true },
  alert_id: { type: String, required: true },
  alert_type: { type: String, required: true },
  alert_severity: { type: String, required: true },
  timestamp: { type: Date, default: Date.now },
  latitude: { type: Number, required: true },
  longitude: { type: Number, required: true }
});

const AlertModel = mongoose.model<IAlert>('Alert', AlertSchema);

export default AlertModel;