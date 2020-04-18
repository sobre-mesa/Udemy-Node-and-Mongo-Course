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
  console.log(req.query)
  next();
};

exports.getAllTours = async (req, res) => {

  try {
    // let query = Tour.find(groomQueryObject(req.query));

    // let sort = req.query.sort;
    // query = sort ? query.sort(parse(sort)) : query;

    // let select = req.query.fields;
    // query =  select ? query.select(parse(select)) : query.select("-__v");

    // let page = req.query.page * 1 || 1;
    // let limit = req.query.limit * 1 || 5;
    // let skip = ( page - 1 ) * limit;
    // const tourCount = await Tour.countDocuments();
    // if(skip > tourCount){
    //   throw new Error('Page doesnt exist');
    // }
    // query =  query.skip(skip).limit(limit);
    const features = new APIFeatures(Tour, req)
      .filter()
      .sort()
      .select()
      .pagination();
    const tours = await features.query;
    console.log(tours)

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
