import express from "express";
import { bookAppointment, getProfile, loginUser, registerUser, updateProfile } from "../controllers/userController.js";
import authUser from "../middleware/authUser.js";
import upload from "../middleware/multer.js";

const userRouter=express.Router()

userRouter.post('/register',registerUser)
userRouter.post('/login',loginUser)

//user-profile
userRouter.get('/get-profile',authUser,getProfile)
//update-profile
userRouter.post('/update-profile',upload.single('image'),authUser,updateProfile)
//
userRouter.post('/book-appointment',authUser,bookAppointment)

export default userRouter