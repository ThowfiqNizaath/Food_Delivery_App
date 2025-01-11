import express from 'express';
import { listAllUser, loginUser, signupUser } from '../controllers/userController.js';

//Router
const userRouter = express.Router();

userRouter.post('/signup', signupUser)
userRouter.post('/login', loginUser)
userRouter.get('/users',listAllUser)

export default userRouter