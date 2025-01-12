import orderModel from "../models/orderModel.js";
import { userModel } from "../models/userModel.js";
import Stripe from "stripe"
import dotenv from "dotenv"

dotenv.config()
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY)

const placeOrder = async(req,res) => {
    try{
        const {userId, items, amount, address} = req.body;
        const newOrder = await new orderModel({
            userId: userId,
            items: items,
            amount: Number(amount),
            address: address,
        })
        await newOrder.save()
        await userModel.findByIdAndUpdate(req.body.userId, {cartData:{}})

        const line_items = req.body.items.map(item => ({
            price_data:{
                currency: "inr",
                product_data:{
                    name: item.name
                },
                unit_amount: item.price * 100 * 80
            },
            quantity: item.quantity
        }))
        line_items.push({
            price_data: {
                currency: "inr",
                product_data: {
                    name: "Delevery Charges"
                },
                unit_amount: 5*100*80
            },
            quantity: 1
        })
        const session = await stripe.checkout.sessions.create({
          line_items: line_items,
          mode: "payment",
          success_url: `${process.env.FRONTEND_URL}/verify?success=true&orderId=${newOrder._id}`,
          cancel_url: `${process.env.FRONTEND_URL}/verify?success=false&orderId=${newOrder._id}`,
        });
        
        res.json({success: true, session_url: session.url})
    }catch(err){
        // console.log(err)
        res.json({success: false, message: err})
    }
}

const verifyOrder = async(req, res) => {
    try{
        const {orderId, success} = req.body;
        if(success == "true"){
            await orderModel.findByIdAndUpdate(orderId,{payment: true})
            res.json({success: true, message: "Paid Successfully"})
        }else{
            await orderModel.findByIdAndDelete(orderId)
            res.json({success: false, message: "Not Paid"})
        }
    }catch(err){
        res.json({success: false, message: "Error from OrderModel"})
    }
}

const userOrders = async(req, res) => {
    try{
        const orders = await orderModel.find({userId: req.body.userId})
        res.json({success: true, data: orders})
    }catch(err){
        console.log(err)
        res.json({success: false, message: "Error from userOrders"})
    }
}

const listOrders = async(req,res) => {
    try{
        const orders = await orderModel.find({});
        res.json({success: true, data: orders})
    }catch(err){
        console.log(err)
        res.json({success: false, message: "Error from listOrders"})
    }
}


const updateStatus = async(req, res) => {
    try{
        const updatedStatus = await orderModel.findByIdAndUpdate(req.body.orderId,{status: req.body.status},{new: true})
        res.json({success: true, message: "Successfully Updated Order Status"})
    }catch(err){
        console.log(err);
        res.json({success: false, message: "Error from updateStatus"})
    }
}

export {placeOrder, verifyOrder, userOrders, listOrders, updateStatus}