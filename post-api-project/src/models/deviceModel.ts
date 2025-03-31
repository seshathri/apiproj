import mongoose, { Schema, Document } from 'mongoose';

interface IDevice extends Document {
    meter_id: string;
    device_type: string;
    device_model: string;
    latitude: number;
    longitude: number;
    address: string;
    type: string;
    conn_name: string;
    pushData: (data: any) => Promise<void>;
}

const DeviceSchema: Schema = new Schema({
    meter_id: { type: String, required: true },
    device_type: { type: String, required: true },
    device_model: { type: String, required: true },
    latitude: { type: Number, required: true },
    longitude: { type: Number, required: true },
    address: { type: String, required: true },
    type: { type: String, required: true },
    conn_name: { type: String, required: true },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now }
});

DeviceSchema.methods.pushData = async function (data: IDevice) {
    // Implement the logic to push data to the device
    console.log(`Pushing data to device ${data.meter_id}:`, data);
};

const DeviceModel = mongoose.model<IDevice>('Device', DeviceSchema);

export default DeviceModel;