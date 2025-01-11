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
        const cartData = await userData.cartData;
        res.json({success: true, message: "Successfully fetched Cart", data: cartData});
    }catch(err){
        console.log(err)
        res.json({success:false, message: err})
    }
}

export {addCart, removeCart, getCart}