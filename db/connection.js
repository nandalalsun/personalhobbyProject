const mongoose = require("mongoose");

require("dotenv").config();

mongoose.connect(process.env.DB_URL + "/" + process.env.DB_NAME);

mongoose.connection.
    once('open', ()=> console.log("Databse connected to " + process.env.DB_NAME))
    .on('error', (err)=>{
        console.log("Failed: " + err);
    });




