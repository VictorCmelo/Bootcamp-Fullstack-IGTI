const express = require('express');
const transactionRouter = express.Router();
const  service = require('../services/transactionService');


transactionRouter.post('/create/', service.create);
transactionRouter.get('/findAll/', service.findAll);
transactionRouter.delete('/:id', service.remove);
transactionRouter.put('/:id', service.update);
transactionRouter.get('/', service.find);
transactionRouter.get('/year/', service.findYear);


module.exports = transactionRouter;
