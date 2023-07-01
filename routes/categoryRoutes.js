import express from "express";
import {requireSignIn, isAdmin } from '../middlewares/authMiddleware.js'




const router = express.Router();

// routes

const categoryControler=async(req,res)=>{
    try {
        const {name}=req.body
        if(!name)
        {
            return res.status(401).send({message:"Name is required"})
        }
        const existngCategory=await Category.findOne({name});
        if(existngCategory)
        {
            return res.status(200).send({
                success:true,
                message:"Category Already Exists"

            })
        }
        const category=await new Category({name,slug:slugify(name)}).save()
        res.status(201).send({
            success:true,
            message:'new Category created',
            category
        })

    } catch (error) {
        console.log(error)
        res.status(500).send({
            success:false,
            error,
            message:"Error in category"

        })
    }
};
router.post('/create-category',requireSignIn,isAdmin,categoryControler)
// router.route('/create-category',requireSignIn,isAdmin).post(categoryControler);
// update category

// router.put(
//     "/update-category/:id",
//     requireSignIn,
//     isAdmin,
//     updateCategoryController
//   );
  

export default router

