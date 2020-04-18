const fs = require('fs');
const Tour = require('../models/tourModel');

const throwError = (e, r) => r.status(400).json({
  status: 'failed',
  message: e
})

let groomQueryObject = q => {
  const queryObject = {... q}
  const excludedFields = ['page', 'sort', 'limit', 'fields'];
  excludedFields.forEach(el => delete queryObject[el]);
  let queryStr = JSON.stringify(queryObject);
  queryStr = queryStr.replace((/\b(gte|gt|lte|lt)\b/), x => `$${x}`);

  return JSON.parse(queryStr);
}

exports.getAllTours = async (req, res) => {
  try {
    let query = Tour.find(groomQueryObject(req.query));
    let sort = req.query.sort;
    if(sort){
      let sortBy = sort.split(',').join(' ');
      query = query.sort(sortBy);
    }
    const tours = await query;

    res.status(200).json({
      status: 'success',
      results: tours.length,
      data: {
        tours
      }
    })
  }
  catch (err) {
    console.log(err);
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
