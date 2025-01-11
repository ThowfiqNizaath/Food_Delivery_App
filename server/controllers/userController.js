import { userModel } from "../models/userModel.js"
import validate from "validator"
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'

//jwp Token 
const createToken = (id) => {
    return jwt.sign({id},process.env.JWT_SECRET)
}

//Loing User
const loginUser = async(req, res) => {
    const {email, password} = req.body
    try{
        const user = await userModel.findOne({email:email})
        if(!user){
            return res.json({success: false, message: "User not found"})
        }
        const isMatch = await bcrypt.compare(password, user.password)
        if(!isMatch){
            return res.json({success: false, message: "Password mismatch"})
        }
        const token = createToken(user._id)
        return res.json({success: true, token: token, data: user})
    }catch(err){
        console.log(err)
        res.json({success: false, message: err})
    }
}

//signup User
const signupUser = async(req, res) => {
    const {name, email, password} = await req.body;
    try{
        const exist = await userModel.findOne({email})
        if(exist){
            return res.json({success: true, message: "User already exists"})
        }
        //validate
        if(!validate.isEmail(email)){
            return res.json({success:false, message: "Invalid email address"})
        }
        if(password.length < 8){
           return res.json({success: false, message: "Invalid password, Password must be Strong"})
        }
        const salt = await bcrypt.genSalt(10)
        const hashedPassword = await bcrypt.hash(password,salt) 

        const newUser = new userModel({
            name: name,
            email: email,
            password: hashedPassword
        })
        const user = await newUser.save()
        const token = createToken(user._id)
        return res.json({success: true, token: token})
    }catch(err){
        console.log(err);
        res.json({success: false, message: err})
    }
}

const listAllUser = async(req, res) => {
    try{
        const users = await userModel.find({})
        res.json({success: true, data: users})
    }catch(err){
        console.log(err)
        res.json({success: false, message: err})
    }
}

export {loginUser, signupUser, listAllUser}