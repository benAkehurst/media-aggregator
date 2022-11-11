const puppeteer = require('puppeteer');
const moment = require('moment');

const { imageUploader } = require('./../../helpers/imageUploader');

exports.mirror = async (url) => {
  const d = new Date();
  const date = moment(new Date()).format('DD/MM/YYYY');

  // Set file name for cloudinary
  const cloudinary_options = {
    public_id: `newsshot/${url.name}_${d}`,
  };

  // Define puppeteer instance
  const browser = await puppeteer.launch({
    headless: false,
    // headless: true,
    // args: [
    //   '--no-sandbox',
    //   '--disable-setuid-sandbox',
    //   '--disable-dev-shm-usage',
    // ],
    defaultViewport: { width: 1440, height: 1080 },
  });

  // Launch scraper
  const page = await browser.newPage();
  await page.setRequestInterception(true);
  const rejectRequestPattern = [
    'googlesyndication.com',
    '/*.doubleclick.net',
    '/*.amazon-adsystem.com',
    '/*.adnxs.com',
  ];
  const blockList = [];
  await page.on('request', (request) => {
    if (rejectRequestPattern.find((pattern) => request.url().match(pattern))) {
      blockList.push(request.url());
      request.abort();
    } else request.continue();
  });
  await page.setUserAgent(
    'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/78.0.3904.97 Safari/537.36'
  );
  await page.goto(url.url);

  // Cookie Banner
  await page.waitForSelector('#qc-cmp2-ui');
  await page.evaluate(() => {
    document.querySelectorAll('[mode="primary"]')[0].click();
  });

  // extract headline
  await page.waitForSelector('.story__title');
  const headline = await page.evaluate(() => {
    let headline = document.querySelector('.story__title').innerText;
    return headline;
  });

  await page.waitForNetworkIdle();

  // Take Screenshot
  let shotResult = await page
    .screenshot()
    .then((result) => {
      console.log(`${url.name} got some results.`);
      return result;
    })
    .catch((e) => {
      console.error(`[${url.name}] Error in snapshotting news`, e);
      return false;
    });

  // Upload screenshot to Cloudinary
  let generateScreenshotAndNewsObj = await imageUploader(
    shotResult,
    cloudinary_options
  ).then((res) => {
    return (newsObject = {
      url: url.url,
      name: url.name,
      date: date,
      headline: headline,
      screenshotUrl: res.secure_url,
    });
  });

  // Close browser
  browser.close();
  return generateScreenshotAndNewsObj;
};
