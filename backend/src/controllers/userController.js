import validator from 'validator'
import bcryptjs from 'bcryptjs';
import userModel from '../models/userModel.js';
import jwt from 'jsonwebtoken'
import {v2 as cloudinary} from 'cloudinary'
import doctorModel from '../models/doctormodel.js';
import appointmentModel from '../models/appointmentModel.js';

//API to register user

const registerUser=async(req,res)=>{
    try {
        const {name,email,password}=req.body
        if(!name || !email || !password){
            return res.json({success:false,message:"Missing Details"})
        }
        if(!validator.isEmail(email)){
            return res.json({success:false,message:"Enter valid Email"})
        }
        if(password.length < 8 ){
            return res.json({success:false,message:"Enter a strong Password"})
        }
        //hash password
        const salt=await bcryptjs.genSalt(10)
        const hashedPassword=await bcryptjs.hash(password,salt)

        const userData={
            name,email,password:hashedPassword
        }
       const newUser= new userModel(userData)
       const user =await newUser.save()

       const token=jwt.sign({id:user._id},process.env.JWT_SECRET);

       res.json({success:true,token})

    } catch (error) {
        console.log(error)
        res.json({success:false,message:error.message})
    }
}

//API for user login
const loginUser=async(req,res)=>{
    try {
        const {email,password}=req.body;
        const user=await userModel.findOne({email})
      
        if(!user){
           return  res.json({success:false,message:"User Doen't exists"})
       }

       const isMatch=await bcryptjs.compare(password,user.password)
       
       if(isMatch){
        const token=jwt.sign({id:user._id},process.env.JWT_SECRET)
        res.json({success:true,token})
       }else{
        res.json({success:false,message:"Invalid credentials"})
       }

    } catch (error) {
        console.log(error)
        res.json({success:false,message:error.message})
    }
}
// API to get user-profile
const getProfile=async(req,res)=>{
    try {
        const {userId}=req.body;
        const userData=await userModel.findById(userId).select('-password')
        res.json({success:true,userData})

    } catch (error) {
        console.log(error)
        res.json({success:false,message:error.message})
    }
}
//API to update-profile
const updateProfile=async(req,res)=>{
    try {
        
        const {userId,name,phone,address,dob,gender}=req.body;
        const imageFile=req.file;

        if(!name || !phone || !address || !dob || !gender){
            return res.json({success:false,message:"Data Missing"})
        }
        await userModel.findByIdAndUpdate(userId,{name,phone,address:JSON.parse(address),dob,gender})

        if(imageFile){
            //upload to cloudinary
            const imageUpload=await cloudinary.uploader.upload(imageFile.path,{resource_type:'image'})
            const imageUrl=imageUpload.secure_url;

            await userModel.findByIdAndUpdate(userId,{image:imageUrl})
        }

        res.json({success:true,message:'Profile updated'})
    } catch (error) {
        console.log(error)
        res.json({success:false,message:error.message})
    }
}
//API to book appointment
const bookAppointment=async(req,res)=>{
    try {
        const {userId,docId,slotDate,slotTime}=req.body;
        const docData=await doctorModel.findById(docId).select('-password')
       
        if(!docData.available){
            return res.json({success:false,message:'Doctor not available'})
        }
        let slots_booked=docData.slots_booked

        //checking for slots availability
        if(slots_booked[slotDate]){
            if(slots_booked[slotDate].includes(slotTime)){
                return res.json({success:false,message:'Slot not available'})
            }else{
                slots_booked[slotDate].push(slotTime)
            }
        }else{
            slots_booked[slotDate]=[]
            slots_booked[slotDate].push(slotTime)
        }

       const userData=await userModel.findById(userId).select('-password')
       delete docData.slots_booked;

       const appointmentData={
        userId,docId,userData,docData,amount:docData.fees,slotTime,slotDate,date:Date.now()
       }

       const newAppointment=new appointmentModel(appointmentData)
       await newAppointment.save()

       //save new slots in doc data
       await doctorModel.findByIdAndUpdate(docId,{slots_booked})
       res.json({success:true,message:"Appointment Booked"})


    } catch (error) {
        console.log(error)
        res.json({success:false,message:error.message})
    }
}

export {registerUser,loginUser,getProfile,updateProfile,bookAppointment};