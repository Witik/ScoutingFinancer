'use strict';

// Articles routes use articles controller
var kasboek = require('../controllers/kasboek');
var authorization = require('./middlewares/authorization');

module.exports = function (app) {

    /**
     * Routes
     */
    app.get('/kasboeken', authorization.requiresLogin, kasboek.all);
    app.post('/kasboeken', authorization.requiresAdmin, kasboek.create);
    app.get('/kasboeken/:kasboekId', authorization.requiresLogin, kasboek.show);
    app.put('/kasboeken/:kasboekId', authorization.requiresAdmin, kasboek.update);
    app.delete('/kasboeken/:kasboekId', authorization.requiresAdmin, kasboek.destroy);

    app.get('/kasboeken/year/:kasboekYear', authorization.requiresLogin, kasboek.show);

    /**
     * Params
     */
    app.param('kasboekId', kasboek.kasboek);
    app.param('kasboekYear', kasboek.year);

};