require('dotenv').config()
const express = require('express')
const cors = require('cors')
const Router = require('./routes/routes')
const passport = require('passport')
const path = require('path')
const app = express()
const PORT = process.env.PORT || 5000
const HOST = process.env.HOST || "0.0.0.0"




app.use(cors({origin: '*'}))
app.use(cors());

/* app.use(cors({ origin: 'http://localhost:3000' })) */



require('./config/database')
require('./config/passport')  


//middlewares
app.use(function (req, res, next) {

    // Website you wish to allow to connect
    res.setHeader('Access-Control-Allow-Origin', '*');

    // Request methods you wish to allow
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

    // Request headers you wish to allow 
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');

    // Set to true if you need the website to include cookies in the requests sent
    // to the API (e.g. in case you use sessions)
    res.setHeader('Access-Control-Allow-Credentials', true);

    // Pass to next layer of middleware
    next(); 
});


app.use(express.json());
app.use('/api',Router)




if(process.env.NODE_ENV === "production") {
    app.use(express.static("/build"))
    app.get("*", (req,res)=>{
        res.sendFile(path.join(__dirname+"/build/index.html"))
    })}

app.listen(PORT,()=>console.log(`server listen to ${PORT}`)) 

/* app.listen("4000", () => console.log("Servidor Inicializado en Puerto 4000")) */

