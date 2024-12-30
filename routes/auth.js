
import express from "express"  
import Joi from "joi"
import User from "../model/authModel.js"
import dotenv from "dotenv"
import  bcrypt from "bcrypt"
import sendRes from "../helper/sendResponse.js"
import jwt from "jsonwebtoken"
const router = express.Router()
 dotenv.config()

const registerSchema = Joi.object({
    name: Joi.string().min(3).max(30).required(),
    fullname: Joi.string().min(3).max(30).required(),
    email: Joi.string().email().required(),
    password: Joi.string().min(6).required(),

})
const loginSchema = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().min(6).required(),
})


router.post("/register",async(req,res)=>{
  const    {error,value } =registerSchema.validate(req.body)
 if(error) return   sendRes(res,404,error?.message,true , null)
      
        const  userFound=await  User.findOne({email : value.email})
           if(userFound) return sendRes(res,404,"user already register",true,null)
            let newUser=new User(value)
           const hashcode=await bcrypt.hash(newUser.password ,10)
          newUser.password =hashcode
     let   newUsers= await  newUser.save()
       
       
    if(newUsers) return sendRes(res,200,"user register",false,newUsers)
        

})
   


router.post("/login",async(req,res)=>{
      const {error,value}=loginSchema.validate(req.body)    
      if(error) return   sendRes(res,404,error?.message,true , null)
        const  userFound=await  User.findOne({email : value.email}).lean() 
    if(!userFound) return  sendRes(res,404,"user not register please resgister",true , null)
    const checkPassword=await bcrypt.compare(value.password , userFound.password)
    if(!checkPassword) return  sendRes(res,404,"in valid password",true , null)
            delete  userFound.password
            const token = jwt.sign({...userFound},process.env.API_SECRET)
        if(userFound) return  sendRes(res,200,"you are succesfully login",true ,{ userFound,token

        })
    


})




export default router