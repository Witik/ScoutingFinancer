'use strict';

// Articles routes use articles controller
var begroting = require('../controllers/begroting');
var authorization = require('./middlewares/authorization');

module.exports = function (app) {

    /**
     * Routes
     */
    app.get('/begrotingen', authorization.requiresLogin, begroting.all);
    app.post('/begrotingen', authorization.requiresAdmin, begroting.create);
    app.get('/begrotingen/:begrotingId', authorization.requiresLogin, begroting.show);
    app.put('/begrotingen/:begrotingId', authorization.requiresAdmin, begroting.update);
    app.delete('/begrotingen/:begrotingId', authorization.requiresAdmin, begroting.destroy);

    app.get('/begrotingyear/:begrotingYear', authorization.requiresLogin, begroting.show);

    /**
     * Params
     */
    app.param('begrotingId', begroting.begroting);
    app.param('begrotingYear', begroting.year);

};