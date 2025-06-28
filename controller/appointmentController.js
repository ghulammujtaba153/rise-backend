import Appointment from "../models/appointmentSchema.js";


export const createAppointment = async (req, res) => {
    try {
        const appointment = await Appointment.create(req.body);
        res.status(200).json(appointment);
    } catch (error) {
        res.status(500).json(error);
    }
};



export const getAppointments = async (req, res) => {
    try {
        const appointment = await Appointment.find().populate("userId");
        res.status(200).json(appointment);
    } catch (error) {
        res.status(500).json(error);
    }
}