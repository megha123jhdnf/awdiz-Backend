import express from "express";
import { Login, Register } from "./controllers/User.controller.js";

const app = express();

app.get("/", function(req, res){
    res.send("Working")
})

app.get("/login", Login )

// app.get("/login", function(req,res){
//     res.send("Login")

// })

app.get("/register", Register)

// app.get("/register", function(req,res){
//     res.send("Register")
// })

app.listen(8000,()=>{
    console.log("Server listening on port 8000");
})