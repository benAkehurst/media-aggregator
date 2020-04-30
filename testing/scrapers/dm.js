const puppeteer = require('puppeteer');

const dailyMail = async (url) => {
  const dailyMailCookieOkButton = '.mol-ads-cmp--btn-primary';
  const browser = await puppeteer.launch({
    headless: false,
    args: [
      '--no-sandbox',
      '--disable-setuid-sandbox',
      '--disable-dev-shm-usage',
      `--window-size=${1000},${1000}`,
    ],
  });
  const page = await browser.newPage();
  await page.goto(url.url);
  await page.waitFor(3000);
  await page.click(dailyMailCookieOkButton);
  await page.waitFor(3000);
  await page.evaluate(async () => {
    window.scrollBy(0, 450);
  });
  const result = await page.evaluate(() => {
    let headline = document.querySelector('.linkro-darkred').innerText;
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

module.exports = dailyMail;
