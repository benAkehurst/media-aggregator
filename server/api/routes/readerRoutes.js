'use strict';
module.exports = (app) => {
  const reader = require('../controllers/readerController');

  // Reader Routes
  app.route('/api/reader/').get(reader.readSingleClipping);
  app.route('/api/reader/news-sources').get(reader.getAllSources);
  app.route('/api/reader/single-hour/').get(reader.listAllClippingsFromHour);
  app
    .route('/api/reader/single-day/')
    .get(reader.listAllClippingsFromSingleDay);
  app
    .route('/api/reader/single-news-source/')
    .get(reader.listAllClippingsFromNewsSource);
};
