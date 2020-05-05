'use strict';
module.exports = (app) => {
  const reader = require('../controllers/readerController');

  // Reader Routes
  app
    .route('/api/reader/single-day')
    .post(reader.list_all_clippings_from_single_day);

  app
    .route('/api/reader/single-hour/')
    .post(reader.list_all_clippings_from_hour);

  app
    .route('/api/reader/single-news-source/')
    .post(reader.list_all_clippings_from_news_source);

  app.route('/api/reader/:clippingId').get(reader.read_single_clipping);
};
