const mongoose = require('mongoose');

require('dotenv').config();

const dbConnect=()=> {
    mongoose.connect(process.env.DATABASE_URL)
    .then(()=>{console.log("db connect successfully  -from database.js")})
    .catch((error)=>{
        console.log("issue in db connection  -from database.js");
        console.log(error);
        process.exit(1);
    })
};

module.exports = dbConnect;