const puppeteer = require('puppeteer');

const yahoo = async (url) => {
  const yahooCookieButton = '.btn.primary';
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
  await page.click(yahooCookieButton);
  await page.waitFor(3000);
  await page.evaluate(async () => {
    window.scrollBy(0, 370);
  });
  const result = await page.evaluate(() => {
    console.log(document);
    let headline = document.querySelector('.Mt(0).Td(u):h').innerText;
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

module.exports = yahoo;
