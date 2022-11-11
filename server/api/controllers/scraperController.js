const mongoose = require('mongoose');
const NewsClipping = mongoose.model('NewsClipping');
const cron = require('node-cron');
const { NEWS_SOURCES } = require('../../data/newsSources');

const { bbc } = require('../scrapers/bbc');
const { dm } = require('../scrapers/dm');
const { guardian } = require('../scrapers/guardian');
const { express } = require('../scrapers/express');
const { telegraph } = require('../scrapers/telegraph');
const { independent } = require('../scrapers/independent');
const { mirror } = require('../scrapers/mirror');
const { channel4 } = require('../scrapers/channel4');

const newsUrls = NEWS_SOURCES;

const scrapeV1 = async (req, res) => {
  try {
    await bbc(newsUrls[0])
      .then((res) => {
        createNewClipping(res);
        console.log('bbc finished');
      })
      .catch((err) => console.log(err));
    await dm(newsUrls[1])
      .then((res) => {
        createNewClipping(res);
        console.log('daily mail finished');
      })
      .catch((err) => console.log(err));
    await guardian(newsUrls[2])
      .then((res) => {
        createNewClipping(res);
        console.log('gaurdian finished');
      })
      .catch((err) => console.log(err));
    await express(newsUrls[3])
      .then((res) => {
        createNewClipping(res);
        console.log('express finished');
      })
      .catch((err) => console.log(err));
    await telegraph(newsUrls[4])
      .then((res) => {
        createNewClipping(res);
        console.log('telegraph finished');
      })
      .catch((err) => console.log(err));
    await independent(newsUrls[5])
      .then((res) => {
        createNewClipping(res);
        console.log('independent finished');
      })
      .catch((err) => console.log(err));
    await mirror(newsUrls[6])
      .then((res) => {
        createNewClipping(res);
        console.log('mirror finished');
      })
      .catch((err) => console.log(err));
    await channel4(newsUrls[7])
      .then((res) => {
        createNewClipping(res);
        console.log('channel4 finished');
      })
      .catch((err) => console.log(err));
    res.status(200).json({
      status: true,
      message: 'scraper finished run',
    });
  } catch (error) {
    res.status(500).json({
      status: false,
      message: 'something went wrong while scraping',
      error,
    });
  }
};

const createNewClipping = async (clipping) => {
  let newNewsClipping = new NewsClipping({
    url: clipping.url,
    name: clipping.name,
    date: clipping.date,
    headline: clipping.headline ? clipping.headline : null,
    screenshotUrl: clipping.screenshotUrl,
  });
  await newNewsClipping.save();
};

// cron.schedule('*/15 * * * *', () => {
//   scrape();
// });

module.exports = { scrapeV1 };
