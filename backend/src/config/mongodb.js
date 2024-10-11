import mongoose  from "mongoose";

const connectDb=async()=>{
   
   await mongoose.connect(process.env.MONGODB_URI)
   .then(()=>{
    console.log("Database Connected")
   })
   .catch(()=>{
    console.log("Failed to connect Database")
   })

}

export default connectDb;