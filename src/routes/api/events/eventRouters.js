import express from 'express';
import eventController from '../../../controllers/eventsContoller';
import { isAuthenticated, allowedRoles, checkBlocked } from '../../../middlewares/authorization';
import fileController from '../../../controllers/fileController';
import { fileUploader } from '../../../helpers/fileUploader';
import { ValidationMiddleWare } from '../../../middlewares';

const {
  checkDates, newEventEventValidation, eventImages, eventUpdate,
} = ValidationMiddleWare;
const router = express.Router();

router.post('/', isAuthenticated, allowedRoles([2, 3]), checkBlocked, newEventEventValidation, checkDates, eventController.saveEvent);
router.get('/', eventController.getAllEvent);
router.get('/calender', eventController.getEventCalenderDate);
router.get('/find/:eventId', eventController.getEventById);
router.get('/user', isAuthenticated, allowedRoles([2, 3]), checkBlocked, eventController.getAllEventByUser);
router.get('/findByDates', eventController.findBetween);
router.put('/edit/:eventId', isAuthenticated, allowedRoles([2, 3]), checkBlocked, eventUpdate, eventController.updateEvent);
router.delete('/:eventId', isAuthenticated, allowedRoles([2, 3]), checkBlocked, eventController.deleteEvent);
router.put('/upload/:eventId', isAuthenticated, allowedRoles([2, 3]), fileUploader.any(), fileController.uploadEvents);
router.get('/numberofTicket/:eventId', eventController.getTicketNumber);
router.get('/byNamePlaceDate', eventController.getFillteredEvents1);
router.get('/filter', eventController.getFillteredEvents);
router.post('/images', fileUploader.any(), fileController.setEventImages);
export default router;
