const express = require('express')
const userModel = require('../models/user')
const argon2 = require('argon2')
const jwt = require('jsonwebtoken')
require('dotenv').config()
const router = express.Router()
const verifyToken = require('../middleware/user')

router.get('/auth', verifyToken, async(req, res) => {
    try {
        const user = await userModel.findById(req.userId).select('-password')
        if (!user)
            return res.status(400).json({success: false, message: 'User not found!'})
       res.json({success: true, user})
    } catch(e) {
        console.log(e)
        res.status(500).json({success: false, message: 'internal server error!'})
    }
})

router.get('/', async(req, res) => {
    try {
        const users = await userModel.find()
        return res.status(200).json({success: true, users})
    } catch(e) {
        console.log(e)
        res.status(500).json({success: false, message: 'internal server error!'})
    }
})

router.post('/register', async(req, res) => {
    const { username, password } = req.body
    if (!username || !password) {
        return res.status(400).json({success: false, message: 'missing username or password'})
    }
    try {
        const user = await userModel.findOne({username})
        if (user) {
            return res.status(400).json({success: false, message: 'username already taken'})
        }
        const hashedPassword = await argon2.hash(password)
        const newUser = new userModel({username, password: hashedPassword})
        const accessToken = jwt.sign({userId: newUser._id}, process.env.ACCESS_TOKEN_SECRET)
        await newUser.save()
        res.status(200).json({success: true, message: 'insert successfully', accessToken, user: newUser})
    } catch(e) {
        console.log(e.message)
        res.status(500).json({success: false, message: 'internal server error'})
    }
})

router.post('/login', async(req, res) => {
    const { username, password } = req.body
    if (!username || !password) {
        return res.status(400).json({success: false, message: 'missing username or password'})
    }
    try {
        const user = await userModel.findOne({username})
        if (!user) {
            return res.status(400).json({success: false, message: 'incorrect username or password'})
        }
        const checkPassword = await argon2.verify(user.password, password)
        if (!checkPassword) {
            return res.status(400).json({success: false, message: 'incorrect username or password'})
        }
        const accessToken = jwt.sign({userId: user._id}, process.env.ACCESS_TOKEN_SECRET)
        res.status(200).json({success: true, message: 'login successfully', accessToken, user})
    } catch(e) {
        console.log(e.message)
        res.status(500).json({success: false, message: 'internal server error'})
    }
})

router.put('/:id', async(req, res) => {
    const { username, password } = req.body
    if (!username || !password) {
        return res.status(400).json({success: false, message: 'missing username or password'})
    }
    try {
        const userCheck = await userModel.findOne({username})
        if (userCheck) {
            return res.status(400).json({success: false, message: 'username already taken'})
        }
        const hashedPassword = await argon2.hash(password)
        let user = await userModel.findById(req.params.id)
        user.username = username
        user.password = hashedPassword
        await user.save()
        res.status(200).json({success: true, user, message: 'update successfully'})
    } catch(e) {
        console.log(e)
        res.status(500).json({success: false, message: 'internal server error'})
    }
})

router.delete('/:id', async(req, res) => {
    try {
        await userModel.findByIdAndDelete(req.params.id)
        res.status(200).json({success: true, message: 'delete user successful'})
    } catch(e) {
        console.log(e)
        res.status(500).json({success: false, message: 'internal server error!'})
    }
})


module.exports = router