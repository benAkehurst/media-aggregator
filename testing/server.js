const fs = require('fs');
const puppeteer = require('puppeteer');

const bbc = require('./scrapers/bbc');
const dm = require('./scrapers/dm');

const newsUrls = [{ url: 'https://www.bbc.co.uk/news', name: 'bbc' }];

let scrape = async () => {
  bbc(newsUrls[0])
    .then((res) => console.log(res))
    .catch((err) => console.log(err));
};

scrape();
