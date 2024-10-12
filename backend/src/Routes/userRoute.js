import express from "express";
import { bookAppointment, cancelAppointment, getProfile, listAppointment, loginUser, paymentRazorpay, registerUser, updateProfile, verifyRazorpay } from "../controllers/userController.js";
import authUser from "../middleware/authUser.js";
import upload from "../middleware/multer.js";

const userRouter=express.Router()

userRouter.post('/register',registerUser)
userRouter.post('/login',loginUser)

//user-profile
userRouter.get('/get-profile',authUser,getProfile)
//update-profile
userRouter.post('/update-profile',upload.single('image'),authUser,updateProfile)
//book-appointment
userRouter.post('/book-appointment',authUser,bookAppointment)
//list the appointments in my appointment page
userRouter.get('/appointments',authUser,listAppointment)
//cancel
userRouter.post('/cancel-appointment',authUser,cancelAppointment);
//payment
userRouter.post('/payment-razorpay',authUser,paymentRazorpay);
//verify-payment
userRouter.post('/verify-razorpay',authUser,verifyRazorpay)
export default userRouter