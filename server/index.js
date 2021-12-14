const express = require('express')
require('dotenv').config()
const mongoose = require('mongoose')
const productRouter = require('./routes/product')
const userRouter = require('./routes/user')
const cartRouter = require('./routes/cart')
const app = express()
const cors = require('cors')

app.use(express.json())
app.use(cors())

const STR_CONNECT = "STR_CONNECT=mongodb://localhost/ProductManagement"
const connectFunction = async() => {
    try {
        await mongoose.connect(STR_CONNECT)
        console.log('Connect successfully!')
    }
    catch(e) {
        console.log(e)
        console.log('Connect failed!')
    }
}
connectFunction()
app.use('/api/product/', productRouter)
app.use('/api/user/', userRouter)
app.use('/api/cart/', cartRouter)

app.listen(3000)