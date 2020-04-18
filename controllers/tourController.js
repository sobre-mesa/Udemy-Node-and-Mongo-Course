const fs = require('fs');
const Tour = require('../models/tourModel');

exports.getAllTours = async (req, res) => {
  try {
    const tours = await Tour.find();
    res.status(200).json({
      status: 'success',
      results: tours.length,
      data: {
        tours
      }
    })
  } 
  catch (err) {
    res.status(400).json({
      status: 'failed',
      message: err
    })
  }
};

exports.getTour = async (req, res) => {
  const id = req.params.id;
  try {
    const tour = await Tour.findById(id);
    res.status(200).json({
      status: 'success',
      data: {
        tour
      }
    })
  } 
  catch (err) {
    res.status(400).json({
      status: 'failed',
      message: err
    })
  }
}

exports.updateTour = (req, res) => {
  const id = req.params.id * 1;
  const tour = tours.find(x => x.id === id);
  return res.status(200).json(successfulRes({ tour }));
}

exports.deleteTour = (req, res) => {
  const id = req.params.id * 1;
  const tour = tours.find(x => x.id === id);
  return res.status(200).json(successfulRes({ tour }));
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
    res.status(400).json({
      status: 'failed',
      message: err
    })
  }

}
