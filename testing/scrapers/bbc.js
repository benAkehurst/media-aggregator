const puppeteer = require('puppeteer');

const bbc = async (url) => {
  const browser = await puppeteer.launch({
    headless: false,
    args: [
      '--no-sandbox',
      '--disable-setuid-sandbox',
      '--disable-dev-shm-usage',
    ],
    defaultViewport: null,
  });
  const page = await browser.newPage();
  await page.goto(url.url);
  await page.waitFor(3000);
  const result = await page.evaluate(() => {
    let headline = document.querySelector('.gs-c-promo-heading').innerText;
    return headline;
  });
  await page.waitFor(1000);
  await page.screenshot({ path: `${url.name}.jpg` });
  // here i need to upload the screenshot to firebase
  newsObject = {
    url: url.url,
    name: url.name,
    screenshot: '',
    headline: result,
  };
  browser.close();
  return newsObject;
};

module.exports = bbc;
