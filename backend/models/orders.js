const mongoose = require('mongoose')

const orderSchema = new mongoose.Schema({
    customerName: {
        type: String,
        required: true,
        trim: true
    },
    fullAddress: {
        type: String,
        required: true,
        trim: true
    },
    phoneNumber: {
        type: String,
        required: true,
        trim: true,
        minLength: 11,
        maxLength: 11
    },
    province: {
        type: String,
        required: true
    },
    products: {
        type:  [
                {
                productId: {
                    type: String,
                    required: true
                },
                productPrice: {
                    type: Number,
                    required: true
                },
                productQuantity: {
                    type: Number,
                    required: true
                },
                productName: {
                    type: String,
                    required: true
                },
                productPicture: {
                    type: Buffer,
                    required: true
                }
                }
        ],
        required: true
    },
    salesmanCode: {
        type: String,
        ref: 'Admin'
    },
    owner: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },

})


const Order = mongoose.model('Order',orderSchema)


module.exports = Order