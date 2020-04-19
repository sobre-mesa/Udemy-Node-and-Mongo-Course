const express = require('express');
const { getAllTours, newTour, getTour, updateTour, deleteTour, aliasTopTours, getTourStats, getMonthlyPlan } = require(`${__dirname}/../controllers/tourController.js`);

const tourRouter = express.Router();

tourRouter
  .route('/')
  .get(getAllTours)
  .post(newTour)

  tourRouter
  .route('/t/:id')
  .patch(updateTour)
  .delete(deleteTour)

  tourRouter.route('/top-5-cheap').get(aliasTopTours, getAllTours);

  tourRouter.route('/tour-stats').get(getTourStats);

  tourRouter.route('/month-plan').get(getMonthlyPlan);

module.exports = tourRouter;

