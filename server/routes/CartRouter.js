import { addCart, removeCart, getCart } from "../controllers/cartController.js";
import express from "express";
import authMiddleware from "../middleware/auth.js";

const cartRouter = express.Router()

cartRouter.post('/add',authMiddleware,addCart)
cartRouter.post('/remove',authMiddleware,removeCart)
cartRouter.post('/get',authMiddleware,getCart)

export default cartRouter