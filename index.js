const express = require("express");
const app = express();
const dotevn = require("dotenv");
const mongoose = require("mongoose");
const bodyParser =  require("body-parser");
const cors = require("cors")

dotevn.config({path:'config.env'});
mongoose.set('strictQuery', true);
app.use(cors());

app.use(function(req, res, next) {
   res.header("Content-Type","application/json");
   res.header("Accept","application/json");
   res.header("Access-Control-Allow-Origin", "*");
   res.header('Access-Control-Allow-Methods', 'DELETE, PUT, GET, POST');
   res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
   next();
});


// Connect to db
mongoose.connect(process.env.DB_CONNECT)
  .then(() => {
    console.log('connected to db');
  })
  .catch((err) => {
    console.log(err.message);
  });

app.use(express.json());

app.use(bodyParser.urlencoded({extended:false}))
app.use(bodyParser.json())

const userRouter = require('./routes/router');
app.use('/datas',userRouter);

const cargoRouter = require('./routes/cargoRouter')
app.use('/cargos',cargoRouter);

const agentRouter = require('./routes/agentRouter')
app.use('/agents',agentRouter);

const companyRouter = require('./routes/companyRouter')
app.use('/companies',companyRouter);

app.listen(3000,()=>console.log("server up and running on port 3000!"));



