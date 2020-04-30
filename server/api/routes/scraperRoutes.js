'use strict';
module.exports = (app) => {
  const scraperController = require('../controllers/scraperController');

  /**
   * User Routes
   */
  app.route('/api/scraper').get(scraperController.scrape);
};
