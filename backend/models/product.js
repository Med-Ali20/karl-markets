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
        type: String,
    },
    extraImage1: {
        type: String
    },
    extraImage2: {
        type: String
    },
    extraImage3: {
        type: String
    },
    extraImage4: {
        type: String
    }
})


const Product = mongoose.model('Product', productSchema)

module.exports = Product