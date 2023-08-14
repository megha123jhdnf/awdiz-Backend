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
        age: parseInt(age),
        number: parseInt(number),
        email: email,
        password: password
    })
    // console.log(user,"user")

    await user.save()
    res.send("registeration done")

})

app.get("/find", async(req,res)=>{
    const {email} = req.body;
    if(!email) return res.send("Email is required..")


        const user = await  User.find({ email: email }).select("-number -age")
        console.log(user,"users list is here")
        if(user.length){
            return res.send(user[0])
        }
        return res.send("no user found.")
        // return res.send("Fetched..")


    // const user = await  User.find({ email: email, number: number })
    // // // return[{array}]
    // // const user = await User.findById(id)
    // // // return {object}
    // // const user = await User.findOne({name : "meghali"})
    // //     // return {object}

})

app.patch("/update/:id", async (req,res)=>{
        const {age,number} = req.body;
        const{ id }= req.params

        if(!id ) return res.send("id  is required..")
        if(!age) return res.send("age is required..")
        if(!number) return res.send("number is required..")

        const updatedUser = await User.findByIdAndUpdate(id, {age, number},{ new:true })
        
        return res.json({message:"data updated", data: updatedUser })

})
// task from sir
app.put("/update/:id", async (req,res)=>{
    const {age,number} = req.body;
    const{ id }= req.params

    if(!id ) return res.send("id  is required..")
    if(!age) return res.send("age is required..")
    if(!number) return res.send("number is required..")

    const updatedUser = await User.findByIdAndUpdate(id, {age, number},{ new:true })
    
    return res.json({message:"data updated", data: updatedUser })

})
app.delete("/delete", async function(req,res){
    const {id} = req.query;
    if(!id) return res.send("id is required..")

    const deletedUser = await User.findByIdAndDelete(id)
    return res.json({message:"user deleted", data: deletedUser })
})

mongoose.connect(process.env.MONGO_URL).then(()=>{
    console.log("Connected to db")
})

app.listen(8000,()=>{
    console.log("listening on port 8000")
})

// const response = await axios.post("/register",{name,surname,age})
// const {name,surname,age} = req.body



// const response = await axios.post('/register/id')
// app.post('/register/id')
// const { id } = req.params

// req.query
// const url= '/register/?name=${name}&surname=kamble'
// const response = await axios.post(url)
// const { name ,surname} = req.params

