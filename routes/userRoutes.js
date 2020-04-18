
const express = require('express');
const { getAllUsers, newUser, getUser, updateUser, deleteUser } = require(`${__dirname}/../controllers/userController.js`)

const userRouter = express.Router();

userRouter.param('id', (req, res, next, val) => {
  return checkId(val, res);
  next();
})

userRouter
  .route('/')
  .get(getAllUsers)
  .post(newUser)

userRouter
  .route('/:id')
  .get(getUser)
  .patch(updateUser)
  .delete(deleteUser)

module.exports = userRouter;
