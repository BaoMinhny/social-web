import express from "express";
import dotenv from "dotenv";
// import authRoutes from "./routes/auth.routes.js"
import messageRoutes from "./routes/message.routes.js"
import connectToMongoDB from "./db/connectToMongoDb.js";
import cookieParser from "cookie-parser";
import userRoutes from "./routes/users.routes.js"
import postRoutes from "./routes/post.routes.js"
import { v2 as cloudinary } from "cloudinary";
import {app,server} from "../backend/socket/socket.js"
dotenv.config();
const PORT = process.env.PORT || 5000;



cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
});

app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({extended: true}))
app.use(express.json());
app.use(cookieParser());

// app.use("/api/auth", authRoutes);
app.use("/api/messages", messageRoutes);
app.use("/api/users", userRoutes);
app.use("/api/posts", postRoutes)

// app.get("/", (req, res) =>{
//     res.send("hello word");
// });



     
server.listen(PORT, () => {
    console.log(`server running on port ${PORT}`)
    connectToMongoDB();   
});