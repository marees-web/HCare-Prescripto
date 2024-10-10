import express from 'express'
import cors from 'cors';
import 'dotenv/config';
import connectDb from './src/config/mongodb.js';
import connectCloudinary from './src/config/cloudinary.js';
import adminRouter from './src/Routes/adminRoute.js';
import doctorRouter from './src/Routes/doctorRoute.js';
import userRouter from './src/Routes/userRoute.js';

//app config
const app =express()
const port=process.env.port || 2900
connectDb();
connectCloudinary();

//middleware
app.use(express.json());
app.use(cors());

//api endpoint
//localhost:2900/api/admin/add-doctor
app.use('/api/admin',adminRouter)
app.use('/api/doctor',doctorRouter)
app.use('/api/user',userRouter)

app.get('/',(req,res)=>{
    res.send('Api working great')
})

app.listen(port,()=>{
    console.log("Server Started",port)
})