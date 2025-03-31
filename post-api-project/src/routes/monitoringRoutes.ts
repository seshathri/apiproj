import { Router } from 'express';
import MonitoringController from '../controllers/monitoringController';
import MonitoringModel from '../models/monitoringModel';
import DeviceModel from '../models/deviceModel';

const router = Router();
const monitoringController = new MonitoringController(MonitoringModel, DeviceModel);

router.post('/', (req, res) => monitoringController.recordMonitoringData(req, res));
router.get('/', (req, res) => monitoringController.getMonitoringData(req, res));
router.get('/latest/:meter_id', (req, res) => monitoringController.getLatestMonitoringData(req, res));

export default router;