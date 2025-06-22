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
dotenv.config();

const app = express()
app.use(cors())
app.use(express.json())


connect()

app.use('/api/auth', authRouter)
app.use('/api/blog', blogRouter)
app.use('/api/journal', journalRouter)
app.use('/api/subscribed', subscribedRouter)
app.use('/api/resource', resourceRouter)
app.use('/api/clickAction', clickActionRouter)
app.use('/api/promotion', promotionRouter)



app.listen(5000, () => {
    console.log('Server is running on port 5000')
})
