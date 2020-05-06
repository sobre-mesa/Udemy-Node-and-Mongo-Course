const fs = require('fs');
const Tour = require('../models/tourModel');
const APIFeatures = require('../utils/features');


const throwError = (e, r) => {
  return r.status(400).json({
    status: 'failed',
    message: e.message
  })
}


exports.aliasTopTours = (req, res, next) => {
  req.query.page = '1';
  req.query.limit = '5';
  req.query.sort = 'price';
  next();
};

exports.getAllTours = async (req, res) => {

  try {
    const features = new APIFeatures(Tour, req)
      .filter()
      .sort()
      .select()
      .pagination();
    const tours = await features.query;

    res.status(200).json({
      status: 'success',
      results: tours.length,
      data: {
        tours
      }
    })
  }
  catch (err) {
    throwError(err, res);
  }
};

exports.getTour = async (req, res) => {
  try {
    const tour = await Tour.findById(req.params.id);
    res.status(200).json({
      status: 'success',
      data: {
        tour
      }
    })
  }
  catch (err) {
    throwError(err, res);
  }
}

exports.updateTour = async (req, res) => {
  try {
    const tour = await Tour.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true
    });
    res.status(200).json({
      status: 'success',
      data: {
        tour
      }
    })
  }
  catch (err) {
    throwError(err, res);
  }
}

exports.deleteTour = async (req, res) => {
  try {
    await Tour.findByIdAndDelete(req.params.id);
    res.status(204).json({
      status: 'success',
    })
  }
  catch (err) {
    throwError(err, res);
  }
}

exports.newTour = async (req, res) => {
  try {
    const newTour = await Tour.create(req.body);
    res.status(201).json({
      status: 'success',
      data: {
        tour: newTour
      }
    });
  }
  catch (err) {
    throwError(err, res);
  }
}
