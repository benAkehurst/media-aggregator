'use strict';
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const NewsClippingSchema = new Schema(
  {
    url: {
      type: String,
    },
    name: {
      type: String,
    },
    date: {
      type: String,
    },
    headline: {
      type: String,
    },
    screenshotUrl: {
      type: String,
    },
  },
  { timestamps: { createdAt: 'created_at' } }
);

module.exports = mongoose.model('NewsClipping', NewsClippingSchema);
