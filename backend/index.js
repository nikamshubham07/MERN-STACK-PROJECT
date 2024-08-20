import express from "express"
import cookieParser from "cookie-parser"
import cors from 'cors'
import mongoose from "mongoose"
import dotenv from "dotenv";
import authRoute from './Routes/auth.js'
import userRoute from './Routes/auth.js'

dotenv.config();
const app = express()


const port = 6000

const corsOptions = {
    origin:true
}

// //  database connection
mongoose.set('strictQuery', false)

const connectDB = async()=>{
    try{
         await mongoose.connect(process.env.MONGO_URL, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        })

        console.log('mongoDB database is connected')
    }
    catch(err){
        console.log('mongoDB database is connection is failed')
    }
}

app.get('/', (req,res)=>{
    res.send('Api is working')
})

app.use(express.json());
app.use(cookieParser());
app.use(cors(corsOptions));
app.use('/api/v1/auth', authRoute)
app.use('/api/v1/users', userRoute)


app.listen(port, () => {
    connectDB();
    console.log(`Server running on port ${port}`);
});
