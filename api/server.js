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
    const { name, bio } = req.body
    try {
        if(!name || !bio){
            res.status(400).json({
                message: `Please provide name and bio for the user`
            })
        } else {
            const newUser = await User.insert({ name, bio })
            res.status(201).json(newUser)
        }
    } catch (err) {
        res.status(500).json({

        })
    }
})

// DELETE //
server.delete(`/api/users/:id`, async (req, res) => {
    try {
        const { id } = req.params
        const deletedUser = await User.remove(id)
        if(!deletedUser) {
            res.status(404).json({
                message: 'The user with the specified ID does not exist'
            })
        } else {
            res.status(200).json(deletedUser)
        }
    } catch {
        res.status(500).json({
            message: `The user could not be removed`
        })
    }
})

// PUT //
server.put(`/api/users/:id`, async (req, res) => {
    try {
        const { id } = req.params
        const { name, bio } = req.body
        if(!name || !bio) {
            res.status(400).json({
                message: 'Please provide name and bio for the user'
            })
        } else {
            const updatedUser = await User.update(id, { name, bio })
            if (!updatedUser) {
                res.status(404).json({
                    message: 'The user with the specified ID does not exist'
                })
            } else {
                res.status(200).json(updatedUser)
            }
        }
    } catch {
        res.status(500).json({
            message: 'The user information could not be modified'
        })
    }
})

module.exports = server; 
