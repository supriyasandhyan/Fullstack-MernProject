import mongoose  from "mongoose";

const connectDb = async()=>{
    try {
        const connect =await mongoose.connect("mongodb+srv://supriyasandhyan:Mongo%4025@cluster0.joajphx.mongodb.net/users")
        console.log("connected db".bgMagenta.green);
    } catch (error) {
        console.log("mongodb connection fail".bgBlue.red);
    }

}
export default connectDb;