const express = require('express');
const mongoose = require('mongoose');
const imagesRoutes = require('./Routes/images');

const app = express();
app.use(express.json());
const port = 3000;

app.listen(port, (req, res)=>{
    console.log("running....");
});

app.use('/', imagesRoutes);
app.use('/uploads', express.static('uploads'));

mongoose.connect("mongodb+srv://abdullah:abdullah@cluster0.kgwys.mongodb.net/Cluster0?retryWrites=true&w=majority", 
{   useNewUrlParser:true,
    useCreateIndex: true,
    useUnifiedTopology: true,
    useFindAndModify: false},
     () => console.log("connected to DB")
);