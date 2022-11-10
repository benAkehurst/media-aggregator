const mongoose = require('mongoose');
const NewsClipping = mongoose.model('NewsClipping');

const { formatTime } = require('./../../helpers/timeAndDate');

exports.listAllClippingsFromSingleDay = async (req, res) => {
  /**
   * query structure: ?date=08/11/2022
   */
  const { date } = req.query;
  if (!date) {
    return res.status(400).json({
      success: false,
      message: `no date provided`,
    });
  }
  try {
    NewsClipping.find({ date: date }, (err, clippings) => {
      if (err) {
        return res.status(500).json({
          error: err,
          message: 'No clippings fround',
        });
      }
      return res.status(200).json({
        message: 'All clippings',
        data: clippings,
      });
    });
  } catch (error) {
    return res.status(500).json({
      error: err,
      message: 'error getting all clippings from date',
    });
  }
};

exports.listAllClippingsFromHour = async (req, res) => {
  /**
   * query structure: ?date=10/11/2022&lowTime=13&highTime=14
   */
  const { date, lowTime, highTime } = req.query;
  const formattedTime = await formatTime(date, lowTime, highTime);
  if (!date || !lowTime || !highTime) {
    return res.status(400).json({
      success: false,
      message: `no date or times provided`,
    });
  }
  try {
    NewsClipping.find({ date: date }, (err, clippings) => {
      if (err) {
        return res.status(500).json({
          error: err,
          message: 'No clippings fround',
        });
      }
      let filteredClippings = clippings.filter((clipping) => {
        const time = new Date(clipping.created_at).getTime();
        return formattedTime.lowTime < time && formattedTime.highTime < time
          ? clipping
          : null;
      });
      if (filteredClippings.length < 1) {
        return res.status(200).json({
          success: true,
          message: 'No clippings found for this time',
          data: filteredClippings,
        });
      }
      return res.status(200).json({
        success: true,
        message: 'Clippings found',
        data: filteredClippings,
      });
    });
  } catch (error) {
    return res.status(500).json({
      error: err,
      message: 'error getting all clippings from the last hour',
    });
  }
};

exports.listAllClippingsFromNewsSource = async (req, res) => {
  /**
   * query structure: ?newsSite=guardian
   */
  const { newsSite } = req.query;
  if (!newsSite) {
    return res.status(400).json({
      success: false,
      message: `no newsSite provided`,
    });
  }
  try {
    NewsClipping.find({ name: newsSite }, (err, clippings) => {
      if (err) {
        return res.status(500).json({
          error: err,
          message: 'No clippings fround',
        });
      }
      return res.status(200).json({
        success: true,
        message: 'All clippings',
        data: clippings,
      });
    });
  } catch (error) {
    return res.status(500).json({
      error: err,
      message: `error getting all clippings from ${newsSite}`,
    });
  }
};

exports.readSingleClipping = async (req, res) => {
  /**
   * query structure: ?clippingId=636aa3e502bdf34750b261a6
   */
  const { clippingId } = req.query;
  if (!clippingId) {
    return res.status(400).json({
      success: false,
      message: `no id provided`,
    });
  }
  try {
    NewsClipping.findById(req.query.clippingId, (err, clipping) => {
      if (err) {
        res.status(500).json({
          status: false,
          message: "Couldn't find clipping",
        });
      }
      res.status(200).json({
        status: true,
        message: 'Clipping found',
        data: clipping,
      });
    });
  } catch (error) {
    return res.status(500).json({
      error: err,
      message: `error getting all clippings from ${newsSite}`,
    });
  }
};
