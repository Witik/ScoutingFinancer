'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

/**
 * Kasboek Schema
 */
var KasboekSchema = new Schema({
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
            transacties: [
                {
                    type: Schema.ObjectId,
                    ref: 'Transactie'
                }
            ]
        }
    ]
});

/**
 * Statics
 */
KasboekSchema.statics.load = function(id, cb) {
    this.findOne({
        _id: id
    }).exec(cb);
};

KasboekSchema.statics.findByYear = function (year, cb) {
    this.findOne({
        jaar: year
    }).exec(cb);
};

mongoose.model('Kasboek', KasboekSchema, 'kasboeken');
