'use strict';
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const NewsClippingSchema = new Schema({
  url: {
    type: String,
  },
  name: {
    type: String,
  },
  date: {
    type: Date,
  },
  headline: {
    type: String,
  },
  screenshotUrl: {
    type: String,
  },
});

module.exports = mongoose.model('NewsClipping', NewsClippingSchema);
