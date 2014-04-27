'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
    Begroting = mongoose.model('Begroting'),
    _ = require('lodash');


/**
 * Find begroting by id
 */
exports.begroting = function (req, res, next, id) {
    Begroting.load(id, function (err, begroting) {
        if (err) return next(err);
        if (!begroting) return next(new Error('Mislukt om begroting ' + id + ' te laden'));
        req.begroting = begroting;
        next();
    });
};

/**
 * Find begroting by year
 */
exports.year = function (req, res, next, year) {
    Begroting.findByYear(year, function (err, begroting) {
        if (err) return next(err);
        if (!begroting) return next(new Error('Mislukt om begroting te laden uit ' + year));
        req.begroting = begroting;
        next();
    });
};

/**
 * Create a begroting
 */
exports.create = function (req, res) {
    var begroting = new Begroting(req.body);

    begroting.save(function (err) {
        if (err) {
            return res.send('users/signup', {
                errors: err.errors,
                begroting: begroting
            });
        } else {
            res.jsonp(begroting);
        }
    });
};

/**
 * Update a begroting
 */
exports.update = function (req, res) {
    var begroting = req.begroting;

    begroting = _.extend(begroting, req.body);

    begroting.save(function (err) {
        if (err) {
            return res.send('users/signup', {
                errors: err.errors,
                begroting: begroting
            });
        } else {
            res.jsonp(begroting);
        }
    });
};

/**
 * Delete a begroting
 */
exports.destroy = function (req, res) {
    var begroting = req.begroting;

    begroting.remove(function (err) {
        if (err) {
            return res.send('users/signup', {
                errors: err.errors,
                begroting: begroting
            });
        } else {
            res.jsonp(begroting);
        }
    });
};

/**
 * Show a begroting
 */
exports.show = function (req, res) {
    res.jsonp(req.begroting);
};

/**
 * List of Begrotingen
 */
exports.all = function (req, res) {
    Begroting.find().exec(function (err, begrotingen) {
        if (err) {
            res.render('error', {
                status: 500
            });
        } else {
            res.jsonp(begrotingen);
        }
    });
};