import express from 'express'
import mongoose from 'mongoose';
import dotenv from "dotenv"
import bodyParser from 'body-parser';
import authRouter from './routes/auth.js';
import tasksRouter from './routes/tasks.js';
import cors from 'cors'
import authMiddleware from './middleware/authMiddleware.js';
import BeneficiaryRoute from './routes/beneficary.js';
 const app=express();
    dotenv.config();

    mongoose.connect(process.env.DATABASE_URL).then(()=>{
         console.log('database connected');
    
    })
    app.get("/",(req,res)=>{
               res.send("d hello ")
    })
app.use(cors('*'))
app.use(express.json());
app.use(bodyParser.urlencoded({extended : false}))
app.get('/',()=>{
      res.send('ok !')
})
app.use("/auth",authRouter)
app.use("/tasks",authMiddleware,tasksRouter)
app.use('/api',BeneficiaryRoute)

app.listen(4000)
