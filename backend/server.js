import  express from'express'
import dotenv from'dotenv'
import cors from'cors'
import connectDB from "./config/db.js";
import cookieParser from 'cookie-parser';
import authRouter from './routes/auth.routes.js'
import userRouter from './routes/user.routes.js';

dotenv.config()
connectDB()

const app = express()

console.log(process.env.SMTP_USER)

// middleware 

app.use(express.json())
app.use(cookieParser())
app.use(express.urlencoded({ extended: true }));
app.use(cors({
  origin: 'http://localhost:5173',
  credentials: true
}));

// default route 
app.get('/' ,(req,res) =>{
    res.send('Server is running api is working')
})


// api end points 

app.use('/api/auth' , authRouter)
app.use('/api/user',userRouter)

const PORT = process.env.PORT || 4000
app.listen(PORT, () => console.log(`Server running on port ${PORT}`))
