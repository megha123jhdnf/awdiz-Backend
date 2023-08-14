import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import User from './Modals/User.modal.js'

const app = express();
dotenv.config();
app.use(express.json());

// CRUD -  CREATE  READ  UPDATE     DELETE
// METHOD- POST    GET   PATCH/PUT   DELETE

app.get("/",function(req,res){
    res.send("working..")
})
app.post('/login', function(req,res){
    res.send("Hello from login function")

})
app.post('/register', async function(req,res){
    console.log(req.body,"req.body")
    const {name,surname,age,number,email,password,confirmpassword} = req.body;
    if(!name) return res.send("Name is missing");
    if (!surname) return res.send("Surname is missing..")
    if (!age) return res.send("Age is missing..")
    if (!email) return res.send("Email is required.")
    if (!number) return res.send("Number is required");
    if (!password) return res.send("Password is required");
    if (!confirmpassword) return res.send("Confirm password is required!")
    if (password !== confirmpassword) return res.send("Password and Confirm password not matched.")

    const user = new User({
        name:name,
        surname:surname,
        age:age,
        number,
        email,
        password
    })
    // console.log(user,"user")

    await user.save()
    res.send("registeration done")

})

mongoose.connect(process.env.MONGO_URL).then(()=>{
    console.log("Connected to db")
})

app.listen(8000,()=>{
    console.log("listening on port 8000")
})