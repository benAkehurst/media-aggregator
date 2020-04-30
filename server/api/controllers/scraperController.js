const fs = require('fs');
const cron = require('node-cron');

const bbc = require('../scrapers/bbc');
const dm = require('../scrapers/dm');
const yahoo = require('../scrapers/yahoo');
const guardian = require('../scrapers/guardian');
const express = require('../scrapers/express');

const newsUrls = [
  { url: 'https://www.bbc.co.uk/news', name: 'bbc' },
  { url: 'https://www.dailymail.co.uk/home/index.html', name: 'dm' },
  { url: 'https://uk.news.yahoo.com/', name: 'yahoo' },
  { url: 'https://www.theguardian.com/uk', name: 'guardian' },
  { url: 'https://www.express.co.uk/', name: 'express' },
];

exports.scrape = (req, response) => {
  let results = [];
  bbc(newsUrls[0])
    .then((bbcResponse) => {
      results.push(bbcResponse);
      console.log(bbcResponse);
    })
    .catch((err) => console.log(err));
  dm(newsUrls[1])
    .then((dmResponse) => {
      results.push(dmResponse);
      console.log(results);
    })
    .catch((err) => console.log(err));
  yahoo(newsUrls[2])
    .then((yahooResponse) => {
      results.push(yahooResponse);
      console.log(yahooResponse);
    })
    .catch((err) => console.log(err));
  guardian(newsUrls[3])
    .then((guardianResponse) => {
      results.push(guardianResponse);
      console.log(guardianResponse);
    })
    .catch((err) => console.log(err));
  express(newsUrls[4])
    .then((expressResponse) => {
      results.push(expressResponse);
      console.log(expressResponse);
    })
    .catch((err) => console.log(err));
};

// cron.schedule('0 */6 * * *', () => {
//   scrape();
// });
