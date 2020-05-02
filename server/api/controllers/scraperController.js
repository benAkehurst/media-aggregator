const mongoose = require('mongoose');
const NewsClipping = mongoose.model('NewsClipping');
const cron = require('node-cron');

const bbc = require('../scrapers/bbc');
const dm = require('../scrapers/dm');
const yahoo = require('../scrapers/yahoo');
const guardian = require('../scrapers/guardian');
const express = require('../scrapers/express');

const newsUrls = [
  { url: 'https://www.bbc.co.uk/news', name: 'bbc' },
  { url: 'https://www.dailymail.co.uk/home/index.html', name: 'dailymail' },
  { url: 'https://uk.news.yahoo.com/', name: 'yahoo' },
  { url: 'https://www.theguardian.com/uk', name: 'guardian' },
  { url: 'https://www.express.co.uk/', name: 'express' },
  { url: 'https://www.thesun.co.uk/', name: 'sun' },
  { url: 'https://www.telegraph.co.uk/', name: 'telegraph' },
  { url: 'https://www.independent.co.uk/', name: 'independent' },
  { url: 'https://www.mirror.co.uk/', name: 'mirror' },
  { url: 'https://www.channel4.com/news/', name: 'channel4' },
];

exports.scrapeV1 = (req, response) => {
  bbc(newsUrls[0])
    .then((bbcResponse) => {
      createNewClipping(bbcResponse).then((saveRes) => {
        console.log(saveRes);
      });
    })
    .catch((err) => console.log(err));
  dm(newsUrls[1])
    .then((dmResponse) => {
      createNewClipping(dmResponse).then((saveRes) => {
        console.log(saveRes);
      });
    })
    .catch((err) => console.log(err));
  // yahoo(newsUrls[2])
  //   .then((yahooResponse) => {
  //     results.push(yahooResponse);
  //     console.log(yahooResponse);
  //   })
  //   .catch((err) => console.log(err));
  guardian(newsUrls[3])
    .then((guardianResponse) => {
      createNewClipping(guardianResponse).then((saveRes) => {
        console.log(saveRes);
      });
    })
    .catch((err) => console.log(err));
  // express(newsUrls[4])
  //   .then((expressResponse) => {
  //     results.push(expressResponse);
  //     console.log(expressResponse);
  //   })
  //   .catch((err) => console.log(err));
};

createNewClipping = (clipping) => {
  let newClipping = new NewsClipping({
    url: clipping.url,
    name: clipping.name,
    date: clipping.date,
    time: clipping.time,
    headline: clipping.headline,
    screenshotUrl: clipping.screenshotUrl,
  });
  return new Promise((resolve, reject) => {
    newClipping.save((err, newClipping) => {
      if (err) {
        return reject({
          error: err,
          message: "Couldn't save new clipping",
          code: 400,
        });
      } else {
        return resolve({
          message: 'clipping saved',
          success: true,
          obj: newClipping,
        });
      }
    });
  });
};

// cron.schedule('*/15 * * * *', () => {
//   scrape();
// });
