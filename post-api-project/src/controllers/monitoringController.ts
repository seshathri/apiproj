class MonitoringController {
  constructor(private monitoringModel: any, private deviceModel: any) {}

  async recordMonitoringData(req: any, res: any) {
    let data = req.body.data;
    try {
      const {
        1: meter_id,
        2: device_type,
        3: meter_status,
        4: conn_status,
        5: current_reading,
        6: reverse_flow,
        7: total_flow,
        8: flow_rate
      } = data;

      // Check if device exists
      const device = await this.deviceModel.findOne({ meter_id });
      if (!device) {
        return res.status(404).json({ message: 'Device not found' });
      }

      // Create new monitoring record
      const newMonitoringData = new this.monitoringModel({
        meter_id,
        device_type,
        meter_status,
        conn_status,
        current_reading,
        reverse_flow,
        total_flow,
        flow_rate,
        timestamp: new Date()
      });

      await newMonitoringData.save();
      
      res.status(201).json({
        message: 'Monitoring data recorded successfully',
        data: newMonitoringData
      });
    } catch (error) {
      res.status(500).json({ message: 'Error recording monitoring data', error });
    }
  }

  async getMonitoringData(req: any, res: any) {
    try {
      const { meter_id, from, to } = req.query;
      
      const query: any = {};
      
      if (meter_id) {
        query.meter_id = meter_id;
      }
      
      if (from || to) {
        query.timestamp = {};
        if (from) {
          query.timestamp.$gte = new Date(from);
        }
        if (to) {
          query.timestamp.$lte = new Date(to);
        }
      }
      
      const monitoringData = await this.monitoringModel.find(query).sort({ timestamp: -1 });
      
      res.status(200).json(monitoringData);
    } catch (error) {
      res.status(500).json({ message: 'Error retrieving monitoring data', error });
    }
  }

  async getLatestMonitoringData(req: any, res: any) {
    try {
      const { meter_id } = req.params;
      
      const latestData = await this.monitoringModel
        .findOne({ meter_id })
        .sort({ timestamp: -1 });
        
      if (!latestData) {
        return res.status(404).json({ message: 'No monitoring data found for this device' });
      }
      
      res.status(200).json(latestData);
    } catch (error) {
      res.status(500).json({ message: 'Error retrieving latest monitoring data', error });
    }
  }
}

export default MonitoringController;