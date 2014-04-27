'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
    Kasboek = mongoose.model('Kasboek'),
    _ = require('lodash');


/**
 * Find kasboek by id
 */
exports.kasboek = function (req, res, next, id) {
    Kasboek.load(id, function (err, kasboek) {
        if (err) return next(err);
        if (!kasboek) return next(new Error('Mislukt om kasboek ' + id + ' te laden'));
        req.kasboek = kasboek;
        next();
    });
};

/**
 * Find kasboek by year
 */
exports.year = function (req, res, next, year) {
    Kasboek.findByYear(year, function (err, kasboek) {
        if (err) return next(err);
        if (!kasboek) return next(new Error('Mislukt om kasboek te laden uit ' + year));
        req.kasboek = kasboek;
        next();
    });
};

/**
 * Create a kasboek
 */
exports.create = function (req, res) {
    var kasboek = new Kasboek(req.body);

    kasboek.save(function (err) {
        if (err) {
            return res.send('users/signup', {
                errors: err.errors,
                kasboek: kasboek
            });
        } else {
            res.jsonp(kasboek);
        }
    });
};

/**
 * Update a kasboek
 */
exports.update = function (req, res) {
    var kasboek = req.kasboek;

    kasboek = _.extend(kasboek, req.body);

    kasboek.save(function (err) {
        if (err) {
            return res.send('users/signup', {
                errors: err.errors,
                kasboek: kasboek
            });
        } else {
            res.jsonp(kasboek);
        }
    });
};

/**
 * Delete a kasboek
 */
exports.destroy = function (req, res) {
    var kasboek = req.kasboek;

    kasboek.remove(function (err) {
        if (err) {
            return res.send('users/signup', {
                errors: err.errors,
                kasboek: kasboek
            });
        } else {
            res.jsonp(kasboek);
        }
    });
};

/**
 * Show a kasboek
 */
exports.show = function (req, res) {
    res.jsonp(req.kasboek);
};

/**
 * List of Kasboeken
 */
exports.all = function (req, res) {
    Kasboek.find().exec(function (err, kasboeken) {
        if (err) {
            res.render('error', {
                status: 500
            });
        } else {
            res.jsonp(kasboeken);
        }
    });
};
