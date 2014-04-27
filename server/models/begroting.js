'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
    Schema = mongoose.Schema,
    transfer = require('./additions/transfer');

/**
 * Begroting Schema
 */
var BegrotingSchema = new Schema({
    jaar: {
        type: Number,
        default: new Date().getFullYear(),
        unique: true
    },
    categorieen: [
        {
            naam: {
                type: String,
                default: '',
                trim: true
            },
            transacties: [transfer]
        }
    ]
});

/**
 * Statics
 */
BegrotingSchema.statics.load = function (id, cb) {
    this.findOne({
        _id: id
    }).exec(cb);
};

BegrotingSchema.statics.findByYear = function (year, cb) {
    this.findOne({
        jaar: year
    }).exec(cb);
};

mongoose.model('Begroting', BegrotingSchema, 'begrotingen');