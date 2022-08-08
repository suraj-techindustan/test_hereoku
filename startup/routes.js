const express=require('express');
const user=require('../routes/user-route')

module.exports = function (app) {
    app.use(express.json())
    app.use('/api/users', user)
    
    app.get('/', (req, res) => {
        return res.send(`Welcome to Node test App API version: 1.0.3`)
    })
}