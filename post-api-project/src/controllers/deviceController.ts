class DeviceController {
    constructor(private deviceModel: any) { }

    async registerDevice(req: any, res: any) {
        let data = req.body.data;
        try {
            const {
                1: meter_id,
                2: device_type,
                3: device_model,
                4: latitude,
                5: longitude,
                6: address,
                7: type,
                8: conn_name
            } = data;


            // Check if device with this deviceId already exists
            const existingDevice = await this.deviceModel.findOne({ meter_id });
            if (existingDevice) {
                return res.status(400).json({ message: 'Device with this ID already exists' });
            }

            // Create new device
            const newDevice = new this.deviceModel({
                meter_id,
                device_type,
                device_model,
                latitude,
                longitude,
                address,
                type,
                conn_name
            });

            await newDevice.save();
            res.status(201).json({
                message: 'Device registered successfully',
                device: newDevice
            });
        } catch (error) {
            res.status(500).json({ message: 'Error registering device', error });
        }
    }

    async getDevices(req: any, res: any) {
        try {
            const devices = await this.deviceModel.find();
            res.status(200).json(devices);
        } catch (error) {
            res.status(500).json({ message: 'Error retrieving devices', error });
        }
    }

    async getDeviceById(req: any, res: any) {
        try {
            const { deviceId } = req.params;
            const device = await this.deviceModel.findOne({ meter_id: deviceId });

            if (!device) {
                return res.status(404).json({ message: 'Device not found' });
            }

            res.status(200).json(device);
        } catch (error) {
            res.status(500).json({ message: 'Error retrieving device', error });
        }
    }
}

export default DeviceController;