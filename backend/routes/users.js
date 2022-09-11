const express = require('express')
const User = require('../models/users')

const router = new express.Router()

router.post('/users', async (req,res) => {
    const newUser = new User(req.body)
    try{
        await newUser.save()
        const token = await newUser.generateAuthToken()
        res.send({newUser, token})
    }
    catch(error){
        res.status(400).send(error)
    }
})

router.post('/login', async (req,res) => {
    try{
        const user = await User.findByCredentials(req.body.email, req.body.password)
        const token = await user.generateAuthToken()
        res.status(200).send({user, token})
    }
    catch(error){
        res.status(400).send(error)
    }

})

router.get('user')

module.exports = router