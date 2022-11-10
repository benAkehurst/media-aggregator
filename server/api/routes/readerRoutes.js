'use strict';
module.exports = (app) => {
  const reader = require('../controllers/readerController');

  // Reader Routes
  app
    .route('/api/reader/single-day/')
    .get(reader.listAllClippingsFromSingleDay);

  app.route('/api/reader/single-hour/').get(reader.listAllClippingsFromHour);

  app
    .route('/api/reader/single-news-source/')
    .get(reader.listAllClippingsFromNewsSource);

  app.route('/api/reader/').get(reader.readSingleClipping);
};
