import userModel from '../models/userModel.js'
import { comparePassword, hashPassword } from '../helpers/authHelper.js'
import JWT from "jsonwebtoken"
export const registerController= async(req,res)=>{
    try {
        const{name,email,password,phone,address,answer}=req.body
        // validation
        if(!name)
        {
            return res.send({message:'Name is Required'})
        }
        if(!email)
        {
            return res.send({message:'email is Required'})
        }
        if(!password)
        {
            return res.send({message:'password is Required'})
        }
        if(!phone)
        {
            return res.send({message:'phone is Required'})
        }
        if(!address)
        {
            return res.send({message:'address is Required'})
        }
        if(!answer)
        {
            return res.send({message:'answer is Required'})
        }
        // checkUser
        const existingUser=await userModel.findOne({email:email});
        // existing User
        if(existingUser)
        {
            return res.status(200).send({
                sucess:false,
                message:'Already Register please login'
            })
        }
        // register user

        const hashedPassword=await hashPassword(password); 
        const user= await new userModel({name,email,phone,address,password:hashedPassword,answer}).save();

        res.status(201).send({
            sucess:true,
            message:'User Register Successfully',
            user
        })
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success:false,
            messages:'Error in Registration',
            error
        })
    }
}
//  ============login===========
export const loginController=async (req,res)=>{
       try {
          const {email,password}=req.body
        //   validation
        if(!email || !password)
        {
            return res.status(404).send({
                success:false,
                message:'Inavalid email or password'
            })
        }
           const user=await userModel.findOne({email:email});
           if(!user)
           {
            return res.status(404).send({
                success:false,
                message:"email is not register "
            })
           }
            const match=await comparePassword(password,user.password)
            if(!match)
            {
                return res.status(200).send({
                    success:false,
                    message:"Invalid Password "
                })
            }
            // token
            const token=await JWT.sign({_id:user._id},process.env.JWT_SECRET,{
                expiresIn:"7d"});
            res.status(200).send({
                success:true,
                message:'login successfully',
                user:{
                    name:user.name,
                    email:user.email,
                    phone:user.phone,
                    address:user.address,
                    role:user.role,
                },
                token,
            });
       } catch (error) {
        console.log(error);
        res.status(500).send({
            success:false,
            message:"Error in login",
            error
        })
            
        
       }
};
// forgetPasswordController
export const forgetPasswordController=async(req,res)=>{
    try {
        const {email,answer,newPassword}=req.body
        if(!email)
        {
            res.status(400).send({message:'Email is required'})
        }
        if(!answer)
        {
            res.status(400).send({message:'answer is required'})
        }
        if(!newPassword)
        {
            res.status(400).send({message:'new Password is required'})
        }
        //  check
        const user=await userModel.findOne({email,answer})
        // validation
        if(!user)
        {
            return res.status(400).send({
                success:false,
                message:'Wrong Email or Ansewer'
            })
        }
        const hashed=await  hashPassword(newPassword)
        await userModel.findByIdAndUpdate(user._id,{password:hashed})
        res.status(200).send({
            sucess:true,
            message:'Password Reset Successfully',
        })
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success:false,
            message:'Something Went Wrong ',
            error
        })
    }
}

// test controller

export const testController=(req,res)=>{
    res.send("protected Route"); 
}
