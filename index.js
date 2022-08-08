const express=require('express');
const { default: mongoose } = require('mongoose');
const app=express();
const config =require('config')

const dB="mongodb+srv://Suraj:Asdf071@firstcluster.ogf34.mongodb.net/myAPP?retryWrites=true&w=majority"

mongoose.connect(dB)
.then(()=>{console.log('connected ')})
.catch((err)=>{console.log('not connected',err)})

if(!config.get==="jwtPrivateKey"){
    console.error('FATAL ERROR : jwtPrivateKey is not defined')
    process.exit(1);
}

const PORT=3002;
require('./startup/routes')(app)
app.use(express.urlencoded({ extended: false }))

app.listen(PORT, () => {
    console.log(`Listening to PORT ${PORT}`)
})