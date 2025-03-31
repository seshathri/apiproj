class AlertController {
  constructor(private alertModel: any, private deviceModel: any) { }

  async createAlert(req: any, res: any) {
    let data = req.body.data;
    try {
      const {
        1: meter_id,
        2: device_type,
        3: meter_type,
        4: alert_id,
        5: alert_type,
        6: alert_severity,
        7: latitude,
        8: longitude
      } = data;

      // Check if device exists
      const device = await this.deviceModel.findOne({ meter_id });
      if (!device) {
        return res.status(404).json({ message: 'Device not found' });
      }

      // Create new alert
      const newAlert = new this.alertModel({
        meter_id,
        device_type,
        meter_type,
        alert_id,
        alert_type,
        alert_severity,
        timestamp: new Date(),
        latitude,
        longitude
      });

      await newAlert.save();

      res.status(201).json({
        message: 'Alert created successfully',
        alert: newAlert
      });
    } catch (error) {
      res.status(500).json({ message: 'Error creating alert', error });
    }
  }

  async getAlerts(req: any, res: any) {
    try {
      const {
        meter_id,
        device_type,
        alert_type,
        alert_severity,
        from,
        to
      } = req.query;

      const query: any = {};

      if (meter_id) query.meter_id = meter_id;
      if (device_type) query.device_type = device_type;
      if (alert_type) query.alert_type = alert_type;
      if (alert_severity) query.alert_severity = alert_severity;

      if (from || to) {
        query.timestamp = {};
        if (from) {
          query.timestamp.$gte = new Date(from);
        }
        if (to) {
          query.timestamp.$lte = new Date(to);
        }
      }

      const alerts = await this.alertModel.find(query).sort({ timestamp: -1 });

      res.status(200).json(alerts);
    } catch (error) {
      res.status(500).json({ message: 'Error retrieving alerts', error });
    }
  }
}

export default AlertController;