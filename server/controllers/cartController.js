import { foodModel } from "../models/foodModel.js";
import { userModel } from "../models/userModel.js";

//add Cart
const addCart = async(req, res) => {
    try{
        const userData = await userModel.findById(req.body.userId);
        let cartData = await userData.cartData;
        if(!cartData[req.body.itemId]){
            cartData[req.body.itemId] = 1
        }else{
            cartData[req.body.itemId] += 1;
        }
        await userModel.findByIdAndUpdate(req.body.userId,{cartData});
        res.json({success: true, message: "Added To Cart"})
    }catch(err){
        console.log(err)
        res.json({success: false, message: err})
    }
}

//remove Cart
const removeCart = async(req, res) => {
     try{
        const userData = await userModel.findById(req.body.userId)
        const cartData = await userData.cartData;
        if(cartData[req.body.itemId] > 0){
            cartData[req.body.itemId] -= 1
        }
        await userModel.findByIdAndUpdate(req.body.userId,{cartData});
        res.json({success: true, message: "Successfully removed from Cart"})
     }catch(err){
        console.log(err)
        res.json({success: false, message: err})
     }
}

//fetch Cart
const getCart = async(req, res) => {
    try{
        const userData = await userModel.findById(req.body.userId)
        const foodList = await foodModel.find({})
        const cartData = await userData.cartData;
        // console.log(userData, "userData")
        // console.log(foodList, "foodList")
        // console.log(cartData, "cartData")
        // const foodIdSet = [...new Set(foodList.map(food => food._id.toString()))]
        // const foodIdSet = new Set(foodList.map(food => food._id.toString()))
        
        // const allItemsExist = Object.entries(cartData).map((item) =>
        //    foodIdSet.includes(item[0].toString()) ? Object.fromEntries(item) : ""
        // );
        // const filteredArray = allItemsExist.filter((item) => item !== "");
        // console.log(filteredArray)
        const foodIdSet = new Set(foodList.map((food) => food._id.toString()));

        const allItemsExist = Object.entries(cartData)
          .filter(([key]) => foodIdSet.has(key))
          .reduce((acc, [key, value]) => {
            acc[key] = value;
            return acc
          }, {})

        return res.json({success: true, message: "Successfully fetched Cart", data: allItemsExist});
    }catch(err){
        console.log(err)
        res.json({success:false, message: err})
    }
}

export {addCart, removeCart, getCart}