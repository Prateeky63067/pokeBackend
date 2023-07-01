 import express from 'express';
 import {registerController,loginController,testController, forgetPasswordController} from "../controllers/authController.js"
import { isAdmin } from '../middlewares/authMiddleware.js';
  import {requireSignIn} from '../middlewares/authMiddleware.js   '
//  router object

const router=express.Router();

// routing
// Register || Post Method

router.post('/register',registerController)

// Login || POST 

router.post('/login',loginController) 
// forget Password || POST
router.post('/forgot-password',forgetPasswordController)
  
 
router.get('/test',requireSignIn,isAdmin, testController);
// protected user routes auth

router.get("/user-auth",requireSignIn,(req,res)=>{
  res.status(200).send({ok:true});
});
// protected admin routes auth
router.get("/admin-auth",requireSignIn,isAdmin,(req,res)=>{
  res.status(200).send({ok:true});
});
   
export default router 