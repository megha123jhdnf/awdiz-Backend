import express from "express";

const app = express();

app.get("/", function(req, res){
    res.send("Welcome to backend")
});

app.get("/awdiz", function(req, res){
    res.send("awdiz")
});

app.listen(8000,()=>{
   console.log("Server listing on port 8000") ;
})