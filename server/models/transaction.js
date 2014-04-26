'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
    Schema = mongoose.Schema,
    transfer = require('./transfer');

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
    betreft: {
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

mongoose.model('Transactie', TransactieSchema);