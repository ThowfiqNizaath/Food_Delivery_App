import path from "path"
import { foodModel } from "../models/foodModel.js"
import fs from "fs"

const addFood = async(req, res) => {
    let image_filename = `${req.file.filename}`
    const {name, description, price, category} = req.body
    
    const food = new foodModel({
        name: name,
        description: description,
        price: Number(price),
        image: image_filename,
        category: category
    })
    await food
      .save()
      .then(() =>
        res.json({ success: true, message: "Food Saved successfully" })
      )
      .catch((err) =>
        res.json({ success: false, message: "Food was not saved successfully" })
      );
}

const allFoodItems = async(req, res) => {
    try{
        const food = await foodModel.find({})
        res.json({success: true, data: food})
    }catch(err){
        console.log(err)
        res.json({success: false, message: err})
    }
}

const removeFood = async(req, res) => {
    try{
       const food = await foodModel.findById(req.body.id)
       await fs.promises.unlink(path.join('uploads',food.image))
       await foodModel.findByIdAndDelete(food._id);
       res.json({success: true, message: 'Food Removed successfully'})
    }catch(err){
        console.log(err)
        res.json({success: false, message: err})
    }
}

export {addFood, allFoodItems, removeFood}

