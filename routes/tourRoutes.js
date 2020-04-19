const express = require('express');
const { getAllTours, newTour, getTour, updateTour, deleteTour, aliasTopTours, getTourStats } = require(`${__dirname}/../controllers/tourController.js`);

const tourRouter = express.Router();

tourRouter
  .route('/')
  .get(getAllTours)
  .post(newTour)

  tourRouter.route('/top-5-cheap').get(aliasTopTours, getAllTours);

  tourRouter.route('/tour-stats').get(getTourStats);

module.exports = tourRouter;

