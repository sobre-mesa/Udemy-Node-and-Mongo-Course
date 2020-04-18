const express = require('express');
const { getAllTours, newTour, getTour, updateTour, deleteTour, checkId } = require(`${__dirname}/../controllers/tourController.js`);

const tourRouter = express.Router();

tourRouter.param('id', (req, res, next, val) => {
  return checkId(val, res);
  next();
})

tourRouter
  .route('/')
  .get(getAllTours)
  .post(newTour)

tourRouter
  .route('/:id')
  .get(getTour)
  .patch(updateTour)
  .delete(deleteTour)

module.exports = tourRouter;

