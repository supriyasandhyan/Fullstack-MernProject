import express from "express";
import cors  from "cors";
import morgan  from "morgan";
import colors from "colors";
import dotenv from "dotenv";
import connectDb from "./Db/Db.js";
import authRout from "./MVC/Route/authRout.js"
dotenv.config();

const app =express()
const PORT = process.env.PORT || 8000;

//midlewares

app.use(cors())
app.use(morgan('dev'))
app.use(express.json())

// db
connectDb();

//Routes

app.get('/',(req,res)=>{
    res.send({
        massage:"hello supriya"
    })
})

// api 
app.use('/api/v1/user',authRout)


app.listen(PORT,()=>{
    console.log(`Listning to port number ${PORT}`.bgCyan.blue);
})