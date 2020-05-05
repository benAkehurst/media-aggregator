# Media Aggregator

## Sites

- [bbc news]('https://www.bbc.co.uk/news')
- [dailymail]('https://www.dailymail.co.uk/home/index.html')
- [yahoo]('https://uk.news.yahoo.com/')
- [the guardian]('https://www.theguardian.com/uk')
- [express]('https://www.express.co.uk/')

- Save an archive of what the news in the uk has on thier website and be able to compare them
  - Every 15 mins go and take a screenshot and copy headline on site
- Save the front page of all major papers in an archive

## Server Architecture

1. CRON job every 15 minutes will call scrape controller
2. Scrape contorller will have a defined array of urls
3. Puppetter function runs where it goes to the url and takes a screenshot and scrapes the headline text

scrape controller

```javascript
const puppet = require('puppeteer');
const
const newsUrls = ['aaaa','bbbb','ccc'];

function scrape = () => {
  let scrapeObjs = [];

  newsUrls.map(url => {
    await puppet(url)
    .then(res => {
      if (res) {
        scrapeObjs.push(res)
      }
    })
    .catch(err => {
      console.log(err)
    })
  });

  if (!scrapeObjs.length) {
    return;
  }

  add scraped objs to collection in db as object:
  scrapeResults = {
    date: new Date.now(),
    data: scrapeObjs
  }
}

async function puppet = (url) => {
  open url
  take screenshot
  upload screenshot to firebase -> get url back
  find headline
  make new object -> {
    url: url,
    screenshot: 'firebase url',
    headline: 'aaaccccvvv',
    time: new Date.now()
  }
  return newsObject
};
```
