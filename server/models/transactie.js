'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
    Schema = mongoose.Schema,
    transfer = require('./additions/transfer');

/**
 * Transaction Schema
 */
var TransactieSchema = new Schema({
    datum: {
        type: Date,
        default: Date.now
    },
    bonNummer: {
        type: Number,
        unique: true
    },
    bonDatum: {
        type: Date,
        default: Date.now
    },
    type: {
        type: String,
        default: '',
        trim: true
    },
    begunstigde: {
        type: String,
        default: '',
        trim: true
    },
    omschrijving: {
        type: String,
        default: '',
        trim: true
    },
    kas: transfer,
    giro: transfer,
    openstaand: {
        type: Boolean,
        default: true
    }
});

/**
 * Statics
 */
TransactieSchema.statics.load = function (id, cb) {
    this.findOne({
        _id: id
    }).exec(cb);
};

TransactieSchema.statics.findByTransactionYear = function (year, cb) {
    var start = new Date(year, 0, 1);
    var end = new Date(++year, 0, 1);
    this.find({ datum: {$gte: start, $lt: end}}, cb);
};

TransactieSchema.statics.findByReceiptYear = function (year, cb) {
    var start = new Date(year, 0, 1);
    var end = new Date(++year, 0, 1);
    this.find({ bonDatum: {$gte: start, $lt: end}}, cb);
};

TransactieSchema.statics.findUnclosed = function (cb) {
    this.find({ openstaand: true}, cb);
};

mongoose.model('Transactie', TransactieSchema, 'transacties');