const express = require('express')
const Order = require('../models/orders')
const auth = require('../utils/auth')
const Product = require('../models/product')



const router = express.Router()

router.get('/product/category/:category_name', async (req, res) => {
    const categoryName = req.params.category_name
    try {
        const products = await Product.find({ categoryName }).sort([['_id', -1]]).limit(req.query.limit || 12).skip(req.query.skip || 0)
        res.status(200).json(products)
    }
    catch(error) {
        res.send(error)
    }
    
})  

router.get('/product/search/:searchparams', async (req, res) => {
    const searchparams = req.params.searchparams
    try {
        const products = await Product.find({ productName: { "$regex": searchparams, "$options": "i" } }).sort([['_id', -1]]).limit(req.query.limit || 12).skip(req.query.skip || 0)
        res.status(200).json(products)
    }
    catch(error) {
        res.send(error)
    }
    
})



router.get('/product/id/:id', async (req, res) => {
    const productId = req.params.id
    try {
        const product = await Product.findOne({_id: productId})
        res.status(200).json(product)
       
    }
    catch(error) {
        res.send(error)
    }
    
})



router.get('/product/all', async (req, res) => {
    try {
        const products =  await Product.find({})
        res.status(200).json(products)
    }
    catch(error) {
        res.send(error)
    }
    
})


router.post('/order',auth , async (req, res) => {
    const user = req.user
    const newOrder = new Order({...req.body, owner: user._id })
    try {
        await newOrder.save()
        res.send(newOrder)
    }
    catch(error) {
        res.send(error)
    }
    
})

router.get('/orders', auth, async(req, res) => {
    const user = req.user
    try {
        await user.populate('orders')
        res.status(200).json(user.orders)
    }

    catch(e){
        res.send(e)
    }
     
    
})

router.delete('/order/:id', auth, async(req, res) => {
    try {
        await Order.findByIdAndDelete(req.params.id)
        res.status(200).send('deleted')
    } catch (error) {
        res.status(401)
    }
})


module.exports = router