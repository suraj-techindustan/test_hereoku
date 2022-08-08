const express=require('express');
const user=require('../routes/user-route')

module.exports = function (app) {
    app.use(express.json())
    app.use('/api/users', user)
    
}