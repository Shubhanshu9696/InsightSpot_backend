const express = require('express');
const app = express();

require('dotenv').config();

const PORT = process.env.PORT || 4000;

app.use(express.json());

//import routes for TODO list
const blogs = require('./routes/blogs');

// mount the todo API routes
app.use('/api/v1',blogs);

const dbConnect = require("./config/database");
dbConnect();

app.listen(PORT , ()=>{
    console.log(`server is currently running on ${PORT} `);
})


app.get('/', (req, res)=>{
    res.send(`<h1>This is home page</h1> `);
})

