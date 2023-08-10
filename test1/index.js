import express from "express";
import { Login, Register } from "./controllers/User.controller.js";
import mongoose from "mongoose";

const app = express();

app.get("/", function(req, res){
    res.send("Working")
})

app.get("/login", Login )

// app.get("/login", function(req,res){
//     res.send("Login")

// })
app.get("/register", Register)

// app.get("/register", function (req, res) {
//     res.send("Register")
// })

mongoose.connect("mongodb+srv://meghali:megha123@cluster0.4oyog0q.mongodb.net/awdiz-backend").then(()=>{
    console.log("connected to db.")
}).catch((error)=>{
    console.log("Error while connecting mongodb",error)})

app.listen(8000,()=>{
    console.log("Server listening on port 8000");
})