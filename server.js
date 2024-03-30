const express = require("express");
const app = express();
const mongoose = require("mongoose");
const path = require("path");
const nocache = require("nocache");
const session = require("express-session");



const userAuth = require("./routes/userAuth");
const userFeature = require("./routes/userFeature");
const adminFeature = require("./routes/adminFeature")


mongoose.connect("mongodb://localhost:27017/loginSignApp");
mongoose.connection.on("connected",()=>{
    console.log("mongoDB connected");
});

mongoose.connection.on("error",(err)=>{
    console.log("Error occur in mongoDB connection");
});

mongoose.connection.on("disconnected",()=>{
    console.log("MongoDB disconnected");
});


app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use("/public", express.static(path.join(__dirname, "/public")));


app.set("view engine","ejs");


app.use(
    session({
      secret: "1231fdsdfssg33435",
      resave: false,
      saveUninitialized: true,
    })
  );

  app.use("/",nocache());



  app.use("/",userAuth);
  app.use("/userhome",userFeature);
  app.use("/adminhome",adminFeature)




const PORT = 3003;
app.listen(PORT,()=>{
    console.log("Server Connected");
})


