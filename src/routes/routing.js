import express from 'express';
import { getEmailsController, getCountEmailsController } from '../controllers/getEmailsController.js';
import { createEmailsController } from '../controllers/createEmailsController.js';
import { updateEmailsController } from '../controllers/updateEmailsController.js';

// INITIALIZE EXPRESS SETTINGS
const router = express.Router();

// ROUTE TO CREATING EMAILS IN FIREBASE
router.post('/emails', createEmailsController);

// ROUTE TO FETCH THE EMAILS REGISTERED IN FIREBASE
router.get('/emails', getEmailsController);

// ROUTE TO COUNT HOW MANY READERS ARE SUBSCRIBED
router.get('/emails-count', getCountEmailsController);

// ROUTE TO INACTIVE EMAIL IN FIREBASE
router.put('/emails', updateEmailsController);

export default router;