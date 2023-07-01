import express from 'express';
import {requireSignIn} from '../middlewares/authMiddleware.js   '
//  router object
import{pokeController,pokedetails,getAllPokemon} from "../controllers/pokeController.js"
const router=express.Router();


// routing
// Register || Post Method


router.post('/pokedetails',pokeController)
router.get('/pokedetail',pokedetails)
router.get('/pokedetails/all',getAllPokemon)



  
export default router 