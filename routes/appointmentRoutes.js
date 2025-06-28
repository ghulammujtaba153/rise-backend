import express from 'express';
import { createAppointment, getAppointments } from '../controller/appointmentController.js';


const appointmentRouter = express.Router()

appointmentRouter.post("/", createAppointment)
appointmentRouter.get("/", getAppointments)


export default appointmentRouter