import path from "path"
import { foodModel } from "../models/foodModel.js"
import fs from "fs/promises"

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

const foodOrderImages = async (req, res) => {
  const folderPath = "./uploads" // Accept folder path as query parameter
  if (!folderPath) {
    return res
      .status(400)
      .json({ success: false, message: "Folder path is required." });
  }

  try {
    // Resolve the absolute path
    const absolutePath = path.resolve(folderPath);

    // Get all files and directories in the folder
    const files = await fs.readdir(absolutePath);

    return res.json({ success: true, data:files });
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json({
        success: false,
        message: "Error reading the folder.",
        error: error.message,
      });
  }
};

const serveImageFile = async(req, res) => {
  try{
    const __dirname =  path.resolve();
    const imageName = req.params.imageName;
    const imagePath = path.join(__dirname,'uploads',imageName);

    res.sendFile(imagePath, err => {
        if(err){
          console.log(err)
          res.status(404).send({message: "Image not found"})
        }
    })
  }catch(err){
    console.log(err)
    res.json({success: false, message: "Error From ServeImageFile"})
  }
}

const clearFoodList = async(req, res) => {
  try{
    const food_list = await foodModel.find({})
    const food_Deleted = await foodModel.deleteMany({},{new: true})
    res.json({success: true, data: food_list, food_Deleted})
  }catch(err){
    console.log(err)
    res.json({success: false, message: "Error From ClearFoodList"})
  }
}

export {addFood, allFoodItems, removeFood, foodOrderImages, serveImageFile, clearFoodList}

