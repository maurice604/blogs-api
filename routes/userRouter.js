const express = require('express');
const userController = require('../controllers/userController');

const userRouter = express.Router();

userRouter.post('/', userController.createUser);
userRouter.get('/', userController.getAllUsers);
userRouter.get('/:id', userController.getUser);
userRouter.delete('/me', userController.deleteOwnUser);

module.exports = userRouter;
