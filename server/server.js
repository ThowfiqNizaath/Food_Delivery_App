import express from 'express';
import cros from 'cors'
import connectDatabase from './config/connectDB.js';
import dotenv from 'dotenv'
import { foodRouter } from './routes/FoodRouter.js';
import userRouter from './routes/userRouter.js';
import cartRouter from './routes/CartRouter.js';
import orderRouter from './routes/orderRouter.js';
import path from "path"
 
dotenv.config();
//app config
const app = express();
const __dirname = path.resolve();
app.use(express.static("uploads"));

//middleware
app.use(express.json())
app.use(cros())
app.use('/api/food',foodRouter)
app.use('/api/user',userRouter)
app.use('/api/cart',cartRouter)
app.use('/api/order', orderRouter)


//connect Database
connectDatabase()


app.listen(process.env.PORT,() => {
    console.log(`Server listening on ${process.env.PORT}`)
})

