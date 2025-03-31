import { Router } from 'express';
import DeviceController from '../controllers/deviceController';
import DeviceModel from '../models/deviceModel';

const router = Router();
const deviceController = new DeviceController(DeviceModel);

router.post('/register', (req, res) => deviceController.registerDevice(req, res));
router.get('/', (req, res) => deviceController.getDevices(req, res));
router.get('/:deviceId', (req, res) => deviceController.getDeviceById(req, res));

export default router;