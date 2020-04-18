const express = require('express');
const { getAllTours, newTour, getTour, updateTour, deleteTour, aliasTopTours } = require(`${__dirname}/../controllers/tourController.js`);

const tourRouter = express.Router();

tourRouter
  .route('/')
  .get(getAllTours)
  .post(newTour)

// tourRouter
//   .route('/:id')
//   .get(getTour)
//   .patch(updateTour)
//   .delete(deleteTour)

  tourRouter.route('/top-5-cheap').get(aliasTopTours, getAllTours);

module.exports = tourRouter;

