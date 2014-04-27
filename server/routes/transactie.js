'use strict';

// Articles routes use articles controller
var transactie = require('../controllers/transactie');
var authorization = require('./middlewares/authorization');

module.exports = function (app) {

    /**
     * Routes
     */
    app.get('/transacties', authorization.requiresLogin, transactie.all);
    app.post('/transacties', authorization.requiresAdmin, transactie.create);
    app.get('/transacties/:transactieId', authorization.requiresLogin, transactie.show);
    app.put('/transacties/:transactieId', authorization.requiresAdmin, transactie.update);
    app.delete('/transacties/:transactieId', authorization.requiresAdmin, transactie.destroy);

    app.get('/transacties_openstaand', authorization.requiresLogin, transactie.open);
    app.get('/transacties_jaar/:transactionYear', authorization.requiresLogin, transactie.show);
    app.get('/transacties_bonjaar/:receiptYear', authorization.requiresLogin, transactie.show);

    /**
     * Params
     */
    app.param('transactieId', transactie.transactie);
    app.param('receiptYear', transactie.receiptYear);
    app.param('transactionYear', transactie.transactionYear);

};