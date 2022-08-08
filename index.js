const express=require('express');
const { default: mongoose } = require('mongoose');
const app=express();
const config =require('config')

mongoose.connect('mongodb://localhost:27017/myapp')
.then(()=>{console.log('connected ')})
.catch((err)=>{console.log('not connected',err)})

if(!config.get==="jwtPrivateKey"){
    console.error('FATAL ERROR : jwtPrivateKey is not defined')
    process.exit(1);
}

const PORT=3002;
require('./startup/routes')(app)
app.use(express.json())
app.use(express.urlencoded({ extended: false }))

app.listen(PORT, () => {
    console.log(`Listening to PORT ${PORT}`)
})