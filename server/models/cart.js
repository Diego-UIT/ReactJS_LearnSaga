const mongoose = require('mongoose')
const cartSchema = new mongoose.Schema({
    userId: {type: mongoose.Schema.Types.ObjectId, ref: 'user'},
    cart: {type: Object, require: true}
})

module.exports = mongoose.model('cart', cartSchema)