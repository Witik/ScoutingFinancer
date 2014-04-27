'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
    Transactie = mongoose.model('Transactie'),
    _ = require('lodash');


/**
 * Load transactie by id
 */
exports.transactie = function (req, res, next, id) {
    Transactie.load(id, function (err, transactie) {
        if (err) return next(err);
        if (!transactie) return next(new Error('Mislukt om transactie ' + id + ' te laden'));
        req.transactie = transactie;
        next();
    });
};

/**
 * Find transacties by transaction year
 */
exports.transactionYear = function (req, res, next, year) {
    Transactie.findByTransactionYear(year, function (err, transactie) {
        if (err) return next(err);
        if (!transactie) return next(new Error('Mislukt om transacties te laden uit ' + year));
        req.transactie = transactie;
        next();
    });
};

/**
 * Find transacties by receipt year
 */
exports.receiptYear = function (req, res, next, year) {
    Transactie.findByReceiptYear(year, function (err, transactie) {
        if (err) return next(err);
        if (!transactie) return next(new Error('Mislukt om transacties te laden met bonnen uit ' + year));
        req.transactie = transactie;
        next();
    });
};

/**
 * Create a transactie
 */
exports.create = function (req, res) {
    var transactie = new Transactie(req.body);

    transactie.save(function (err) {
        if (err) {
            return res.send('users/signup', {
                errors: err.errors,
                transactie: transactie
            });
        } else {
            res.jsonp(transactie);
        }
    });
};

/**
 * Update a transactie
 */
exports.update = function (req, res) {
    var transactie = req.transactie;

    transactie = _.extend(transactie, req.body);

    transactie.save(function (err) {
        if (err) {
            return res.send('users/signup', {
                errors: err.errors,
                transactie: transactie
            });
        } else {
            res.jsonp(transactie);
        }
    });
};

/**
 * Delete a transactie
 */
exports.destroy = function (req, res) {
    var transactie = req.transactie;

    transactie.remove(function (err) {
        if (err) {
            return res.send('users/signup', {
                errors: err.errors,
                transactie: transactie
            });
        } else {
            res.jsonp(transactie);
        }
    });
};

/**
 * Show a transactie
 */
exports.show = function (req, res) {
    res.jsonp(req.transactie);
};

/**
 * List of Transacties
 */
exports.all = function (req, res) {
    Transactie.find().exec(function (err, transacties) {
        if (err) {
            res.render('error', {
                status: 500
            });
        } else {
            res.jsonp(transacties);
        }
    });
};
/**
 * List of open Transacties
 */
exports.open = function (req, res) {
    Transactie.find({ openstaand: true }).exec(function (err, transacties) {
        if (err) {
            res.render('error', {
                status: 500
            });
        } else {
            res.jsonp(transacties);
        }
    });
};
