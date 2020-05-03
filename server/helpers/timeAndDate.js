const moment = require('moment');

exports.formatTime = (date, lowTime, highTime) => {
  const parsedDate = date;
  const parsedLowTime = parseInt(lowTime);
  const parsedHighTime = parseInt(highTime);

  // iso low = date + lowtime
  // iso high = date + hightime

  return { lowtime: new Date(), hightime: new Date() };
};
