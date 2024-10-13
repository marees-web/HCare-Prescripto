import validator from 'validator';
import jwt from 'jsonwebtoken'
import bcryptjs from 'bcryptjs'
import {v2 as cloudinary} from 'cloudinary'
import doctorModel from '../models/doctormodel.js'
import appointmentModel from '../models/appointmentModel.js';
import userModel from '../models/userModel.js';

//api for adding doctors
const addDoctor = async (req, res) => {

    try {

        const { name, email, password, speciality, degree, experience, about, fees, address } = req.body
        const imageFile = req.file

        // checking for all data to add doctor
        if (!name || !email || !password || !speciality || !degree || !experience || !about || !fees || !address) {
            return res.json({ success: false, message: "Missing Details" })
        }

        // validating email format
        if (!validator.isEmail(email)) {
            return res.json({ success: false, message: "Please enter a valid email" })
        }

        // validating strong password
        if (password.length < 8) {
            return res.json({ success: false, message: "Please enter a strong password" })
        }

        // hashing user password
        const salt = await bcryptjs.genSalt(10); // the more no. round the more time it will take
        const hashedPassword = await bcryptjs.hash(password, salt)

        // upload image to cloudinary
        const imageUpload = await cloudinary.uploader.upload(imageFile.path, { resource_type: "image" })
        const imageUrl = imageUpload.secure_url

        const doctorData = {
            name,
            email,
            image: imageUrl,
            password: hashedPassword,
            speciality,
            degree,
            experience,
            about,
            fees,
            address: JSON.parse(address),
            date: Date.now()
        }

        const newDoctor = new doctorModel(doctorData)
        await newDoctor.save()
        res.json({ success: true, message: 'Doctor Added' })

    } catch (error) {
        console.log(error)
        res.json({ success: false, message: error.message })
    }
}

//api for admin login
const loginAdmin=async(req,res)=>{
   try {
     const {email,password}=req.body

     if(email === process.env.ADMIN_EMAIL && password === process.env.ADMIN_PASSWORD){
        const token=jwt.sign(email+password,process.env.JWT_SECRET)
        res.json({success:true,token})

     }else{
        res.json({success:false,message:"Invalid Credentials"})
     }

   } catch (error) {
        console.log(error)
        res.json({ success: false, message: error.message })
   }
}
//API to get all doctors list for admin panel
const allDoctors=async(req,res)=>{
    try {
        const doctors=await doctorModel.find({}).select('-password')
        res.json({success:true,doctors})
    } catch (error) {
        console.log(error)
        res.json({ success: false, message: error.message })
    }
}
//Api to get all appointment list
const appointmentsAdmin=async (req,res) => {
    try {
        const appointments=await appointmentModel.find({})
        res.json({success:true,appointments})
    } catch (error) {
        console.log(error)
        res.json({ success: false, message: error.message })
    }
}
//API to cancel appointment
const appointmentCancel = async (req, res) => {
    try {
      const {  appointmentId } = req.body;
      await appointmentModel.findByIdAndUpdate(appointmentId,{cancelled:true});
  
      res.json({ success: true, message: "Appointment Cancelled" });
    } catch (error) {
      console.log(error);
      res.json({ success: false, message: error.message });
    }
  };
  //API to get dashboard for admin
  const adminDashboard=async (req,res) => {
    try {
        const doctors=await doctorModel.find({})
        const users=await userModel.find({})
        const appointments=await appointmentModel.find({})

        const dashData={
            doctors:doctors.length,
            appointments:appointments.length,
            patients:users.length,
            latestAppointments:appointments.reverse().slice(0,5)
        }
        res.json({success:true,dashData})

    } catch (error) {
        console.log(error);
      res.json({ success: false, message: error.message });
    }
  }


export {addDoctor,loginAdmin,allDoctors,appointmentsAdmin,appointmentCancel,adminDashboard}