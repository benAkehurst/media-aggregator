const puppeteer = require('puppeteer');
const cloudinary = require('cloudinary').v2;
const moment = require('moment');

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.API_KEY,
  api_secret: process.env.API_SECRET,
});

const bbc = async (url) => {
  const d = new Date();
  const date = moment(new Date()).format('DD/MM/YYYY');

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
    defaultViewport: { width: 1440, height: 1080 },
  });

  // Launch scraper
  const page = await browser.newPage();
  await page.setDefaultNavigationTimeout(0);
  await page.goto(url.url);
  await page.waitForTimeout(3000);

  // Extract headline
  const headline = await page.evaluate(() => {
    let headline = document.querySelector('.gs-c-promo-heading').innerText;
    return headline;
  });
  await page.waitForTimeout(1000);

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

module.exports = bbc;
