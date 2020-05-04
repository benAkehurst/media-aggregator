const mongoose = require('mongoose');
const NewsClipping = mongoose.model('NewsClipping');
const cron = require('node-cron');

const bbc = require('../scrapers/bbc');
const dm = require('../scrapers/dm');
const guardian = require('../scrapers/guardian');
const express = require('../scrapers/express');
const telegraph = require('../scrapers/telegraph');

const newsUrls = [
  { url: 'https://www.bbc.co.uk/news', name: 'bbc' },
  { url: 'https://www.dailymail.co.uk/home/index.html', name: 'dailymail' },
  { url: 'https://www.theguardian.com/uk', name: 'guardian' },
  { url: 'https://www.express.co.uk/', name: 'express' },
  { url: 'https://www.telegraph.co.uk/', name: 'telegraph' },
  { url: 'https://www.independent.co.uk/', name: 'independent' },
  { url: 'https://www.mirror.co.uk/', name: 'mirror' },
  { url: 'https://www.channel4.com/news/', name: 'channel4' },
];

exports.scrapeV1 = (req, response) => {
  bbc(newsUrls[0])
    .then((bbcResponse) => {
      createNewClipping(bbcResponse).then((saveRes) => {
        console.log(saveRes);
      });
    })
    .catch((err) => console.log(err));
  dm(newsUrls[1])
    .then((dmResponse) => {
      createNewClipping(dmResponse).then((saveRes) => {
        console.log(saveRes);
      });
    })
    .catch((err) => console.log(err));
  guardian(newsUrls[2])
    .then((guardianResponse) => {
      createNewClipping(guardianResponse).then((saveRes) => {
        console.log(saveRes);
      });
    })
    .catch((err) => console.log(err));
  express(newsUrls[3])
    .then((expressResponse) => {
      createNewClipping(expressResponse).then((saveRes) => {
        console.log(saveRes);
      });
    })
    .catch((err) => console.log(err));
  telegraph(newsUrls[4])
    .then((telegraphResponse) => {
      createNewClipping(telegraphResponse).then((saveRes) => {
        console.log(saveRes);
      });
    })
    .catch((err) => console.log(err));
};

// scrape = (req, response) => {
//   bbc(newsUrls[0])
//     .then((bbcResponse) => {
//       createNewClipping(bbcResponse).then((saveRes) => {
//         console.log(saveRes);
//       });
//     })
//     .catch((err) => console.log(err));
//   dm(newsUrls[1])
//     .then((dmResponse) => {
//       createNewClipping(dmResponse).then((saveRes) => {
//         console.log(saveRes);
//       });
//     })
//     .catch((err) => console.log(err));
//   guardian(newsUrls[2])
//     .then((guardianResponse) => {
//       createNewClipping(guardianResponse).then((saveRes) => {
//         console.log(saveRes);
//       });
//     })
//     .catch((err) => console.log(err));
// express(newsUrls[3])
//   .then((expressResponse) => {
//     createNewClipping(expressResponse).then((saveRes) => {
//       console.log(saveRes);
//     });
//   })
//   .catch((err) => console.log(err));
// telegraph(newsUrls[4])
//   .then((telegraphResponse) => {
//     createNewClipping(telegraphResponse).then((saveRes) => {
//       console.log(saveRes);
//     });
//   })
//   .catch((err) => console.log(err));
// };

createNewClipping = (clipping) => {
  let newClipping = new NewsClipping({
    url: clipping.url,
    name: clipping.name,
    date: clipping.date,
    headline: clipping.headline ? clipping.headline : null,
    screenshotUrl: clipping.screenshotUrl,
  });
  return new Promise((resolve, reject) => {
    newClipping.save((err, newClipping) => {
      if (err) {
        return reject({
          error: err,
          message: "Couldn't save new clipping",
          code: 400,
        });
      } else {
        return resolve({
          message: 'clipping saved',
          success: true,
          obj: newClipping,
        });
      }
    });
  });
};

// cron.schedule('*/15 * * * *', () => {
//   scrape();
// });
