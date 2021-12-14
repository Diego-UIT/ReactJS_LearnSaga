const express = require('express')
const cartModel = require('../models/cart')
const router = express.Router()

router.get('/:id', async(req, res) => {
    try {
        const cart = await cartModel.findOne({userId: req.params.id})
        return res.status(200).json({success: true, cart})
    } catch(e) {
        console.log(e)
        res.status(500).json({success: false, message: 'internal server error!'})
    }
})

// Add Cart
router.post('/', async(req, res) => {
    try {
        const {cart, userId} = req.body
        const cartNew = new cartModel({
            userId,
            cart
        })
        await cartNew.save()
        return res.status(200).json({success: true, cart: cartNew, message: 'Add cart successfully!'})
    } catch(e) {
        console.log(e)
        res.status(500).json({success: false, message: 'add server error!'})
    }
})


// Edit Cart
router.put('/:id', async(req, res) => {
    try {
        const {cart, userId} = req.body
        const cartNew = await cartModel.findById(req.params.id)
        console.log(cartNew)
        cartNew.cart = cart
        await cartNew.save()
        return res.status(200).json({success: true, cart: cartNew, message: 'Edit cart successfully!'})
    } catch(e) {
        console.log(e)
        res.status(500).json({success: false, message: 'edit server error!'})
    }
})

module.exports = router



