import mongoose from "mongoose";
const PokemonInfo = new mongoose.Schema(
  { id:{
    type: Number,
    required: true,
  },
    email:{
      type:String,
      required:true,
    },
    PokeName: {
      type: String,
      required: true,
      unique: true,
    },
    health: {
      type: Number,
      required: true,
    },
    attack: {
      type: Number,
      required: true,
    },
    defense: {
      type: Number,
      required: true,
    },
    special_attack: {
      type: Number,
      required: true,
    },
    special_defense: {
      type: Number,
      required: true,
    },
    speed: {
      type: Number,
      required: true,
    },
  },
  { timestamps: true }
);

export default mongoose.model("PokeInfos", PokemonInfo);
