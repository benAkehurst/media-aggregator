exports.formatTime = async (date, lowTime, highTime) => {
  const parsedDate = await swapArrayElements(date, 1, 4).join('');
  const parsedLowTime = parseInt(lowTime);
  const parsedHighTime = parseInt(highTime);
  let dateObject = new Date(parsedDate);
  let lowTimeFormatted = dateObject.setHours(parsedLowTime, 0, 0, 0).toString();
  let highTimeFormatted = dateObject
    .setHours(parsedHighTime, 0, 0, 0)
    .toString();
  return { lowTime: lowTimeFormatted, highTime: highTimeFormatted };
};

const swapArrayElements = async (arr, a, b) => {
  let _arr = [...arr];
  let temp = _arr[a];
  _arr[a] = _arr[b];
  _arr[b] = temp;
  return _arr;
};
