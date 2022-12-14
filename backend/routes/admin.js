const express = require('express')
const Admin = require('../models/admin')
const Product = require('../models/product')
const Orders = require('../models/orders')
const router = express.Router()
const multer = require('multer')
const auth = require('../utils/adminAuth')
const sharp = require('sharp')
const upload = multer()

router.post('/admin', async (req, res) => {

    try{
        const {token, admin} = await Admin.confirmCredentials(req.body.name, req.body.password)
        res.send({token, admin})
    }
    catch(error){
        res.status(401).send(error)
    }

})

router.post('/dashboard/orders', auth, async (req, res) => {
    try {
        const admin = req.admin
        if(admin.rank === 'chief-admin'){
            if(!req.body.salesmanCode){
                const orders = await Orders.find({}).sort([['_id', -1]]).limit(req.query.limit || 20).skip(req.query.skip || 0)
                return res.send(orders)
            }
            const subAdmin = await Admin.findOne({salesmanCode: req.body.salesmanCode})
            await subAdmin.populate('orders')
            res.send({name: subAdmin.name, orders: subAdmin.orders})

        }
        else {
            await admin.populate('orders')
            res.send(admin.orders)
        }
        

    }
    catch (e) {
        res.send({e})
    }

})



router.post('/product', upload.array('photos'), auth, async (req, res) => {
    try{
        const product = new Product(req.body)
        await product.save()
        res.status(201).json(product)
    }
    catch(e) {
        console.log(e)
        res.status(400).json({message: 'Error when adding the product'})
    }
})

router.delete('/product/:id', auth, async (req, res) => {
    try {
        await Product.findByIdAndDelete(req.params.id)
        res.status(200).json({message: 'Deleted Successfully'})
        
    } catch (error) {
        res.status(400)
    }
})

module.exports = router