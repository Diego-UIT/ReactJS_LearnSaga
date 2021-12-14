const mongoose = require('mongoose')
const productSchema = new mongoose.Schema({
    name: {type: String, required: true},
    price: {type: Number},
    unit: {type: String},
    info: {type: String}
})

module.exports = mongoose.model('product', productSchema)