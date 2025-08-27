import express from 'express';
import { cancelSubscription, createSubscription, getSubscriptions } from '../controller/subscriptionController.js';



const subscriptionRouter = express.Router();


subscriptionRouter.post('/', createSubscription);
subscriptionRouter.get('/', getSubscriptions);
subscriptionRouter.post('/cancel', cancelSubscription);

export default subscriptionRouter;