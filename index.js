import express from 'express'
import cors from 'cors'
import connect from './database/db.js'
import dotenv from "dotenv";
import authRouter from './routes/authRoutes.js';
import blogRouter from './routes/blogRoutes.js';
import journalRouter from './routes/journalRoutes.js';
import subscribedRouter from './routes/subscribedRoutes.js';
import resourceRouter from './routes/resourceRoutes.js';
import clickActionRouter from './routes/clickActionRoutes.js';
import promotionRouter from './routes/promotionRoutes.js';
import newsLetterRouter from './routes/newsLetterRoutes.js';
import chatRouter from './routes/chatRoutes.js';
import appointmentRouter from './routes/appointmentRoutes.js';
import Stripe from 'stripe';
import notificationRouter from './routes/notificationRoutes.js';


dotenv.config();




const app = express()
app.use(cors())
app.use(express.json())


connect()


const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

app.use('/api/auth', authRouter)
app.use('/api/blog', blogRouter)
app.use('/api/journal', journalRouter)
app.use('/api/subscribed', subscribedRouter)
app.use('/api/resource', resourceRouter)
app.use('/api/clickAction', clickActionRouter)
app.use('/api/promotion', promotionRouter)
app.use('/api/newsletter', newsLetterRouter)
app.use('/api/chat', chatRouter)
app.use('/api/appointment', appointmentRouter)
app.use("/api/notifications", notificationRouter)




app.post('/create-payment-intent', async (req, res) => {
  try {
    const { amount } = req.body;

    const paymentIntent = await stripe.paymentIntents.create({
      amount,
      currency: 'usd',
      automatic_payment_methods: { enabled: true }, 
    });

    res.json({ clientSecret: paymentIntent.client_secret });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error.message });
  }
});



app.listen(5000, () => {
    console.log('Server is running on port 5000')
})
