const express = require('express')
const router = express.Router()
const User = require('../models/User')
const { default: mongoose } = require('mongoose')



// Register a new user
router.post('/register', async (req, res) => {
    const { email, password } = req.body

    try {
        const newUser = new User({ email, password })
        await newUser.save()
        return res.status(201).json({ message: 'User registered successfully' })
    } catch (error) {
        return res.status(500).json({ error: error.message })
    }
})



router.post('/login', async (req, res) => {
    const { email, password } = req.body

    try {
        const user = await User.findOne({ email })
        const userId = user._id.toString();
        console.log(userId);
        const userObjectId = new mongoose.Types.ObjectId(userId);
        console.log(userObjectId);
    
        
        if (!user) {
            return res.status(404).json({ message: 'User not found' })
        }
        if (user.password !== password) {
            return res.status(401).json({ message: 'Invalid password' })
        }
        return res.status(200).json({ message: 'Login successfull', userid: userId })
    } catch (error) {
        return res.status(500).json({ error: error.message })
    }
})

module.exports = router;