import mongoose, { Schema, Document } from 'mongoose';

interface IMonitoring extends Document {
  meter_id: string;
  device_type: string;
  meter_status: string;
  conn_status: string;
  current_reading: number;
  reverse_flow: number;
  total_flow: number;
  flow_rate: number;
  timestamp: Date;
}

const MonitoringSchema: Schema = new Schema({
  meter_id: { type: String, required: true },
  device_type: { type: String, required: true },
  meter_status: { type: String, required: true },
  conn_status: { type: String, required: true },
  current_reading: { type: Number, required: true },
  reverse_flow: { type: Number, required: true },
  total_flow: { type: Number, required: true },
  flow_rate: { type: Number, required: true },
  timestamp: { type: Date, default: Date.now }
});

const MonitoringModel = mongoose.model<IMonitoring>('Monitoring', MonitoringSchema);

export default MonitoringModel;