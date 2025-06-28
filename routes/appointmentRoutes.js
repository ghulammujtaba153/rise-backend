import express from 'express';
import { createAppointment, getAppointments, updateAppointmentStatus } from '../controller/appointmentController.js';


const appointmentRouter = express.Router()

appointmentRouter.post("/", createAppointment)
appointmentRouter.get("/", getAppointments)
appointmentRouter.put("/status/:id", updateAppointmentStatus)


export default appointmentRouter