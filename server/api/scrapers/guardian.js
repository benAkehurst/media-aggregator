const puppeteer = require('puppeteer');
const cloudinary = require('cloudinary').v2;
const moment = require('moment');

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.API_KEY,
  api_secret: process.env.API_SECRET,
});

const guardian = async (url) => {
  const d = new Date();
  const date = moment(new Date()).format('DD/MM/YYYY');
  const cookieOkButton = '.css-16q7h4-button-defaultSize-iconDefault-iconLeft';

  // Set file name for cloudinary
  const cloudinary_options = {
    public_id: `newsshot/${url.name}_${d}`,
  };

  // Define puppeteer instance
  const browser = await puppeteer.launch({
    headless: true,
    args: [
      '--no-sandbox',
      '--disable-setuid-sandbox',
      '--disable-dev-shm-usage',
    ],
    defaultViewport: { width: 1920, height: 1080 },
  });

  // Launch scraper
  const page = await browser.newPage();
  await page.goto(url.url);
  await page.waitFor(3000);

  // Close cookie popup
  let checkCookie = await page.evaluate((cookieOkButton) => {
    let isCookieButton = document.querySelector(cookieOkButton);
    return !isCookieButton && true;
  });
  checkCookie ? await page.click(cookieOkButton) : await page.waitFor(500);

  // Hide ad at page top
  await page.evaluate(() => {
    let topAd = document.querySelector('.top-banner-ad-container');
    topAd.style.display = 'none';
  });

  // Extract headline
  const headline = await page.evaluate(() => {
    let headline = document.querySelector(
      '.u-faux-block-link__overlay.js-headline-text'
    ).innerText;
    return headline;
  });
  await page.waitFor(1000);

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
  let generateScreenshotAndNewsObj = cloundinaryPromise(
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

function cloundinaryPromise(shotResult, cloudinary_options) {
  return new Promise(function (res, rej) {
    cloudinary.uploader
      .upload_stream(cloudinary_options, function (error, cloudinary_result) {
        if (error) {
          console.error('Upload to cloudinary failed: ', error);
          rej(error);
        }
        res(cloudinary_result);
      })
      .end(shotResult);
  });
}

module.exports = guardian;
