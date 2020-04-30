const fs = require('fs');
const puppeteer = require('puppeteer');

const dm = require('./scrapers/dm');

const newsUrls = [
  // { url: 'https://www.bbc.co.uk/news', name: 'bbc' },
  { url: 'https://www.dailymail.co.uk/home/index.html', name: 'dm' },
];

let scrape = async () => {
  dm(newsUrls[0])
    .then((res) => console.log(res))
    .catch((err) => console.log(err));
};

scrape();
