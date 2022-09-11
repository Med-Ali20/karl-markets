const mongoose = require('mongoose')


const productSchema = new mongoose.Schema({
    productName: {
        type: String,
        required: true,
        unique: true
    },
    categoryName: {
        type: String,
        required: true
    },
    productPrice: {
        type: String,
        required: true
    },
    productDescription: {
        type: String,
        required: true
    },
    productAvailablitiy: {
        type: String,
        default: 'available',
    },
    productPicture: {
        type: Buffer,
    },
    extraImage1: {
        type: Buffer
    },
    extraImage2: {
        type: Buffer
    },
    extraImage3: {
        type: Buffer
    },
    extraImage4: {
        type: Buffer
    }
})


const Product = mongoose.model('Product', productSchema)

module.exports = Product