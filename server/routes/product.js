const express = require('express')
const router = express.Router()
const productModel = require('../models/product')

router.get('/', async(req, res) => {
    try {
        const products = await productModel.find()
        return res.status(200).json({success: true, products})
    } catch(e) {
        console.log(e)
        res.status(500).json({success: false, message: 'internal server error!'})
    }
})

router.post('/', async(req, res) => {
    try {
        const data = req.body
        const product = new productModel(data)
        await product.save()
        return res.status(200).json({success: true, data: product, message: 'insert successfully'})
    } catch(e) {
        console.log(e)
        res.status(500).json({success: false, message: 'internal server error!'})
    }
})

router.put('/:id', async(req, res) => {
    try {
        const {name, price, unit, info} = req.body
        
        const product = await productModel.findById(req.params.id)
        product.name = name
        product.price = price
        product.unit = unit
        product.info = info
        await product.save()
        return res.status(200).json({success: true, product, message: 'update successfully'})
    } catch(e) {
        console.log(e)
        res.status(500).json({success: false, message: 'internal server error!'})
    }
})

router.delete('/:id', async(req, res) => {
    try {
        await productModel.findByIdAndDelete(req.params.id)
        res.status(200).json({success: true, message: 'delete product successful'})
    } catch(e) {
        console.log(e)
        res.status(500).json({success: false, message: 'internal server error!'})
    }
})

module.exports = router