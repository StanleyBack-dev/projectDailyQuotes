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

// ROTA PARA BUSCAR TODAS AS BIOGRAFIAS DOS AUTORES
router.get('/authors', getAllAuthorsController);

// ROTA PARA BUSCAR A BIOGRAFIA DE UM AUTOR ESPECÍFICO
router.get('/authors/uid', getAuthorByUidController);

// ROTA PARA BUSCAR A BIOGRAFIA DE UM AUTOR ESPECÍFICO
router.get('/quotes', getAllQuotesController);

// ROTA PARA BUSCAR A BIOGRAFIA DE UM AUTOR ESPECÍFICO
router.get('/quotes/uid', getQuoteByIdController);

export default router;