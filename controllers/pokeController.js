import userModel from '../models/userModel.js'
import pokemonInfo from '../models/PokemonInfo.js'
import { comparePassword, hashPassword } from '../helpers/authHelper.js'
import JWT from "jsonwebtoken"
export const pokeController= async(req,res)=>{
    try {
        const{id,email,PokeName,health,attack,defense,special_attack,special_defense,speed}=req.body
        // validation
        if(!id)
        {
            return res.send({message:'id is Required'})
        }
        if(!email)
        {
            return res.send({message:'email is Required'})
        }
        if(!PokeName)
        {
            return res.send({message:'PokeName is Required'})
        }
        if(!health)
        {
            return res.send({message:'health is Required'})
        }
        if(!attack)
        {
            return res.send({message:'attack is Required'})
        }
        if(!defense)
        {
            return res.send({message:'defense is Required'})
        }
        if(!special_attack)
        {
            return res.send({message:'special_attack is Required'})
        }
        if(!special_defense)
        {
            return res.send({message:'special_defense is Required'})
        }
        if(!speed)
        {
            return res.send({message:'speed is Required'})
        }
        // checkUser
        const existingUser=await pokemonInfo.findOne({PokeName:PokeName});
        // existing User
        if(existingUser)
        {
            return res.status(200).send({
                sucess:false,
                message:'Already Adopted by someone..choose another'
            })
        }
        // register user

       
        const pokeuser= await new pokemonInfo({id,email,PokeName,health,attack,defense,special_attack,special_defense,speed}).save();

        res.status(201).send({
            sucess:true,
            message:'Pokemon Adopted Successfully',
            pokeuser
        })
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success:false,
            messages:'Error in Adpotation',
            error
        })
    }
}
// get details
export const pokedetails= async(req,res)=>{
    
    try {
        const { email } = req.query;
      const users = await pokemonInfo.find({ email });
  
      if (users.length === 0) {
        return res.send({ message: 'No users found' });
      }
  
      res.json(users);
    } catch (error) {
      res.status(500).send({ message: 'Error retrieving user data' });
    }
}
export const getAllPokemon= async(req,res)=>{
    
    try {
        
      const users = await pokemonInfo.find();
  
      
  
      res.json(users);
    } catch (error) {
      res.status(500).send({ message: 'Error retrieving user data' });
    }
}
// get All pokemon


