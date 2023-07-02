import express from "express"
import Color from "colors";
import dotenv from 'dotenv';
import morgan from "morgan";
import connectDB from "./config/db.js";
import authRoutes from './routes/authRoutes.js'
import cors from 'cors'
import categoryRoutes from './routes/categoryRoutes.js'
import pokeRoutes from './routes/pokeRoutes.js'
import path from 'path';
import { fileURLToPath } from 'url';
// const path=require('path');
// configure dotenv
dotenv.config();

// database config
connectDB();


// rest object
const app=express();

// middelwares
app.use(
    cors({
      origin: process.env.FRONTEND_URL,
      methods: ["GET", "POST", "PUT", "DELETE"],
      credentials: true,
    })
  );
app.use(express.json());
app.use(morgan('dev'));

// routes
app.use('/api/v1/auth',authRoutes);
app.use('/api/v1/category',categoryRoutes);
app.use('/api/v1/poke',pokeRoutes);
// const __filename = fileURLToPath(import.meta.url);

// const __dirname = path.dirname(__filename);
// app.use(express.static(path.join(__dirname,'./client/build')));
// app.get('*',function(req,res){
// res.sendFile(path.join(__dirname,'./client/build/index.html'));
// })

// rest Api
app.get('/',(req,res)=>{
    res.send("<h1>welcome to eccomerce App</h1>")
})

// PORT
const PORT=process.env.PORT||8080
app.listen(PORT,()=>{
    console.log(`server is running at port number ${PORT}`.bgCyan.white);
})