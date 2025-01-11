import express from "express";
import multer from "multer";
import { addFood, allFoodItems, removeFood } from "../controllers/foodController.js";

//Router
const foodRouter = express.Router();


//multer config
const storage = multer.diskStorage({
    destination: 'uploads',
    filename: (req, file, cb) => {
        return cb(null, `${Date.now()}${file.originalname}`)
    }
})

const uploads = multer({storage: storage})

foodRouter.post("/add", uploads.single('image'), addFood);
foodRouter.get("/list", allFoodItems)
foodRouter.post('/remove', removeFood)

export {foodRouter };