import { Router } from 'express';
import AlertController from '../controllers/alertController';
import AlertModel from '../models/alertModel';
import DeviceModel from '../models/deviceModel';

const router = Router();
const alertController = new AlertController(AlertModel, DeviceModel);

router.post('/', (req, res) => alertController.createAlert(req, res));
router.get('/', (req, res) => alertController.getAlerts(req, res));

export default router;