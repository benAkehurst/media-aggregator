'use strict';
module.exports = (app) => {
  const reader = require('../controllers/readerController');

  // Reader Routes
  app
    .route('/api/reader/single-day/')
    .get(reader.list_all_clippings_from_single_day);

  app
    .route('/api/reader/single-hour/')
    .get(reader.list_all_clippings_from_hour);

  app
    .route('/api/reader/single-news-source/')
    .post(reader.list_all_clippings_from_news_source);

  app.route('/api/reader/').get(reader.read_single_clipping);
};
