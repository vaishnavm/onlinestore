import validator from "validator"
import userModel from "../models/userModel.js"
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"

const createToken=(id)=>{
        return jwt.sign({id},process.env.JWT_SECRET)
}


//Rotes for user login
const loginUser=async(req,res)=>{
        try{
                const {email,password}=req.body
                const user=await userModel.findOne({email})

                if(!user){
                        return res.json({success:false, message:"User doesn't exists"})
                }

                const isMatch= await bcrypt.compare(password,user.password)
                
                if(isMatch){
                        const token=createToken(user._id)
                       return res.json({success:true,token })
                }
                else{
                        return res.json({success:false, message:"Invalid credentials"})
                }

        }catch(error){
                console.log(error)
                return res.json({success:false, message:error.message})

        }
}

//Routes for user Registration

const registerUser=async(req,res)=>{
try{
        const {name,email,password}=req.body
        //checking user already exists or not
        const exists=await userModel.findOne({email})
        if(exists){
                return res.json({success : "false", message : "User already exists"})
        }

        //validating email format and strong password 
        if(!validator.isEmail(email)){
                return res.json({success:"fail", message:"Please enter a valid email"})
        }

        if(password.length<8){
                return res.json({success:"fail" , message:"Please enter a strong password"})
        }

        //hashing user password

        const salt=await bcrypt.genSalt(10)   // value can provide between 5 to 15 , more number take more time to generate salt
        const hashedPassword= await bcrypt.hash(password,salt)

        const newUser=new userModel({
                name,
                email,
                password:hashedPassword
        })

        const user=await newUser.save()

        const token=createToken(user._id)
        res.json({success:true, token})

}catch(error){
        console.log(error)
        res.json({success:false, message:error.message})

}
}

//Rotes for admin login

const adminLogin=async (req,res)=>{

}

export { loginUser, registerUser, adminLogin }