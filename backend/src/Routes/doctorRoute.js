import express from "express";
import { appointmentCancel, appointmentComplete, appointmentsDoctor, doctorDashboard, doctorsList, getDoctorProfile, loginDoctor, updateDoctorProfile } from "../controllers/doctorController.js";
import authDoctor from "../middleware/authDoctor.js";

const doctorRouter=express.Router()

doctorRouter.get('/list',doctorsList)
doctorRouter.post('/login',loginDoctor)
doctorRouter.get('/appointments',authDoctor,appointmentsDoctor)
doctorRouter.post('/complete-appointment',authDoctor,appointmentComplete)
doctorRouter.post('/cancel-appointment',authDoctor,appointmentCancel)
doctorRouter.get('/dashboard',authDoctor,doctorDashboard)
doctorRouter.get('/profile',authDoctor,getDoctorProfile)
doctorRouter.post('/update-profile',authDoctor,updateDoctorProfile)

export default doctorRouter;