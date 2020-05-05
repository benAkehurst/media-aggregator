'use strict';
const mongoose = require('mongoose');
const NewsClipping = mongoose.model('NewsClipping');

const { formatTime } = require('./../../helpers/timeAndDate');

exports.list_all_clippings_from_single_day = (req, res) => {
  /**
   * TODO:
   * query structure: client needs to send DD/MM/YYYY
   * {
        "date":"02/05/2020"
      }
   */
  const date = req.body.date;
  NewsClipping.find({ date: date }, (err, clippings) => {
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
};

exports.list_all_clippings_from_hour = (req, res) => {
  /**
   * TODO:
   * query structure: client needs to send  new Date().getHours() <- this will give a number between 1 & 23
   * {
        "date":"02/05/2020",
        "lowTime":"10",
        "hightTime":"11"
      }
   */
  const date = req.body.date;
  const lowTime = req.body.lowTime;
  const highTime = req.body.highTime;
  const formattedTime = formatTime(date, lowTime, highTime);
  NewsClipping.find({ date: date }, (err, clippings) => {
    if (err) {
      return res.status(500).json({
        error: err,
        message: 'No clippings fround',
      });
    }
    let filteredClippings = clippings.filter((clipping) => {
      const time = new Date(clipping.created_at).getTime();
      console.log(time);
      return formattedTime.lowTime < time && formattedTime.highTime < time
        ? clipping
        : null;
    });
    return res.status(200).json({
      success: true,
      message: 'Clippings found',
      data: filteredClippings,
    });
  });
};

exports.list_all_clippings_from_news_source = (req, res) => {
  const date = req.body.data.date;
  const newsSite = req.body.data.newsSite;
  NewsClipping.find({ date: date, name: newsSite }, (err, clippings) => {
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
};

exports.read_single_clipping = (req, res) => {
  NewsClipping.findById(req.params.clippingId, (err, clipping) => {
    if (err) {
      res.status(400).json({
        status: false,
        message: "Couldn't find clipping",
        code: 400,
      });
    }
    res.status(200).json({
      status: true,
      message: 'Clipping found',
      data: clipping,
    });
  });
};
