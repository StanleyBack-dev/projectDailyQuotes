import express from 'express';
import { getEmailsController, getCountEmailsController } from '../controllers/emailsController/getEmailsController.js';
import { createEmailsController } from '../controllers/emailsController/createEmailsController.js';
import { updateEmailsController } from '../controllers/emailsController/updateEmailsController.js';
import { getAllAuthorsController, getAuthorByUidController } from '../controllers/authorsController/getAuthorsController.js';
import { getAllQuotesController, getQuoteByIdController } from '../controllers/quotesController/getQuotesController.js';

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

// ROUTE TO SEARCH ALL AUTHORS BIOGRAPHIES
router.get('/authors', getAllAuthorsController);

// ROUTE TO SEARCH FOR A SPECIFIC AUTHOR'S BIOGRAPHY
router.get('/authors/uid', getAuthorByUidController);

// ROUTE TO SEARCH ALL QUOTES
router.get('/quotes', getAllQuotesController);

// ROUTE TO SEARCH FOR CITATION BY A SPECIFIC UID
router.get('/quotes/uid', getQuoteByIdController);

export default router;