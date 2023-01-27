// BUILD YOUR SERVER HERE
const express = require('express');
const User = require('./users/model.js')

const server = express();

server.use(express.json());

// Endpoints:
// GET //
server.get('/api/users', async (req, res) => {
    try {
        const users = await User.find();
        res.status(200).json(users);
    } catch (err) {
        res.status(500).json({ message: `There was an error getting users. Err: ${err.message}`})
    }
})

server.get('/api/users/:id', async (req, res) => {
    const { id } = req.params
    try {
        const user = await User.findById(id);
        if(!user) {
            res.status(404).json({ message: `does not exist`})
        } else {
            res.status(200).json(user)
        }
    } catch (err) {
        res.status(404).json({
            message: `There was an error getting user ${id}`
        })
    }
})

// POST //
server.post('/api/users', async (req, res) => {
    try {
        
    } catch (err) {
        //
    }
})


module.exports = server; // EXPORT YOUR SERVER instead of {}
