const fs = require('fs');
const Tour = require('../models/tourModel');

exports.getAllTours = (req, res) => {
  return res.status(200).json(successfulRes({ tours }));
}

exports.getTour = (req, res) => {
  const id = req.params.id * 1;
  const tour = tours.find(x => x.id === id);
  return res.status(200).json(successfulRes({ tour }));
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
